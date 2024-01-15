import { pdfIndex } from "@/lib/db/pinecone";
import openai, { getEmbedding } from "@/lib/openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncate = messages.slice(-6);

    const embedding = await getEmbedding(
      messagesTruncate.map((message) => message.content).join("\n"),
    );

    const vectorQueryResponse = await pdfIndex.query({
      vector: embedding,
      topK: 30,
    });

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
        "You are an intelligent pdf-talking app. You answer the user's question based on their existing PDF.",
    };

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [systemMessage, ...messagesTruncate],
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

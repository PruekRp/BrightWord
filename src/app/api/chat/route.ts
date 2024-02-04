import { pdfIndex } from "@/lib/db/pinecone";
import openai, { getEmbedding } from "@/lib/openai";
import { ChatCompletionMessage } from "openai/resources/index.mjs";
import { OpenAIStream, StreamingTextResponse } from "ai";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages: ChatCompletionMessage[] = body.messages;

    const messagesTruncate = messages.slice(-6);

    const inputText = messagesTruncate
      .map((message) => message.content)
      .join("\n");

    const embedding = await getEmbedding(inputText);

    const vectorQueryResponse = await pdfIndex.namespace('pdftext2').query({
      vector: embedding,
      topK: 4,
    });

    let pineconeResponse = "";
    if (vectorQueryResponse.matches.length > 0) {
      const relevantPDF = vectorQueryResponse.matches[0];
      pineconeResponse = `Relevant PDF Content:\n${relevantPDF}`;
      console.log("relevantPDF Response:", relevantPDF);
    } else {
      pineconeResponse = "No relevant PDF found.";
    }

    const systemMessage: ChatCompletionMessage = {
      role: "assistant",
      content:
       "You are an intelligent pdf talking app and intelligent pdf summarizer. You answer and summarize the user's question based on their existing pdf for create a content blog .\n" +
        "The relevant pdf for this query are:\n" +
        pineconeResponse,
    };

    const openaiMessages = [systemMessage, ...messagesTruncate];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: openaiMessages,
    });

    console.log("OpenAI API Response:", response);
    console.log("System Message:", systemMessage);
    console.log("Embedding from OpenAI:", embedding);
    console.log("Messages to OpenAI API:", openaiMessages);
    console.log("Pinecone Results in System Message:", pineconeResponse);

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

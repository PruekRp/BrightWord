"use client";
import { OpenAIEmbeddings } from "@langchain/openai";
import { pdfIndex } from "./db/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";
import { getAuthSession } from "@/utils/auth";

export async function embedAndStoreDocs(
    //@ts-ignore
  docs: Document<Record<string, any>>[],
) {
  const session = await getAuthSession()
    try {
        
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: "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"
        });
        const index = pdfIndex;

        await PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          textKey: "text",
          namespace: `id:`
        });
    } catch (error) {
        
      console.log("error ", error);
      throw new Error("Failed to load your docs !");
    }
}
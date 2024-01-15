import { OpenAIEmbeddings } from "@langchain/openai";
import { pdfIndex } from "./db/pinecone";
import { PineconeStore } from "@langchain/community/vectorstores/pinecone";

export async function embedAndStoreDocs(
    //@ts-ignore
  docs: Document<Record<string, any>>[],
) {
    try {
        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: "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"
        });
        const index = pdfIndex;

        await PineconeStore.fromDocuments(docs, embeddings, {
          pineconeIndex: index,
          textKey: "text",
          namespace: "pdftext2"
        });
    } catch (error) {
      console.log("error ", error);
      throw new Error("Failed to load your docs !");
    }
}

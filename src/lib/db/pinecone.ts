import { Pinecone } from "@pinecone-database/pinecone";

const apiKey = "627dabb7-f38c-4db6-9b62-99ee217205e2"

if (!apiKey) {
  throw Error("PINECONE_API_KEY is not set");
}

const pinecone = new Pinecone({
  environment: "gcp-starter",
  apiKey,
});

export const pdfIndex = pinecone.index("my-index");

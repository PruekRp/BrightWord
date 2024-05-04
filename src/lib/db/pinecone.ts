import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ apiKey: '627dabb7-f38c-4db6-9b62-99ee217205e2' });

if (!pc) {
  throw Error("PINECONE_API_KEY is not set");
}

export const pdfIndex = pc.index("pdf");

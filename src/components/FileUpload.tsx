"use client";
import { ChangeEvent, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { getChunkedDocsFromPDF } from "@/lib/pdf-loader";
import { embedAndStoreDocs } from "@/lib/vector-store";
import { pdfIndex } from "@/lib/db/pinecone";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data } = useSession();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Invalid file type. Please select a PDF file.");
        console.log("PDF only");
        toast.error('PDF only')
        e.target.value = "";
        setFile(null);
      } else {
        setError(null);
        setFile(selectedFile);
      }
    }
  };

  const handleUploadClick = async () => {
    if (!file) {
      toast.error('No pdf to upload')
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const docs = await getChunkedDocsFromPDF(file);
      console.log(`Loading ${docs.length} chunks into pinecone...`);
      await embedAndStoreDocs(data?.user.id, docs);
      console.log(`Data embedded and stored in pine-cone ${data?.user.id} index`);
      toast.success('Upload Success!')
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error('Upload Error!')
    } finally {
      setUploading(false);
    }
  };

  const handleClearPinecone = async () => {
    try {
      await pdfIndex.namespace(`id:${data?.user.id}`).deleteAll();
      console.log(`Clear pinecone id:${data?.user.id}`);
      toast.success('Clear PDFs Success!')
    } catch (error) {
      console.error(error)
      toast.error('No PDFs')
    }
    
  };

  return (
    <div>
      <label htmlFor="fromFile">Upload PDF</label>
      <div className="flex">
        <Input id="fromFile" type="file" onChange={handleFileChange} />
        <Button
          type="button"
          onClick={handleUploadClick}
          disabled={uploading}
          className="mb-1 ml-1 ms-auto flex"
        >
          {uploading ? "Please wait..." : "Upload"}
        </Button>
        <Button
          type="button"
          onClick={handleClearPinecone}
          className="ml-1 mr-1"
        >
          Clear PDFs
        </Button>
      </div>
    </div>
  );
}

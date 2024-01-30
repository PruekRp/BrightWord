'use client'
import { useState } from "react";
import Editor from "@/components/editor/Editor";

const Write = () => {
  const [creating, setCreating] = useState(false);


  const handleSubmit = async (post:any) => {
    console.log(post)
    try {
      setCreating(true);

      // Make a POST request to the API route
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      console.log(response)

      if (response.ok) {
        const data = await response.json();
        console.log("Blog post created:", data);
      } else {
        console.error("Failed to create blog post");
      }
    } finally {
      setCreating(false);
    }
  };

  return (
    <div>
      <Editor
        onSubmit={handleSubmit}
        busy={creating}
      />
    </div>
  );
};

export default Write;

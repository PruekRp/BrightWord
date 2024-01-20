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
        initialValue={{
          title: "This is from crate",
          content: "<h1>I am header</h1>",
          slug: "this-is-from-create",
          thumbnail:
            "https://images.unsplash.com/photo-1682687219612-b12805df750d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
      />
    </div>
  );
};

export default Write;

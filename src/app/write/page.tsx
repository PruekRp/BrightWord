"use client";
import Editor from "@/components/editor/Editor";
import React from "react";



const Write = () => {
  
  return (
    <div>
      
      <Editor
        onSubmit={(post) => {
          console.log(post);
        }}
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

'use client'
import { useState, useEffect } from "react";
import Editor, { FinalPost } from "@/components/editor/Editor";

const Edit = ({ params }) => {
  const [editing, setEditing] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${params.blogId}`);
        console.log(params.blogId)
        if (!res.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await res.json();
        console.log(data)
        setBlogData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
    
  }, [params.blogId]);

  const handleSubmit = async (updatedPost:FinalPost) => {
    console.log(updatedPost)
    try {
      setEditing(true);
      console.log(updatedPost)
      // Make a PUT request to update the blog post
      const response = await fetch(`/api/blog/${params.blogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Blog post updated:", data);
      } else {
        console.error("Failed to update blog post");
      }
    } finally {
      setEditing(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  console.log(blogData)
  return (
    <div>
      <Editor
        onSubmit={handleSubmit}
        initialValue={blogData}
        busy={editing}
        btnTitle="Update"
      />
    </div>
  );
};

export default Edit;

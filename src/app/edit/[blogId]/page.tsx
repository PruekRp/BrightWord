'use client'
import { useState, useEffect } from "react";
import Editor, { FinalPost } from "@/components/editor/Editor";
import { useRouter } from 'next/navigation'
const Edit = ({ params }:any) => {
  const [editing, setEditing] = useState(false);
  const [blogData, setBlogData] = useState({});
  const [loading, setLoading] = useState(true);
  
  const router = useRouter()
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${params.blogId}`);
        console.log(params.blogId)
        if (!res.ok) {
          throw new Error("Failed to fetch blog data");
        }

        const data = await res.json();
        setBlogData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
    
  }, [params.blogId]);

  
  const handlePublished = async (updatedPost:any) => {
    console.log('UpdatedPost: ', updatedPost);
  
    try {
      setEditing(true);
  
      const { content, title, slug, thumbnail, createAt } = updatedPost;
  
      const response = await fetch(`/api/blog/${updatedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          title,
          slug,
          thumbnail,
          createAt,
          status:'published'
        }),
      });
  
      console.log('PUT Response:', response);
  
      if (response.ok) {
        const data = await response.json();
        console.log("Blog post updated:", data);
        // Update the local state with the updated data (if needed)
        setBlogData(data);
      } else {
        console.error("Failed to update blog post");
      }
    } finally {
      setEditing(false);
      router.push('/')
    }
  };

  const handleDraft = async (updatedPost:any) => {
    console.log('UpdatedPost: ', updatedPost);
  
    try {
      setEditing(true);
  
      const { content, title, slug, thumbnail, createAt } = updatedPost;
  
      const response = await fetch(`/api/blog/${updatedPost.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          title,
          slug,
          thumbnail,
          createAt,
          status:'draft'
        }),
      });
  
      console.log('PUT Response:', response);
  
      if (response.ok) {
        const data = await response.json();
        console.log("Blog post updated:", data);
        // Update the local state with the updated data (if needed)
        setBlogData(data);
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
        onPublish={handlePublished}
        onDraft={handleDraft}
        initialValue={blogData}
        busy={editing}
        btnTitle="Publish"
      />
    </div>
  );
};

export default Edit;

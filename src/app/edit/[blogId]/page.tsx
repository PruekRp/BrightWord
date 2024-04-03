'use client'
import { useState, useEffect } from "react";
import Editor, { FinalPost } from "@/components/editor/Editor";
import { useRouter } from 'next/navigation';

const Edit = ({ params }:any) => {
  const [published, setPublished] = useState(false);
  const [draft, setDraft] = useState(false);
  const [blogData, setBlogData] = useState<any>({});
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

  
  const handlePublished = async (updatedPost: any) => {
    console.log('published: ', updatedPost);
    try {
      setPublished(true);
  
      const { content, title, slug, thumbnail, createAt } = updatedPost;
      const textToConvert = `สวัสดีหัวเรื่อง ${title} เนื้อหาที่จะพูดต่อไปนี้ ${content.replace(/(<([^>]+)>)/gi, "")}`;
      console.log('textToConvert:',textToConvert);
  
      const botnoiRequestData = {
        text: textToConvert,
        speaker: "1", // โดยใช้ชุดพูดหมายเลข 1
        volume: 1,
        speed: 1,
        type_media: "m4a",
        save_file: true,
        language: "th",
      };
  
      const botnoiResponse = await fetch("https://api-voice.botnoi.ai/openapi/v1/generate_audio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Botnoi-Token": "enhTQUw0cWlHalNHMExtZEJyZkFiUnNWcjN2MjU2MTg5NA==", // แทนที่ด้วยโทเคนของคุณ
        },
        body: JSON.stringify(botnoiRequestData),
      });
  
      // if (!botnoiResponse.ok) {
      //   throw new Error("Failed to generate audio");
      // }
  
      // ดึงข้อมูลเสียงที่สร้างได้จากการตอบกลับ
      const audioData = await botnoiResponse.json();
      console.log("Generated audio:", audioData);
  
      // ส่งข้อมูลบล็อกที่อัปเดตไปยัง API ของเซิร์ฟเวอร์ของคุณพร้อมกับ URL ของไฟล์เสียงที่สร้าง
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
          audio: audioData.audio_url, // เพิ่ม URL ของไฟล์เสียงที่สร้างโดยใช้ Botnoi API
          status: 'published'
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Blog post updated:", data);
        // Update the local state with the updated data (if needed)
        setBlogData(data);
      } else {
        console.error("Failed to update blog post");
      }
    } finally {
      setPublished(false);
      router.push('/')
    }
  };
  
  const handleDraft = async (updatedPost:any) => {
  
  
    try {
      setDraft(true);
      console.log("Draft updated:", updatedPost);
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
  
      if (response.ok) {
        const data = await response.json();
        console.log("Blog post updated:", data);
        // Update the local state with the updated data (if needed)
        setBlogData(data);
      } else {
        console.error("Failed to update blog post");
      }
    } finally {
      setDraft(false);
      
    }
  };
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Editor
        onPublish={handlePublished}
        onDraft={handleDraft}
        initialValue={blogData}
        busyDraft={draft}
        busyPublished={published}
      />
    </div>
  );
};

export default Edit;

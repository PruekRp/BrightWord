import { FinalPost } from "@/components/editor/Editor";
import { PostDetail } from "./types";

export const generateFormData = (post: FinalPost) => {
    console.log('หวัดดี')
    const formData = new FormData();
    for (let key in post) {
      const value = (post as any)[key];
       formData.append(key, value);
    }
  
    return formData;
  };
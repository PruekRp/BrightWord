"use client";
import React, { ChangeEventHandler, FC, useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, Range, getMarkRange } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar/Toolbar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import EditLink from "./Link/EditLink";
import TipTapImage from "@tiptap/extension-image";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import ThumbnailSelector from "./ThumbnailSelector";
import Paragraph from "@tiptap/extension-paragraph";
import ActionButton from "../ActionButton";

interface FinalPost {
  title: string;
  content: string;
  slug:string;
  thumbnail?: File | string;
}

interface Props {
  initialValue: FinalPost
  btnTitle?:string
  busy:boolean
  onSubmit(post:FinalPost):void
}

const Editor: FC<Props> = ({initialValue, btnTitle='Submit',busy=false,onSubmit}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<{ src: string }[]>([]);
  const [slug,setInitialSlug] = useState<string>('');
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    slug: "",
  });
  console.log(initialValue)
  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      Placeholder.configure({
        placeholder: "Type something ....",
      }),
      TipTapImage.configure({
        HTMLAttributes: {
          class: "",
        },
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    editorProps: {
      handleClick(view, pos, event) {
        const { state } = view;
        const selectionRange = getMarkRange(
          state.doc.resolve(pos),
          state.schema.marks.link,
        );
        if (selectionRange) setSelectionRange(selectionRange);
      },
      attributes: {
        class: "prose prose-lg focus:outline-none max-w-full mx-auto h-full",
      },
    },
  });
  const slugify = (str:string) => {
    return str
    .toLowerCase() // แปลงข้อความเป็นตัวพิมพ์เล็กทั้งหมด
    .trim() // ตัดช่องว่างที่อยู่ข้างหน้าและข้างหลังข้อความ
    .replace(/[^\w\s-]/g, "") // ลบทุกอักขระที่ไม่ใช่ตัวอักษรหรือตัวเลขหรือเว้นวรรคหรือขีด
    .replace(/[\s_-]+/g, "-") // แทนที่เว้นวรรคหรือขีดติดกันด้วยขีดเดียว
    .replace(/^-+|-+$/g, ""); // ลบขีดที่อยู่ที่จุดเริ่มต้นหรือจุดสิ้นสุดข้อความ
  } 
  

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newTitle = target.value;
    const newSlug = slugify(newTitle);
    setPost({ ...post, title: newTitle, slug: newSlug });
  };
  
  const updateThumbnail = (file:File) => {
    setPost({...post,thumbnail:file})
  }

  const handleSubmit = () => {
    if(!editor) return;
    onSubmit({...post,content:editor.getHTML()})
  }

  
  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
      
    }
  }, []);

  useEffect(()=>{
    if(initialValue){
      setPost({...initialValue})
      editor?.commands.setContent(initialValue.content)
      const {slug} = initialValue
      setInitialSlug(slug)
    }
  },[initialValue,editor])

  return (
    <div className="p-3 transition">
      <div className="sticky top-0 z-10 bg-bl"></div>
      {/*Thumbnail Selector and Submit Button*/}
      <div className="flex items-center justify-between mb-3">
        <ThumbnailSelector initialValue={post.thumbnail as string} onChange={updateThumbnail} />
        <div>
          <ActionButton busy={busy} title={btnTitle} onClick={handleSubmit} />
        </div>
      </div>

      {/*Title Input*/}
      <input
        type="text"
        className="py-5 outline-none bg-transparent w-full border-0 border-b-[1px] border-zinc-500 text-5xl font-semibold text-black mb-3"
        placeholder="Title"
        onChange={updateTitle}
        value={post.title}
      />

      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-black my-3" />
      {editor ? <EditLink editor={editor} /> : null}
      <EditorContent editor={editor} className="min-h-[700px]" />
    </div>
  );
};

export default Editor;

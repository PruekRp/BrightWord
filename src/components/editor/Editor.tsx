// Editor.tsx
import React, { ChangeEventHandler, FC, useEffect, useState } from "react";
import { useEditor, EditorContent, Range, getMarkRange } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar/Toolbar";
import Link from "@tiptap/extension-link";
import TipTapImage from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../utils/firebase";
import classNames from "classnames";
import ActionButton from "../ActionButton";
import Underline from '@tiptap/extension-underline';

export interface FinalPost {
  title: string;
  content: string;
  slug: string;
  thumbnail?: File | string;
  status: string;
}

interface Props {
  initialValue: FinalPost;
  busyDraft: boolean;
  busyPublished: boolean;
  onPublish(post: FinalPost): void;
  onDraft(post: FinalPost): void;
}

const commonClass =
  "border border-dash border-zinc-500 flex items-center justify-center rounded cursor-pointer aspect-video";

const PosterUI: FC<{ label: string; className?: string }> = ({
  label,
  className,
}) => {
  return (
    <div className={classNames(commonClass, className)}>
      <span>{label}</span>
    </div>
  );
};

const Editor: FC<Props> = ({
  initialValue,
  busyDraft = false,
  busyPublished = false,
  onPublish,
  onDraft,
}): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const [selectedThumbnail, setSelectedThumbnail] = useState<any>("");
  const [file, setFile] = useState<File | null>(null);
  const [post, setPost] = useState<FinalPost>({
    title: "",
    content: "",
    slug: "",
    status: "",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TipTapImage,
      Underline,
      Link.configure({
        autolink: false,
        linkOnPaste: false,
        openOnClick: false,
        HTMLAttributes: {
          target: "",
        },
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
    ],
    editorProps: {
      handleClick(view, pos) {
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
  }) as any;

  const slugify = (str: string) => {
    return str
      .replace(/\s+/g, "-")
      .replace(/[^\u0E00-\u0E7F\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .toLowerCase();
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;

    if (!files) return;
    const selectedFile = files[0];
    setFile(selectedFile);
    setSelectedThumbnail(URL.createObjectURL(selectedFile));
  };

  const updateTitle: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const newTitle = target.value;
    const newSlug = slugify(newTitle);
    setPost({ ...post, title: newTitle, slug: newSlug });
  };

  const handlePublished = () => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onPublish({
              ...post,
              content: editor.getHTML(),
              thumbnail: downloadURL,
              status: "published",
            });
          });
        },
      );
    } else {
      console.log(onPublish);
      onPublish({ ...post, content: editor.getHTML(), status: "published" });
    }
  };

  const handleDraft = () => {
    if (file) {
      const storage = getStorage(app);
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          console.error("Error uploading file:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            onDraft({
              ...post,
              content: editor.getHTML(),
              thumbnail: downloadURL,
              status: "draft",
            });
          });
        },
      );
    } else {
      onDraft({ ...post, content: editor.getHTML(), status: "draft" });
    }
  };

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, [editor, selectionRange]);

  useEffect(() => {
    if (initialValue) {
      setPost({ ...initialValue });
      setSelectedThumbnail(initialValue.thumbnail || "");
      editor?.commands.setContent(initialValue.content);
    }
  }, [initialValue, editor]);

  return (
    <div className="p-3 transition">
      <div className="sticky top-0 z-10 bg-bl"></div>
      <div className="flex items-center justify-between mb-3">
        <div className="w-40">
          <input
            type="file"
            hidden
            accept="image/jpg, image/png, image/jpeg"
            id="thumbnail"
            onChange={handleChange}
          />
          <label htmlFor="thumbnail">
            {selectedThumbnail ? (
              <img
                src={selectedThumbnail}
                alt=""
                className={classNames(commonClass, "object-cover")}
              />
            ) : (
              <PosterUI label="Thumbnail" />
            )}
          </label>
        </div>
        <div className="flex">
          {/*แก้เรื่อง animation spin ด้วย */}
          <ActionButton busy={busyDraft} title="Draft" onClick={handleDraft} />
          <ActionButton
            busy={busyPublished}
            title={"Publish"}
            onClick={handlePublished}
          />
        </div>
      </div>
      <input
        type="text"
        className="py-5 outline-none bg-transparent w-full border-0 border-b-[1px] border-zinc-500 text-5xl font-semibold text-black mb-3"
        placeholder="Title"
        onChange={updateTitle}
        value={post.title}
      />
      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-black my-3" />
      <EditorContent editor={editor} className="min-h-[700px]" />
    </div>
  );
};

export default Editor;

"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, Range, getMarkRange } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar/Toolbar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import EditLink from "./Link/EditLink";
import TipTapImage from "@tiptap/extension-image";
import Image from "@tiptap/extension-image";

interface Props {}

const Editor: FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
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

  useEffect(() => {
    if (editor && selectionRange) {
      editor.commands.setTextSelection(selectionRange);
    }
  }, []);

  return (
    <div className="p-3 transition">
      <input
        type="text"
        className="py-5 outline-none bg-transparent w-full border-0 border-b-[1px] border-zinc-500 text-5xl font-semibold text-black mb-3"
        placeholder="Title"
      />
      <Toolbar editor={editor} />
      <div className="h-[1px] w-full bg-black my-3" />

      {editor ? <EditLink editor={editor} /> : null}
      <EditorContent editor={editor} className="min-h-[700px]" />
    </div>
  );
};

export default Editor;

import React, { FC } from "react";
import { Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import DropdownOptions from "../../DropDownOptions";
import { getCloneableBody } from "next/dist/server/body-streams";
import { getFocusedEditor } from "../EditorUtils";
import { RiDoubleQuotesL } from "react-icons/ri";
import {BsBraces, BsCode, BsImageFill, BsListOl, BsListUl, BsTypeBold, BsTypeItalic, BsTypeStrikethrough, BsTypeUnderline} from "react-icons/bs"
import { AiFillCaretDown } from "react-icons/ai";
import InsertLink from "../Link/InsertLink";
import { linkOption } from "../Link/LinkForm";

import Button from "./Button"; 
interface Props {
  editor: Editor | null;
  onOpenImageClick?(): void;
}


const Toolbar: FC<Props> = ({ editor,onOpenImageClick }): JSX.Element | null => {
  if (!editor) return null;
  const options = [
    {
        label: "Paragraph",
        onClick:() =>{
          editor.chain().focus().setParagraph().run()
        }
    },
    {
        label: "Heading 1",
        onClick:() =>{
            editor.chain().focus().toggleHeading({level:1}).run()
        }
    },
    {
        label: "Heading 2",
        onClick:() =>{
          editor.chain().focus().toggleHeading({level:2}).run()
      }
    }, 
    {
        label: "Heading 3",
        onClick:() =>{
          editor.chain().focus().toggleHeading({level:3 }).run()
      }
    },  

  ]
  /* heading 1,2,3 "bold" "italic" "underline" "strike" "quote" "code" 
  "code-bloc" "insert-link" "list (ol and ul) "embed youtube" "insert image"*/

  const handleLinkSubmit = ({ url, openInNewTab }: linkOption) => {
    const { commands } = editor;
    if (openInNewTab) commands.setLink({ href: url, target: "_blank" });
    else commands.setLink({ href: url });
  };

  const getLabel = (): string => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";

    return "Paragraph";
  };

  const Head = () => {
    return (
    <div className="flex items-center space-x-2 text-black bg-white">
        <p>{getLabel()}</p>
        <AiFillCaretDown/>
    </div>
    )
  }


  return(
    <div className="flex items-center">
    {/* paragraph, heading 1, 2, 3 */}
    <DropdownOptions options={options} head={<Head />} />

    <div className="h-4 w-[1px] bg-black mx-8" />

    <div className="flex items-center space-x-3">
      <Button
        active={editor.isActive("bold")}
        onClick={() => getFocusedEditor(editor).toggleBold().run()}
      >
        <BsTypeBold />
      </Button>

      <Button
        active={editor.isActive("italic")}
        onClick={() => getFocusedEditor(editor).toggleItalic().run()}
      >
        <BsTypeItalic />
      </Button>

      <Button
        active={editor.isActive("underline")}
        onClick={() => getFocusedEditor(editor).toggleUnderline().run()}
      >
        <BsTypeUnderline />
      </Button>

      <Button
        active={editor.isActive("strike")}
        onClick={() => getFocusedEditor(editor).toggleStrike().run()}
      >
        <BsTypeStrikethrough />
      </Button>
    </div>

    <div className="h-4 w-[1px] bg-black mx-8" />

    <div className="flex items-center  space-x-3">
      <Button
        active={editor.isActive("blockquote")}
        onClick={() => getFocusedEditor(editor).toggleBlockquote().run()}
      >
        <RiDoubleQuotesL />
      </Button>

      <Button
        active={editor.isActive("code")}
        onClick={() => getFocusedEditor(editor).toggleCode().run()}
      >
        <BsCode />
      </Button>

      <Button
        active={editor.isActive("codeBlock")}
        onClick={() => getFocusedEditor(editor).toggleCodeBlock().run()}
      >
        <BsBraces />
      </Button>

      <InsertLink onSubmit={handleLinkSubmit} />

      <Button
        active={editor.isActive("orderedList")}
        onClick={() => getFocusedEditor(editor).toggleOrderedList().run()}
      >
        <BsListOl />
      </Button>

      <Button
        active={editor.isActive("bulletList")}
        onClick={() => getFocusedEditor(editor).toggleBulletList().run()}
      >
        <BsListUl />
      </Button>
    </div>

    <div className="h-4 w-[1px] bg-black mx-8" />

    <div className="flex items-center space-x-3">
      

     <Button onClick={onOpenImageClick}>
        <BsImageFill />
      </Button>
    </div>
  </div>
  )
};

export default Toolbar;

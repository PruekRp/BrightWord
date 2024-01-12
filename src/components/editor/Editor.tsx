"use client"
import React, { FC, useEffect, useState } from 'react'
import { useEditor, EditorContent, Range, getMarkRange } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Toolbar from './Toolbar/Toolbar'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import Link from '@tiptap/extension-link'
import EditLink from './Link/EditLink'

interface Props  {}

const Editor:FC<Props> = (props): JSX.Element => {
  const [selectionRange, setSelectionRange] = useState<Range>();
  const editor = useEditor({extensions:[StarterKit,Underline,Link.configure({
    autolink:false,
    linkOnPaste:false,
    openOnClick:false,
    HTMLAttributes:{
      target:''
  }
  }),Placeholder.configure({
      placeholder:'Type something ....'
  })],
  editorProps:{
    handleClick(view, pos, event) {
      const { state } = view;
      const selectionRange = getMarkRange(
        state.doc.resolve(pos),
        state.schema.marks.link
      );
      if (selectionRange) setSelectionRange(selectionRange);
    },
    attributes:{
      class:'prose prose-lg focus:outline-none max-w-full mx-auto h-full'
    }
  }})

  useEffect(()=>{
    if(editor && selectionRange){
      editor.commands.setTextSelection(selectionRange);
    }
  },[])
  
 
  return (
  <div className='p-3 transition'>
    
    <Toolbar editor={editor}/>
    <div className='h-[1px] w-full bg-black my-3'/>
    {editor ? <EditLink editor={editor}/>:null}
    <EditorContent editor={editor}/>
  </div>
  )
}

export default Editor

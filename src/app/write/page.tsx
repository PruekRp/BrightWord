'use client'
import Editor from '@/components/editor/Editor'
import React from 'react'

const Write = () => {
  return (
    <div><Editor onSubmit={(post)=>{
      console.log(post)
    }}/></div>
  )
}

export default Write
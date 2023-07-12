'use client'

import { PostCreator, PostValidator } from '@/lib/validators/post';
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import TextareaAutosize from 'react-textarea-autosize';
import type EditorJS from '@editorjs/editorjs'

import '@/styles/editor.css'
import { uploadFiles } from '@/lib/uploadthing';

interface EditorProps {
  subpoedditId: string
}

const Editor: FC<EditorProps> = ({ subpoedditId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PostCreator>({ resolver: zodResolver(PostValidator), defaultValues: { title: '', subpoedditId, content: null } })

  const ref = useRef<EditorJS>();
  const refTitle = useRef<HTMLTextAreaElement>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: [] },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles({ endpoint: 'imageUploader', files: [file] })
                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl
                    }
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor();
      setTimeout(() => {
        refTitle.current?.focus()
      }, 0)
    }
    if (isMounted) {
      init()
      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const { ref: titleRef, ...rest } = register('title')
  return (
    <div className='w-full p-4 rounded-lg border border-zinc-200 bg-zinc-50 dark:bg-slate-800'>
      <form id="subpoeddot-post-form" className='w-fit' onSubmit={() => { }}>
        <div className='prose prose-stone dark:prose-invert'>
          <TextareaAutosize ref={(e) => {
            titleRef(e)
            //@ts-ignore 
            refTitle.current = e
          }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-3xl font-bold focus:outline-none' />
          <div id='editor' className='min-h-[500px]' />
        </div>
      </form>
    </div>
  )
}

export default Editor
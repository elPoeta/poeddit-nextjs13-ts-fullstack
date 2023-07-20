'use client'

import dynamic from 'next/dynamic'
import React, { FC } from 'react'
import CustomImageRenderer from './renderers/CustomImageRenderer'
import CustomCodeRenderer from './renderers/CustomCodeRenderer'

interface EditorOutputProps {
  content: any
}

const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, { ssr: false })

const style = {
  paragraph: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem'
  }
}

const renderers = {
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
}

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output data={content} className='text-sm' style={style} renderer={renderers} />
}

export default EditorOutput
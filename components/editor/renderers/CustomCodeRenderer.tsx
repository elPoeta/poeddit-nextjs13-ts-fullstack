'use client'

const CustomCodeRenderer = ({ data }: any) => {

  return (
    <pre className='bg-gray-800 dark:bg-slate-200  rounded-md p-4'>
      <code className='text-gray-100 dark:text-gray-800 text-sm'>{data.code}</code>
    </pre>
  )
}

export default CustomCodeRenderer
import React, { FC } from 'react'

interface SubpoedditSlugPageProps {
  params: {
    slug: string
  }
}
const subpoedditSlugPage: FC<SubpoedditSlugPageProps> = ({ params }) => {
  const { slug } = params
  return (
    <div>
      <h2>{slug}</h2>
    </div>
  )
}

export default subpoedditSlugPage
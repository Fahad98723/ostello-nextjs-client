import { useRouter } from 'next/router'
import React from 'react'
import Gallery from '../../../../../../components/pages/Gallery'

export default function CourseGallery() {
  const router = useRouter()
  console.log(router.query, 'queries.. ')

  return (
    <div>
      <Gallery />
    </div>
  )
}
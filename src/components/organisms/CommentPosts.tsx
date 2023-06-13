import { doc, setDoc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React from 'react'
import { db } from '../../../firebase'

const CommentPosts = () => {

  const router = useRouter()
  const { id } = router.query
  return (
    <div>{id}</div>
  )
}

export default CommentPosts
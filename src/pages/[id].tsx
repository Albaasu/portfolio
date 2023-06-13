import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { Post } from '@/types/type';
import CommentPosts from '@/components/organisms/CommentPosts';
import { db } from '../../firebase';
import TopHeader from '@/components/organisms/TopHeader';
import Bottombar from '@/components/organisms/Bottombar';

const CommentPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', id as string);
        const postDoc = await getDoc(postRef);
        if (postDoc.exists()) {
          const postData = postDoc.data() as Post;
          setPost(postData);
        } else {
          console.log('No post found');
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  return <>
  <TopHeader/>
  {post ? <CommentPosts {...post} /> : <div>Loading...</div>}
  <Bottombar/>
  </>;
};

export default CommentPage;

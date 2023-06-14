import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

import { Post } from '@/types/type';
import CommentPosts from '@/components/molecules/CommentPosts';
import { db } from '../../firebase';
import TopHeader from '@/components/organisms/TopHeader';
import Bottombar from '@/components/organisms/Bottombar';
import { Box, Container, Stack } from '@mui/material';


const CommentPage = () => {
  const [post, setPost] = useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(db, 'posts', id as string);
        const unsubscribe = onSnapshot(postRef, (postDoc) => {
          if (postDoc.exists()) {
            const postData = postDoc.data() as Post;
            setPost(postData);
          } else {
            console.log('No post found');
          }
        });
  
        return () => unsubscribe();
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
  
    if (id) {
      fetchPost();
    }
  }, [id]);
  return (
    <>
      <Box sx={{ pt: 10 }}>
      <TopHeader />
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack spacing={2}>
            {post ? <CommentPosts {...post} /> : <div>Loading...</div>}
          </Stack>
        </Container>
      <Bottombar />
      </Box>
    </>
  );
};

export default CommentPage;

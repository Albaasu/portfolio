import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import React, { useEffect, useState } from 'react';
import ComentPosts from '@/components/organisms/CommentPosts';
import { collection, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { useRouter } from 'next/router';

const CommentPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
const router = useRouter();  
const { id } = router.query;

  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef,  where('id', '==', id));

    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
          } ;
        })
      );
    });
  }, []);
  console.log(posts);
  return (
    <>
      <TopHeader />
      <div style={{ marginTop: '64px' }}>
        <ComentPosts />
      </div>
      <Bottombar />
    </>
  );
};

export default CommentPage;

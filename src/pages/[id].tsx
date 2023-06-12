import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import React from 'react';
import ComentPosts from '@/components/organisms/CommentPosts';

const commentPage = (id:string) => {
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

export default commentPage;

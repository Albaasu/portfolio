import { Post } from '@/types/type';
import React, { useEffect, useState } from 'react';



const CommentPosts = (props: Post) => {

  return <div style={{ marginTop: '64px' }}>{props.detail}</div>;
};

export default CommentPosts;

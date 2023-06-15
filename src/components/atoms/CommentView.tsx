import { Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';

interface Props {
  postId: string;
}

const CommentView = (props: Props) => {
  const [repComment, setRepComment] = useState<Comment[]>([]);

  useEffect(() => {
    const postsRef = collection(db, `posts/${props.postId}/comments`);
    const q = query(postsRef, orderBy('timestamp', 'desc'));
    onSnapshot(q, (querySnapshot) => {
      setRepComment(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
          } as Comment;
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Typography>{repComment.length}</Typography>;
};

export default CommentView;

import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { Post } from '@/types/type';
import React, { useEffect, useState } from 'react';
import MediTextArea from '../atoms/MediTextArea';
import MediButton from '../atoms/MediButton';
import { v4 as uuidv4 } from 'uuid';

interface Comment {
  detail: string;
  timestamp: any;
  id: string;
}

const CommentPosts = (props: Post) => {
  const [comment, setComment] = useState<string>('');
  const [repComment, setRepComment] = useState<Comment[]>([]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      const commentsCollection = collection(db, `posts/${props.id}/comments`);
      const newComment = {
        detail: comment,
        timestamp: serverTimestamp(),
        id: uuidv4(),
      };
      await addDoc(commentsCollection, newComment);
      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    const postsRef = collection(db, `posts/${props.id}/comments`);
    const q = query(postsRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      setRepComment(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          console.log(data);
          return {
            ...data,
          } as Comment;
        })
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div style={{ marginTop: '64px' }}>{props.detail}</div>
      <MediTextArea value={comment} onChange={handleCommentChange} />
      <MediButton onClick={handleAddComment}>コメントする</MediButton>
      {repComment.map((comment) => (
        <div key={comment.id}>{comment.detail}</div>
      ))}
    </>
  );
};

export default CommentPosts;

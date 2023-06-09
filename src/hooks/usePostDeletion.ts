import { useState } from 'react';
import { doc, deleteDoc, collection, query, getDocs, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Post } from '@/types/type';

const usePostDeletion = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (post: Post) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      // 元の投稿を削除
      const postRef = doc(db, 'posts', selectedPost.id);
      await deleteDoc(postRef);

      // サブコレクションのコメントを削除
      const commentsRef = collection(postRef, 'comments');
      const querySnapshot = await getDocs(commentsRef);
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setOpenDialog(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDialog(false);
  };

  return {
    selectedPost,
    openDialog,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  };
};

export default usePostDeletion;

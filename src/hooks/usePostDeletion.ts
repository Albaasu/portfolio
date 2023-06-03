import { useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const usePostDeletion = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const postRef = doc(db, 'posts', selectedPost.id);
      await deleteDoc(postRef);
      setOpenDialog(false);
    } catch (error) {
      console.error('Error deleting post', error);
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

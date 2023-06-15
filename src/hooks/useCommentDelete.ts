import { useState } from 'react';
import { doc, deleteDoc, collection, query, getDocs, where, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';




const usePostDeletion = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteClick = (post: any) => {
    setSelectedPost(post);
    setOpenDialog(true);
  };

  const handleDeleteConfirm = async (postId:string) => {
    try {
     
      // サブコレクションのコメントを削除
      const postRef = doc(db, `posts/${postId}/comments/${selectedPost.id}`);
      await deleteDoc(postRef);

     

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

import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import usePostDeletion from '../../hooks/usePostDeletion';

// IconButtonの拡張コンポーネント
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function TweetBox() {
  const [posts, setPosts] = useState<any[]>([]);
  const [user] = useAuthState(auth);

  // いいね色
  const handleFavo = async (postId: string) => {
    try {
      const postRef = doc(db, 'posts', postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postLikes = postSnapshot.data().likes;

        const newPostLikes = postLikes.includes(user?.uid)
          ? postLikes.filter((uid: string) => uid !== user?.uid)
          : [...postLikes, user?.uid];

        await updateDoc(postRef, {
          likes: newPostLikes,
        });
      }
    } catch (error) {
      console.error('Error updating post', error);
    }
  };

  //カスタムフック投稿削除
  const {
    selectedPost,
    openDialog,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = usePostDeletion();

  // リアルタイム更新
  useEffect(() => {
    const postsRef = collection(db, 'posts');
    const q = query(postsRef, orderBy('timestamp', 'desc'));

    onSnapshot(q, (querySnapshot) => {
      setPosts(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        })
      );
    });
  }, []);

  const formatText = (text: string) => {
    return text.split('\n').map((line, index) => (
      <Typography
        variant='subtitle1'
        color='.MuiTab-labelIcon'
        sx={{ px: 3 }}
        key={index}
      >
        {line}
        <br />
      </Typography>
    ));
  };

  return (
    <>
      {posts.map((post: any) => (
        <Box
          sx={{
            backgroundColor: '#f1f1f1',
            padding: '1rem',
            maxWidth: 733,
            minWidth: 733,
          }}
          key={post.id}
        >
          <Card>
            <CardHeader
              sx={{ marginBottom: -2 }}
              avatar={
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe'>
                  K
                </Avatar>
              }
              action={
                post.uid === user?.uid ? (
                  <IconButton
                    aria-label='settings'
                    onClick={() => handleDeleteClick(post)}
                  >
                    <DeleteIcon sx={{ color: red[500] }} />
                  </IconButton>
                ) : null
              }
              title={user?.displayName}
              subheader={post.timestamp?.toDate().toLocaleString()}
            />
            <CardContent>{formatText(post.detail)}</CardContent>
            {post.imageUrl && (
              <CardMedia
                sx={{
                  p: 1,
                  borderRadius: 3,
                  objectFit: 'contain',
                  maxWidth: 600,
                  maxHeight: 500, // 画像の最大高さを700に
                }}
                component='img'
                image={post.imageUrl}
                alt='Paella dish'
              />
            )}
            <CardActions disableSpacing>
              <IconButton aria-label='コメント' sx={{ mx: 2 }}>
                <ChatBubbleIcon />
              </IconButton>
              <IconButton
                aria-label='いいね'
                onClick={() => handleFavo(post.id)}
              >
                {post.likes.includes(user?.uid) ? (
                  <FavoriteIcon sx={{ color: red[500] }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
              <Typography sx={{ mx: 2 }}>{post.likes.length}</Typography>
            </CardActions>
          </Card>
        </Box>
      ))}

      <Dialog open={openDialog} onClose={handleDeleteCancel}>
        <DialogTitle>投稿の削除</DialogTitle>
        <DialogContent>
          <DialogContentText>本当にこの投稿を削除しますか？</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>キャンセル</Button>
          <Button onClick={handleDeleteConfirm} color='error'>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

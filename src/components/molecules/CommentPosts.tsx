import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../../firebase';
import { Post } from '@/types/type';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuidv4 } from 'uuid';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import usePostDeletion from '@/hooks/usePostDeletion';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Comment {
  detail: string;
  timestamp: any;
  id: string;
}

const CommentPosts = (props: Post) => {
  const [comment, setComment] = useState<string>('');
  const [repComment, setRepComment] = useState<Comment[]>([]);
  const MAX_CHARACTERS = 500; // 最大文字数の設定
  const [user]: any = useAuthState(auth);
  const photoURL = user?.photoURL || '';
  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

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
      console.error('投稿の更新エラー:', error);
    }
  };

  const handleDeleteCommentClick = async (props: Post) => {};

  const isCurrentUserPost = user?.uid === props.uid;

  const formatText = (text: string) => {
    if (text === null || text === undefined) {
      return ''; // もしくは適切なデフォルト値を返す
    }
    return text.split('\n').map((line, index) => (
      <Typography key={index} variant='subtitle1' color='textPrimary'>
        {line}
      </Typography>
    ));
  };

  const handleAddComment = async () => {
    try {
      const commentsCollection = collection(db, `posts/${props.id}/comments`);
      const newComment = {
        detail: comment,
        timestamp: serverTimestamp(),
        id: uuidv4(),
        likes: [],
      };
      await addDoc(commentsCollection, newComment);

      // コメント追加後にrepCommentを更新
      setRepComment((prevComments) => [newComment, ...prevComments]);

      setComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    const postsRef = collection(db, `posts/${props.id}/comments`);
    const q = query(postsRef, orderBy('timestamp', 'desc'))
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

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#f1f1f1',
          padding: '1rem',
          maxWidth: 733,
          minWidth: 733,
        }}
        key={props.id}
      >
        <Card>
          <CardHeader
            sx={{ marginBottom: -2 }}
            avatar={
              <Avatar
                sx={{ bgcolor: 'lightblue' }}
                aria-label='recipe'
                src={props.avatar}
              ></Avatar>
            }
            action={
              isCurrentUserPost ? (
                <IconButton
                  aria-label='settings'
                  onClick={() => handleDeleteCommentClick(props)}
                >
                  <DeleteIcon sx={{ color: red[500] }} />
                </IconButton>
              ) : null
            }
            title={props.userName}
            subheader={props.timestamp?.toDate().toLocaleString()}
          />
          <CardContent>{formatText(props.detail)}</CardContent>
          {props.imageUrl && (
            <CardMedia
              sx={{
                p: 1,
                borderRadius: 3,
                objectFit: 'contain',
                maxWidth: 500,
                maxHeight: 600,
                margin: 'auto',
              }}
              component='img'
              image={props.imageUrl}
              alt='Paella dish'
            />
          )}
          <CardActions disableSpacing>
            <IconButton aria-label='コメント'>
              <ChatBubbleIcon />
            </IconButton>
            <Typography>{repComment.length}</Typography>
            <IconButton
              aria-label='いいね'
              onClick={() => handleFavo(props.id)}
            >
              {props.likes.includes(user?.uid) ? (
                <FavoriteIcon sx={{ color: red[500] }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography>{props.likes.length}</Typography>
          </CardActions>
        </Card>
      </Box>

      <Box sx={{ backgroundColor: '#f1f1f1', padding: '1rem' }}>
        <Card sx={{ minWidth: 700, maxWidth: 700, width: '100%' }}>
          <CardHeader
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: -3, // アバターアイコンとの間隔
            }}
            title={
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: 'lightblue' }}
                    aria-label='recipe'
                    src={photoURL}
                  ></Avatar>
                }
                title={user?.displayName ? user?.displayName : 'No Name'}
              />
            }
          />
          <FormControl fullWidth>
            <Box sx={{ marginX: 2, my: 1 }}>
              <TextField
                value={comment}
                onChange={handleCommentChange}
                placeholder='コメントする'
                variant='outlined'
                fullWidth
                multiline
                InputProps={{
                  sx: { paddingTop: 0.5, paddingBottom: 0.5 }, // 上下の余白を調整
                  endAdornment: (
                    <IconButton aria-label='送信' onClick={handleAddComment}>
                      <SendIcon sx={{ color: 'skyblue' }} />
                    </IconButton>
                  ),
                }}
                inputProps={{ maxLength: MAX_CHARACTERS }} // 最大文字数
              />
            </Box>
          </FormControl>
        </Card>
        {repComment.map((comment) => (
          <div key={comment.id}>{comment.detail}</div>
        ))}
      </Box>
    </>
  );
};

export default CommentPosts;

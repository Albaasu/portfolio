import React, { forwardRef, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { useRecoilState } from 'recoil';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { likedState } from '@/Recoil/Atom';

const TweetArea = () => {
  const MAX_CHARACTERS = 500; // 最大文字数の設定
  const [detail, setDetail] = useState('');
  const [userName, setUserName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [liked, setLiked] = useRecoilState(likedState);
  const user = auth.currentUser;

  // firebaseにdetail追加
  const addPosts = async (e: any) => {
    e.preventDefault();
    if (detail.trim() === '') return;
    let processedDetail = detail.trim(); // 文字列の前後の空白を削除
    if (processedDetail.endsWith('\n')) {
      // 改行が文末にある場合、改行を削除
      while (processedDetail.endsWith('\n')) {
        processedDetail = processedDetail.slice(0, -1);
      }
    }
    try {
      await addDoc(collection(db, 'posts'), {
        detail: processedDetail,
        userName: userName,
        avatar: avatar,
        timestamp: serverTimestamp(),
        image: '',
        favoriteCount: 0,
        liked: liked,
        uid: user?.uid,
      });
      setDetail('');
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe'>
                  K
                </Avatar>
              }
              title='UserName'
            />
          }
        />
        <FormControl fullWidth>
          <Box sx={{ marginX: 2, my: 1 }}>
            <TextField
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder='お前今日なにしたんだよ'
              variant='outlined'
              fullWidth
              multiline
              InputProps={{
                sx: { paddingTop: 0.5, paddingBottom: 0.5 }, // 上下の余白を調整
                endAdornment: (
                  <IconButton aria-label='送信' onClick={addPosts}>
                    <SendIcon sx={{ color: 'skyblue' }} />
                  </IconButton>
                ),
              }}
              inputProps={{ maxLength: MAX_CHARACTERS }} // 最大文字数
            />

            <IconButton aria-label='画像' sx={{ mt: 1 }}>
              <PhotoSizeSelectActualIcon sx={{ color: 'skyblue' }} />
            </IconButton>
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
};

export default TweetArea;

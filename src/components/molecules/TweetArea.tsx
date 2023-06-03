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
  serverTimestamp,

} from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const TweetArea = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const MAX_CHARACTERS = 500; // 最大文字数の設定
  const [detail, setDetail] = useState('');
const [imageFile, setImageFile] = useState<File | null>(null);
  const user = auth.currentUser;

  const handleImageArea = (e: any) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      e.target.value = '';
    }
  };


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
      if(imageFile){
        const storageRef = ref(storage, `images/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(storageRef);
        setFileUrl(downloadURL);
      }

      await addDoc(collection(db, 'posts'), {
        detail: processedDetail,
        userName: user?.displayName,
        avatar: user?.photoURL,
        timestamp: serverTimestamp(),
        imageUrl: fileUrl,
        likes: [],
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
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe' src={user?.photoURL as string}>
                  K
                </Avatar>
              }
              title={user?.displayName}
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
            <label htmlFor='file'>
              <input
                type='file'
                name='file'
                id='file'
                style={{ display: 'none' }}
                onChange={handleImageArea}
              />
              <PhotoSizeSelectActualIcon sx={{ color: 'skyblue' }} />
            </label>
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
};

export default TweetArea;

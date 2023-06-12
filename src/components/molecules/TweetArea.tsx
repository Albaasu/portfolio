import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Box, FormControl, IconButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Image from 'next/image';
import CancelIcon from '@mui/icons-material/Cancel';

const TweetArea = () => {
  const [fileUrl, setFileUrl] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');
  const MAX_CHARACTERS = 500; // 最大文字数の設定
  const [detail, setDetail] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const user = auth.currentUser;
  const photoURL = user?.photoURL || '';
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ

  // 画像をキャンセル
  const handleCancelImage = () => {
    setPreviewImage('');
    setImageFile(null);
  };

  const handleImageArea = (e: any) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0])); // プレビュー用のURLを設定
    }
  };


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsers(user);
      setUserLoaded(true);
    });

    return () => unsubscribe();
  }, []);

 // firebaseにdetail追加
const addPosts = async (e: any) => {
  e.preventDefault();
  
  if (detail.trim() === '' && !imageFile) {
    // detailが空欄でかつ画像がない場合は投稿不可
    return;
  }
  
  let processedDetail = detail.trim();
  if (processedDetail.endsWith('\n')) {
    while (processedDetail.endsWith('\n')) {
      processedDetail = processedDetail.slice(0, -1);
    }
  }
  
  try {
    let downloadURL = '';

    if (imageFile) {
      const storageRef = ref(storage, `images/${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      downloadURL = await getDownloadURL(storageRef);
    }

    const docRef = await addDoc(collection(db, 'posts'), {
      detail: processedDetail || null,
      userName: user?.displayName,
      avatar: user?.photoURL,
      timestamp: serverTimestamp(),
      imageUrl: downloadURL,
      likes: [],
      uid: user?.uid,
    });

    setDetail('');
    setFileUrl('');
    setImageFile(null);
    setPreviewImage('');

    console.log('Created document with ID: ', docRef.id);
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
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder='今日の積み上げ'
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
              <PhotoSizeSelectActualIcon
                sx={{
                  color: 'skyblue',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: '0.3s',
                  },
                  mt: 2,
                  ml: 2,
                  mb: 1,
                }}
              />
            </label>
            {previewImage && (
              <Box sx={{ margin: '0.5rem 0', textAlign: 'center' }}>
                <IconButton aria-label='キャンセル' onClick={handleCancelImage}>
                  <CancelIcon sx={{ color: 'red' }} />
                </IconButton>
                <Image src={previewImage} alt='Preview' width={300} height={300} />
              </Box>
            )}
          </Box>
        </FormControl>
      </Card>
    </Box>
  );
};

export default TweetArea;

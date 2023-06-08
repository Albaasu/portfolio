import React, { useEffect, useState } from 'react';
import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import { TextField, Avatar, Box, Alert } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { auth, storage } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import MediButton from '@/components/atoms/MediButton';
import MediTextArea from '@/components/atoms/MediTextArea';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Settings = () => {
  const user: any = auth.currentUser;
  const [userName, setUserName] = useState(user?.displayName || '');
  const photoURL = user?.photoURL || '';
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ
  const [completed, setCompleted] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [userNoname, setUserNoname] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsers(user);
      setUserLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  // プロフィール画像の選択
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setSelectedImage(selectedFile);
      setPreviewImage(URL.createObjectURL(selectedFile));
    }
  };

  // ユーザー更新
  const handleUpdateProfile = () => {
    if (userName.trim() !== '') {
      updateProfile(user, { displayName: userName })
        .then(() => {
          setUserName('');
          if (selectedImage) {
            setCompleted('ユーザー名を更新しました\n画像を更新しました');
          } else {
            setCompleted('ユーザー名を更新しました');
          }
        })
        .catch((error) => {
          setUserName('');
          setErrorName('ユーザー名を更新できませんでした');
        });
    }

    if (selectedImage) {
      // 画像をアップロード
      const storageRef = ref(storage, `userImage/${selectedImage.name}`);
      uploadBytes(storageRef, selectedImage)
        .then(() => {
          return getDownloadURL(storageRef);
        })
        .then((downloadURL) => {
          // photoURLを更新
          updateProfile(user, { photoURL: downloadURL });
          if (userName.trim() !== '') {
            setCompleted('ユーザー名を更新しました\n画像を更新しました');
          } else {
            setCompleted('画像を更新しました');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <>
      <TopHeader />
      <Box
        sx={{
          marginTop: '64px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <label htmlFor='file'>
            <input
              type='file'
              name='file'
              id='file'
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
            <Avatar
              src={previewImage || photoURL}
              sx={{
                width: '100px',
                height: '100px',
                '&:hover': {
                  transform: 'scale(1.1)',
                  transition: '0.3s',
                },
                mt: 2,
                ml: 2,
                mb: 1,
              }}
            >
              <AddPhotoAlternateIcon />
            </Avatar>
          </label>

          <div>
            <MediTextArea
              type='text'
              sx={{ width: '300px', my: 2 }}
              label={user?.displayName || 'No Name'}
              onChange={(e) => setUserName(e.target.value)}
            ></MediTextArea>
          </div>
          {completed && (
            <Box sx={{ display: 'flex', flexDirection: 'column', my: 2 }}>
              {completed.split('\n').map((message, index) => (
                <Alert key={index} severity='success' sx={{ my: 1 }}>
                  {message}
                </Alert>
              ))}
            </Box>
          )}
          {errorName && <Alert severity='error'>{errorName}</Alert>}
          <div>
            <MediButton onClick={handleUpdateProfile}>更新</MediButton>
          </div>
        </Box>
      </Box>
      <Bottombar />
    </>
  );
};

export default Settings;

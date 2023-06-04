import React, { useEffect, useState } from 'react';
import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import { Button, TextField, Avatar, Box } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { auth, db } from '../../firebase';
import { updateProfile } from 'firebase/auth';

const Settings = () => {
  const user:any = auth.currentUser;
  const [userName, setUserName] = useState(user?.displayName || '');
  const photoURL = user?.photoURL || '';
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUsers(user);
      setUserLoaded(true);
    });

    return () => unsubscribe();
  }, []);

  console.log(user);

  const handleUpdateProfile = () => {
    if (userName.trim() !== '') {
      updateProfile(user, { displayName: userName })
        .then(() => {
          console.log('ユーザー名が更新されました');
        })
        .catch((error) => {
          console.log('ユーザー名の更新に失敗しました', error);
        });
    } else {
      console.log('ユーザー名を入力してください');
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
            />
            <Avatar
              src={photoURL}
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
            <TextField
              sx={{ width: '800px', my: 2 }}
              label='ユーザー名'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <Button variant='outlined' size='medium' onClick={handleUpdateProfile}>
              更新
            </Button>
          </div>
        </Box>
      </Box>
      <Bottombar />
    </>
  );
};

export default Settings;

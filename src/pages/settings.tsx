import React, { useEffect, useState } from 'react';
import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '@/components/organisms/TopHeader';
import { TextField, Avatar, Box, Alert } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';
import MediButton from '@/components/atoms/MediButton';
import MediTextArea from '@/components/atoms/MediTextArea';


const Settings = () => {
  const user: any = auth.currentUser;
  const [userName, setUserName] = useState(user?.displayName || '');
  const photoURL = user?.photoURL || '';
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ
  const [completed, setCompleted] = useState<string | null>(null);
  const [errorName, setErrorName] = useState<string | null>(null);
  const [userNoname, setUserNoname] = useState<string | null>(null);

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
          setUserName('');
          setCompleted('ユーザー名を更新しました');
        })
        .catch((error) => {
          setUserName('');
          setErrorName('ユーザー名を更新できませんでした');
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
            <MediTextArea
            type='text'
              sx={{ width: '300px', my: 2 }}
              label={user?.displayName || 'No Name'}
              
              onChange={(e) => setUserName(e.target.value)}
            ></MediTextArea>
          </div>
          {completed && <Alert severity='success'>{completed}</Alert>}
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

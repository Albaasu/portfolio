import React from 'react';
import Avatar from '@mui/material/Avatar';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { registerEmailState } from '../Recoil/Atom';
import { registerPasswordState } from '../Recoil/Atom';
import { User, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useState } from 'react';
import MediButton from '@/components/atoms/MediButton';
import MediTextArea from '@/components/atoms/MediTextArea';



export default function Signin() {
  const router = useRouter();

  const [registerEmail, setRegisterEmail] =
    useRecoilState<string>(registerEmailState);

  const [registerPassword, setRegisterPassword] = useRecoilState<string>(
    registerPasswordState
  );

  const [error, setError] = useState('');

  //新規登録
  const addUser = async (e: any) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      setRegisterEmail('');
      setRegisterPassword('');
      const user:any = auth.currentUser;
      updateProfile(user,{displayName:"No Name"})
      router.push('/');
    } catch (error) {
      setError('正しく入力してください');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'skyblue' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          新規登録
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <MediTextArea
            type='email'
            onChange={(e) => setRegisterEmail(e.target.value)}
          ></MediTextArea>

          <MediTextArea
            type='password'
            onChange={(e) => setRegisterPassword(e.target.value)}
          />

          {error && (
            <Typography color='error' variant='body2' align='center'>
              {error}
            </Typography>
          )}

          <MediButton onClick={addUser} sx={{ mt: 2, mb: 2 }}>
            新規登録
          </MediButton>

          <Grid container>
            <Grid item xs>
              <Link href='forget' variant='body1'>
                パスワードを忘れた
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signin' variant='body1'>
                ログイン
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

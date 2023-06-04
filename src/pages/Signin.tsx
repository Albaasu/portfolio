import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { loginEmailState, loginPasswordState } from '../Recoil/Atom';
import MediButton from '@/components/atoms/MediButton';
import MediTextAreaEmail from '@/components/atoms/MediTetxAreaEmail';
import MediTextAreaPass from '@/components/atoms/MediTextAreaPass';

export default function Signin() {
  const [error, setError] = useState('');

  //ログイン
  const router = useRouter();

  const [loginEmail, setLoginEmail] = useRecoilState<string>(loginEmailState);
  const [loginPassword, setLoginPassword] =
    useRecoilState<string>(loginPasswordState);

  const handleLoginClick = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setLoginEmail('');
      setLoginPassword('');
      router.push('/main');
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
          ログイン
        </Typography>
        <Box component='form' noValidate sx={{ mt: 1 }}>
          <MediTextAreaEmail
            onChange={(e: any) => setLoginEmail(e.target.value)}
          ></MediTextAreaEmail>

          <MediTextAreaPass
            onChange={(e: any) => setLoginPassword(e.target.value)}
          />

          {error && (
            <Typography color='error' variant='body2' align='center'>
              {error}
            </Typography>
          )}

          <MediButton onClick={handleLoginClick} sx={{ mt: 2, mb: 2 }}>
            ログイン
          </MediButton>
          <Grid container>
            <Grid item xs>
              <Link href='forget' variant='body1'>
                パスワードを忘れた
              </Link>
            </Grid>
            <Grid item>
              <Link href='register' variant='body1'>
                新規登録
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { registerEmailState } from './Recoil/Atom';
import { registerPasswordState } from './Recoil/Atom';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useEffect } from 'react';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0', // 背景色
    },
  },
});

export default function Signin() {
  const router = useRouter();

  const [registerEmail, setRegisterEmail] =
    useRecoilState<string>(registerEmailState);

  const [registerPassword, setRegisterPassword] = useRecoilState<string>(
    registerPasswordState
  );

  const [user, setUser] = useState<any>(null);

  const [error, setError] = React.useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, []);

  //新規登録
  const addUser = async (e: any) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      onAuthStateChanged(auth, (currentUser: any) => {
        setUser(currentUser);
      });
      router.push('/');
    } catch (error) {
      setError('正しく入力してください');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
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
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='メールアドレス'
              name='email'
              autoComplete='email'
              autoFocus
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='パスワード'
              type='password'
              id='password'
              autoComplete='current-password'
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />

            {error && (
              <Typography color='error' variant='body2' align='center'>
                {error}
              </Typography>
            )}

            <Button
              type='submit'
              fullWidth
              variant='outlined'
              sx={{ mt: 2, mb: 2 }}
              onClick={addUser}
            >
              新規登録
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href='Forget' variant='body1'>
                  パスワードを忘れた
                </Link>
              </Grid>
              <Grid item>
                <Link href='/Signin' variant='body1'>
                  ログイン
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

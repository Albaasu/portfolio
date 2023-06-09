import React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';
import MediButton from '@/components/atoms/MediButton';
import MediTextArea from '@/components/atoms/MediTextArea';

const theme = createTheme({
  palette: {
    background: {
      default: '#f0f0f0', // 背景色
    },
  },
});

export default function Forget() {
  //パスワード再設定
  const router = useRouter();
  const [email, setEmail] = useState('');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordReset = async (e: any) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSuccess(true);
      setError(null);
      setEmail('');
    } catch (error: any) {
      setError(error.message);
      setSuccess(false);
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
            パスワード再設定
          </Typography>
          <Box component='form' noValidate sx={{ mt: 1 }}>
            <MediTextArea
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            ></MediTextArea>
            {error && (
              <Alert severity='error'>
                メールアドレスに送信できませんでした
              </Alert>
            )}
            {success && (
              <Alert severity='success'>メールアドレスに送信しました</Alert>
            )}
            <MediButton onClick={handlePasswordReset} sx={{ mt: 1, mb: 2 }}>
              パスワード再設定
            </MediButton>

            <Grid container>
              <Grid item xs>
                <Link href='/register' variant='body1'>
                  新規登録
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
    </ThemeProvider>
  );
}

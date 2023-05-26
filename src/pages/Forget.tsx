import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
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
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handlePasswordReset(e);
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
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='メールアドレス'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error && (
              <Alert severity='error'>
                メールアドレスに送信できませんでした
              </Alert>
            )}
            {success && (
              <Alert severity='success'>メールアドレスに送信しました</Alert>
            )}

            <Button
              type='submit'
              fullWidth
              variant='outlined'
              sx={{ mt: 2, mb: 2 }}
              onClick={handleSubmit}
            >
              パスワード再設定
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href='/Register' variant='body1'>
                  新規登録
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

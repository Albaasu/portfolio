import '@/styles/globals.css';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    palette: {
      background: {
        default: '#f0f0f0', // 背景色
      },
    },
  });
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}

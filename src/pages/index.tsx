import { Inter } from 'next/font/google';
import SignIn from './Signin';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <SignIn />
    </>
  );
}

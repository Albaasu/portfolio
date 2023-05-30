
import { Inter } from 'next/font/google';
import Bottombar from '../components/Bottombar';
import TopHeader from '../components/TopHeader';

const inter = Inter({ subsets: ['latin'] });

export default function Mypage() {
  return (
    <>
      <TopHeader />
      <div style={{ marginTop: '64px' }}>マイページ</div>
      <Bottombar />
    </>
  );
}

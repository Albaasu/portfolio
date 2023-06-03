import { Inter } from 'next/font/google';
import Bottombar from '../components/organisms/Bottombar';
import TopHeader from '../components/organisms/TopHeader';

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

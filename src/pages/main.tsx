import Image from 'next/image';
import { Inter } from 'next/font/google';
import Bottombar from './components/Bottombar';
import TopHeader from './components/TopHeader';
import Timeline from './components/Timeline';
import { Container } from 'postcss';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <TopHeader />
      <div style={{ marginTop: '64px' }}>
        <Timeline />
      </div>
      <Bottombar />
    </>
  );
}

import { Inter } from 'next/font/google';
import Bottombar from '../components/Bottombar';
import TopHeader from '../components/TopHeader';
import Timeline from '../components/Timeline';

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

import Bottombar from '../components/organisms/Bottombar';
import TopHeader from '../components/organisms/TopHeader';
import Timeline from '../components/molecules/Timeline';
import { useRouter } from 'next/router';

export default function Main() {
  const router = useRouter();

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

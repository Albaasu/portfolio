import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Bottombar from '../components/Bottombar';
import TopHeader from '../components/TopHeader';
import Timeline from '../components/Timeline';
import { auth } from '../../firebase';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Main() {
  const router = useRouter();

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      !user && router.push('/Signin');
    });
    return () => unSub();
  }, [router]);

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

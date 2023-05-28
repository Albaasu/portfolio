import { useEffect, useState } from 'react';
import { Inter } from 'next/font/google';
import Bottombar from '../components/Bottombar';
import TopHeader from '../components/TopHeader';
import Timeline from '../components/Timeline';
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

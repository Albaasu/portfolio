import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '../components/organisms/TopHeader';
import { auth } from '../../firebase';
import { Box, CircularProgress, Container, Stack } from '@mui/material';
import FavoritePosts from '@/components/molecules/FavoritePosts';
import { useEffect, useState } from 'react';

export default function Favorite() {
  const user = auth.currentUser;
  const [users, setUsers] = useState<any>(null);
  const [userLoaded, setUserLoaded] = useState(false); // ユーザーが読み込まれたかどうかのフラグ
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoading(true);
      setUsers(user);
      setUserLoaded(true);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
        <Box sx={{ pt: '4rem' }}>
          <TopHeader />
      {isLoading ? (
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <CircularProgress />
        </div>
      ) : (
          <Box sx={{ pt: 1 }}>
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Stack spacing={2}>
                <FavoritePosts />
              </Stack>
            </Container>
          </Box>
      )}
      <Bottombar />
    </Box>
    </>
  );
}

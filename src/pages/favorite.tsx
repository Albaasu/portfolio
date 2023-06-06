import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '../components/organisms/TopHeader';
import { auth } from '../../firebase';
import { Box, Container, Stack } from '@mui/material';
import FavoritePosts from '@/components/molecules/FavoritePosts';


export default function Favorite() {
  const user = auth.currentUser;

  return (
    <>
    <Box sx={{pt:"4rem"}}>
      <TopHeader />
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
      <Bottombar />
    </Box>
          </>
  );
}

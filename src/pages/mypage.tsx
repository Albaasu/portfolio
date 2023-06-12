import Bottombar from '@/components/organisms/Bottombar';
import TopHeader from '../components/organisms/TopHeader';
import { auth } from '../../firebase';
import { Box, Container, Stack } from '@mui/material';
import MypagePosts from '@/components/molecules/MypagePosts';


export default function Mypage() {
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
            <MypagePosts />
          </Stack>
        </Container>
      </Box>
      <Bottombar />
    </Box>
          </>
  );
}

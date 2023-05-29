import { Box, Container, Stack } from '@mui/material';
import React from 'react';
import TweetBox from './TweetBox';
import TweetAera from './TweetArea';

const Timeline = () => {
  return (
    <>
      <Box sx={{ pt: 1 }}>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            
          }}
        >
          <Stack spacing={2} >
           <TweetAera/>
            <TweetBox />
       
          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Timeline;
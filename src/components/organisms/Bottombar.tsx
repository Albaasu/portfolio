import Box from '@mui/material/Box';
import React, { useState } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { useRouter } from 'next/router';

export default function Bottombar() {
  const [value, setValue] = useState<any>(null);
  const ref = React.useRef<HTMLDivElement>(null);
  const path = useRouter().pathname;
  React.useEffect(() => {
    if (path === '/main') {
      setValue(0);
    } else if (path === '/favorite') {
      setValue(1);
    } else if (path === '/mypage') {
      setValue(2);
    }
  }, [path]);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={4}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label='ホーム'
            icon={<HomeIcon />}
            href='/main'
          />

          <BottomNavigationAction
            label='いいね'
            icon={<FavoriteIcon />}
            href='/favorite'
          />
          <BottomNavigationAction
            label='マイページ'
            icon={<PersonIcon />}
            href='/mypage'
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

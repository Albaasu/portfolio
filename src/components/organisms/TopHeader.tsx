import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import { auth } from '../../../firebase';
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'firebase/auth';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function TopHeader() {
  const router = useRouter();
  const user = auth.currentUser;
  const [loginState, setLoginState] = useState<any>(null);
  const photoURL = user?.photoURL || '';
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // ログイン監視
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      !user && router.push('/');
    });
    return () => unSub();
  }, [router]);

  //ログアウト

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      alert(error);
    }
  };

  const handleSettings = () => {
    router.push('/settings');
  };
  
  return (
    <AppBar position='fixed' sx={{ backgroundColor: '#6699cc' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            つみあげったー
          </Typography>

          <Typography
            variant='h5'
            noWrap
            component='a'
            href=''
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            つみあげったー
          </Typography>

          <Box
            sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}
          >
            <Tooltip title='プロフィール'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: 'lightblue' }} aria-label='recipe' src={photoURL }>
                  
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box>
                <MenuItem onClick={handleSettings}>
                  <SettingsIcon sx={{ mr: 2 }} /> 設定
                </MenuItem>
                <MenuItem >
                  <PersonRemoveIcon sx={{ mr: 2 }} />
                  アカウント削除
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 2 }} />
                  ログアウト
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopHeader;

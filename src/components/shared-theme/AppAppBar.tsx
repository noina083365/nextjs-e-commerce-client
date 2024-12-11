import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import { createLogout } from '@/redux/reducers/authSlice';
import { store } from '@/redux/store';
import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ColorModeIconDropdown from '@/components/shared-theme/ColorModeIconDropdown';
import { StyledToolbar } from '@/types/common';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Link from 'next/link';

export default function AppAppBar({ user }: any) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  if (typeof window !== 'undefined' && user?.id) {
    localStorage.setItem('customerId', user?.id);
  }
  // TODO: redux get total product in cart to show badge

  const handleLogout = async () => {
    await store.dispatch(createLogout());
    router.push('/');
  };

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters theme={undefined} vars={undefined}>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }} gap={2}>
            <Link href={`/`} className='menu-link'><HomeRoundedIcon /></Link>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Link href={`/cart`} className='menu-link'><ShoppingCartRoundedIcon />Cart</Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {
              user?.id ?
                (
                  <Button
                    color="primary"
                    variant="outlined"
                    size="small"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Button>
                )
                :
                (
                  <>
                    <Button color="primary" variant="outlined" size="small">
                      <Link href={`/sign-in`} className='menu-link'>Sign in</Link>
                    </Button>
                    <Button color="primary" variant="outlined" size="small">
                      <Link href={`/sign-up`} className='menu-link'>Sign up</Link>
                    </Button>
                  </>
                )
            }
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: 'var(--template-frame-height, 0px)',
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                <MenuItem>Features</MenuItem>
                <MenuItem>Testimonials</MenuItem>
                <MenuItem>Highlights</MenuItem>
                <MenuItem>Pricing</MenuItem>
                <MenuItem>FAQ</MenuItem>
                <MenuItem>Blog</MenuItem>
                <Divider sx={{ my: 3 }} />
                {
                  user?.id ?
                    (
                      <MenuItem>
                        <Link href={`/logout`}>Logout</Link>
                      </MenuItem>
                    )
                    :
                    (
                      <>
                        <MenuItem>
                          <Link href={`/sign-up`}>Sign up</Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href={`/sign-in`}>Sign in</Link>
                        </MenuItem>
                      </>
                    )
                }
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}

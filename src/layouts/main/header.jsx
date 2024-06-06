import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import { Badge, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuth } from 'src/hooks/use-auth';
import { useOffSetTop } from 'src/hooks/use-off-set-top';
import { useResponsive } from 'src/hooks/use-responsive';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { NavBasicDesktop } from 'src/components/nav-basic';

import NavMobile from './nav/mobile';
import { HEADER } from '../config-layout';
import HeaderShadow from '../common/header-shadow';
import SettingsButton from '../common/settings-button';

// ----------------------------------------------------------------------

export default function Header({ headerOnDark }) {
  const theme = useTheme();

  const offset = useOffSetTop();

  const mdUp = useResponsive('up', 'md');

  // Auth check
  const { user, loading } = useAuth();

  const navData = user ? (
    [
      {
        title: 'Home',
        icon: <Iconify icon="solar:home-2-bold-duotone" />,
        path: '/',
      },
      { title: 'Account', path: paths.eCommerce.account.personal }, // Remplacer 'Logout' par votre chemin de déconnexion
      {
        title: 'Docs',
        icon: <Iconify icon="solar:notebook-bold-duotone" />,
        path: paths.docs,
      },
    ]
  ) : (
    [
      {
        title: 'Home',
        icon: <Iconify icon="solar:home-2-bold-duotone" />,
        path: '/',
      },
      { title: 'Login', path: paths.loginBackground },
      { title: 'Register', path: paths.registerBackground },
      {
        title: 'Docs',
        icon: <Iconify icon="solar:notebook-bold-duotone" />,
        path: paths.docs,
      },
    ]
  );

  return (
    <AppBar>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(headerOnDark && {
            color: 'common.white',
          }),
          ...(offset && {
            ...bgBlur({ color: theme.palette.background.default }),
            color: 'text.primary',
            height: {
              md: HEADER.H_DESKTOP - 16,
            },
          }),
        }}
      >
        <Container
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo />

            <Link href="https://zone-docs.vercel.app/changelog" target="_blank" rel="noopener">
              <Label
                color="info"
                sx={{
                  ml: 0.5,
                  px: 0.5,
                  top: -14,
                  left: 60,
                  height: 20,
                  fontSize: 11,
                  cursor: 'pointer',
                  position: 'absolute',
                }}
              >
                v1.0.0
              </Label>
            </Link>
          </Box>

          {mdUp && (
            <Stack
              flexGrow={1}
              alignItems="center"
              sx={{
                display: { xs: 'none', md: 'flex' },
              }}
            >
              {!loading && (
                <NavBasicDesktop
                  slotProps={{
                    rootItem: {
                      '& .icon': { display: 'none' },
                    },
                  }}
                  data={navData}
                />
              )}
            </Stack>
          )}

          <Box sx={{ flexGrow: { xs: 1, md: 'unset' } }} />

          <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
            <Stack spacing={1} direction="row" alignItems="center">
              <Badge badgeContent={4} color="error">
                <IconButton
                  component={RouterLink}
                  href={paths.eCommerce.cart}
                  size="small"
                  color="inherit"
                  sx={{ p: 0 }}
                >
                  <Iconify icon="carbon:shopping-cart" width={24} />
                </IconButton>
              </Badge>

              <IconButton
                component={RouterLink}
                href={user ? paths.eCommerce.account.personal : paths.loginBackground}
                size="small"
                color="inherit"
                sx={{ p: 0 }}
              >
                <Iconify icon="carbon:user" width={24} />
              </IconButton>

              <SettingsButton />
            </Stack>

            {/* <Button
              variant="contained"
              color="inherit"
              href={paths.zoneStore}
              target="_blank"
              rel="noopener"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
              }}
            >
              Buy Now
            </Button> */}
          </Stack>

          {!mdUp && !loading && (
            <NavMobile
              data={navData}
            />
          )}
        </Container>
      </Toolbar>

      {offset && <HeaderShadow />}
    </AppBar>
  );
}


Header.propTypes = {
  headerOnDark: PropTypes.bool,
};

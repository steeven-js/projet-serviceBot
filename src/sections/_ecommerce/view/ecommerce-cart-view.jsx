import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

import EcommerceCartList from '../cart/ecommerce-cart-list';
import EcommerceCartSummary from '../cart/ecommerce-cart-summary';

// ----------------------------------------------------------------------

export default function EcommerceCartView({ cartServices, totalPrice }) {
  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={{ xs: 5, md: 8 }}>
        <Grid xs={12} md={8}>
          <EcommerceCartList cartServices={cartServices} />
        </Grid>

        <Grid xs={12} md={4}>
          <EcommerceCartSummary
            total={totalPrice}
            subtotal={totalPrice}
          />
        </Grid>
      </Grid>

      <Button
        component={RouterLink}
        href={paths.eCommerce.products}
        color="inherit"
        startIcon={<Iconify icon="carbon:chevron-left" />}
        sx={{ mt: 3 }}
      >
        Continue Shopping
      </Button>
    </Container>
  );
}

// Prop types
EcommerceCartView.propTypes = {
  cartServices: PropTypes.array,
  totalPrice: PropTypes.number,
};

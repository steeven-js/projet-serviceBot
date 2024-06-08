import useSWR from 'swr';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuth } from 'src/hooks/use-auth';

import { fetcher, endpoints } from 'src/utils/axios';

import { _services } from 'src/_mock';

import FormProvider from 'src/components/hook-form';

import EcommerceCheckoutOrderSummary from '../checkout/ecommerce-checkout-order-summary';
import EcommerceCheckoutPaymentMethod from '../checkout/ecommerce-checkout-payment-method';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    label: 'Stripe',
    value: 'stripe',
    description: 'Paiement sécurisé avec Stripe',
  },
];

// ----------------------------------------------------------------------

export default function EcommerceCheckoutView() {

  const router = useRouter();

  // carts
  const { data } = useSWR(endpoints.cart.list, fetcher);

  // Filtrer les services correspondant aux product_id dans le panier
  const _cartServices = data ? data.map(cartItem => {
    const service = _services.find(_service => _service.id === cartItem.product_id);
    return { ...cartItem, service };
  }) : [];

  // Calculer le total des prix
  const totalPrice = _cartServices.reduce((acc, item) => acc + parseFloat(item.price), 0);

  // console.log('data:', data);
  // console.log('cartServices:', _cartServices);
  // console.log('totalPrice:', totalPrice);

  const { user } = useAuth();

  const handleCheckout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/order/pay',
        { _cartServices, success_url: `http://localhost:3001` });
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    }
  };


  const defaultValues = {
    firstName: 'Jayvion',
    lastName: 'Simon',
    emailAddress: 'nannie_abernathy70@yahoo.com',
    phoneNumber: '365-374-4961',
    password: '',
    confirmPassword: '',
    streetAddress: '',
    city: '',
    country: 'United States',
    zipCode: '',
    shipping: 'free',
    paymentMethods: 'stripe',
    newCard: {
      cardNumber: '',
      cardHolder: '',
      expirationDate: '',
      ccv: '',
    },
  };

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (_data) => {
    try {
      if (!user) {
        router.push(paths.loginBackground);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 500));
        reset();
        // router.push(paths.eCommerce.orderCompleted);
        window.location.href = paths.stripe.standards;
        console.log('DATA', _data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Container
      sx={{
        overflow: 'hidden',
        pt: 5,
        pb: { xs: 5, md: 10 },
      }}
    >
      <Typography variant="h3" sx={{ mb: 5 }}>
        Checkout
      </Typography>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={8}>
            <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>

              <div>
                <StepLabel title="Méthode de paiement" step="1" />

                <EcommerceCheckoutPaymentMethod options={PAYMENT_OPTIONS} />

                <Divider sx={{ my: 3 }} />

              </div>
            </Stack>
          </Grid>

          <Grid xs={12} md={4}>
            <EcommerceCheckoutOrderSummary
              total={totalPrice}
              subtotal={totalPrice}
              services={_cartServices}
              loading={isSubmitting}
            />
          </Grid>
        </Grid>
      </FormProvider>

      <Button
        onClick={handleCheckout}
        variant="contained"
        color="primary"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        Pay
      </Button>
    </Container>
  );
}

// ----------------------------------------------------------------------

function StepLabel({ step, title }) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mb: 3, typography: 'h6' }}>
      <Box
        sx={{
          mr: 1.5,
          width: 28,
          height: 28,
          flexShrink: 0,
          display: 'flex',
          typography: 'h6',
          borderRadius: '50%',
          alignItems: 'center',
          bgcolor: 'primary.main',
          justifyContent: 'center',
          color: 'primary.contrastText',
        }}
      >
        {step}
      </Box>
      {title}
    </Stack>
  );
}

StepLabel.propTypes = {
  step: PropTypes.string,
  title: PropTypes.string,
};

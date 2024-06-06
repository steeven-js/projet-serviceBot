/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { useBoolean } from 'src/hooks/use-boolean';

import { _products } from 'src/_mock';

import { SplashScreen } from 'src/components/loading-screen';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ReviewEcommerce from '../../review/ecommerce/review-ecommerce';
import EcommerceProductDetailsInfo from '../product/details/ecommerce-product-details-info';
import EcommerceProductDetailsCarousel from '../product/details/ecommerce-product-details-carousel';
import EcommerceProductDetailsDescription from '../product/details/ecommerce-product-details-description';

// ----------------------------------------------------------------------

const _mockProduct = _products[0];

export default function EcommerceServiceView({ _mockService }) {
  const loading = useBoolean(true);

  // console.log('specifications', _mockService.specifications);

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  if (loading.value) {
    return <SplashScreen />;
  }

  return (
    <>
      <Container sx={{ overflow: 'hidden' }}>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Accueil',
            },
            {
              name: 'Mobile Phones',
            },
            {
              name: _mockService.name,
            },
          ]}
          sx={{ my: 5 }}
        />

        <Grid container spacing={{ xs: 5, md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsCarousel images={_mockProduct.images} />
          </Grid>

          <Grid xs={12} md={6} lg={5}>
            <EcommerceProductDetailsInfo
              id={_mockService.id}
              name={_mockService.name}
              price={_mockService.price}
              caption={_mockService.caption}
              priceSale={_mockService.priceSale}
              ratingNumber={_mockService.ratingNumber}
              totalReviews={_mockService.totalReviews}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={{ md: 8 }}>
          <Grid xs={12} md={6} lg={7}>
            <EcommerceProductDetailsDescription
              description={_mockService.description}
              specifications={_mockService.specifications ? _mockService.specifications : []}
            />
          </Grid>
        </Grid>
      </Container>

      <ReviewEcommerce />
    </>
  );
}

// PropTypes
EcommerceServiceView.propTypes = {
  _mockService: PropTypes.object,
};

/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable object-shorthand */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { auth } from "../../../../../firebase";
import ProductPrice from '../../common/product-price';
import ProductColorPicker from '../../common/product-color-picker';
import ProductOptionPicker from '../../common/product-option-picker';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  { label: '#FA541C', value: 'red' },
  { label: '#754FFE', value: 'violet' },
  { label: '#00B8D9', value: 'cyan' },
  { label: '#36B37E', value: 'green' },
];

const MEMORY_OPTIONS = [
  { label: '128GB', value: '128gb' },
  { label: '256GB', value: '256gb' },
  { label: '512GB', value: '512gb' },
  { label: '1TB', value: '1tb' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductDetailsInfo({
  id,
  name,
  price,
  ratingNumber,
  totalReviews,
  priceSale,
  caption,
}) {
  const mdUp = useResponsive('up', 'md');

  const [color, setColor] = useState('red');

  const [memory, setMemory] = useState('128gb');

  const apiUrl = import.meta.env.VITE_HOST_API;

  const router = useRouter()

  const handleChangeColor = useCallback((event) => {
    setColor(event.target.value);
  }, []);

  const handleChangeMemory = useCallback((event) => {
    setMemory(event.target.value);
  }, []);

  const addToCart = async () => {
    console.log('add to cart');

    if (auth.currentUser) {
      await axios.post(`${apiUrl}/carts`, {
        uid: auth.currentUser.uid,
        product_id: id,
        quantity: 1, // Corrected spelling from quanity to quantity
        price: price,
        status: 'new',
      });
      router.push(paths.eCommerce.cart); // Navigate to the cart page after adding to cart
    }
  };

  return (
    <>
      <Label color="success" sx={{ mb: 3 }}>
        In Stock
      </Label>

      <Stack spacing={1} sx={{ mb: 2 }}>
        <Typography variant="h4"> {name} </Typography>

        <Stack spacing={0.5} direction="row" alignItems="center">
          <Rating size="small" value={ratingNumber} readOnly precision={0.5} />

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            ({totalReviews} reviews)
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <ProductPrice price={price} priceSale={priceSale} sx={{ typography: 'h5' }} />

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {caption}
        </Typography>
      </Stack>

      <Stack spacing={3} sx={{ my: 5 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Color</Typography>
          <ProductColorPicker value={color} onChange={handleChangeColor} options={COLOR_OPTIONS} />
        </Stack>

        <Stack spacing={2}>
          <Typography variant="subtitle2">Memory</Typography>
          <ProductOptionPicker
            value={memory}
            onChange={handleChangeMemory}
            options={MEMORY_OPTIONS}
          />
        </Stack>
      </Stack>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} alignItems={{ md: 'center' }}>
        <TextField
          select
          hiddenLabel
          SelectProps={{
            native: true,
          }}
          sx={{
            minWidth: 100,
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>

        <Stack direction="row" spacing={2}>
          <Button
            component={RouterLink}
            href={paths.eCommerce.cart}
            fullWidth={!mdUp}
            size="large"
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="carbon:shopping-cart-plus" />}
          >
            Add to Cart
          </Button>

          <Button
            onClick={addToCart}
            fullWidth={!mdUp}
            size="large"
            color="primary"
            variant="contained"
          >
            Buy Now
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={3} direction="row" justifyContent={{ xs: 'center', md: 'unset' }}>
        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:add-alt" sx={{ mr: 1 }} /> Compare
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:favorite" sx={{ mr: 1 }} /> Compare
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'subtitle2' }}>
          <Iconify icon="carbon:share" sx={{ mr: 1 }} /> Compare
        </Stack>
      </Stack>
    </>
  );
}

EcommerceProductDetailsInfo.propTypes = {
  id: PropTypes.number,
  caption: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  ratingNumber: PropTypes.number,
  totalReviews: PropTypes.number,
};

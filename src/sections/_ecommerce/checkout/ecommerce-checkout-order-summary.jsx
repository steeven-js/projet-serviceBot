import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';

import { fCurrency } from 'src/utils/format-number';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';

// ----------------------------------------------------------------------

export default function EcommerceCheckoutOrderSummary({
  total,
  subtotal,
  loading,
  services,
}) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: 5,
        borderRadius: 2,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
      }}
    >
      <Typography variant="h6"> Order Summary </Typography>

      {!!services?.length && (
        <>
          {services.map((service) => (
            <ProductItem key={service.id} service={service} />
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />
        </>
      )}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack spacing={2}>
        <Row label="Subtotal" value={fCurrency(subtotal)} />
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Row
        label="Total"
        value={fCurrency(total)}
        sx={{
          typography: 'h6',
          '& span': { typography: 'h6' },
        }}
      />

      <LoadingButton
        size="large"
        variant="contained"
        color="inherit"
        type="submit"
        loading={loading}
      >
        Order Now
      </LoadingButton>
    </Stack>
  );
}

EcommerceCheckoutOrderSummary.propTypes = {
  services: PropTypes.array,
  total: PropTypes.number,
  subtotal: PropTypes.number,
  loading: PropTypes.bool,
};

// ----------------------------------------------------------------------

function ProductItem({ service, ...other }) {
  return (
    <Stack direction="row" alignItems="flex-start" {...other}>
      <Image
        src={service.service.image}
        sx={{
          mr: 2,
          width: 64,
          height: 64,
          flexShrink: 0,
          borderRadius: 1.5,
          bgcolor: 'background.neutral',
        }}
      />

      <Stack flexGrow={1}>
        <TextMaxLine variant="body2" line={1} sx={{ fontWeight: 'fontWeightMedium' }}>
          {service.service.name}
        </TextMaxLine>

        <Typography variant="subtitle2" sx={{ mt: 0.5, mb: 1.5 }}>
          {fCurrency(service.service.price)}
        </Typography>

        <TextField
          select
          size="small"
          variant="outlined"
          SelectProps={{
            native: true,
          }}
          sx={{ width: 80 }}
        >
          {[1].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </TextField>
      </Stack>

      <IconButton>
        <Iconify icon="carbon:trash-can" />
      </IconButton>
    </Stack>
  );
}

ProductItem.propTypes = {
  service: PropTypes.shape({
    service: PropTypes.object,
  }),
};

// ----------------------------------------------------------------------

function Row({ label, value, sx, ...other }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ typography: 'subtitle2', ...sx }}
      {...other}
    >
      <Box component="span" sx={{ typography: 'body2' }}>
        {label}
      </Box>
      {value}
    </Stack>
  );
}

Row.propTypes = {
  label: PropTypes.string,
  sx: PropTypes.object,
  value: PropTypes.string,
};

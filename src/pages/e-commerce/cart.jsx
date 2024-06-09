import { Helmet } from 'react-helmet-async';

import useCartService from 'src/hooks/use-cart-service';

import EcommerceCartView from 'src/sections/_ecommerce/view/ecommerce-cart-view';

// ----------------------------------------------------------------------

export default function EcommerceCartPage() {

  const {_cartServices, totalPrice} = useCartService();

  return (
    <>
      <Helmet>
        <title> E-commerce: Cart</title>
      </Helmet>

      <EcommerceCartView cartServices={_cartServices} totalPrice={totalPrice} />
    </>
  );
}

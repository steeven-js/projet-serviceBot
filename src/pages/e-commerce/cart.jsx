import useSWR from 'swr';
import { Helmet } from 'react-helmet-async';

import { fetcher, endpoints } from 'src/utils/axios';

import { _services } from 'src/_mock';

import EcommerceCartView from 'src/sections/_ecommerce/view/ecommerce-cart-view';

// ----------------------------------------------------------------------

export default function EcommerceCartPage() {
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
  // console.log('cartServices:', cartServices);
  // console.log('totalPrice:', totalPrice);

  return (
    <>
      <Helmet>
        <title> E-commerce: Cart</title>
      </Helmet>

      <EcommerceCartView cartServices={_cartServices} totalPrice={totalPrice} />
    </>
  );
}

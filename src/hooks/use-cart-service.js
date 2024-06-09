import useSWR from 'swr';

import { useAuth } from 'src/hooks/use-auth';

import { fetcher, endpoints } from 'src/utils/axios';

import { _services } from 'src/_mock';

const useCartService = () => {

  // Auth check
  const { user, loading } = useAuth();

  // Fetch cart data
  const { data } = useSWR(endpoints.cart.list, fetcher);

  // Filtrer les services correspondant aux product_id et uid dans le panier pour l'utilisateur connecté
  const _cartServices = data ? data.filter(cartItem => cartItem.uid === user?.uid).map(cartItem => {
    const service = _services.find(_service => _service.id === cartItem.product_id);
    return { ...cartItem, service };
  }) : [];

  // Calculer le total des prix
  const totalPrice = _cartServices.reduce((acc, item) => acc + parseFloat(item.price), 0);

  // console.log('data:', data);
  // console.log('_cartServices:', _cartServices);
  // console.log('totalPrice:', totalPrice);

  return { _cartServices, totalPrice, user, loading };
}

export default useCartService


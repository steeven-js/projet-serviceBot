import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { _services } from 'src/_mock';

import EcommerceServiceView from 'src/sections/_ecommerce/view/ecommerce-service-view';


// ----------------------------------------------------------------------

export default function EcommerceServicePage() {
  // utiliser route pour recuperer l'id
  const { id } = useParams();

  const router = useRouter();

  const _mockService = _services.find((service) => service.id === Number(id));

  // avec useEffect si le service n'existe pas ou n'est pas defini, on redirige vers la page 404
  useEffect(() => {
    if (!_mockService) {
      router.push(paths.page404);
    }
  }, [_mockService, router]);

  return (
    <>
      <Helmet>
        <title> E-commerce: Service</title>
      </Helmet>

      <EcommerceServiceView _mockService={_mockService} />
    </>
  );
}

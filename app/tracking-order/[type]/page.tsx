import { Container } from '@/components/Container';
import { ElevenTracking } from '@/components/pages/trackingOrder/ElevenTracking';
import { FMTrackingOrder } from '@/components/pages/trackingOrder/FMTrackingOrder';
import { HctTrackingOrder } from '@/components/pages/trackingOrder/HctTrackingOrder';
import { TcatTracking } from '@/components/pages/trackingOrder/TcatTracking';
import { SERVICE_COMPANY } from '@/constants/common';

interface TypeTrackingOrderPage {
  params: {
    type: string;
  };
}

const TypeTrackingOrderPage = ({ params: { type } }: TypeTrackingOrderPage) => {
  const typeTracking = decodeURIComponent(type);
  return (
    <div>
      <Container>
        <div className="py-12">
          <h1 className="text-center text-4xl font-bold">Tra cứu hành trình đơn hàng</h1>
          {typeTracking === SERVICE_COMPANY.HCT && <HctTrackingOrder />}
          {typeTracking === SERVICE_COMPANY.FAMILY_MART && <FMTrackingOrder />}
          {typeTracking === SERVICE_COMPANY.ELEVEN && <ElevenTracking />}
          {typeTracking === SERVICE_COMPANY.T_CAT && <TcatTracking />}
        </div>
      </Container>
    </div>
  );
};

export default TypeTrackingOrderPage;

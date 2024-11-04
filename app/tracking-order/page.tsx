import { Container } from '@/components/Container';
import { AllTrackingOrder } from '@/components/pages/trackingOrder/AllTrackingOrder';

const TrackingOrderPage = () => {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-center text-4xl font-bold">Tra cứu hành trình đơn hàng</h1>
        <AllTrackingOrder />
      </div>
    </Container>
  );
};

export default TrackingOrderPage;

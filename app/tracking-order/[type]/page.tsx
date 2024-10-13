import React from 'react';

import { Container } from '@/components/Container';

interface TypeTrackingOrderPage {
  params: {
    type: string;
  };
}
const TypeTrackingOrderPage = ({ params: { type } }: TypeTrackingOrderPage) => {
  console.log(type);
  return (
    <div>
      <Container>
        <h3>Tra cứu vận đơn</h3>
      </Container>
    </div>
  );
};

export default TypeTrackingOrderPage;

import React from 'react';

import { Banner } from '@/components/Banner/Banner';
import { Container } from '@/components/Container';
import { FormOrderRequest } from '@/components/pages/orderRequest/FormOrderRequest';

const OrderRequestPage = () => {
  return (
    <div>
      <Banner />
      <Container>
        <h2 className="my-5 text-center text-4xl font-bold">Gửi yêu cầu lấy hàng</h2>
        <div className="">
          <FormOrderRequest />
        </div>
      </Container>
    </div>
  );
};

export default OrderRequestPage;

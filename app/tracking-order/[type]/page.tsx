import React from 'react';

import { Container } from '@/components/Container';
import IframeProxy from '@/components/pages/trackingOrder/IframeProxy';

interface TypeTrackingOrderPage {
  params: {
    type: string;
  };
}
const TypeTrackingOrderPage = ({ params: { type } }: TypeTrackingOrderPage) => {
  const url = 'https://www.trackingmore.com/track/en/904696548544?express=t-cat';
  console.log(type);
  return (
    <div>
      <Container>
        <div className="h-full w-full">
          {/* <iframe width={'100%'} height={'100%'} src={url} /> */}
          <IframeProxy url={url} />
        </div>
      </Container>
    </div>
  );
};

export default TypeTrackingOrderPage;

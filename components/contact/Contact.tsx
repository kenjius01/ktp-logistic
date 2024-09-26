import React from 'react';
import Image from 'next/image';

import { Container } from '../Container';

import { FormContact } from './FormContact';

export const Contact = () => {
  return (
    <div className="w-full p-6 pt-24">
      <Container>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex-1">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <h2 className="text-4xl font-bold">Liên hệ với chúng tôi</h2>
                <div className="relative h-11 w-11">
                  <Image
                    alt="icon"
                    src={
                      'https://43logistics.vn/wp-content/uploads/elementor/thumbs/price-qf51cq38piivz6nvdd40jxuhwaff20kmuihq4iaxco.png'
                    }
                    style={{ objectFit: 'contain' }}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </div>
              <br />
              <FormContact />
            </div>
          </div>
          <div className="flex-1">
            <iframe
              src="https://maps.google.com/maps?q=24%20B%C3%ACnh%20H%C3%B2a%206%2C%20khu%C3%AA%20trung%2C%20c%E1%BA%A9m%20l%E1%BB%87%2C%20%C4%91%C3%A0%20n%E1%BA%B5ng&t=m&z=19&output=embed&iwloc=near"
              width="100%"
              height="100%"
              style={{ border: '0', position: 'relative', zIndex: '10' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

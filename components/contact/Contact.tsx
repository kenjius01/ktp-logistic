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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3255639159815!2d106.66978270888838!3d10.786357989318645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed43913c8c5%3A0x40910a582f5d5df2!2sTHI%CC%A3NH%20PHA%CC%81T%20LOGISTICS!5e0!3m2!1svi!2s!4v1727407967095!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: '0', position: 'relative', zIndex: '10' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </div>
  );
};

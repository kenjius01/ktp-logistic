import React from 'react';

import { FormContact } from '@/components/contact/FormContact';
import { Container } from '@/components/Container';

const ContactPage = () => {
  return (
    <div>
      <div className="h-80 md:h-[450px]">
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

      <Container>
        <div className="my-16">
          <h3 className="mb-10 text-center text-4xl font-bold text-mainColor">
            LIÊN HỆ VỚI CHÚNG TÔI
          </h3>
          <FormContact />
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;
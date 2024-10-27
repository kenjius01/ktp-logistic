import React from 'react';

import { FormContact } from '@/components/contact/FormContact';
import { Container } from '@/components/Container';

const ContactPage = () => {
  return (
    <div>
      <div className="h-80 md:h-[450px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3099.3051234810223!2d105.79033647428847!3d20.99318068900156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acb770826d59%3A0xcd07ef5ab6e7cbb6!2zMjkxLTI3NSBMxrDGoW5nIFRo4bq_IFZpbmgsIFRydW5nIFbEg24sIE5hbSBU4burIExpw6ptLCBIw6AgTuG7mWksIFZpZXRuYW0!5e1!3m2!1sen!2s!4v1729997764110!5m2!1sen!2s"
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

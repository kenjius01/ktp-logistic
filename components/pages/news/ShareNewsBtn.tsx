import React, { useEffect, useState } from 'react';
import { FacebookShareButton, WhatsappShareButton } from 'react-share';
import Image from 'next/image';

export const ShareNewsBtn = () => {
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (window) {
      setUrl(window.location.href);
    }
  }, []);
  return (
    <div className="flex items-center">
      <span>Chia sẻ:</span>
      <FacebookShareButton className={'ml-2'} url={url || ''}>
        <div className={''}>
          <Image alt="icon" src={'/images/fbIcon.png'} width={32} height={32} />
        </div>
      </FacebookShareButton>
      <WhatsappShareButton className={'ml-2'} url={url || ''}>
        <div>
          <Image
            className="rounded-full"
            alt="icon"
            src={'/images/whatsapp.png'}
            width={32}
            height={32}
          />
        </div>
      </WhatsappShareButton>
    </div>
  );
};

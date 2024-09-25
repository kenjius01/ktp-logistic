import Image from 'next/image';

import { Footer } from './footer/Footer';
import { Header } from './header/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
      <div className="fixed bottom-5 left-2 z-50 flex flex-col items-center gap-4 sm:bottom-8 sm:left-5">
        {/* Facebook */}
        <div className="btn-vr relative z-10 mx-auto my-0 flex h-16 w-16 cursor-pointer items-center justify-center">
          <div className="vr-circle-fill vr-circle-fill-fb absolute left-0 top-0 h-16 w-16 animate-zoom rounded-full border-[2px] border-transparent bg-[#2196f3b2]"></div>
          <div className="fb-vr-img-circle absolute flex h-9 w-9 animate-phone-vr-circle-fill justify-center overflow-hidden rounded-full bg-[#1877f2]">
            <a
              href={'https://www.facebook.com'}
              target="_blank"
              rel="noreferrer"
              className={'facebook-btn'}
            >
              <Image
                className={'facebook-icon'}
                src={'/images/fbIcon.png'}
                alt=""
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>

        {/* Zalo */}
        <div className="btn-vr relative z-10 mx-auto my-0 flex h-16 w-16 cursor-pointer items-center justify-center">
          <div className="vr-circle-fill-zalo absolute left-0 top-0 h-16 w-16 animate-zoom rounded-full border-[2px] border-transparent bg-[#2196f3b2]"></div>
          <div className="absolute flex h-9 w-9 animate-phone-vr-circle-fill justify-center overflow-hidden rounded-full bg-[#1877f2]">
            <a href={'https://zalo.me'} target="_blank" rel="noreferrer">
              <Image src={'/images/zalo.png'} alt="" width={40} height={40} />
            </a>
          </div>
        </div>

        {/* Whatsapp */}
        <div className="btn-vr relative z-10 mx-auto my-0 flex h-16 w-16 cursor-pointer items-center justify-center">
          <div className="vr-circle-fill-whatsapp absolute left-0 top-0 h-16 w-16 animate-zoom rounded-full border-[2px] border-transparent bg-[#2196f3b2]"></div>
          <div className="absolute flex h-9 w-9 animate-phone-vr-circle-fill justify-center overflow-hidden rounded-full bg-[#1877f2]">
            <a href={'https://wa.me'} target="_blank" rel="noreferrer">
              <Image src={'/images/whatsapp.png'} alt="" width={40} height={40} />
            </a>
          </div>
        </div>

        {/* Telephone */}
        <div className="btn-vr relative z-10 mx-auto my-0 flex h-16 w-16 cursor-pointer items-center justify-center">
          <div className="vr-circle-fill-phone absolute left-0 top-0 h-16 w-16 animate-zoom rounded-full border-[2px] border-transparent bg-[#2196f3b2]"></div>
          <div className="absolute flex h-9 w-9 animate-phone-vr-circle-fill justify-center overflow-hidden rounded-full bg-[#1877f2]">
            <a href={'tel:0979222357'} target="_blank" rel="noreferrer">
              <Image src={'/images/Call-Icon.png'} alt="" width={40} height={40} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

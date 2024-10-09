import React from 'react';
import Image from 'next/image';

const LookupPage = () => {
  return (
    <div>
      <div className="relative h-52 w-full">
        <Image alt="banner" src="/images/lookupBanner.jpg" fill priority />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black bg-opacity-30 text-white">
          <p className="text-3xl font-bold uppercase tracking-widest">THỊNH PHÁT LOGISTICS </p>
          <p className="text-xl tracking-widest">Cung cấp dịch vụ gửi hàng đi nước ngoài uy tín</p>
        </div>
      </div>
      <div className="py-12"></div>
    </div>
  );
};

export default LookupPage;

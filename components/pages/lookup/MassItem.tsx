'use client';

import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';

import { MassListType } from '@/constants/types/lookup.type';
import { cn } from '@/lib/utils';

interface MassItemProps {
  item: MassListType;
  activeMassId?: number | string;
  setActiveMassId: Dispatch<SetStateAction<string | number | undefined>>;
  onSelectMass: (weight: string) => void;
}

export const MassItem = ({ item, activeMassId, setActiveMassId, onSelectMass }: MassItemProps) => {
  return (
    <div
      className={cn(
        'flex h-32 cursor-pointer items-center justify-center rounded bg-[#f0f0f0] hover:bg-mainColor/70 active:bg-mainColor',
        activeMassId === item.id && 'bg-mainColor text-white hover:bg-mainColor',
      )}
      onClick={() => {
        setActiveMassId(item.id);
        onSelectMass(((item.to + item.from) / 2).toString());
      }}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative h-10 w-10">
          <Image
            src={item?.avatar_url}
            alt="iconMass"
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, 33vw"
            className={cn(activeMassId === item.id && 'brightness-0 invert-[1]')}
          />
        </div>
        <p>
          {item.from} - {item.to}
          {item?.don_vi}
        </p>
      </div>
    </div>
  );
};

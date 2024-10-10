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
        <Image src={item?.avatar_url} alt="iconMass" height={40} width={40} />
        <p>
          {item.from} - {item.to}g
        </p>
      </div>
    </div>
  );
};

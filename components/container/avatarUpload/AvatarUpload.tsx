'use client';

import React from 'react';
import { PencilIcon } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import useAuthStore from '@/stores/useAuthStore';
import { getInitialsName } from '@/utils/function.utils';

type AvatarUploadProps = {
  className?: string;
  value?: string;
  onChange?: (value?: File) => void;
  isLoading?: boolean;
};

export function AvatarUpload({ className, isLoading, value, onChange }: AvatarUploadProps) {
  const { user } = useAuthStore();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChange?.(file);
    }
  };

  return (
    <div className={cn('relative h-20 w-20', className)}>
      <Avatar className={cn('h-full w-full', isLoading && 'hidden')}>
        <AvatarImage src={value} className="object-cover" />
        <AvatarFallback className="bg-secondary">{user && getInitialsName(user)}</AvatarFallback>
      </Avatar>
      {isLoading && <Skeleton className={`h-20 w-20 rounded-full`} />}
      <Button
        variant="ghost"
        size="icon"
        disabled={isLoading}
        className="absolute bottom-[-8px] right-0 rounded-full bg-slate-400/80 p-0"
        onClick={(e) => {
          e.preventDefault();
          inputRef.current?.click();
        }}
      >
        <PencilIcon className="h-4 w-4" />
      </Button>
      <Input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/*"
      />
    </div>
  );
}

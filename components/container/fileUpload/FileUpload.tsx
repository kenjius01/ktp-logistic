'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ImagePlus, LoaderIcon } from 'lucide-react';
import Image from 'next/image';

interface FileUploadProps {
  onChange: (file: File | null) => void;
  preview?: string | ArrayBuffer | null;
  maxSize?: number; // Default: 1MB
  accept?: Record<string, string[]>;
  error?: string;
  isLoading?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  preview,
  maxSize = 10000000,
  accept = { 'image/png': [], 'image/jpg': [], 'image/jpeg': [] },
  error,
  isLoading,
}) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (acceptedFiles: File[]) => onChange(acceptedFiles[0] || null),
    maxFiles: 1,
    maxSize,
    accept,
  });

  const rejectionMessage = fileRejections.length
    ? 'Image must be less than 10MB and of type png, jpg, or jpeg'
    : error;

  return (
    <div
      {...getRootProps()}
      className="flex max-h-96 cursor-pointer flex-col items-center justify-center gap-y-2 rounded-lg border border-foreground p-8 shadow-sm shadow-foreground"
    >
      {preview && (
        <div className="relative aspect-square w-full">
          <Image
            src={preview as string}
            alt="Uploaded image"
            fill
            className="rounded-lg object-contain"
          />
        </div>
      )}
      {isLoading ? (
        <LoaderIcon className="h-6 w-6 animate-spin" />
      ) : (
        <ImagePlus className={`size-20 ${preview ? 'hidden' : 'block'}`} />
      )}
      <input {...getInputProps()} />
      {isDragActive ? <p>Kéo thả ảnh!</p> : <p>Bấm vào đây hoặc kéo thả ảnh để tải lên.</p>}
      {rejectionMessage && <p className="text-destructive">{rejectionMessage}</p>}
    </div>
  );
};

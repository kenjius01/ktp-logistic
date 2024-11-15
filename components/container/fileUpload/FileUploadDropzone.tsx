'use client';

import { useState } from 'react';
import { DropzoneOptions } from 'react-dropzone';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from '@/components/ui/file-upload';
import { CODE_RESPONSE } from '@/constants/codeResponse';
import { KEY_QUERY } from '@/constants/keyQuery';
import { uploadFileApi } from '@/services/common.services';

import { Fancybox } from '../fancybox';

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="mb-3 h-8 w-8 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
    </>
  );
};

interface FileUploadDropzoneProps {
  onChange: (value: string[]) => void;
}

const FileUploadDropzone = ({ onChange }: FileUploadDropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [urlImages, setUrlImages] = useState<string[]>([]);

  const dropzone = {
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png'],
    },
    multiple: true,
    maxFiles: 20,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const { mutate, isPending } = useMutation({
    mutationKey: [KEY_QUERY.UPLOAD],
    mutationFn: uploadFileApi,
    onSuccess: (res, file) => {
      if (res.code === CODE_RESPONSE.POST_SUCCESS || res.code === 0) {
        setUrlImages((prev) => [...prev, res.result]);
        onChange([...urlImages, res.result]);
        setFiles((pre) => [...pre, file]);
        return;
      }
      toast.error(res.message);
    },
  });

  const uploadFile = (file: File) => {
    if (!file) {
      return;
    }
    mutate(file);
  };
  const onValueChange = (listFile: File[] | null) => {
    if (!listFile) {
      return;
    }
    const newFiles = listFile.filter(
      (item) => !files?.some((existedFile) => existedFile.name === item.name),
    );
    for (let i = 0; i < newFiles.length; i++) {
      uploadFile(newFiles[i]);
    }
  };

  const onRemoveImg = (index: number) => {
    const newUrlImages = urlImages.filter((_, i) => i !== index);
    setUrlImages(newUrlImages);
  };

  return (
    <FileUploader value={files} onValueChange={onValueChange} dropzoneOptions={dropzone}>
      <FileInput className="rounded-md border border-dashed">
        <div className="flex w-full flex-col items-center justify-center pb-4 pt-3">
          <FileSvgDraw />
          {isPending && (
            <span className="text-sm text-gray-500 dark:text-gray-400">Uploading...</span>
          )}
        </div>
      </FileInput>
      <FileUploaderContent className="flex flex-row items-center gap-2">
        <Fancybox>
          {urlImages?.map((url, i) => (
            <FileUploaderItem
              key={i}
              index={i}
              className="ml-1 size-20 overflow-hidden rounded-md p-0"
              aria-roledescription={`file ${i + 1} containing ${url}`}
              onRemove={onRemoveImg}
            >
              <Image
                src={url}
                alt={url}
                height={80}
                width={80}
                className="size-20 p-0"
                data-fancybox="gallery"
              />
            </FileUploaderItem>
          ))}
        </Fancybox>
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploadDropzone;

import React from 'react';

interface StringToHtmlProps {
  string: string;
}
export const StringToHtml = ({ string }: StringToHtmlProps) => {
  return <div dangerouslySetInnerHTML={{ __html: string }} />;
};

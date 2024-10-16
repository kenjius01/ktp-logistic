'use client';
import { useEffect, useState } from 'react';

interface IframeProxyProps {
  url: string;
}

const IframeProxy: React.FC<IframeProxyProps> = ({ url }) => {
  // Encode the URL to safely include it in the iframe src attribute
  const [encodedUrl, setEncodedUrl] = useState('');

  useEffect(() => {
    const targetUrl = encodeURIComponent(url);
    setEncodedUrl(`/api/proxy?url=${targetUrl}`);
  }, [url]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={encodedUrl} // The proxy API handles the URL
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Iframe Proxy"
      />
    </div>
  );
};

export default IframeProxy;

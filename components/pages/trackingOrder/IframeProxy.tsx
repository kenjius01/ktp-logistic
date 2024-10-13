import React from 'react';

interface IframeProxyProps {
  url: string;
}

const IframeProxy: React.FC<IframeProxyProps> = ({ url }) => {
  // Encode the URL to safely include it in the iframe src attribute
  const encodedUrl = encodeURIComponent(url);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={`/api/proxy?url=${encodedUrl}`} // The proxy API handles the URL
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Iframe Proxy"
      />
    </div>
  );
};

export default IframeProxy;

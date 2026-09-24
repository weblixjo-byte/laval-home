import React from 'react';
import { Studio } from 'sanity';
import config from '../../sanity.config';

const StudioPage = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        backgroundColor: '#0B0C0E',
        fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;

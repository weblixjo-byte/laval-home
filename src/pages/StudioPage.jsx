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
      <style>{`
        /* Clean up top navbar: hide workspace tool switch tabs (Navigation / Releases) */
        header [role="tablist"],
        header nav[aria-label="Workspace tools"],
        [data-testid="studio-navbar"] [role="tablist"],
        [data-testid="tool-collapse-menu"] {
          display: none !important;
        }
      `}</style>
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;

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

        /* ----------------------------------------------------
           HIGH CONTRAST & CRISP LIGHT/WHITE INPUT BOXES
        ---------------------------------------------------- */
        /* Text inputs, number inputs, textareas, selects, search bars */
        [data-ui="TextInput"],
        [data-ui="TextArea"],
        [data-ui="Select"],
        [data-ui="Autocomplete"],
        input[type="text"],
        input[type="number"],
        input[type="url"],
        input[type="email"],
        textarea,
        select {
          background-color: #ffffff !important;
          color: #0f172a !important;
          border: 1.5px solid #cbd5e1 !important;
          border-radius: 8px !important;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05) !important;
          transition: border-color 0.2s, box-shadow 0.2s !important;
        }

        /* Inner inputs and textareas inside Sanity UI wrappers */
        [data-ui="TextInput"] input,
        [data-ui="TextArea"] textarea,
        [data-ui="Autocomplete"] input,
        [data-ui="Select"] select {
          color: #0f172a !important;
          background-color: transparent !important;
          font-weight: 500 !important;
        }

        /* Input Placeholders */
        input::placeholder,
        textarea::placeholder,
        [data-ui="TextInput"] input::placeholder,
        [data-ui="TextArea"] textarea::placeholder {
          color: #64748b !important;
          opacity: 1 !important;
        }

        /* Focus State for all inputs */
        [data-ui="TextInput"]:focus-within,
        [data-ui="TextArea"]:focus-within,
        [data-ui="Select"]:focus-within,
        [data-ui="Autocomplete"]:focus-within,
        input:focus,
        textarea:focus,
        select:focus {
          border-color: #d4af37 !important;
          box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.25) !important;
          background-color: #ffffff !important;
        }

        /* Autocomplete / Reference input buttons and icons */
        [data-ui="Autocomplete"] [data-ui="Button"],
        [data-ui="TextInput"] [data-ui="Button"] {
          color: #475569 !important;
        }

        /* Field labels in the dark dashboard */
        [data-ui="FormField"] label,
        [data-ui="FormField"] [data-ui="Label"] {
          color: #ffffff !important;
          font-weight: 600 !important;
          font-size: 13px !important;
          letter-spacing: 0.02em !important;
        }

        /* Field descriptions/helpers below labels */
        [data-ui="FormField"] [data-ui="Text"] {
          color: #94a3b8 !important;
          font-size: 12px !important;
        }

        /* Slug Generate Button & Action Buttons */
        [data-ui="TextInput"] + button,
        [data-ui="Button"][data-tone="default"] {
          font-weight: 600 !important;
        }
      `}</style>
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;

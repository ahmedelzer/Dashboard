import React, { useState, useRef, useEffect } from 'react';

const CustomDropdown = ({ buttonText, panelContent, onClose, displayField, getField }) => {
  const [isPanelOpen, setPanelOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleTogglePanel = () => {
    setPanelOpen(!isPanelOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setPanelOpen(false);
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside the dropdown panel
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Remove event listener on component unmount
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div
      className=' flex justify-between form-control bg-[#e9ecef]'
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        onClick={handleTogglePanel}
      >
        <span>{buttonText}</span>
        <span style={{ marginLeft: '5px' }}>{isPanelOpen ? '▲' : '▼'}</span>
      </div>

      {isPanelOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            border: '1px solid #ccc',
            background: '#fff',
            zIndex: 1,
            marginTop: '5px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          {panelContent}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

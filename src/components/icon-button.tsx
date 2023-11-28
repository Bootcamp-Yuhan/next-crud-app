// components/IconButton.tsx
import React from 'react';

interface IconButtonProps {
  iconClassName: string; // Bootstrap icon class, e.g., "bi bi-search"
  colorClassName: string;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ iconClassName, colorClassName, onClick }) => {
  return (
    <button type="button" className={`btn btn-primary ${colorClassName}`} onClick={onClick}>
      <i className={`${iconClassName}`}></i>
    </button>
  );    
};

export default IconButton;

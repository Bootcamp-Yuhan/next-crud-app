// components/Button.tsx
import React from 'react';

const Button: React.FC<{ onClick: () => void; label: string }> = ({ onClick, label }) => {
  return (
    <button type="button" className="btn btn-primary" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;

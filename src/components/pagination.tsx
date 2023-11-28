// components/Pagination.tsx
import React from 'react';

const Pagination: React.FC<{ onPageChange: (pageNumber: number) => void }> = ({ onPageChange }) => {
  return (
    <nav>
      <ul className="pagination">
        {/* Implement pagination logic here */}
        {/* For simplicity, I'll provide a basic example with three pages */}
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => onPageChange(1)}>
            1
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => onPageChange(2)}>
            2
          </a>
        </li>
        <li className="page-item">
          <a className="page-link" href="#" onClick={() => onPageChange(3)}>
            3
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
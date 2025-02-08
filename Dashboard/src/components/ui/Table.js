import React from 'react';

function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
}

export default Table;


import React from 'react';

function Avatar({ src, alt, className = "", ...props }) {
  return (
    <div className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`} {...props}>
      <img className="aspect-square h-full w-full" src={src} alt={alt} />
    </div>
  );
}

export default Avatar;


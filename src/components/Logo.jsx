import React from 'react';

const Logo = ({ className = "" }) => {
  return (
    <div className={`flex items-center select-none ${className}`}>
      <div className="flex border-2 border-brand-yellow p-1 bg-brand-red shadow-sm">
        <div className="bg-brand-yellow text-white font-extrabold tracking-widest px-1 sm:px-2 py-1 leading-none text-lg sm:text-2xl">
          PROMO
        </div>
        <div className="bg-brand-red text-white font-extrabold tracking-widest px-1 sm:px-2 py-1 leading-none text-lg sm:text-2xl ml-1">
          HOMEX
        </div>
      </div>
    </div>
  );
};

export default Logo;

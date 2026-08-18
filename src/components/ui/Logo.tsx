import React from 'react';

export const Logo = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradient" x1="0" y1="0" x2="256" y2="256" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#58a6ff" />
          <stop offset="100%" stopColor="#8957e5" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <rect width="256" height="256" rx="60" fill="url(#bgGradient)" />
      <path d="M 80 70 L 128 170 L 176 70" stroke="white" strokeWidth="28" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />
      <path d="M 128 170 L 128 190" stroke="#8957e5" strokeWidth="28" strokeLinecap="round" />
    </svg>
  );
};

import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="36" 
      height="26" 
      viewBox="0 0 36 26" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="36" height="26" rx="8" fill="white" fillOpacity="0.05"/>
      <rect x="0.5" y="0.5" width="35" height="25" rx="7.5" stroke="white" strokeOpacity="0.1"/>
      
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1"/>
          <stop offset="1" stopColor="#a855f7"/>
        </linearGradient>
      </defs>

      {/* Left Bracket */}
      <text 
        x="6" 
        y="18.5" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="18" 
        fontWeight="300" 
        fill="#94a3b8"
      >
        {"{"}
      </text>

      {/* Right Bracket */}
      <text 
        x="24" 
        y="18.5" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="18" 
        fontWeight="300" 
        fill="#94a3b8"
      >
        {"}"}
      </text>

      {/* Central Slash - Optimized for 'S' flow */}
      <text 
        x="12" 
        y="19" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="19" 
        fontWeight="800" 
        fill="url(#logoGrad)" 
        transform="rotate(-2 18 13)"
      >
        /
      </text>
    </svg>
  );
};

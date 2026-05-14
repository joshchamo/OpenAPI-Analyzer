import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      width="42" 
      height="30" 
      viewBox="0 0 42 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Glassy Background Container */}
      <rect width="42" height="30" rx="10" fill="white" fillOpacity="0.05"/>
      <rect x="0.5" y="0.5" width="41" height="29" rx="9.5" stroke="white" strokeOpacity="0.1"/>
      
      {/* Decorative Shimmer Line */}
      <path d="M5 5L37 25" stroke="white" strokeOpacity="0.05" strokeWidth="0.5"/>

      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="42" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1"/>
          <stop offset="1" stopColor="#a855f7"/>
        </linearGradient>
      </defs>

      {/* Left Bracket */}
      <text 
        x="4" 
        y="21" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="18" 
        fontWeight="300" 
        fill="#94a3b8"
      >
        {"{"}
      </text>

      {/* Right Bracket */}
      <text 
        x="32" 
        y="21" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="18" 
        fontWeight="300" 
        fill="#94a3b8"
      >
        {"}"}
      </text>

      {/* Central Slash - Positioned to nearly touch corners for 'S' shape */}
      <text 
        x="15" 
        y="22" 
        fontFamily="'Monaco', 'Courier New', monospace" 
        fontSize="22" 
        fontWeight="800" 
        fill="url(#logoGrad)" 
        transform="rotate(-5 21 15)"
      >
        /
      </text>
    </svg>
  );
};

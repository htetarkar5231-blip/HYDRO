import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({ 
  percentage, 
  size = 280, 
  strokeWidth = 25 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  // Decorate dots positioning
  const dotRadius = (size - strokeWidth) / 2;
  const center = size / 2;
  
  const getDotPos = (angleDeg: number) => {
    const angleRad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + dotRadius * Math.cos(angleRad),
      y: center + dotRadius * Math.sin(angleRad)
    };
  };

  const dots = [0, 90, 180, 270].map(angle => getDotPos(angle));

  return (
    <div className="relative flex items-center justify-center drop-shadow-xl" style={{ width: size, height: size }}>
      {/* Background droplets decoration (positioned absolutely) */}
      <svg className="absolute top-10 right-4 w-6 h-6 text-water-400 opacity-80 dark:opacity-40" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
      <svg className="absolute bottom-16 left-4 w-5 h-5 text-water-400 opacity-60 dark:opacity-30" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
       <svg className="absolute bottom-10 left-8 w-4 h-4 text-water-400 opacity-50 dark:opacity-20" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>

      {/* Main Progress Circle */}
      <svg width={size} height={size} className="transform rotate-0">
        <defs>
          <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" /> {/* Light Blue */}
            <stop offset="100%" stopColor="#3B82F6" /> {/* Darker Blue */}
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          className="stroke-blue-100 dark:stroke-slate-700 transition-colors duration-300"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

        {/* Inner solid fill */}
         <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="#3B82F6"
          fillOpacity="0.1"
          className="dark:fill-slate-700 dark:fill-opacity-40"
        />

        {/* --- ILLUSTRATION --- */}
        
        {/* Land (Soil Layers) */}
        <g>
             {/* Top Layer */}
             <path 
               d="M 70 165 L 210 165 L 210 173 L 70 173 Z" 
               fill="#D97706" 
               className="dark:fill-[#B45309]" 
             />
             {/* Bottom Layer (Detail) */}
             <path 
               d="M 70 173 L 210 173 L 210 178 L 70 178 Z" 
               fill="#92400E" 
               className="dark:fill-[#78350F]" 
             />
        </g>

        {/* Beautiful Realistic Cartoon Tree */}
        <g>
          {/* Trunk */}
          <path 
            d="M 132 165 Q 138 145 130 115 L 135 120 L 140 110 L 145 120 L 150 115 Q 142 145 148 165 Z" 
            fill="#795548" 
          />
          {/* Shadow on trunk */}
          <path 
            d="M 148 165 Q 142 145 150 115 L 145 120 L 143 120 L 145 165 Z" 
            fill="black" 
            fillOpacity="0.1" 
          />

          {/* Foliage - Layer 1 (Dark - Back) */}
          <circle cx="115" cy="110" r="24" fill="#15803d" /> {/* green-700 */}
          <circle cx="165" cy="110" r="24" fill="#15803d" />
          <circle cx="140" cy="80" r="28" fill="#15803d" />

          {/* Foliage - Layer 2 (Mid - Main) */}
          <circle cx="128" cy="100" r="26" fill="#22c55e" /> {/* green-500 */}
          <circle cx="152" cy="100" r="26" fill="#22c55e" />
          <circle cx="140" cy="72" r="26" fill="#22c55e" />
          <circle cx="140" cy="112" r="22" fill="#22c55e" />

          {/* Foliage - Layer 3 (Light - Highlights) */}
          <circle cx="128" cy="95" r="20" fill="#4ade80" /> {/* green-400 */}
          <circle cx="152" cy="95" r="20" fill="#4ade80" />
          <circle cx="140" cy="68" r="20" fill="#4ade80" />
          <circle cx="140" cy="108" r="16" fill="#4ade80" />
          
          {/* Shine/Reflection */}
          <ellipse cx="128" cy="90" rx="10" ry="6" fill="#86efac" fillOpacity="0.6" transform="rotate(-15 128 90)" />
          <ellipse cx="152" cy="90" rx="10" ry="6" fill="#86efac" fillOpacity="0.6" transform="rotate(15 152 90)" />
          <ellipse cx="140" cy="62" rx="12" ry="7" fill="#86efac" fillOpacity="0.6" />
        </g>

        {/* Progress */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="url(#blueGradient)"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
        
        {/* Decorative Dots */}
        {dots.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={4}
            fill="white"
            className="shadow-sm dark:fill-slate-800"
          />
        ))}

      </svg>
      
      {/* Percentage Text - Positioned at bottom area */}
      <div className="absolute inset-0 flex items-end justify-center pb-16 pointer-events-none">
        <span className="text-4xl font-bold text-slate-700 dark:text-white drop-shadow-sm font-sans transition-colors duration-300">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};
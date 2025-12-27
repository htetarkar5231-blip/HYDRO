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
      <svg className="absolute top-10 right-4 w-6 h-6 text-water-400 opacity-80" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
      <svg className="absolute bottom-16 left-4 w-5 h-5 text-water-400 opacity-60" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
       <svg className="absolute bottom-10 left-8 w-4 h-4 text-water-400 opacity-50" viewBox="0 0 24 24" fill="currentColor">
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
          stroke="#DBEAFE"
          strokeWidth={strokeWidth}
          fill="transparent"
        />

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
        
        {/* Inner solid fill to match design if needed, but design looks transparent/white center. 
            Actually the design has a gradient fill inside the ring but slightly lighter. 
            Let's put a subtle fill. */}
         <circle
          cx={center}
          cy={center}
          r={radius - strokeWidth / 2}
          fill="#3B82F6"
          fillOpacity="0.1"
        />

        {/* Decorative Dots */}
        {dots.map((pos, i) => (
          <circle
            key={i}
            cx={pos.x}
            cy={pos.y}
            r={4}
            fill="white"
            className="shadow-sm"
          />
        ))}

      </svg>
      
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-5xl font-bold text-white drop-shadow-md font-sans">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

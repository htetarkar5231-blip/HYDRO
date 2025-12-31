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
  
  const innerRadius = (size / 2) - strokeWidth;
  const innerDiameter = innerRadius * 2;

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
      
      {/* Water Level Container (Inner Circle) */}
      <div 
        className="absolute rounded-full overflow-hidden bg-white dark:bg-slate-800/50 shadow-inner transition-colors duration-300"
        style={{ 
          width: innerDiameter, 
          height: innerDiameter,
          left: strokeWidth,
          top: strokeWidth
        }}
      >
        {/* Rising Water */}
        <div 
          className="absolute bottom-0 left-0 w-full bg-blue-400 transition-all duration-700 ease-out opacity-80"
          style={{ height: `${percentage}%` }}
        >
             {/* Wave 1 (Back Layer) - Lighter/Slower */}
             <div className="absolute -top-[12px] left-0 w-[200%] h-[15px] animate-[wave_7s_linear_infinite] z-0 opacity-60">
                <svg viewBox="0 0 200 15" preserveAspectRatio="none" className="w-full h-full text-blue-300 fill-current">
                   <path d="M0 15 V 7 Q 25 12 50 7 T 100 7 T 150 7 T 200 7 V 15 Z" />
                </svg>
             </div>

             {/* Wave 2 (Front Layer) - Main Color */}
             <div className="absolute -top-[14px] left-0 w-[200%] h-[15px] animate-[wave_4s_linear_infinite] z-10">
                <svg viewBox="0 0 200 15" preserveAspectRatio="none" className="w-full h-full text-blue-400 fill-current">
                   <path d="M0 15 V 6 Q 25 0 50 6 T 100 6 T 150 6 T 200 6 V 15 Z" />
                </svg>
             </div>

             {/* Richer Bubbles Animation */}
             <div className="absolute bottom-0 left-[10%] w-1.5 h-1.5 bg-white/40 rounded-full animate-[bubble_2.5s_ease-in-out_infinite_0.2s]" />
             <div className="absolute bottom-0 left-1/4 w-2 h-2 bg-white/40 rounded-full animate-[bubble_3s_ease-in-out_infinite]" />
             <div className="absolute bottom-0 left-[35%] w-1 h-1 bg-white/40 rounded-full animate-[bubble_4.5s_ease-in-out_infinite_1.5s]" />
             <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-white/40 rounded-full animate-[bubble_4s_ease-in-out_infinite_1s]" />
             <div className="absolute bottom-0 left-[60%] w-2 h-2 bg-white/40 rounded-full animate-[bubble_3.2s_ease-in-out_infinite_0.7s]" />
             <div className="absolute bottom-0 left-3/4 w-1.5 h-1.5 bg-white/40 rounded-full animate-[bubble_3.5s_ease-in-out_infinite_0.5s]" />
             <div className="absolute bottom-0 left-[85%] w-2.5 h-2.5 bg-white/40 rounded-full animate-[bubble_3.8s_ease-in-out_infinite_1.2s]" />
             <div className="absolute bottom-0 left-[92%] w-1 h-1 bg-white/40 rounded-full animate-[bubble_2.8s_ease-in-out_infinite_0.9s]" />
             
             {/* Surface Highlight */}
             <div className="absolute top-0 w-full h-1 bg-white/30 z-20" />
        </div>
      </div>

      {/* Main Progress Circle SVG */}
      <svg width={size} height={size} className="transform rotate-0 relative z-10 pointer-events-none">
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

      {/* Background decorative droplets outside (behind SVG but absolute) */}
      <svg className="absolute top-10 right-4 w-6 h-6 text-water-400 opacity-80 dark:opacity-40 z-0 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
      <svg className="absolute bottom-16 left-4 w-5 h-5 text-water-400 opacity-60 dark:opacity-30 z-0 pointer-events-none" viewBox="0 0 24 24" fill="currentColor">
         <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
      
      {/* Percentage Text - Centered */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <span className={`text-5xl font-bold font-sans transition-colors duration-300 drop-shadow-md ${percentage > 45 ? 'text-white' : 'text-slate-700 dark:text-white'}`}>
          {Math.round(percentage)}%
        </span>
      </div>

      <style>{`
        @keyframes wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes bubble {
          0% { transform: translateY(20px) scale(0.5); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};
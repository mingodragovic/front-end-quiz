interface ParadoxLogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function ParadoxLogo({ size = 'md', className = '' }: ParadoxLogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        viewBox="0 0 48 48" 
        className={`${sizes[size]} w-auto`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer circle representing the paradox loop */}
        <circle 
          cx="24" 
          cy="24" 
          r="20" 
          stroke="#8d2146" 
          strokeWidth="2"
          strokeDasharray="4 4"
          className="animate-spin-slow"
          style={{ animationDuration: '20s' }}
        />
        
        {/* Inner X with path twist */}
        <path 
          d="M 14 14 L 24 24 L 14 34 M 34 14 L 24 24 L 34 34" 
          stroke="#8d2146" 
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Portal/infinity element in the center */}
        <circle 
          cx="24" 
          cy="24" 
          r="4" 
          fill="#8d2146"
          className="opacity-80"
        />
        
        {/* Gradient overlay for depth */}
        <defs>
          <radialGradient id="paradoxGradient">
            <stop offset="0%" stopColor="#8d2146" stopOpacity="0.2"/>
            <stop offset="100%" stopColor="#8d2146" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <circle 
          cx="24" 
          cy="24" 
          r="16" 
          fill="url(#paradoxGradient)"
        />
      </svg>
      
      <div className="flex flex-col">
        <span className="text-xl tracking-tight" style={{ 
          fontWeight: 600,
          background: 'linear-gradient(135deg, #8d2146 0%, #6b1936 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          PARADOX
        </span>
        <span className="text-xs tracking-widest text-muted-foreground -mt-1">
          QUIZ
        </span>
      </div>
    </div>
  )
}
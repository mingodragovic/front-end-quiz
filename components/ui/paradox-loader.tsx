interface ParadoxLoaderProps {
  size?: 'sm' | 'md' | 'lg'
}

export function ParadoxLoader({ size = 'md' }: ParadoxLoaderProps) {
  const sizes = {
    sm: 'h-12 w-12',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  }

  return (
    <div className={`${sizes[size]} relative mx-auto`}>
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer circle - properly sized and positioned */}
          <circle
            cx="24"
            cy="24"
            r="15" // Reduced radius to better wrap around the X
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="3 3"
            className="text-primary animate-spin opacity-40"
            style={{ transformOrigin: 'center' }}
          />
          
          {/* Inner X shape - corrected to stay within the circle */}
          <path
            d="M 16 16 L 24 24 L 16 32 M 32 16 L 24 24 L 32 32"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary animate-pulse"
          />
          
         
        </svg>
      </div>
    </div>
  )
}
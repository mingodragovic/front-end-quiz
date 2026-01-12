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
          {/* Outer circle */}
          <circle
            cx="24"
            cy="24"
            r="20"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="4 4"
            className="text-primary animate-spin-slow opacity-30"
          />
          
          {/* Inner path */}
          <path
            d="M 14 14 L 24 24 L 14 34 M 34 14 L 24 24 L 34 34"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary animate-pulse"
          />
          
          {/* Center circle */}
          <circle
            cx="24"
            cy="24"
            r="4"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>
    </div>
  )
}
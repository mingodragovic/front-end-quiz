interface PersonalityIllustrationProps {
  type: string
  size?: number
  className?: string
}

export function PersonalityIllustration({ type, size = 120, className = '' }: PersonalityIllustrationProps) {
  // Map personality names to illustration types
  const illustrationType = type.toLowerCase().includes('adventurer') ? 'adventurer' :
                          type.toLowerCase().includes('analyst') ? 'analyst' :
                          type.toLowerCase().includes('diplomat') ? 'diplomat' :
                          type.toLowerCase().includes('leader') ? 'leader' : 'adventurer'

  const illustrations = {
    adventurer: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#F8F9FA" stroke="#8d2146" strokeWidth="2"/>
        <circle cx="60" cy="60" r="40" fill="white" stroke="#8d2146" strokeWidth="1" strokeDasharray="3 3"/>
        <path d="M 60 25 L 55 60 L 60 95 L 65 60 Z" fill="#8d2146" opacity="0.9"/>
        <path d="M 60 25 L 60 95" stroke="#8d2146" strokeWidth="2"/>
        <circle cx="60" cy="25" r="4" fill="#8d2146"/>
        <circle cx="95" cy="60" r="4" fill="#8d2146" opacity="0.6"/>
        <circle cx="60" cy="95" r="4" fill="#8d2146" opacity="0.6"/>
        <circle cx="25" cy="60" r="4" fill="#8d2146" opacity="0.6"/>
        <circle cx="60" cy="60" r="6" fill="#8d2146"/>
        <circle cx="60" cy="60" r="3" fill="white"/>
        <path 
          d="M 40 40 Q 60 30 80 40" 
          stroke="#8d2146" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.5"
        />
      </svg>
    ),
    analyst: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#F8F9FA" stroke="#4f46e5" strokeWidth="2"/>
        <path d="M 35 35 L 60 60 L 85 35" stroke="#4f46e5" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 35 85 L 60 60 L 85 85" stroke="#4f46e5" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 35 35 L 35 85" stroke="#4f46e5" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 85 35 L 85 85" stroke="#4f46e5" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 35 35 L 85 85" stroke="#4f46e5" strokeWidth="1.5" opacity="0.3"/>
        <path d="M 85 35 L 35 85" stroke="#4f46e5" strokeWidth="1.5" opacity="0.3"/>
        <circle cx="35" cy="35" r="8" fill="white" stroke="#4f46e5" strokeWidth="2"/>
        <circle cx="85" cy="35" r="8" fill="white" stroke="#4f46e5" strokeWidth="2"/>
        <circle cx="35" cy="85" r="8" fill="white" stroke="#4f46e5" strokeWidth="2"/>
        <circle cx="85" cy="85" r="8" fill="white" stroke="#4f46e5" strokeWidth="2"/>
        <circle cx="60" cy="60" r="12" fill="#4f46e5" stroke="#4f46e5" strokeWidth="2"/>
        <path 
          d="M 50 50 Q 55 45 60 50 Q 65 45 70 50" 
          stroke="white" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M 50 70 Q 55 65 60 70 Q 65 65 70 70" 
          stroke="#4f46e5" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.6"
        />
      </svg>
    ),
    diplomat: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#F8F9FA" stroke="#0ea5e9" strokeWidth="2"/>
        <circle cx="45" cy="60" r="20" fill="none" stroke="#0ea5e9" strokeWidth="2.5"/>
        <circle cx="75" cy="60" r="20" fill="none" stroke="#0ea5e9" strokeWidth="2.5"/>
        <ellipse cx="60" cy="60" rx="8" ry="20" fill="#0ea5e9" opacity="0.3"/>
        <line x1="30" y1="60" x2="90" y2="60" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.5"/>
        <circle cx="45" cy="60" r="4" fill="#0ea5e9"/>
        <circle cx="75" cy="60" r="4" fill="#0ea5e9"/>
        <circle cx="60" cy="60" r="5" fill="white" stroke="#0ea5e9" strokeWidth="2"/>
        <path 
          d="M 40 40 Q 60 35 80 40" 
          stroke="#0ea5e9" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.4"
        />
        <path 
          d="M 40 80 Q 60 85 80 80" 
          stroke="#0ea5e9" 
          strokeWidth="1.5" 
          fill="none"
          opacity="0.4"
        />
      </svg>
    ),
    leader: (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#F8F9FA" stroke="#10b981" strokeWidth="2"/>
        <path 
          d="M 60 30 L 65 50 L 85 50 L 70 62 L 75 82 L 60 70 L 45 82 L 50 62 L 35 50 L 55 50 Z" 
          fill="#10b981"
          opacity="0.9"
        />
        <path 
          d="M 60 45 L 63 55 L 73 55 L 65 61 L 68 71 L 60 65 L 52 71 L 55 61 L 47 55 L 57 55 Z" 
          fill="white"
        />
        <path 
          d="M 45 40 L 48 35 L 51 40 M 57 35 L 60 30 L 63 35 M 69 40 L 72 35 L 75 40" 
          stroke="#10b981" 
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="60" y1="30" x2="60" y2="20" stroke="#10b981" strokeWidth="2" opacity="0.5"/>
        <line x1="75" y1="38" x2="82" y2="32" stroke="#10b981" strokeWidth="1.5" opacity="0.4"/>
        <line x1="45" y1="38" x2="38" y2="32" stroke="#10b981" strokeWidth="1.5" opacity="0.4"/>
        <circle cx="60" cy="60" r="5" fill="#10b981"/>
        <circle cx="60" cy="60" r="2" fill="white"/>
      </svg>
    )
  };

  return (
    <div className={className} style={{ width: size, height: size }}>
      {illustrations[illustrationType]}
    </div>
  )
}

export const personalityColors = {
  adventurer: '#8d2146',
  analyst: '#4f46e5',
  diplomat: '#0ea5e9',
  leader: '#10b981'
}

export const personalityColorMap: Record<string, string> = {
  'The Adventurer': '#8d2146',
  'The Analyst': '#4f46e5',
  'The Diplomat': '#0ea5e9',
  'The Leader': '#10b981'
}
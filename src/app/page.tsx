export default function Home() {
  return (
    // Main Container for Landing Page: styled w/ blue, green and white color theme
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-2 custom-grid-bg">
        
      {/* Title */}
      <h1 className="text-5xl font-mono text-center text-[#292929] mb-1">AiTinerary</h1>

      {/* App Subtitle: brief description of app */}
      <p className="text-lg font-mono text-center text-[#292929]">Powered by AI to help plan your trips!</p>


      {/* Placeholder Logo */}
      <h1 className="text-9xl font-bold text-center text-[#ffffff] mb-6 mt-6">✈️</h1>

      {/* Custom UI Button */}
      <button className="btn border-black border-2 
                        border-dashed
                        text-black
                        bg-white
                        hover:text-white
                        hover:bg-black
                        transition duration-500
                        shadow-none">
      Start Planning
      </button>



      {/* Old Generated Logo */}
      {/* <svg style={{ border: '1px solid red' }} width="40%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" preserveAspectRatio="none"> */}

      {/* Glow Effect */}
      {/* <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stop-color="#25caac" stop-opacity="0.3" />
        <stop offset="100%" stop-color="#051e3e" stop-opacity="0" />
      </radialGradient>
      <circle cx="200" cy="150" r="120" fill="url(#glowGradient)"/> */}

      {/* Futuristic globe with hologram effect */}
      {/* <circle cx="200" cy="150" r="80" fill="none" stroke="#0ceef2" stroke-width="1.5" opacity="0.7"/>
      <circle cx="200" cy="150" r="78" fill="none" stroke="#25caac" stroke-width="0.8" opacity="0.5"/>
      <circle cx="200" cy="150" r="83" fill="none" stroke="#ffffff" stroke-width="0.3" opacity="0.8"/>

      <ellipse cx="200" cy="150" rx="80" ry="30" fill="none" stroke="#0ceef2" stroke-width="1" opacity="0.6"/>
      <ellipse cx="200" cy="150" rx="80" ry="30" fill="none" stroke="#25caac" stroke-width="0.5" opacity="0.4" transform="rotate(60 200 150)"/>
      <ellipse cx="200" cy="150" rx="80" ry="30" fill="none" stroke="#ffffff" stroke-width="0.3" opacity="0.5" transform="rotate(120 200 150)"/> */}

      {/* Data streams around globe */}
      {/* <g stroke="#25caac" stroke-width="1" fill="none">
        <path d="M140 110 Q160 90, 190 100 Q220 110, 250 100" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" />
        </path>
        <path d="M130 140 Q170 170, 200 160 Q230 150, 260 170" opacity="0.6">
          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M150 180 Q180 200, 210 190 Q240 180, 260 200" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.3;0.7" dur="3.5s" repeatCount="indefinite" />
        </path>
      </g> */}

      {/* Futuristic plane/spacecraft */}
      {/* <g transform="translate(255, 110) rotate(30)">
        <path d="M0 0 L30 -8 L35 0 L30 8 Z" fill="#ffffff" opacity="0.9"/>
        <path d="M-5 0 L-10 -3 L-7 0 L-10 3 Z" fill="#ffffff" opacity="0.9"/>
        <path d="M32 -7 L35 -10 L38 -9 L35 -6 Z" fill="#25caac" opacity="0.9"/>
        <path d="M32 7 L35 10 L38 9 L35 6 Z" fill="#25caac" opacity="0.9"/>
        <circle cx="15" cy="0" r="2" fill="#0ceef2">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </g> */}

      {/* AI Neural network nodes */}
      {/* <g>
        <circle cx="150" cy="130" r="4" fill="#ffffff" opacity="0.9"/>
        <circle cx="170" cy="160" r="4" fill="#25caac" opacity="0.9"/>
        <circle cx="200" cy="175" r="4" fill="#ffffff" opacity="0.9"/>
        <circle cx="230" cy="155" r="4" fill="#25caac" opacity="0.9"/>
        <circle cx="250" cy="135" r="4" fill="#ffffff" opacity="0.9"/> */}

        {/* Animated connections */}
        {/* <line x1="150" y1="130" x2="170" y2="160" stroke="#0ceef2" stroke-width="1.2">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </line>
        <line x1="170" y1="160" x2="200" y2="175" stroke="#0ceef2" stroke-width="1.2">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.5s" repeatCount="indefinite" />
        </line>
        <line x1="200" y1="175" x2="230" y2="155" stroke="#0ceef2" stroke-width="1.2">
          <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
        </line>
        <line x1="230" y1="155" x2="250" y2="135" stroke="#0ceef2" stroke-width="1.2">
          <animate attributeName="opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" />
        </line>
      </g> */}

      {/* Hexagonal tech elements */}
      {/* <g fill="none" stroke="#25caac" stroke-width="0.8">
        <path d="M130,105 L140,100 L150,105 L150,115 L140,120 L130,115 Z" opacity="0.6"/>
        <path d="M250,175 L260,170 L270,175 L270,185 L260,190 L250,185 Z" opacity="0.6"/>
      </g> */}

      {/* </svg> */}

    </div>
  );
}

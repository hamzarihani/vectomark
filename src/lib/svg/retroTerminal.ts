export const generateTerminalSvg = (username: string, theme: string = 'github-dark') => {
  const isDark = theme.includes('dark') || theme === 'tokyo-night';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const termBg = '#000000';
  const textColor = '#00ff00'; // Retro green
  const headerColor = isDark ? '#161b22' : '#f6f8fa';
  const borderColor = isDark ? '#30363d' : '#d0d7de';

  return `
    <svg width="450" height="250" viewBox="0 0 450 250" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 12px 'Courier New', Courier, monospace; fill: #8b949e; }
        .text { font: 600 14px 'Courier New', Courier, monospace; fill: ${textColor}; }
        .prompt { fill: #58a6ff; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; rx: 10; }
        .term-bg { fill: ${termBg}; rx: 0 0 10 10; }
        .term-header { fill: ${headerColor}; stroke: ${borderColor}; stroke-width: 1; rx: 10 10 0 0; }
        
        /* Typing animations */
        .line { opacity: 0; animation: appear 0s forwards; }
        .line1 { animation-delay: 0.5s; }
        .line2 { animation-delay: 1.5s; }
        .line3 { animation-delay: 2.0s; }
        .line4 { animation-delay: 2.5s; }
        .line5 { animation-delay: 3.0s; }
        
        .cursor {
          display: inline-block;
          width: 8px;
          height: 15px;
          background-color: ${textColor};
          animation: blink 1s step-end infinite;
          opacity: 0;
        }
        .cursor-active { animation: blink 1s step-end infinite, appear 0s forwards; animation-delay: 3.5s; }

        @keyframes appear { to { opacity: 1; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        
        /* Scanline effect */
        .scanline {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255,255,255,0),
            rgba(255,255,255,0) 50%,
            rgba(0,0,0,0.2) 50%,
            rgba(0,0,0,0.2)
          );
          background-size: 100% 4px;
          pointer-events: none;
        }
      </style>
      
      <defs>
        <clipPath id="termClip">
          <rect x="0.5" y="0.5" width="449" height="249" rx="10" />
        </clipPath>
        <pattern id="scanlines" patternUnits="userSpaceOnUse" width="4" height="4">
          <rect width="4" height="2" fill="black" fill-opacity="0.2"/>
          <rect y="2" width="4" height="2" fill="transparent"/>
        </pattern>
      </defs>

      <rect x="0.5" y="0.5" width="449" height="249" rx="10" class="bg" />
      
      <g clip-path="url(#termClip)">
        <rect x="0.5" y="0.5" width="449" height="30" class="term-header" />
        <rect x="0.5" y="30.5" width="449" height="219" class="term-bg" />
        <!-- Scanline overlay -->
        <rect x="0.5" y="30.5" width="449" height="219" fill="url(#scanlines)" pointer-events="none"/>
      </g>

      <!-- Mac window buttons -->
      <circle cx="20" cy="15" r="6" fill="#ff5f56" />
      <circle cx="40" cy="15" r="6" fill="#ffbd2e" />
      <circle cx="60" cy="15" r="6" fill="#27c93f" />
      <text x="225" y="20" class="header" text-anchor="middle">bash - ${username}</text>

      <!-- Terminal Text -->
      <g transform="translate(15, 60)" class="text">
        <g class="line line1">
          <text x="0" y="0"><tspan class="prompt">~</tspan> $ ./fetch_profile.sh --user ${username}</text>
        </g>
        <g class="line line2">
          <text x="0" y="25">Loading profile data... [OK]</text>
        </g>
        <g class="line line3">
          <text x="0" y="50">Resolving dependencies... [OK]</text>
        </g>
        <g class="line line4">
          <text x="0" y="75">Compiling awesome statistics... [OK]</text>
        </g>
        <g class="line line5">
          <text x="0" y="110">SYSTEM STATUS: ONLINE</text>
          <text x="0" y="130">CURRENT MISSION: WRITING CLEAN CODE</text>
        </g>
        <g class="line cursor-active">
          <text x="0" y="160"><tspan class="prompt">~</tspan> $ <tspan fill="${textColor}">_</tspan></text>
        </g>
      </g>
    </svg>
  `;
};

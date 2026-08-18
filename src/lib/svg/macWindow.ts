export const generateMacWindowSvg = async (
  name: string,
  titles: string[],
  bio: string,
  location: string,
  focus: string,
  skills: string[] = [],
  theme: string = 'github-dark'
) => {
  const isDark = theme.includes('dark') || theme === 'tokyo-night';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const headerBg = isDark ? '#161b22' : '#f6f8fa';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const textColor = isDark ? '#c9d1d9' : '#24292f';
  const highlightColor = '#58a6ff';

  // We can join titles for a typing effect, or just show the first one
  const displayTitle = titles && titles.length > 0 ? titles.join(' | ') : 'Developer';
  // Map common skill names to skillicons.dev identifiers
  const iconAliases: Record<string, string> = {
    'springboot': 'spring',
    'reactjs': 'react',
    'node': 'nodejs',
    'next': 'nextjs',
    'vuejs': 'vue',
    'tailwind': 'tailwindcss',
    'html5': 'html',
    'css3': 'css',
    'postgres': 'postgresql',
    'csharp': 'cs',
    'cplusplus': 'cpp'
  };

  // Prepare skills for skillicons.dev
  const validSkills = skills.map(s => {
    let clean = s.toLowerCase().replace(/[^a-z0-9]/g, '');
    return iconAliases[clean] || clean;
  }).filter(Boolean);
  let skillsSvg = '';
  let windowHeight = 250;
  
  if (validSkills.length > 0) {
    const skillList = validSkills.join(',');
    const themeStr = theme.includes('dark') || theme === 'tokyo-night' || theme === 'catppuccin-mocha' || theme === 'cyberpunk' ? 'dark' : 'light';
    const iconsUrl = `https://skillicons.dev/icons?i=${skillList}&theme=${themeStr}&perline=12`;
    
    try {
      const res = await fetch(iconsUrl);
      if (res.ok) {
        skillsSvg = await res.text();
        // Remove any undefined groups returned by skillicons.dev for invalid icons
        // as they can break SVG rendering when embedded in markdown
        skillsSvg = skillsSvg.replace(/<g transform="[^"]+">\s*undefined\s*<\/g>/g, '');
        
        const heightMatch = skillsSvg.match(/height="([0-9.]+)"/);
        const svgHeight = heightMatch ? parseFloat(heightMatch[1]) : Math.ceil(validSkills.length / 12) * 55;
        
        // Main container is translated by 80px Y. Info grid ends at 140. Text subtitle at 160. Icons start at 175.
        // Absolute Y of icons start = 80 + 175 = 255.
        windowHeight = 255 + svgHeight + 40; // 40 for bottom padding
      }
    } catch (e) {
      console.error('Failed to fetch skill icons', e);
    }
  }

  return `
    <svg width="800" height="${windowHeight}" viewBox="0 0 800 ${windowHeight}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .text-title { font: 800 28px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .text-subtitle { font: 600 16px 'Courier New', Courier, monospace; fill: ${highlightColor}; }
        .text-body { font: 400 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.8; }
        .text-icon { font-size: 16px; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; }
        .header-bg { fill: ${headerBg}; stroke: ${borderColor}; stroke-width: 1; }
        
        .pulse { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        
        /* Floating particles in the background */
        .particle { fill: ${highlightColor}; opacity: 0.2; animation: float 10s infinite linear; }
        .p1 { animation-delay: 0s; }
        .p2 { animation-delay: -2s; }
        .p3 { animation-delay: -5s; }
        
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(10px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
      </style>
      
      <!-- Window Background -->
      <rect x="0.5" y="0.5" width="799" height="${windowHeight - 1}" rx="12" class="bg" />
      
      <!-- Particles -->
      <circle cx="700" cy="150" r="40" class="particle p1" />
      <circle cx="650" cy="80" r="20" class="particle p2" />
      <circle cx="750" cy="180" r="15" class="particle p3" />

      <!-- Window Header with rounded top corners -->
      <path d="M 0.5 12.5 Q 0.5 0.5 12.5 0.5 L 787.5 0.5 Q 799.5 0.5 799.5 12.5 L 799.5 36.5 L 0.5 36.5 Z" class="header-bg" />
      <circle cx="24" cy="18" r="6" fill="#ff5f56" />
      <circle cx="44" cy="18" r="6" fill="#ffbd2e" />
      <circle cx="64" cy="18" r="6" fill="#27c93f" />
      
      <!-- Header Title -->
      <text x="400" y="23" font-family="sans-serif" font-size="12" fill="${textColor}" opacity="0.6" text-anchor="middle">
        developer_profile.md - Vectomark
      </text>
      
      <!-- Main Content Container -->
      <g transform="translate(40, 80)">
        <text x="0" y="0" class="text-title">Hello, I'm ${name} 👋</text>
        
        <!-- Typing subtitle -->
        <g transform="translate(0, 30)">
          <text x="0" y="0" class="text-subtitle">> ${displayTitle}</text>
          <rect x="calc(10 + ${displayTitle.length * 9.5})" y="-12" width="8" height="15" fill="${highlightColor}" class="pulse" />
        </g>
        
        <!-- Bio -->
        <text x="0" y="70" class="text-body">${bio}</text>
        
        <!-- Info Grid -->
        <g transform="translate(0, 110)">
          <rect x="0" y="-15" width="300" height="30" fill="${headerBg}" rx="4" />
          <text x="10" y="5" class="text-icon">🌍</text>
          <text x="35" y="5" class="text-body">Location: ${location}</text>
        </g>
        
        <g transform="translate(320, 110)">
          <rect x="0" y="-15" width="300" height="30" fill="${headerBg}" rx="4" />
          <text x="10" y="5" class="text-icon">🔭</text>
          <text x="35" y="5" class="text-body">Focus: ${focus}</text>
        </g>
        
        <!-- Tech Stack -->
        ${skillsSvg ? `
        <g transform="translate(0, 160)">
          <text x="0" y="0" class="text-subtitle">> Tech Stack</text>
          <g transform="translate(0, 15)">
            ${skillsSvg}
          </g>
        </g>
        ` : ''}
      </g>
    </svg>
  `;
};

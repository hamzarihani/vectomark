import { ThemePalette } from '@/types/profile';

export const getThemeColors = (theme: ThemePalette) => {
  switch (theme) {
    case 'tokyo-night':
      return { primary: '7aa2f7', secondary: 'bb9af7', bg: '1a1b26' };
    case 'catppuccin-mocha':
      return { primary: 'cba6f7', secondary: 'f38ba8', bg: '1e1e2e' };
    case 'cyberpunk':
      return { primary: '00ff9f', secondary: 'ff003c', bg: '000000' };
    case 'nord':
      return { primary: '88c0d0', secondary: '81a1c1', bg: '2e3440' };
    case 'solarized-dark':
      return { primary: '268bd2', secondary: '2aa198', bg: '002b36' };
    case 'github-dark':
      return { primary: '58a6ff', secondary: '8b949e', bg: '0d1117' };
    default:
      return { primary: '58a6ff', secondary: '8b949e', bg: '0d1117' };
  }
};

export const generateWaveDivider = (theme: ThemePalette, animated: boolean = true) => {
  const colors = getThemeColors(theme);
  const svg = `
<svg width="100%" height="50" viewBox="0 0 1000 50" xmlns="http://www.w3.org/2000/svg">
  <style>
    .wave {
      animation: ${animated ? 'wave-animation 5s linear infinite' : 'none'};
      fill: #${colors.primary};
      opacity: 0.5;
    }
    @keyframes wave-animation {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
  </style>
  <path class="wave" d="M0,25 C150,50 350,0 500,25 C650,50 850,0 1000,25 C1150,50 1350,0 1500,25 C1650,50 1850,0 2000,25 L2000,50 L0,50 Z"/>
</svg>
`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const generateGlowingSeparator = (theme: ThemePalette) => {
  const colors = getThemeColors(theme);
  const svg = `
<svg width="100%" height="20" viewBox="0 0 1000 20" xmlns="http://www.w3.org/2000/svg">
  <style>
    .glow {
      stroke: #${colors.primary};
      stroke-width: 2;
      filter: drop-shadow(0 0 5px #${colors.primary});
      animation: pulse 2s infinite alternate;
    }
    @keyframes pulse {
      0% { filter: drop-shadow(0 0 2px #${colors.primary}); stroke-width: 1; }
      100% { filter: drop-shadow(0 0 10px #${colors.primary}); stroke-width: 3; }
    }
  </style>
  <line x1="10%" y1="10" x2="90%" y2="10" class="glow" />
</svg>
`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

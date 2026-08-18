export const generateSectionTitleSvg = (title: string, theme: string = 'github-dark') => {
  const isDark = theme.includes('dark') || theme === 'tokyo-night' || theme === 'catppuccin-mocha' || theme === 'cyberpunk';
  const headerBg = isDark ? '#161b22' : '#f6f8fa';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const textColor = isDark ? '#c9d1d9' : '#24292f';

  return `
    <svg width="800" height="40" viewBox="0 0 800 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header-bg { fill: ${headerBg}; stroke: ${borderColor}; stroke-width: 1; }
        .title-text { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
      </style>
      
      <rect x="0.5" y="0.5" width="799" height="39" rx="8" class="header-bg" />
      
      <!-- Mac Buttons -->
      <circle cx="20" cy="20" r="6" fill="#ff5f56" />
      <circle cx="40" cy="20" r="6" fill="#ffbd2e" />
      <circle cx="60" cy="20" r="6" fill="#27c93f" />
      
      <!-- Title -->
      <text x="400" y="25" class="title-text" text-anchor="middle">${title}</text>
    </svg>
  `;
};

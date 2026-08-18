export interface LanguageData {
  name: string;
  color: string;
  percentage: number;
}

function getCoordinatesForPercent(percent: number) {
  const x = Math.cos(2 * Math.PI * percent);
  const y = Math.sin(2 * Math.PI * percent);
  return [x, y];
}

export const generateLanguagesSvg = (langs: LanguageData[], theme: string = 'github-dark') => {
  const bgColor = theme.includes('dark') || theme === 'tokyo-night' ? '#0d1117' : '#ffffff';
  const textColor = theme.includes('dark') || theme === 'tokyo-night' ? '#c9d1d9' : '#24292f';
  const borderColor = theme.includes('dark') || theme === 'tokyo-night' ? '#30363d' : '#d0d7de';

  let cumulativePercent = 0;
  
  // Create SVG paths for the donut chart
  const slices = langs.map(lang => {
    // Start at -90deg (top)
    const startX = Math.cos(2 * Math.PI * (cumulativePercent - 0.25));
    const startY = Math.sin(2 * Math.PI * (cumulativePercent - 0.25));
    
    cumulativePercent += (lang.percentage / 100);
    
    const endX = Math.cos(2 * Math.PI * (cumulativePercent - 0.25));
    const endY = Math.sin(2 * Math.PI * (cumulativePercent - 0.25));
    
    const largeArcFlag = lang.percentage > 50 ? 1 : 0;
    
    // Radius is 50, center is 100,100
    const pathData = [
      `M ${100 + startX * 50} ${100 + startY * 50}`, // Move
      `A 50 50 0 ${largeArcFlag} 1 ${100 + endX * 50} ${100 + endY * 50}` // Arc
    ].join(' ');

    return `<path d="${pathData}" fill="none" stroke="${lang.color}" stroke-width="30" />`;
  }).join('\n      ');

  // Legend
  const legend = langs.map((lang, i) => {
    const yPos = 40 + (i * 25);
    return `
      <circle cx="220" cy="${yPos}" r="5" fill="${lang.color}" />
      <text x="235" y="${yPos + 4}" class="lang-text">${lang.name} ${lang.percentage}%</text>
    `;
  }).join('');

  return `
    <svg width="350" height="195" viewBox="0 0 350 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .lang-text { font: 400 13px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; }
      </style>
      <rect x="0.5" y="0.5" width="349" height="194" rx="10" class="bg" />
      <text x="25" y="30" class="header">Most Used Languages</text>
      
      ${slices}
      ${legend}
    </svg>
  `;
};

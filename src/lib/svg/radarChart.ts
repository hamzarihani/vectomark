export interface RadarData {
  frontend: number;
  backend: number;
  devops: number;
  data: number;
  security: number;
  openSource: number;
}

export const generateRadarSvg = (data: RadarData, theme: string = 'github-dark') => {
  const bgColor = theme.includes('dark') || theme === 'tokyo-night' ? '#0d1117' : '#ffffff';
  const textColor = theme.includes('dark') || theme === 'tokyo-night' ? '#c9d1d9' : '#24292f';
  const borderColor = theme.includes('dark') || theme === 'tokyo-night' ? '#30363d' : '#d0d7de';
  const accentColor = '#58a6ff';
  const polygonFill = 'rgba(88, 166, 255, 0.4)';

  const center = 110;
  const radius = 60;
  
  // Data values scaled to 0-1
  const values = [
    data.frontend,
    data.backend,
    data.devops,
    data.data,
    data.security,
    data.openSource
  ].map(v => Math.max(0.1, Math.min(1, v))); // 10% min for visibility

  const labels = ['Frontend', 'Backend', 'DevOps', 'Data', 'Security', 'Open Source'];

  // Helper to get coordinates
  const getCoords = (val: number, index: number, maxNodes: number) => {
    const angle = (Math.PI * 2 * index) / maxNodes - Math.PI / 2;
    return {
      x: center + radius * val * Math.cos(angle),
      y: center + radius * val * Math.sin(angle)
    };
  };

  // Draw Web
  let webStr = '';
  for (let level = 1; level <= 4; level++) {
    const levelScale = level / 4;
    const points = Array.from({ length: 6 }).map((_, i) => {
      const { x, y } = getCoords(levelScale, i, 6);
      return `${x},${y}`;
    }).join(' ');
    webStr += `<polygon points="${points}" fill="none" stroke="${borderColor}" stroke-width="1" />\n`;
  }

  // Draw Axes
  let axesStr = '';
  let labelsStr = '';
  for (let i = 0; i < 6; i++) {
    const end = getCoords(1, i, 6);
    axesStr += `<line x1="${center}" y1="${center}" x2="${end.x}" y2="${end.y}" stroke="${borderColor}" stroke-width="1" />\n`;
    
    // Position labels slightly outside
    const labelPos = getCoords(1.3, i, 6);
    labelsStr += `<text x="${labelPos.x}" y="${labelPos.y + 4}" class="label" text-anchor="middle">${labels[i]}</text>\n`;
  }

  // Draw Data Polygon
  const dataPoints = values.map((val, i) => {
    const { x, y } = getCoords(val, i, 6);
    return `${x},${y}`;
  }).join(' ');

  const dataPolygon = `<polygon points="${dataPoints}" fill="${polygonFill}" stroke="${accentColor}" stroke-width="2" />`;

  return `
    <svg width="300" height="230" viewBox="0 0 250 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 16px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .label { font: 600 10px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; }
      </style>
      <rect x="0.5" y="0.5" width="249" height="219" rx="10" class="bg" />
      <text x="125" y="25" class="header" text-anchor="middle">Developer Archetype</text>
      
      <g transform="translate(15, 10)">
        ${webStr}
        ${axesStr}
        ${dataPolygon}
        ${labelsStr}
      </g>
    </svg>
  `;
};

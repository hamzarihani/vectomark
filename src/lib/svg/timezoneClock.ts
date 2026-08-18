export const generateTimezoneClockSvg = (timezoneOffset: number = 0, theme: string = 'github-dark') => {
  const isDark = theme.includes('dark') || theme === 'tokyo-night';
  const bgColor = isDark ? '#0d1117' : '#ffffff';
  const textColor = isDark ? '#c9d1d9' : '#24292f';
  const borderColor = isDark ? '#30363d' : '#d0d7de';
  const primaryColor = '#58a6ff';
  
  // Calculate target time at the requested timezone offset
  const now = new Date();
  const targetTime = new Date(now.getTime() + (timezoneOffset * 3600000));
  
  const hours = targetTime.getUTCHours();
  const minutes = targetTime.getUTCMinutes();
  const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  
  const isActive = hours >= 9 && hours <= 22; // Active between 9am and 10pm
  const statusColor = isActive ? '#238636' : '#8957e5';
  const statusText = isActive ? 'ONLINE & CODING' : 'OFFLINE / SLEEPING';
  const orbitIcon = isActive ? '☀️' : '🌙';

  return `
    <svg width="350" height="150" viewBox="0 0 350 150" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; opacity: 0.8; }
        .time { font: 800 42px 'Courier New', Courier, monospace; fill: ${primaryColor}; letter-spacing: 2px; }
        .status { font: 700 12px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${statusColor}; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; rx: 10; }
        
        .pulse {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        
        .orbit {
          transform-origin: 290px 75px;
          animation: spin 10s linear infinite;
        }
        .orbit-icon {
          animation: counter-spin 10s linear infinite;
          transform-origin: center;
        }
        
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes counter-spin { 100% { transform: rotate(-360deg); } }
      </style>
      
      <rect x="0.5" y="0.5" width="349" height="149" class="bg" />
      
      <!-- Text Content -->
      <text x="30" y="45" class="header">Local Time (UTC${timezoneOffset >= 0 ? '+' : ''}${timezoneOffset})</text>
      <text x="30" y="95" class="time">${timeString}</text>
      
      <!-- Status Indicator -->
      <g transform="translate(30, 125)">
        <!-- Pulsing dot -->
        <circle cx="5" cy="-4" r="5" fill="${statusColor}" opacity="0.3" class="pulse" style="transform-origin: 5px -4px;" />
        <circle cx="5" cy="-4" r="4" fill="${statusColor}" />
        <text x="18" y="0" class="status">${statusText}</text>
      </g>

      <!-- Orbit Animation -->
      <g>
        <circle cx="290" cy="75" r="40" fill="none" stroke="${borderColor}" stroke-width="1" stroke-dasharray="4 4" />
        <circle cx="290" cy="75" r="25" fill="${bgColor}" stroke="${primaryColor}" stroke-width="2" />
        <text x="290" y="80" font-size="20" text-anchor="middle" dominant-baseline="middle">🌎</text>
        
        <g class="orbit">
          <g transform="translate(290, 35)" class="orbit-icon">
            <text x="0" y="0" font-size="18" text-anchor="middle" dominant-baseline="middle">${orbitIcon}</text>
          </g>
        </g>
      </g>
    </svg>
  `;
};

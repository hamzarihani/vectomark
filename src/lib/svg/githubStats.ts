export interface GithubStatsData {
  name: string;
  stars: number;
  commits: number;
  prs: number;
  issues: number;
  repos: number;
}

export const generateStatsSvg = (data: GithubStatsData, theme: string = 'github-dark') => {
  // We can expand themes later. For now, a sleek dark theme.
  const bgColor = theme.includes('dark') || theme === 'tokyo-night' ? '#0d1117' : '#ffffff';
  const textColor = theme.includes('dark') || theme === 'tokyo-night' ? '#c9d1d9' : '#24292f';
  const accentColor = '#58a6ff';
  const borderColor = theme.includes('dark') || theme === 'tokyo-night' ? '#30363d' : '#d0d7de';

  return `
    <svg width="450" height="195" viewBox="0 0 450 195" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        .header { font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${accentColor}; }
        .stat { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; }
        .bg { fill: ${bgColor}; stroke: ${borderColor}; stroke-width: 1; }
      </style>
      
      <rect x="0.5" y="0.5" width="449" height="194" rx="10" class="bg" />
      <text x="25" y="35" class="header">${data.name}'s GitHub Stats</text>
      
      <g transform="translate(25, 65)">
        <text x="0" y="15" class="stat">Total Stars:</text>
        <text x="150" y="15" class="stat" font-weight="bold">${data.stars}</text>
        
        <text x="0" y="45" class="stat">Total Commits:</text>
        <text x="150" y="45" class="stat" font-weight="bold">${data.commits}</text>
        
        <text x="0" y="75" class="stat">Total PRs:</text>
        <text x="150" y="75" class="stat" font-weight="bold">${data.prs}</text>
        
        <text x="0" y="105" class="stat">Total Issues:</text>
        <text x="150" y="105" class="stat" font-weight="bold">${data.issues}</text>
      </g>
    </svg>
  `;
};

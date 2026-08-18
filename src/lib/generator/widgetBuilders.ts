import { ThemePalette, SocialLink } from '@/types/profile';

export const getWidgetTheme = (theme: ThemePalette): string => {
  switch (theme) {
    case 'tokyo-night':
      return 'tokyonight';
    case 'catppuccin-mocha':
      return 'catppuccin_mocha';
    case 'cyberpunk':
      return 'radical';
    case 'nord':
      return 'nord';
    case 'solarized-dark':
      return 'solarized-dark';
    case 'github-dark':
      return 'github-dark';
    default:
      return 'default';
  }
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'https://vectomark.vercel.app';
};

export const buildGithubStatsUrl = (username: string, theme: ThemePalette, hideRank: boolean) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `${getBaseUrl()}/api/svg/stats?user=${username}&theme=${themeQuery}`;
};

export const buildStreakUrl = (username: string, theme: ThemePalette) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${themeQuery}&border_radius=10`;
};

export const buildTopLangsUrl = (username: string, theme: ThemePalette, layout: string) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `${getBaseUrl()}/api/svg/languages?user=${username}&theme=${themeQuery}`;
};

export const buildActivityGraphUrl = (username: string, theme: ThemePalette) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${themeQuery}&radius=10`;
};

export const build3dProfileUrl = (username: string) => {
  if (!username) return '';
  // Usually this requires a github action, but we'll try a public API mock or direct to an isometric renderer
  // Using a known public isometric API pattern
  return `https://isometric-contributions-spectrewolf8.onrender.com/api/graph?username=${username}&theme=dark`;
};

export const buildRadarUrl = (username: string, theme: ThemePalette) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `${getBaseUrl()}/api/svg/radar?user=${username}&theme=${themeQuery}`;
};

export const buildTerminalUrl = (username: string, theme: ThemePalette) => {
  if (!username) return '';
  const themeQuery = getWidgetTheme(theme);
  return `${getBaseUrl()}/api/svg/terminal?user=${username}&theme=${themeQuery}`;
};

export const buildMacWindowUrl = (
  name: string,
  titles: string[],
  bio: string,
  location: string,
  focus: string,
  skills: string[],
  theme: ThemePalette
) => {
  const themeQuery = getWidgetTheme(theme);
  const titlesQuery = titles && titles.length > 0 ? titles.join(';') : '';
  const skillsQuery = skills && skills.length > 0 ? skills.join(',') : '';
  const params = new URLSearchParams({
    name: name || '',
    titles: titlesQuery,
    bio: bio || '',
    location: location || '',
    focus: focus || '',
    skills: skillsQuery,
    theme: themeQuery
  });
  return `${getBaseUrl()}/api/svg/mac-window?${params.toString()}`;
};

export const buildClockUrl = (timezoneOffset: number, theme: ThemePalette) => {
  const themeQuery = getWidgetTheme(theme);
  return `${getBaseUrl()}/api/svg/clock?timezone=${timezoneOffset}&theme=${themeQuery}`;
};

export const buildTypingSvgUrl = (titles: string[], color: string, center: boolean = false) => {
  if (!titles || titles.length === 0) return '';
  const lines = titles.map((t) => encodeURIComponent(t)).join(';');
  const centerQuery = center ? '&center=true' : '';
  return `https://readme-typing-svg.demolab.com?font=Fira+Code&pause=1000&color=${color.replace('#', '')}${centerQuery}&vCenter=true&lines=${lines}`;
};

export const buildSkillIconsUrl = (skills: string[], theme: ThemePalette) => {
  if (!skills || skills.length === 0) return '';
  // Sanitize skill names to standard identifiers (alphanumeric only, lowercase)
  const skillList = skills
    .map((s) => s.toLowerCase().replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .join(',');
  const themeStr =
    theme.includes('dark') ||
    theme === 'tokyo-night' ||
    theme === 'catppuccin-mocha' ||
    theme === 'cyberpunk'
      ? 'dark'
      : 'light';
  return `https://skillicons.dev/icons?i=${skillList}&theme=${themeStr}`;
};

export const buildSocialBadgeUrl = (social: SocialLink) => {
  const name = encodeURIComponent(social.platform);
  const style = social.badgeStyle || 'flat';
  return `https://img.shields.io/badge/${name}-100000?style=${style}&logo=${name}&logoColor=white`;
};

export const buildSectionTitleUrl = (title: string, theme: ThemePalette) => {
  const themeQuery = getWidgetTheme(theme);
  const titleQuery = encodeURIComponent(title);
  return `${getBaseUrl()}/api/svg/section-title?title=${titleQuery}&theme=${themeQuery}`;
};

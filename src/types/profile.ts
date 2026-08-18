export type ThemePalette =
  | 'tokyo-night'
  | 'catppuccin-mocha'
  | 'cyberpunk'
  | 'nord'
  | 'solarized-dark'
  | 'github-dark'
  | 'custom';

export interface HeaderConfig {
  name: string;
  typingTitles: string[]; // e.g. ["Full Stack Developer", "Open Source Enthusiast"]
  alignment: 'left' | 'center' | 'right';
  waveDividerStyle: 'waves' | 'curve' | 'polygon' | 'none';
  avatarUrl?: string;
}

export interface SocialLink {
  platform: string; // e.g., 'github', 'twitter', 'linkedin'
  url: string;
  badgeStyle: 'flat' | 'plastic' | 'flat-square' | 'for-the-badge' | 'social';
  animated: boolean;
}

export interface AboutConfig {
  bioMarkdown: string;
  location: string;
  currentFocus: string;
  socials: SocialLink[];
}

export interface SkillCategory {
  name: string; // e.g., "Frontend", "Backend", "DevOps", "Database"
  skills: string[]; // e.g., ["React", "TypeScript", "Tailwind CSS"]
}

export interface SkillsConfig {
  categories: SkillCategory[];
  layoutPreset: 'grid' | 'list' | 'carousel' | 'hexagons';
}

export interface StatsConfig {
  showGithubStats: boolean;
  showStreakTracker: boolean;
  showTopLanguages: boolean;
  topLanguagesChartType: 'donut' | 'bar' | 'pie';
  showWakaTime: boolean;
  wakaTimeUsername?: string;
  showCommitActivityGraph: boolean;
  show3dProfile: boolean;
  showRadar: boolean;
  showRetroTerminal: boolean;
  showTimezoneClock: boolean;
  timezoneOffset: number;
  layoutStyle: 'stacked' | 'bento';
  githubUsername: string;
  hideRank: boolean;
}

export interface CustomSvgConfig {
  animatedGradientBorders: boolean;
  glowingSeparators: boolean;
  dynamicCounters: {
    views: boolean;
    stars: boolean;
    commits: boolean;
  };
}

export interface ProfileConfig {
  header: HeaderConfig;
  about: AboutConfig;
  skills: SkillsConfig;
  chartsAndStats: StatsConfig;
  theme: ThemePalette;
  customSvgs: CustomSvgConfig;
}

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ProfileConfig } from '@/types/profile';

interface ProfileState {
  config: ProfileConfig;
  updateHeader: (header: Partial<ProfileConfig['header']>) => void;
  updateAbout: (about: Partial<ProfileConfig['about']>) => void;
  updateSkills: (skills: Partial<ProfileConfig['skills']>) => void;
  updateChartsAndStats: (stats: Partial<ProfileConfig['chartsAndStats']>) => void;
  updateTheme: (theme: ProfileConfig['theme']) => void;
  updateCustomSvgs: (svgs: Partial<ProfileConfig['customSvgs']>) => void;
  resetConfig: () => void;
}

const defaultConfig: ProfileConfig = {
  header: {
    name: 'Hamza Rihani',
    typingTitles: ['Software Engineer', 'Open Source Contributor'],
    alignment: 'left',
    waveDividerStyle: 'waves',
  },
  about: {
    bioMarkdown: 'Hi there! 👋 I am a passionate developer.',
    location: 'Planet Earth',
    currentFocus: 'Building awesome tools',
    socials: [
      {
        platform: 'github',
        url: 'https://github.com/hamzarihani',
        badgeStyle: 'flat',
        animated: true,
      },
    ],
  },
  skills: {
    categories: [
      { name: 'Frontend', skills: ['React', 'Next.js', 'Tailwind CSS'] },
      { name: 'Backend', skills: ['Node.js', 'Express', 'PostgreSQL'] },
      { name: 'DevOps', skills: ['Docker', 'GitHub Actions'] },
      { name: 'Database', skills: ['MongoDB', 'Redis'] },
    ],
    layoutPreset: 'grid',
  },
  chartsAndStats: {
    showGithubStats: true,
    showStreakTracker: true,
    showTopLanguages: true,
    topLanguagesChartType: 'donut',
    showWakaTime: false,
    showCommitActivityGraph: false,
    show3dProfile: false,
    showRadar: false,
    showRetroTerminal: true,
    showTimezoneClock: true,
    timezoneOffset: 0,
    layoutStyle: 'stacked',
    githubUsername: 'hamzarihani',
    hideRank: false,
  },
  theme: 'tokyo-night',
  customSvgs: {
    animatedGradientBorders: true,
    glowingSeparators: false,
    dynamicCounters: {
      views: true,
      stars: false,
      commits: false,
    },
  },
};

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      config: defaultConfig,
      updateHeader: (header) =>
        set((state) => ({
          config: { ...state.config, header: { ...state.config.header, ...header } },
        })),
      updateAbout: (about) =>
        set((state) => ({
          config: { ...state.config, about: { ...state.config.about, ...about } },
        })),
      updateSkills: (skills) =>
        set((state) => ({
          config: { ...state.config, skills: { ...state.config.skills, ...skills } },
        })),
      updateChartsAndStats: (stats) =>
        set((state) => ({
          config: {
            ...state.config,
            chartsAndStats: { ...state.config.chartsAndStats, ...stats },
          },
        })),
      updateTheme: (theme) =>
        set((state) => ({
          config: { ...state.config, theme },
        })),
      updateCustomSvgs: (svgs) =>
        set((state) => ({
          config: { ...state.config, customSvgs: { ...state.config.customSvgs, ...svgs } },
        })),
      resetConfig: () => set({ config: defaultConfig }),
    }),
    {
      name: 'vectomark-profile-storage',
      storage: createJSONStorage(() => localStorage),
      merge: (persistedState: any, currentState: ProfileState) => {
        if (!persistedState || !persistedState.config) return currentState;
        const pc = persistedState.config;
        const cc = currentState.config;
        return {
          ...currentState,
          config: {
            ...cc,
            ...pc,
            header: { ...cc.header, ...pc.header },
            about: { ...cc.about, ...pc.about },
            skills: { ...cc.skills, ...pc.skills },
            chartsAndStats: { ...cc.chartsAndStats, ...pc.chartsAndStats },
            customSvgs: { ...cc.customSvgs, ...pc.customSvgs },
          },
        };
      },
    }
  )
);

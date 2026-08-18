import { ProfileConfig } from '@/types/profile';
import {
  buildGithubStatsUrl,
  buildStreakUrl,
  buildTopLangsUrl,
  buildTypingSvgUrl,
  buildSkillIconsUrl,
  buildSocialBadgeUrl,
  buildActivityGraphUrl,
  build3dProfileUrl,
  buildRadarUrl,
  buildTerminalUrl,
  buildClockUrl,
  buildMacWindowUrl,
  buildSectionTitleUrl
} from './widgetBuilders';
import { generateWaveDivider, generateGlowingSeparator, getThemeColors } from './svgTemplates';

export const generateMarkdown = (config: ProfileConfig): string => {
  if (!config) return '';

  const lines: string[] = [];
  const { header, about, skills, chartsAndStats, theme, customSvgs } = config;
  const colors = getThemeColors(theme || 'github-dark');
  const isCentered = header?.alignment === 'center';

  // ==========================================
  // Header Section
  // ==========================================
  if (isCentered) {
    lines.push('<div align="center">');
  } else if (header?.alignment === 'right') {
    lines.push('<div align="right">');
  } else {
    lines.push('<div>');
  }

  // Mac Window SVG replaces traditional header & about text
  const allSkills = skills?.categories ? skills.categories.flatMap(c => c.skills) : [];
  const macWindowUrl = buildMacWindowUrl(
    header.name,
    header.typingTitles,
    about?.bioMarkdown,
    about?.location,
    about?.currentFocus,
    allSkills,
    theme || 'github-dark'
  );

  lines.push(`  <img src="${macWindowUrl}" alt="Profile Intro" width="100%" />`);



  lines.push('</div>');
  lines.push('\n');



  lines.push('<br/>');



  // ==========================================
  // Charts & Stats Section
  // ==========================================
  if (chartsAndStats?.githubUsername) {
    const titleUrl = buildSectionTitleUrl('📊 GitHub Analytics', theme || 'github-dark');
    lines.push(`<p align="center"><img src="${titleUrl}" alt="GitHub Analytics" width="100%" /></p>`);
    lines.push('<br/>');
    lines.push('<div align="center">');

    const u = chartsAndStats.githubUsername;
    const t = theme || 'github-dark';
    
    // Generate all URLs
    const statsUrl = chartsAndStats.showGithubStats ? buildGithubStatsUrl(u, t, chartsAndStats.hideRank) : null;
    const streakUrl = chartsAndStats.showStreakTracker ? buildStreakUrl(u, t) : null;
    const langsUrl = chartsAndStats.showTopLanguages ? buildTopLangsUrl(u, t, chartsAndStats.topLanguagesChartType) : null;
    const cityUrl = chartsAndStats.show3dProfile ? build3dProfileUrl(u) : null;
    const activityUrl = chartsAndStats.showCommitActivityGraph ? buildActivityGraphUrl(u, t) : null;
    const radarUrl = chartsAndStats.showRadar ? buildRadarUrl(u, t) : null;
    const terminalUrl = chartsAndStats.showRetroTerminal ? buildTerminalUrl(u, t) : null;

    if (chartsAndStats.layoutStyle === 'bento') {
      // Bento Grid Layout using HTML Table
      lines.push('<table align="center" border="0">');
      
      const spacerRow = '<tr><td colspan="3" height="30"></td></tr>';
      let hasPreviousRow = false;

      // Row 1: Retro Terminal Activity (Full width, prominent at the top)
      if (terminalUrl) {
        lines.push('<tr>');
        lines.push(`<td colspan="3" align="center"><img src="${terminalUrl}" alt="Retro Terminal Activity" width="100%" /></td>`);
        lines.push('</tr>');
        hasPreviousRow = true;
      }

      // Row 2: Stats and Streak
      if (statsUrl || streakUrl) {
        if (hasPreviousRow) lines.push(spacerRow);
        lines.push('<tr>');
        if (statsUrl && streakUrl) {
          lines.push(`<td align="center"><img src="${statsUrl}" alt="GitHub Stats" /></td>`);
          lines.push('<td width="30"></td>');
          lines.push(`<td align="center"><img src="${streakUrl}" alt="GitHub Streak" /></td>`);
        } else {
          lines.push(`<td colspan="3" align="center"><img src="${statsUrl || streakUrl}" alt="GitHub Widget" /></td>`);
        }
        lines.push('</tr>');
        hasPreviousRow = true;
      }

      // Row 3: Radar and Top Langs
      if (radarUrl || langsUrl) {
        if (hasPreviousRow) lines.push(spacerRow);
        lines.push('<tr>');
        if (radarUrl && langsUrl) {
          lines.push(`<td align="center"><img src="${radarUrl}" alt="Developer Radar" /></td>`);
          lines.push('<td width="30"></td>');
          lines.push(`<td align="center"><img src="${langsUrl}" alt="Top Languages" /></td>`);
        } else {
          lines.push(`<td colspan="3" align="center"><img src="${radarUrl || langsUrl}" alt="GitHub Widget" /></td>`);
        }
        lines.push('</tr>');
        hasPreviousRow = true;
      }
      
      // Row 4: Activity Pulse Graph (Full width)
      if (activityUrl) {
        if (hasPreviousRow) lines.push(spacerRow);
        lines.push('<tr>');
        lines.push(`<td colspan="3" align="center"><img src="${activityUrl}" alt="Activity Pulse Graph" width="100%" /></td>`);
        lines.push('</tr>');
        hasPreviousRow = true;
      }

      // Row 5: 3D City (Full width)
      if (cityUrl) {
        if (hasPreviousRow) lines.push(spacerRow);
        lines.push('<tr>');
        lines.push(`<td colspan="3" align="center"><img src="${cityUrl}" alt="3D Contribution City" width="100%" /></td>`);
        lines.push('</tr>');
        hasPreviousRow = true;
      }

      lines.push('</table>');
      lines.push('<br/>');

    } else {
      // Stacked Layout (Default)
      if (terminalUrl) {
        lines.push(`<p align="center"><img src="${terminalUrl}" alt="Retro Terminal Activity" /></p>`);
        lines.push('<br/>');
      }

      if (statsUrl || streakUrl) {
        lines.push('<p align="center">');
        const row1 = [];
        if (statsUrl) row1.push(`<img src="${statsUrl}" alt="GitHub Stats" />`);
        if (streakUrl) row1.push(`<img src="${streakUrl}" alt="GitHub Streak" />`);
        lines.push(row1.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'));
        lines.push('</p>');
        lines.push('<br/>');
      }

      if (radarUrl || langsUrl) {
        lines.push('<p align="center">');
        const row2 = [];
        if (radarUrl) row2.push(`<img src="${radarUrl}" alt="Developer Radar" />`);
        if (langsUrl) row2.push(`<img src="${langsUrl}" alt="Top Languages" />`);
        lines.push(row2.join('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'));
        lines.push('</p>');
        lines.push('<br/>');
      }



      if (activityUrl) {
        lines.push(`<p align="center"><img src="${activityUrl}" alt="Activity Pulse Graph" /></p>`);
        lines.push('<br/>');
      }

      if (cityUrl) {
        lines.push(`<p align="center"><img src="${cityUrl}" alt="3D Contribution City" /></p>`);
        lines.push('<br/>');
      }
    }
    
    lines.push('</div>\n');
  }

  return lines.join('\n');
};

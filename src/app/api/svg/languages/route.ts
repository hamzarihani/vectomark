import { NextRequest, NextResponse } from 'next/server';
import { generateLanguagesSvg, LanguageData } from '@/lib/svg/topLanguages';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('user') || 'hamzarihani';
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {},
      next: { revalidate: 3600 }
    });

    let sortedLangs: LanguageData[] = [];

    if (reposRes.ok) {
      const repos = await reposRes.json();
      
      // Calculate language distribution
      const langCounts: Record<string, number> = {};
      let total = 0;
      
      repos.forEach((repo: any) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          total++;
        }
      });

      // Mock colors for top languages
      const langColors: Record<string, string> = {
        'TypeScript': '#3178c6',
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C++': '#f34b7d',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
      };

      // Sort and calculate percentages
      sortedLangs = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5) // Top 5 languages
        .map(([name, count]) => ({
          name,
          color: langColors[name] || '#8b949e',
          percentage: Math.round((count / total) * 100)
        }));

      // Adjust if they don't add up to 100% exactly due to rounding or slicing
      const currentTotal = sortedLangs.reduce((acc, curr) => acc + curr.percentage, 0);
      if (sortedLangs.length > 0 && currentTotal !== 100) {
        sortedLangs[0].percentage += (100 - currentTotal);
      }
    }

    // Fallback to beautiful mock data if rate-limited or no languages found
    if (sortedLangs.length === 0) {
      sortedLangs = [
        { name: 'TypeScript', color: '#3178c6', percentage: 45 },
        { name: 'JavaScript', color: '#f1e05a', percentage: 25 },
        { name: 'Python', color: '#3572A5', percentage: 15 },
        { name: 'HTML', color: '#e34c26', percentage: 10 },
        { name: 'CSS', color: '#563d7c', percentage: 5 },
      ];
    }

    const svg = generateLanguagesSvg(sortedLangs, theme);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    const errorSvg = `
      <svg width="350" height="195" viewBox="0 0 350 195" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="350" height="195" fill="#0d1117" rx="10" />
        <text x="25" y="35" font-family="sans-serif" fill="#ff7b72">Error fetching languages</text>
      </svg>
    `;
    return new NextResponse(errorSvg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

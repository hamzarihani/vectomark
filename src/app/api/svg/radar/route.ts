import { NextRequest, NextResponse } from 'next/server';
import { generateRadarSvg, RadarData } from '@/lib/svg/radarChart';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('user') || 'hamzarihani';
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    // In a real implementation, we would analyze the user's top languages 
    // and map them to archetypes (e.g. React -> Frontend, Go -> Backend/DevOps).
    // For this demonstration, we'll generate some realistic random stats 
    // based on a hash of the username so it stays consistent per user.
    
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Seeded random between 0.3 and 1.0
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed++) * 10000;
      return 0.3 + (x - Math.floor(x)) * 0.7;
    };

    const data: RadarData = {
      frontend: seededRandom(hash),
      backend: seededRandom(hash + 1),
      devops: seededRandom(hash + 2),
      data: seededRandom(hash + 3),
      security: seededRandom(hash + 4),
      openSource: seededRandom(hash + 5)
    };

    const svg = generateRadarSvg(data, theme);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    const errorSvg = `
      <svg width="300" height="230" viewBox="0 0 250 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="250" height="220" fill="#0d1117" rx="10" />
        <text x="125" y="110" font-family="sans-serif" fill="#ff7b72" text-anchor="middle">Error fetching radar</text>
      </svg>
    `;
    return new NextResponse(errorSvg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { generateMacWindowSvg } from '@/lib/svg/macWindow';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name') || 'Hamza Rihani';
  const titles = searchParams.get('titles') ? searchParams.get('titles')!.split(';') : ['Developer'];
  const bio = searchParams.get('bio') || 'Hi there! I am a passionate developer.';
  const location = searchParams.get('location') || 'Planet Earth';
  const focus = searchParams.get('focus') || 'Building awesome tools';
  const skillsParam = searchParams.get('skills');
  const skills = skillsParam ? skillsParam.split(',') : [];
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    const svg = await generateMacWindowSvg(name, titles, bio, location, focus, skills, theme);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    const errorSvg = `
      <svg width="800" height="350" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="800" height="350" fill="#0d1117" rx="10" />
        <text x="400" y="175" font-family="sans-serif" fill="#ff7b72" text-anchor="middle">MacWindow Error</text>
      </svg>
    `;
    return new NextResponse(errorSvg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

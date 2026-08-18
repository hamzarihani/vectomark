import { NextRequest, NextResponse } from 'next/server';
import { generateTerminalSvg } from '@/lib/svg/retroTerminal';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('user') || 'hamzarihani';
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    const svg = generateTerminalSvg(username, theme);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    const errorSvg = `
      <svg width="450" height="250" viewBox="0 0 450 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="450" height="250" fill="#0d1117" rx="10" />
        <text x="225" y="125" font-family="sans-serif" fill="#ff7b72" text-anchor="middle">Terminal Error</text>
      </svg>
    `;
    return new NextResponse(errorSvg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

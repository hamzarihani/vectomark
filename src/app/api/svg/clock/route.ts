import { NextRequest, NextResponse } from 'next/server';
import { generateTimezoneClockSvg } from '@/lib/svg/timezoneClock';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const timezone = searchParams.get('timezone') || '0';
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    const offset = parseFloat(timezone);
    const svg = generateTimezoneClockSvg(isNaN(offset) ? 0 : offset, theme);

    // Disable caching so time is always accurate when requested
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
    });
  } catch (error) {
    const errorSvg = `
      <svg width="350" height="150" viewBox="0 0 350 150" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="350" height="150" fill="#0d1117" rx="10" />
        <text x="175" y="75" font-family="sans-serif" fill="#ff7b72" text-anchor="middle">Clock Error</text>
      </svg>
    `;
    return new NextResponse(errorSvg, { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

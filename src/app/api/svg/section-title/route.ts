import { NextRequest, NextResponse } from 'next/server';
import { generateSectionTitleSvg } from '@/lib/svg/sectionTitle';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Section Title';
  const theme = searchParams.get('theme') || 'github-dark';

  try {
    const svg = generateSectionTitleSvg(title, theme);
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    return new NextResponse('<svg></svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
  }
}

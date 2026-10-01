import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/api/reports') || pathname.startsWith('/api/summary')) {
    const token = request.cookies.get('negativescope_session')?.value;

    if (!token) {
      if (pathname.startsWith('/api')) {
        return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
      }

      return NextResponse.redirect(new URL('/login', request.url));
    }

    const payload = verifyToken(token);

    if (!payload || payload.role !== 'admin') {
      const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
      redirectResponse.cookies.delete('negativescope_session');
      return redirectResponse;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/reports', '/api/summary']
};

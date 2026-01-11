import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('better-auth.session_token');
    if (!token) {
      const signInUrl = new URL('/auth/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
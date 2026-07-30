import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { isValidCanonicalReference } from '@/lib/canonical';

export async function proxy(request: NextRequest) {
  // Redirect www to non-www (preferred domain: sidraraza.xyz)
  if (request.headers.get('host')?.startsWith('www.')) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.host = 'sidraraza.xyz';

    return NextResponse.redirect(url);
  }

  // Log potential canonical tag issues
  const canonicalHeader = request.headers.get('x-canonical-url');
  if (canonicalHeader) {
    const isValid = isValidCanonicalReference(canonicalHeader, request.url);
    if (!isValid) {
      console.warn(`Potential canonical tag issue detected: ${canonicalHeader} on page ${request.url}`);
    }
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('session_token')?.value;

    if (!token) {
      const signInUrl = new URL('/auth/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(signInUrl);
    }

    // Verify the token - getUserFromToken is async
    try {
      const user = await auth.getUserFromToken(token);
      if (!user) {
        const signInUrl = new URL('/auth/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
        return NextResponse.redirect(signInUrl);
      }
    } catch (error) {
      console.error('Authentication error in proxy:', error);
      const signInUrl = new URL('/auth/sign-in', request.url);
      signInUrl.searchParams.set('callbackUrl', request.nextUrl.pathname + request.nextUrl.search);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

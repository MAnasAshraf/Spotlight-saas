
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This is a basic middleware function.
// It currently doesn't do anything other than pass the request to the next handler.
// If you don't need any middleware, you can delete this file.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// Add specific paths you want this middleware to run on.
// Or remove/comment out if you want it to run on all paths (not generally recommended without specific logic).
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     *
     * This example matcher is commented out. If you need middleware,
     * uncomment and adjust it, or provide your own.
     * If you don't need any middleware logic, you can safely delete this file.
     */
    // '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

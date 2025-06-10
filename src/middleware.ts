
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This is a basic middleware function.
// If the matcher below is empty, this function will not be invoked for any paths.
export function middleware(request: NextRequest) {
  return NextResponse.next();
}

// By setting the matcher to an empty array, this middleware will not run on any paths.
// If you don't need any middleware logic at all, you can safely delete this file.
export const config = {
  matcher: [],
};

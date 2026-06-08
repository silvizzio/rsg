import { NextRequest, NextResponse } from 'next/server'

const SECRET = process.env.IMG_SECRET || 'efm-internal-2026'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/images/docs/')) {
    const token = request.cookies.get('efm-token')?.value
    if (token !== SECRET) {
      // Set cookie and redirect back to the image
      const response = NextResponse.redirect(request.url)
      response.cookies.set('efm-token', SECRET, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      })
      return response
    }
    return NextResponse.next()
  }

  // Set session cookie on all page requests
  const response = NextResponse.next()
  response.cookies.set('efm-token', SECRET, {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}

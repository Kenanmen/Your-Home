import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose/jwt/verify'

const AUTH_COOKIE_NAME = 'yourhome_auth_token'

export async function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const secret = process.env.AUTH_SECRET

  if (!authCookie || !secret) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(authCookie, new TextEncoder().encode(secret))
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/post/:path*']
}

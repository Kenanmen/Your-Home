import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAuthCookieName, getSessionAgeSeconds, signSessionToken } from '@/lib/auth'

const OAUTH_STATE_COOKIE = 'yourhome_oauth_state'

type GoogleTokenResponse = {
  access_token?: string
  id_token?: string
  error?: string
}

type GoogleUserInfo = {
  sub: string
  email: string
  name: string
}

export async function GET(request: NextRequest) {
  const appUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin
  const clientId = process.env.GOOGLE_CLIENT_ID
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL('/login?error=google_config', request.url))
  }

  const code = request.nextUrl.searchParams.get('code')
  const returnedState = request.nextUrl.searchParams.get('state')
  const storedState = cookies().get(OAUTH_STATE_COOKIE)?.value

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=google_code', request.url))
  }

  if (!returnedState || !storedState || returnedState !== storedState) {
    const stateErrorResponse = NextResponse.redirect(new URL('/login?error=google_state', request.url))
    stateErrorResponse.cookies.set({
      name: OAUTH_STATE_COOKIE,
      value: '',
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0
    })
    return stateErrorResponse
  }

  const redirectUri = `${appUrl}/api/auth/google/callback`

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  })

  const tokenData = (await tokenResponse.json()) as GoogleTokenResponse

  if (!tokenResponse.ok || !tokenData.access_token) {
    return NextResponse.redirect(new URL('/login?error=google_token', request.url))
  }

  const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`
    }
  })

  const profile = (await profileResponse.json()) as Partial<GoogleUserInfo>

  if (!profileResponse.ok || !profile.email || !profile.name || !profile.sub) {
    return NextResponse.redirect(new URL('/login?error=google_profile', request.url))
  }

  const existingByGoogleId = await prisma.user.findUnique({
    where: { googleId: profile.sub }
  })

  const existingByEmail = await prisma.user.findUnique({
    where: { email: profile.email.toLowerCase() }
  })

  const user =
    existingByGoogleId ??
    (existingByEmail
      ? await prisma.user.update({
          where: { id: existingByEmail.id },
          data: { googleId: profile.sub, name: profile.name }
        })
      : await prisma.user.create({
          data: {
            name: profile.name,
            email: profile.email.toLowerCase(),
            googleId: profile.sub
          }
        }))

  const token = signSessionToken({
    sub: user.id,
    email: user.email,
    name: user.name
  })

  const successResponse = NextResponse.redirect(new URL('/', request.url))
  successResponse.cookies.set({
    name: getAuthCookieName(),
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: getSessionAgeSeconds()
  })
  successResponse.cookies.set({
    name: OAUTH_STATE_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  })

  return successResponse
}

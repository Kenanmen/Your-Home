import { NextRequest, NextResponse } from 'next/server'

const OAUTH_STATE_COOKIE = 'yourhome_oauth_state'
const OAUTH_STATE_MAX_AGE_SECONDS = 60 * 10

export async function GET(request: NextRequest) {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const appUrl = process.env.NEXTAUTH_URL ?? request.nextUrl.origin

  if (!clientId) {
    return NextResponse.json(
      { message: 'Google OAuth is not configured. Add GOOGLE_CLIENT_ID.' },
      { status: 500 }
    )
  }

  const redirectUri = `${appUrl}/api/auth/google/callback`
  const state = crypto.randomUUID()
  const scope = encodeURIComponent('openid email profile')

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${scope}` +
    `&access_type=offline` +
    `&prompt=select_account` +
    `&state=${encodeURIComponent(state)}`

  const response = NextResponse.json({ url })
  response.cookies.set({
    name: OAUTH_STATE_COOKIE,
    value: state,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: OAUTH_STATE_MAX_AGE_SECONDS
  })

  return response
}

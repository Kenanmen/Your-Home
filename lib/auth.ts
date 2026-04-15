import jwt from 'jsonwebtoken'

const AUTH_COOKIE_NAME = 'yourhome_auth_token'
const SESSION_AGE_SECONDS = 60 * 60 * 24 * 7

type SessionPayload = {
  sub: string
  email: string
  name: string
}

type SessionTokenPayload = SessionPayload & jwt.JwtPayload

export function getAuthCookieName(): string {
  return AUTH_COOKIE_NAME
}

export function getSessionAgeSeconds(): number {
  return SESSION_AGE_SECONDS
}

export function signSessionToken(payload: SessionPayload): string {
  const secret = process.env.AUTH_SECRET

  if (!secret) {
    throw new Error('AUTH_SECRET is required.')
  }

  return jwt.sign(payload, secret, { expiresIn: SESSION_AGE_SECONDS })
}

export function verifySessionToken(token: string): SessionTokenPayload | null {
  const secret = process.env.AUTH_SECRET

  if (!secret) {
    throw new Error('AUTH_SECRET is required.')
  }

  try {
    return jwt.verify(token, secret) as SessionTokenPayload
  } catch {
    return null
  }
}

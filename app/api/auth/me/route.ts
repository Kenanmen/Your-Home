import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getAuthCookieName, verifySessionToken } from '@/lib/auth'

export async function GET() {
  const token = cookies().get(getAuthCookieName())?.value

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  const session = verifySessionToken(token)

  if (!session) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  return NextResponse.json({
    user: {
      id: session.sub,
      name: session.name,
      email: session.email
    }
  })
}

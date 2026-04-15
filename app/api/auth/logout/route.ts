import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getAuthCookieName } from '@/lib/auth'

export async function POST() {
  cookies().set({
    name: getAuthCookieName(),
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0
  })

  return NextResponse.json({ message: 'Logged out successfully.' })
}

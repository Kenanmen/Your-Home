import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getAuthCookieName, getSessionAgeSeconds, signSessionToken } from '@/lib/auth'

type LoginBody = {
  email?: string
  password?: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginBody
    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 })
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { message: 'This account uses Google sign-in. Please continue with Google.' },
        { status: 400 }
      )
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash)

    if (!passwordMatches) {
      return NextResponse.json({ message: 'Invalid email or password.' }, { status: 401 })
    }

    const token = signSessionToken({
      sub: user.id,
      email: user.email,
      name: user.name
    })

    cookies().set({
      name: getAuthCookieName(),
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: getSessionAgeSeconds()
    })

    return NextResponse.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Failed to log in.' }, { status: 500 })
  }
}

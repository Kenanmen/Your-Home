import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'

type SignupBody = {
  name?: string
  email?: string
  password?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,24}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody
    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()
    const password = body.password

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'Name, email, and password are required.' }, { status: 400 })
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 })
    }

    if (!USERNAME_REGEX.test(name)) {
      return NextResponse.json(
        { message: 'Username must be 3-24 characters and use only letters, numbers, or underscores.' },
        { status: 400 }
      )
    }

    if (!PASSWORD_REGEX.test(password)) {
      return NextResponse.json(
        { message: 'Password must be 8+ characters and include uppercase, lowercase, and a number.' },
        { status: 400 }
      )
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 409 })
    }

    const existingUsername = await prisma.user.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
      select: { id: true }
    })

    if (existingUsername) {
      return NextResponse.json({ message: 'This username is already taken.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return NextResponse.json({ message: 'Account created successfully.', user }, { status: 201 })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ message: 'Failed to create account.' }, { status: 500 })
  }
}

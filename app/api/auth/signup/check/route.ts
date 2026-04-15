import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,24}$/

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const rawEmail = searchParams.get('email')?.trim().toLowerCase()
    const rawName = searchParams.get('name')?.trim()

    if (!rawEmail && !rawName) {
      return NextResponse.json(
        {
          emailAvailable: null,
          usernameAvailable: null
        },
        { status: 200 }
      )
    }

    let emailAvailable: boolean | null = null
    let usernameAvailable: boolean | null = null

    if (rawEmail) {
      if (!EMAIL_REGEX.test(rawEmail)) {
        return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 })
      }

      const emailOwner = await prisma.user.findUnique({
        where: { email: rawEmail },
        select: { id: true }
      })

      emailAvailable = !emailOwner
    }

    if (rawName) {
      if (!USERNAME_REGEX.test(rawName)) {
        return NextResponse.json(
          { message: 'Username must be 3-24 characters and use only letters, numbers, or underscores.' },
          { status: 400 }
        )
      }

      const usernameOwner = await prisma.user.findFirst({
        where: { name: { equals: rawName, mode: 'insensitive' } },
        select: { id: true }
      })

      usernameAvailable = !usernameOwner
    }

    return NextResponse.json({ emailAvailable, usernameAvailable })
  } catch (error) {
    console.error('Signup availability check error:', error)
    return NextResponse.json({ message: 'Unable to validate signup fields.' }, { status: 500 })
  }
}

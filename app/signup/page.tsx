'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import styles from './signup.module.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,24}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.56 2.7-3.86 2.7-6.62Z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.46-.8 5.94-2.18l-2.9-2.26c-.8.54-1.83.86-3.04.86-2.34 0-4.33-1.58-5.04-3.7H.96v2.32A9 9 0 0 0 9 18Z"
      />
      <path
        fill="#FBBC05"
        d="M3.96 10.72A5.41 5.41 0 0 1 3.68 9c0-.6.1-1.18.28-1.72V4.96H.96A9 9 0 0 0 0 9c0 1.46.35 2.84.96 4.04l3-2.32Z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.5.46 3.42 1.35l2.56-2.56A8.58 8.58 0 0 0 9 0 9 9 0 0 0 .96 4.96l3 2.32c.7-2.12 2.7-3.7 5.04-3.7Z"
      />
    </svg>
  )
}

export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [fieldHint, setFieldHint] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false)

  const validateFields = () => {
    if (!name || !email || !password || !confirmPassword) {
      return 'Please fill in all required fields.'
    }

    if (!USERNAME_REGEX.test(name)) {
      return 'Username must be 3-24 characters and use only letters, numbers, or underscores.'
    }

    if (!EMAIL_REGEX.test(email)) {
      return 'Please enter a valid email address.'
    }

    if (!PASSWORD_REGEX.test(password)) {
      return 'Password must be 8+ characters and include uppercase, lowercase, and a number.'
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match.'
    }

    return null
  }

  const checkAvailability = async (options: { checkEmail?: boolean; checkName?: boolean }) => {
    const params = new URLSearchParams()

    if (options.checkEmail && EMAIL_REGEX.test(email)) {
      params.set('email', email.trim().toLowerCase())
    }

    if (options.checkName && USERNAME_REGEX.test(name)) {
      params.set('name', name.trim())
    }

    if (!params.toString()) {
      return true
    }

    try {
      setIsCheckingAvailability(true)
      const response = await fetch(`/api/auth/signup/check?${params.toString()}`)
      const data = (await response.json()) as {
        message?: string
        emailAvailable?: boolean | null
        usernameAvailable?: boolean | null
      }

      if (!response.ok) {
        setError(data.message ?? 'Unable to validate your details right now.')
        return false
      }

      if (data.emailAvailable === false) {
        setError('This email is already in use.')
        return false
      }

      if (data.usernameAvailable === false) {
        setError('This username is already taken.')
        return false
      }

      setFieldHint('Looks good. Email and username are available.')
      return true
    } catch (availabilityError) {
      console.error('Availability check error:', availabilityError)
      setError('Could not verify email/username availability.')
      return false
    } finally {
      setIsCheckingAvailability(false)
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setError('')
    setFieldHint('')

    const fieldError = validateFields()
    if (fieldError) {
      setError(fieldError)
      return
    }

    try {
      setIsSubmitting(true)
      const isAvailable = await checkAvailability({ checkEmail: true, checkName: true })
      if (!isAvailable) {
        return
      }

      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        setError(data.message ?? 'Unable to create account.')
        return
      }

      setMessage(data.message ?? 'Account created successfully.')
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
      setFieldHint('')
      router.push('/login')
    } catch (submitError) {
      console.error('Signup submit error:', submitError)
      setError('Something went wrong while creating your account.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      setIsGoogleLoading(true)
      setError('')
      setMessage('')
      setFieldHint('')

      const response = await fetch('/api/auth/google/url')
      const data = (await response.json()) as { url?: string; message?: string }

      if (!response.ok || !data.url) {
        setError(data.message ?? 'Unable to start Google sign up.')
        return
      }

      window.location.href = data.url
    } catch (googleError) {
      console.error('Google signup error:', googleError)
      setError('Something went wrong while connecting to Google.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Create your account</h1>
            <p className={styles.subtitle}>Sign up to manage listings and save property activity.</p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="full-name">Username</label>
              <input
                id="full-name"
                type="text"
                className={styles.input}
                value={name}
                onChange={(event) => {
                  setName(event.target.value)
                  setError('')
                  setFieldHint('')
                }}
                onBlur={() => { void checkAvailability({ checkName: true }) }}
                placeholder="Choose a username"
              />

              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setError('')
                  setFieldHint('')
                }}
                onBlur={() => { void checkAvailability({ checkEmail: true }) }}
                placeholder="name@example.com"
              />

              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setError('')
                  setFieldHint('')
                }}
                placeholder="8+ chars, uppercase, lowercase, number"
              />

              <label className={styles.label} htmlFor="confirm-password">Confirm password</label>
              <input
                id="confirm-password"
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  setError('')
                  setFieldHint('')
                }}
                placeholder="Re-enter your password"
              />

              {error && <p className={styles.error}>{error}</p>}
              {fieldHint && <p className={styles.success}>{fieldHint}</p>}
              {message && <p className={styles.success}>{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting || isCheckingAvailability}>
                {isSubmitting
                  ? 'Creating account...'
                  : isCheckingAvailability
                    ? 'Validating details...'
                    : 'Create account'}
              </button>
            </form>
            <button
              type="button"
              className={`btn btn-secondary ${styles.oauthButton}`}
              disabled={isGoogleLoading}
              onClick={handleGoogleSignup}
            >
              <span className={styles.oauthContent}>
                <span className={styles.googleIconWrap}><GoogleIcon /></span>
                {isGoogleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
              </span>
            </button>
            <p className={styles.switchAuthText}>
              Already have an account? <Link href="/login" className={styles.switchAuthLink}>Log in</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

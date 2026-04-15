'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import styles from './login.module.css'

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

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [oauthError, setOauthError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessage('')
    setError('')

    if (!email || !password) {
      setError('Please enter both email and password.')
      return
    }

    try {
      setIsSubmitting(true)

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = (await response.json()) as { message?: string }

      if (!response.ok) {
        setError(data.message ?? 'Unable to log in.')
        return
      }

      setMessage(data.message ?? 'Login successful.')
      setEmail('')
      setPassword('')
    } catch (submitError) {
      console.error('Login submit error:', submitError)
      setError('Something went wrong while logging in.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true)
      setError('')
      setMessage('')

      const response = await fetch('/api/auth/google/url')
      const data = (await response.json()) as { url?: string; message?: string }

      if (!response.ok || !data.url) {
        setError(data.message ?? 'Unable to start Google login.')
        return
      }

      window.location.href = data.url
    } catch (googleError) {
      console.error('Google login error:', googleError)
      setError('Something went wrong while connecting to Google.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setOauthError(params.get('error') ?? '')
  }, [])

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.section}>
          <div className={`container ${styles.container}`}>
            <h1 className={styles.title}>Log in to YourHome</h1>
            <p className={styles.subtitle}>Use your account to manage listings and saved activity.</p>
            {oauthError && <p className={styles.error}>Google login failed. Please try again.</p>}

            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className={styles.input}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="name@example.com"
              />

              <label className={styles.label} htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className={styles.input}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Your password"
              />

              {error && <p className={styles.error}>{error}</p>}
              {message && <p className={styles.success}>{message}</p>}

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Logging in...' : 'Log in'}
              </button>
            </form>
            <button
              type="button"
              className={`btn btn-secondary ${styles.oauthButton}`}
              disabled={isGoogleLoading}
              onClick={handleGoogleLogin}
            >
              <span className={styles.oauthContent}>
                <span className={styles.googleIconWrap}><GoogleIcon /></span>
                {isGoogleLoading ? 'Redirecting to Google...' : 'Continue with Google'}
              </span>
            </button>
            <p className={styles.switchAuthText}>
              Need an account? <Link href="/signup" className={styles.switchAuthLink}>Sign up</Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

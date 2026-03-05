'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`${styles.header} ${isScrolled ? styles.active : ''}`}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo.png" alt="YourHome" width={200} height={50} />
        </Link>

        <nav className={`${styles.navbar} ${isNavOpen ? styles.active : ''}`}>
          <ul className={styles.navbarList}>
            <li><Link href="/" className={styles.navbarLink} onClick={() => setIsNavOpen(false)}>Home</Link></li>
            <li><Link href="/listings" className={styles.navbarLink} onClick={() => setIsNavOpen(false)}>Listing</Link></li>
            <li><Link href="/#about" className={styles.navbarLink} onClick={() => setIsNavOpen(false)}>About Us</Link></li>
            <li><Link href="/#contact" className={styles.navbarLink} onClick={() => setIsNavOpen(false)}>Contact Us</Link></li>
          </ul>
        </nav>

        <div className={styles.headerActions}>
          <Link href="/signup" className="btn btn-secondary">SignUp</Link>
          <Link href="/post" className="btn btn-secondary">Post</Link>
        </div>

        <button 
          className={`${styles.navToggleBtn} ${isNavOpen ? styles.active : ''}`}
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Toggle menu"
        >
          <i className={`fa ${isNavOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
    </header>
  )
}

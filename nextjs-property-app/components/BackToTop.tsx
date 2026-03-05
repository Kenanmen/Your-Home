'use client'

import { useState, useEffect } from 'react'
import styles from './BackToTop.module.css'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY >= 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      className={`${styles.backTopBtn} ${isVisible ? styles.active : ''}`}
      onClick={scrollToTop}
      aria-label="back to top"
    >
      <i className="fa fa-arrow-up"></i>
    </button>
  )
}

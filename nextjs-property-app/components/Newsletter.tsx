'use client'

import { useState } from 'react'
import styles from './Newsletter.module.css'

export default function Newsletter() {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your feedback!')
    setFeedback('')
  }

  return (
    <section className={styles.newsletter}>
      <div className="container">
        <div className={styles.wrapper}>
          <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)' }}>
            <b>Any Feedbacks?</b>
          </h2>
          <p className="section-text">Anything you want to say</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.newsletterForm}>
          <input 
            type="text" 
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your Feedbacks" 
            required 
            className={styles.emailField}
          />
          <button type="submit" className="btn btn-secondary">Submit</button>
        </form>
      </div>
    </section>
  )
}

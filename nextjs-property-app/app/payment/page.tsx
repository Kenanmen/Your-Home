'use client'

import { useState } from 'react'
import styles from './payment.module.css'

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardName: '',
    cardNum: '',
    month: '',
    year: '',
    cvv: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Payment processed successfully!')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.row}>
          <div className={styles.col}>
            <h3 className={styles.title}>Billing Address</h3>

            <div className={styles.inputBox}>
              <input 
                type="text" 
                id="name" 
                placeholder="Enter your full name" 
                required 
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputBox}>
              <input 
                type="email" 
                id="email" 
                placeholder="Enter email address" 
                required 
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputBox}>
              <input 
                type="text" 
                id="address" 
                placeholder="Enter address" 
                required 
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputBox}>
              <input 
                type="text" 
                id="city" 
                placeholder="Enter city" 
                required 
                value={formData.city}
                onChange={handleChange}
              />
            </div>

            <div className={styles.flex}>
              <div className={styles.inputBox}>
                <input 
                  type="text" 
                  id="state" 
                  placeholder="Enter state" 
                  required 
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className={styles.inputBox}>
                <input 
                  type="number" 
                  id="zip" 
                  placeholder="123 456" 
                  required 
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className={styles.col}>
            <h3 className={styles.title}>Payment</h3>

            <div className={styles.inputBox}>
              <input 
                type="text" 
                id="cardName" 
                placeholder="Enter card name" 
                required 
                value={formData.cardName}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputBox}>
              <input 
                type="text" 
                id="cardNum" 
                placeholder="1111-2222-3333-4444" 
                maxLength={19} 
                required 
                value={formData.cardNum}
                onChange={handleChange}
              />
            </div>

            <div className={styles.inputBox}>
              <select 
                id="month" 
                value={formData.month}
                onChange={handleChange}
              >
                <option value="">Choose month</option>
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>

            <div className={styles.flex}>
              <div className={styles.inputBox}>
                <label htmlFor="year">Exp Year:</label>
                <select 
                  id="year" 
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Choose Year</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                </select>
              </div>

              <div className={styles.inputBox}>
                <label htmlFor="cvv">CVV</label>
                <input 
                  type="number" 
                  id="cvv" 
                  placeholder="1234" 
                  required 
                  value={formData.cvv}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        <input type="submit" value="Proceed to Checkout" className={styles.submitBtn} />
      </form>
    </div>
  )
}

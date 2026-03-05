'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import PropertyCard from '@/components/PropertyCard'
import { propertyList } from '@/data/properties'
import styles from './listings.module.css'

export default function ListingsPage() {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minPrice: '',
    maxPrice: ''
  })

  const [filteredProperties, setFilteredProperties] = useState(propertyList)

  const handleSearch = () => {
    let filtered = [...propertyList]

    if (filters.location) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(p => parseInt(p.price) >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(p => parseInt(p.price) <= parseInt(filters.maxPrice))
    }

    setFilteredProperties(filtered)
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroBg}>
              <div className={styles.heroContent}>
                <h1 className={styles.heroTitle}>"Home is where the heart is."</h1>
                <h4 className={styles.heroText}>
                  Discover your dream home hassle-free on our real estate platform,
                  <br />where your heart finds its perfect match, YourHome.
                </h4>
              </div>
            </div>
          </div>
        </section>

        <h1 className={styles.propertyTitle}>Best properties Available</h1>

        <div className={styles.heroFormWrapper}>
          <div className={styles.heroForm}>
            <div className={styles.inputWrapper}>
              <label htmlFor="category" className={styles.inputLabel}>Categories</label>
              <select 
                id="category" 
                className={styles.dropdownList}
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
              >
                <option value="">All</option>
                <option value="house">Villas</option>
                <option value="apartment">Apartments</option>
                <option value="offices">Condominiums</option>
                <option value="townhome">Offices</option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="locate" className={styles.inputLabel}>Location</label>
              <input 
                type="text" 
                id="locate" 
                placeholder="Location" 
                className={styles.inputField}
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              />
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="min-price" className={styles.inputLabel}>Min Price</label>
              <select 
                id="min-price" 
                className={styles.dropdownList}
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
              >
                <option value="">Min Price</option>
                <option value="5000">5000 ETB</option>
                <option value="10000">10,000 ETB</option>
                <option value="20000">20,000 ETB</option>
                <option value="30000">30,000 ETB</option>
                <option value="40000">40,000 ETB</option>
                <option value="50000">50,000 ETB</option>
                <option value="60000">60,000 ETB</option>
              </select>
            </div>

            <div className={styles.inputWrapper}>
              <label htmlFor="max-price" className={styles.inputLabel}>Max Price</label>
              <select 
                id="max-price" 
                className={styles.dropdownList}
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
              >
                <option value="">Max Price</option>
                <option value="500000">500,000 ETB</option>
                <option value="1000000">1,000,000 ETB</option>
                <option value="2000000">2,000,000 ETB</option>
                <option value="3000000">3,000,000 ETB</option>
                <option value="4000000">4,000,000 ETB</option>
                <option value="5000000">5,000,000 ETB</option>
                <option value="6000000">6,000,000 ETB</option>
              </select>
            </div>

            <button onClick={handleSearch} className="btn btn-primary">Search</button>
          </div>
        </div>

        <div className={styles.propertyList}>
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

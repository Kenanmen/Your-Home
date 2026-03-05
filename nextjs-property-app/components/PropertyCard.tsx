'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Property } from '@/data/properties'
import styles from './PropertyCard.module.css'

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [rating, setRating] = useState(0)

  return (
    <div className={styles.propertyCard}>
      <Image 
        src={property.propertyImage} 
        alt={property.propertyName}
        width={400}
        height={200}
        className={styles.propertyImage}
      />
      <p className={styles.propertyName}>{property.propertyName}</p>
      <Link href={`/property/${property.id}`} className={styles.propertyDetail}>
        Property Detail
      </Link>
      <div className={styles.divider}></div>
      <div className={styles.propertyInfo}>
        <i className="fa fa-cube"></i>
        <p>800ftx200ft</p>
        <i className="fa fa-bed"></i>
        <p>Bed</p>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.cardMeta}>
        <span className={styles.price}>
          Price<br />{property.price} ETB
        </span>
        <span>
          <span>Rate</span>
          <div className={styles.ratingStars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <i 
                key={star}
                className="fa fa-star"
                style={{ color: star <= rating ? 'orange' : 'white', cursor: 'pointer' }}
                onClick={() => setRating(star)}
              ></i>
            ))}
          </div>
        </span>
      </div>
    </div>
  )
}

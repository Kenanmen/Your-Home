import Link from 'next/link'
import PropertyCard from './PropertyCard'
import { propertyList } from '@/data/properties'
import styles from './FeaturedProperties.module.css'

export default function FeaturedProperties() {
  const featuredProperties = propertyList.slice(0, 3)

  return (
    <>
      <h1 className={styles.propertyTitle}>Featured Properties</h1>
      <div className={styles.propertyList}>
        {featuredProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      <div className={styles.moreBtn}>
        <Link href="/listings">View More</Link>
      </div>
    </>
  )
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import { propertyList } from '@/data/properties'
import styles from './property.module.css'

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const property = propertyList.find(p => p.id === params.id)

  if (!property) {
    notFound()
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <div className={styles.container}>
          <div className={styles.propertyImage}>
            <Image 
              src={property.propertyImage} 
              alt={property.propertyName}
              width={600}
              height={400}
              style={{ marginBottom: '10px' }}
            />
            <Image 
              src="/images/property-2.jpg" 
              alt="Property Image"
              width={600}
              height={400}
            />
          </div>

          <div className={styles.propertyDetails}>
            <h2 style={{ color: 'hsl(290, 67%, 27%)' }}>
              <b>{property.propertyName}</b>
            </h2>

            <p><strong>Property Type:</strong> For Sell</p>
            
            {property.bedrooms && property.bathrooms && property.area && (
              <div className={styles.bed}>
                <i className="fa fa-bed"></i>
                <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
                <i className="fa fa-bath"></i>
                <p><strong>Bathrooms:</strong> {property.bathrooms}</p>
                <i className="fa fa-ruler-combined"></i>
                <p><strong>Area:</strong> {property.area}</p>
              </div>
            )}

            {property.garage && <p><strong>Garage:</strong> {property.garage}</p>}
            {property.yearBuilt && <p><strong>Year Built:</strong> {property.yearBuilt}</p>}
            <p><strong>Location:</strong> {property.location}, Addis Ababa, Ethiopia.</p>

            <div className={styles.propertyFeatures}>
              <h3>Contact-info:</h3>
              <div className={styles.socialIcons}>
                <a href="#" className="fa fa-facebook"></a>
                <a href="#" className="fa fa-twitter"></a>
              </div>
            </div>

            <div>
              <i className="fa fa-phone"></i> +251-945467789
            </div>

            {property.amenities && (
              <div className={styles.propertyAmenities}>
                <h3>Amenities:</h3>
                <ul>
                  {property.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className={styles.propertyPrice}>
              <h3>Price:</h3>
              <p>{property.price} ETB</p>
            </div>
          </div>
        </div>

        <div className={styles.con}>
          <div className={styles.tour}>Neighbourhood Information</div>
          <div className={styles.map}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5!2d38.7577!3d9.0320!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDEnNTUuMiJOIDM4wrA0NSczNy44IkU!5e0!3m2!1sen!2set!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

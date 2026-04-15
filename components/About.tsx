import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section className={`section ${styles.aboutSection}`} id="about">
      <div className={`container ${styles.aboutContainer}`}>
        <div className={styles.aboutBanner}>
          <Image 
            src="/images/about-banner.jpg" 
            alt="About banner" 
            width={600} 
            height={700}
            className={styles.aboutImage}
          />
        </div>

        <div className={styles.aboutContent}>
          <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)' }}>
            <b>About Us</b>
          </h2>
          <p className="section-text">
            Welcome to Your Dream Home, where your aspirations for a perfect home meet reality.
            We&apos;re passionate about connecting buyers with their dream homes and sellers
            with the ideal buyers, making the home buying and selling process smooth and effortless.
          </p>

          <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)' }}>
            <b>Unlock Endless Possibilities</b>
          </h2>
          <p className="section-text">
            Browse through a vast selection of diverse properties, from cozy
            cottages to luxurious estates, all conveniently listed with
            detailed information and high-quality photos.
          </p>

          <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)' }}>
            <b>Find Your Perfect Match</b>
          </h2>
          <p className="section-text">
            Utilize our powerful search tools to filter properties based on your specific needs and preferences,
            narrowing down your options to perfectly fit your dream home vision.
          </p>

          <button className="btn btn-primary">Learn More</button>
        </div>
      </div>
    </section>
  )
}

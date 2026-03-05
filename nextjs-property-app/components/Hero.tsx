import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={`section ${styles.hero}`}>
      <div className="container">
        <div className={styles.heroBg}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              "Home is where the heart is."
            </h1>
            <h4 className={styles.heroText}>
              Discover your dream home hassle-free on our real estate platform,
              <br />where your heart finds its perfect match, YourHome.
            </h4>
          </div>
        </div>
      </div>
    </section>
  )
}

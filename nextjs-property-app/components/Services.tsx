import styles from './Services.module.css'

export default function Services() {
  const services = [
    {
      icon: 'home-outline',
      title: 'Neighborhood Information and Property History',
      description: 'Discover valuable details about the local amenities, schools, and transportation options. Uncover the property\'s historical data, including ownership records.'
    },
    {
      icon: 'briefcase-outline',
      title: 'Virtual Tour',
      description: 'Step inside and explore properties from the comfort of your own home with our immersive virtual tour experience.'
    },
    {
      icon: 'key',
      title: 'Comprehensive Property Details',
      description: 'Access detailed and comprehensive information about each property, including specifications, features, and amenities, to make informed decisions.'
    }
  ]

  return (
    <section id="services" className={`section ${styles.service}`}>
      <div className="container">
        <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)', textAlign: 'center' }}>
          <b>How it Works</b>
        </h2>
        <p className="section-text" style={{ textAlign: 'center', marginBlock: '15px 60px' }}>
          A fantastic platform for purchasing, selling, and renting properties directly,
          eliminating the need for agents or commissions.
        </p>

        <ul className={styles.serviceList}>
          {services.map((service, index) => (
            <li key={index}>
              <div className={styles.serviceCard}>
                <div className={styles.cardIcon}>
                  <i className={`fa fa-${service.icon === 'home-outline' ? 'home' : service.icon === 'briefcase-outline' ? 'briefcase' : 'key'}`}></i>
                </div>
                <h3 className={styles.cardTitle} style={{ color: 'hsl(290, 67%, 27%)' }}>
                  <b>{service.title}</b>
                </h3>
                <p className={styles.cardText}>{service.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

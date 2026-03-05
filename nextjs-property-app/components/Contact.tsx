import styles from './Contact.module.css'

export default function Contact() {
  return (
    <section className={`section ${styles.contact}`} id="contact">
      <div className="container">
        <h2 className="section-title" style={{ color: 'hsl(290, 67%, 27%)' }}>
          <b>Have Questions? Get in Touch!</b>
        </h2>
        <p className="section-text">
          A great platform to buy, sell and rent your properties without any agent or commissions.
        </p>
        <button className="btn btn-primary">
          <i className="fa fa-phone"></i>
          <span> Contact us</span>
        </button>
      </div>
    </section>
  )
}

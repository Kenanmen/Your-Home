import Link from 'next/link'
import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={`container ${styles.footerContainer}`}>
          <div className={styles.footerBrand}>
            <Link href="/" className={styles.logo}>
              <Image src="/images/logo.png" alt="YourHome" width={100} height={25} />
            </Link>
            <p className={styles.footerText}>
              A great platform to buy, sell and rent your properties without any agent or commissions.
            </p>
          </div>

          <ul className={styles.footerList}>
            <li><p className={styles.footerListTitle}>Details</p></li>
            <li><Link href="/#about" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>About us</span></Link></li>
            <li><Link href="/#services" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Services</span></Link></li>
            <li><Link href="/signin" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Login</span></Link></li>
          </ul>

          <ul className={styles.footerList}>
            <li><p className={styles.footerListTitle}>Useful Links</p></li>
            <li><Link href="/" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Terms of Services</span></Link></li>
            <li><Link href="/" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Privacy Policy</span></Link></li>
            <li><Link href="/listings" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Listing</span></Link></li>
            <li><Link href="/#contact" className={styles.footerLink}><i className="fa fa-chevron-right"></i> <span>Contact</span></Link></li>
          </ul>

          <ul className={styles.footerList}>
            <li><p className={styles.footerListTitle}>Contact Details</p></li>
            <li className={styles.footerItem}>
              <i className="fa fa-location-dot"></i>
              <address className={styles.address}>
                Addis Ababa, Ethiopia <br /> Location:
                <a href="https://maps.app.goo.gl/4TRu4bCxcUg8JVGF9"> View on Google map</a>
              </address>
            </li>
            <li className={styles.footerItem}>
              <i className="fa fa-envelope"></i>
              <a href="mailto:YourHome@gmail.com" className={styles.footerLink}>YourHome@gmail.com</a>
            </li>
            <li className={styles.footerItem}>
              <i className="fa fa-phone"></i>
              <a href="tel:+2519899764" className={styles.footerLink}>+2519899764</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.footerBottomContainer}`}>
          <p className={styles.copyright}>
            &copy; 2024 YourHome. All Right Reserved by <Link href="/" className={styles.copyrightLink}>YOURHOME</Link>.
          </p>

          <ul className={styles.socialList}>
            <li><a href="#" className={styles.socialLink}><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className={styles.socialLink}><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className={styles.socialLink}><i className="fab fa-twitter"></i></a></li>
            <li><a href="#" className={styles.socialLink}><i className="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

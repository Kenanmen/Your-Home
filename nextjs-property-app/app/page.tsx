import Header from '@/components/Header'
import Hero from '@/components/Hero'
import About from '@/components/About'
import FeaturedProperties from '@/components/FeaturedProperties'
import Services from '@/components/Services'
import Contact from '@/components/Contact'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <article className="article">
          <Hero />
          <About />
          <FeaturedProperties />
          <Services />
          <Contact />
        </article>
        <Newsletter />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

export default function PostPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '100px', minHeight: '60vh' }}>
        <section className="section">
          <div className="container">
            <h1 style={{ color: 'hsl(290, 67%, 27%)', marginBottom: '12px' }}>Post a Listing</h1>
            <p>This area is restricted to authenticated users. Listing submission form will be added next.</p>
          </div>
        </section>
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

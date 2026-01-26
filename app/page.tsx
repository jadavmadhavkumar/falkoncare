import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { ServicesSection } from "@/components/landing/services-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Testimonials } from "@/components/landing/testimonials"
import { CTASection } from "@/components/landing/cta-section"
import { FAQSection } from "@/components/landing/faq-section"
import { Footer } from "@/components/landing/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Falkon Care - Professional Water Tank Cleaning Service in Delhi NCR | Noida, Gurgaon, Faridabad",
  description: "Falkon Care provides expert water tank cleaning services in Delhi, Noida, Gurgaon, Faridabad & Ghaziabad. Professional residential & commercial tank cleaning. Book now for same-day service! ✓ Certified Technicians ✓ Safe & Hygienic ✓ Affordable Rates",
  keywords: "Falkon Care, water tank cleaning Delhi, water tank cleaning NCR, water tank cleaning near me, water tank cleaning service, tank cleaning Noida, tank cleaning Gurgaon, residential tank cleaning, commercial tank cleaning",
  alternates: {
    canonical: '/',
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <HowItWorks />
        <Testimonials />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

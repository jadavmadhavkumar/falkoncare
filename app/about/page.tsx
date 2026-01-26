import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Icons } from "@/components/icons"

export const metadata = {
  title: "About Falkon Care - Professional Water Tank Cleaning Service in Delhi NCR",
  description: "Learn about Falkon Care (Falkon Futurex Private Limited), Delhi NCR's most trusted water tank cleaning service provider. Serving 10,000+ customers across Delhi, Noida, Gurgaon, Faridabad & Ghaziabad.",
  keywords: "Falkon Care, about Falkon Care, water tank cleaning company Delhi, professional tank cleaning NCR",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        {/* Page Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">About Falkon Care</h1>
          <p className="text-lg text-muted-foreground">
            Dedicated to providing professional water tank cleaning and maintenance services across Delhi NCR - Your trusted partner for clean and safe water.
          </p>
        </div>

        {/* Company Info Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Company Overview</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong>Falkon Care</strong> (Falkon Futurex Private Limited) is Delhi NCR's leading water tank cleaning
                  and maintenance service provider established in 2025. We are committed to ensuring clean, safe, and hygienic
                  water storage for homes and businesses across Delhi, Noida, Gurgaon, Faridabad, and Ghaziabad.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  With a mission to revolutionize water tank maintenance in Delhi NCR, we combine modern technology with expert
                  craftsmanship to deliver exceptional service quality. Trusted by 10,000+ customers, Falkon Care has become
                  the preferred choice for professional water tank cleaning services.
                </p>
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-6">
                <h3 className="font-semibold text-foreground mb-4">Company Details</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-accent min-w-fit">Company Name:</span>
                    <span className="text-muted-foreground">Falkon Futurex Private Limited</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-accent min-w-fit">CIN:</span>
                    <span className="text-muted-foreground">U39000DL2025PTC451909</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-accent min-w-fit">Incorporated:</span>
                    <span className="text-muted-foreground">July 22, 2025</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-accent min-w-fit">Status:</span>
                    <span className="text-muted-foreground">Active</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-accent min-w-fit">Location:</span>
                    <span className="text-muted-foreground">South West Delhi, New Delhi, India</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide reliable, professional, and affordable water tank cleaning and maintenance services across
                  Delhi NCR that ensure safe, clean water for every household and business. Falkon Care aims to set the
                  highest standards in water tank hygiene and customer satisfaction.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted and preferred water tank cleaning service provider in Delhi NCR and across India,
                  setting industry standards for quality, reliability, and customer satisfaction. Falkon Care envisions a future
                  where every home and business has access to clean, safe water through professional tank maintenance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Values</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icons.check className="w-5 h-5 text-primary" />
                    <span>Quality & Excellence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.check className="w-5 h-5 text-primary" />
                    <span>Customer First</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.check className="w-5 h-5 text-primary" />
                    <span>Reliability & Trust</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.check className="w-5 h-5 text-primary" />
                    <span>Environmental Responsibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Why Choose Falkon Care?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <Icons.award className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Professional Team</h3>
              <p className="text-sm text-muted-foreground">
                Trained and certified professionals with years of experience in water tank maintenance.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Icons.shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Strict quality control standards to ensure safe and hygienic water storage.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Icons.zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Quick & Reliable</h3>
              <p className="text-sm text-muted-foreground">
                Fast scheduling, on-time service delivery, and complete customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

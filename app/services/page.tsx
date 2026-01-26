import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Water Tank Cleaning Service in Delhi NCR - Falkon Care | Noida, Gurgaon, Faridabad, Ghaziabad",
  description: "Professional water tank cleaning services in Delhi, Noida, Gurgaon, Faridabad & Ghaziabad by Falkon Care. ✓ Residential & Commercial ✓ Same-Day Service ✓ Certified Technicians ✓ Starting ₹499. Book Now!",
  keywords: "water tank cleaning Delhi, water tank cleaning NCR, tank cleaning near me, water tank cleaning service, Falkon Care, residential tank cleaning, commercial tank cleaning, water tank sanitization Delhi",
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: "Water Tank Cleaning Service in Delhi NCR - Falkon Care",
    description: "Expert water tank cleaning services across Delhi NCR. Professional, safe, and affordable. Book Falkon Care today!",
    url: 'https://falkoncare.com/services',
  },
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Icons.falcon className="w-4 h-4" />
                Professional Water Tank Cleaning
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                Water Tank Cleaning Service in Delhi NCR
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Falkon Care offers professional water tank cleaning services across Delhi, Noida, Gurgaon, Faridabad, and Ghaziabad.
                Keep your water safe, clean, and bacteria-free with our certified technicians.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Book Service Now
                    <Icons.arrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" asChild>
                  <a href="tel:+919876543210">
                    <Icons.phone className="w-4 h-4 mr-2" />
                    Call +91 98765 43210
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Water Tank Cleaning Services Across Delhi NCR
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Falkon Care provides reliable water tank cleaning services in all major NCR locations
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 max-w-5xl mx-auto">
              {[
                { name: "Delhi", areas: "All Areas: South Delhi, North Delhi, East Delhi, West Delhi, Central Delhi" },
                { name: "Noida", areas: "Noida, Greater Noida, Noida Extension" },
                { name: "Gurgaon", areas: "Gurgaon, DLF City, Cyber City, Golf Course Road" },
                { name: "Faridabad", areas: "Faridabad, New Industrial Town, Ballabgarh" },
                { name: "Ghaziabad", areas: "Ghaziabad, Indirapuram, Vaishali, Vasundhara" },
              ].map((location) => (
                <Card key={location.name} className="hover:shadow-lg transition-all border-primary/20">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 mx-auto">
                      <Icons.mapPin className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-center text-lg">{location.name}</CardTitle>
                    <CardDescription className="text-center text-sm">
                      {location.areas}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                <strong>Service Coverage:</strong> We cover all residential and commercial areas in Delhi NCR
              </p>
            </div>
          </div>
        </section>

        {/* Service Types */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Water Tank Cleaning Services
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive cleaning solutions for residential and commercial properties
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Residential Services */}
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icons.home className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Residential Water Tank Cleaning</CardTitle>
                  <CardDescription>Professional cleaning for homes and apartments</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Overhead tank cleaning (Sintex, plastic, cement)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Underground water tank cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Sump cleaning and sanitization</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">RO tank and storage tank cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Bacteria & algae removal</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Deep cleaning with eco-friendly solutions</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Starting from</span>
                      <span className="text-2xl font-bold text-primary">₹499</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Commercial Services */}
              <Card className="border-2 hover:border-primary/50 transition-all">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icons.building className="w-7 h-7 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Commercial Water Tank Cleaning</CardTitle>
                  <CardDescription>Enterprise solutions for offices and societies</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Society and apartment complex tanks</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Office building water storage cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Hotel and restaurant water tank maintenance</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Hospital and school water tank cleaning</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Industrial water storage solutions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Icons.check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Annual maintenance contracts (AMC)</span>
                    </li>
                  </ul>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold">Custom pricing</span>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/auth/login">Get Quote</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Falkon Care for Water Tank Cleaning?
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We are Delhi NCR's most trusted water tank cleaning service provider
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.shield className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Certified Professionals</h3>
                <p className="text-sm text-muted-foreground">
                  Trained and certified technicians with years of experience in water tank cleaning and sanitization
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Same-Day Service</h3>
                <p className="text-sm text-muted-foreground">
                  Fast booking and quick service delivery. Get your tank cleaned on the same day in most areas
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.checkCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">100% Safe & Hygienic</h3>
                <p className="text-sm text-muted-foreground">
                  Eco-friendly cleaning agents, proper sanitization, and thorough disinfection for safe drinking water
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.rupee className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Affordable Pricing</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing with no hidden charges. Best rates for water tank cleaning in Delhi NCR
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">
                  We follow strict quality standards and provide before/after photos. 100% satisfaction guaranteed
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icons.clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Flexible Timing</h3>
                <p className="text-sm text-muted-foreground">
                  Book service at your convenient time. We work 7 days a week from 8 AM to 8 PM
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Our Water Tank Cleaning Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Professional 7-step cleaning process for spotless and safe water tanks
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Inspection",
                  description: "Thorough inspection of tank condition, water level, and contamination",
                },
                {
                  step: "2",
                  title: "Water Drainage",
                  description: "Complete drainage of existing water and removal of sediments",
                },
                {
                  step: "3",
                  title: "Deep Cleaning",
                  description: "Scrubbing walls, floor, and corners with professional equipment",
                },
                {
                  step: "4",
                  title: "Sanitization",
                  description: "Application of eco-friendly disinfectants to kill bacteria and germs",
                },
                {
                  step: "5",
                  title: "Rinsing",
                  description: "Multiple rounds of fresh water rinsing to remove all cleaning agents",
                },
                {
                  step: "6",
                  title: "Final Check",
                  description: "Quality inspection and before/after photos for verification",
                },
                {
                  step: "7",
                  title: "Refilling",
                  description: "Tank refilled with clean water, ready for use within hours",
                },
              ].map((item, index) => (
                <div key={index} className="relative">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {index < 6 && (
                    <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Common questions about water tank cleaning services in Delhi NCR
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {[
                {
                  question: "How often should I get my water tank cleaned?",
                  answer: "We recommend cleaning your water tank every 6 months for residential properties and every 3-4 months for commercial properties. In Delhi NCR, due to water quality issues, more frequent cleaning ensures better health and hygiene.",
                },
                {
                  question: "How long does water tank cleaning take?",
                  answer: "For a standard residential water tank (500-1000 liters), the cleaning process takes 2-3 hours. Larger commercial tanks may take 4-6 hours depending on size and condition.",
                },
                {
                  question: "Is the cleaning process safe for drinking water?",
                  answer: "Yes, absolutely. Falkon Care uses only food-grade, eco-friendly cleaning agents approved by health authorities. After thorough rinsing, your water is 100% safe for drinking and cooking.",
                },
                {
                  question: "Do you provide services in all areas of Delhi NCR?",
                  answer: "Yes, Falkon Care covers all major areas including Delhi (all zones), Noida, Greater Noida, Gurgaon, Faridabad, and Ghaziabad. We provide water tank cleaning services across entire NCR region.",
                },
                {
                  question: "What is the cost of water tank cleaning in Delhi?",
                  answer: "Residential water tank cleaning starts from ₹499 depending on tank size and type. Commercial tank cleaning is priced based on capacity. Contact us for a free quote.",
                },
                {
                  question: "Do I need to be present during the cleaning?",
                  answer: "While not mandatory, we recommend someone be present to provide access to the tank and verify the service. Our technicians will also show you before/after photos.",
                },
                {
                  question: "Can you clean underground and overhead tanks both?",
                  answer: "Yes, Falkon Care cleans all types of water tanks - overhead tanks, underground tanks, sumps, sintex tanks, cement tanks, and RO storage tanks.",
                },
                {
                  question: "Do you offer annual maintenance contracts (AMC)?",
                  answer: "Yes, we provide AMC packages for both residential complexes and commercial properties with scheduled cleaning, priority service, and discounted rates.",
                },
              ].map((faq, index) => (
                <Card key={index} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-3">
                      <Icons.helpCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                      <span>{faq.question}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground pl-8">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Ready to Get Your Water Tank Cleaned?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Book Falkon Care's professional water tank cleaning service in Delhi NCR today.
                Safe, hygienic, and affordable solutions for clean drinking water.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/login">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8">
                    Book Now - Starting ₹499
                    <Icons.arrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <a href="tel:+919876543210">
                    <Icons.phone className="w-5 h-5 mr-2" />
                    Call Now
                  </a>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                ⭐ Rated 4.9/5 by 500+ customers | 🏆 Trusted by 10,000+ homes | ✓ Same-day service available
              </p>
            </div>
          </div>
        </section>

        {/* Local SEO Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto prose prose-lg">
              <h2 className="text-3xl font-bold text-foreground mb-6">
                About Falkon Care - Water Tank Cleaning Experts in Delhi NCR
              </h2>

              <div className="text-muted-foreground space-y-4 leading-relaxed">
                <p>
                  <strong>Falkon Care</strong> is Delhi NCR's leading water tank cleaning service provider, committed to
                  ensuring clean and safe water for every household and business. With thousands of satisfied customers
                  across Delhi, Noida, Gurgaon, Faridabad, and Ghaziabad, we have established ourselves as the most
                  trusted name in professional water tank maintenance.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Why Water Tank Cleaning is Essential in Delhi NCR
                </h3>
                <p>
                  Delhi and NCR regions face unique water quality challenges due to high contamination levels, sediment
                  buildup, and bacterial growth in storage tanks. Regular water tank cleaning is not just a maintenance
                  task—it's a health necessity. Dirty water tanks can harbor harmful bacteria, algae, and pathogens that
                  can cause serious waterborne diseases.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Our Service Coverage in Delhi NCR
                </h3>
                <p>
                  Falkon Care provides comprehensive water tank cleaning services across all major NCR locations:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Delhi:</strong> South Delhi, North Delhi, East Delhi, West Delhi, Central Delhi, Dwarka, Rohini, Pitampura</li>
                  <li><strong>Noida:</strong> Sector 1-168, Greater Noida, Noida Extension, Knowledge Park</li>
                  <li><strong>Gurgaon:</strong> DLF City, Cyber City, Golf Course Road, Sohna Road, MG Road</li>
                  <li><strong>Faridabad:</strong> Old Faridabad, New Industrial Town, Ballabgarh, NIT</li>
                  <li><strong>Ghaziabad:</strong> Indirapuram, Vaishali, Vasundhara, Raj Nagar, Crossings Republik</li>
                </ul>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  What Makes Falkon Care Different
                </h3>
                <p>
                  Unlike other water tank cleaning services in Delhi NCR, Falkon Care follows international cleaning
                  standards and uses only certified, eco-friendly cleaning products. Our technicians are trained
                  professionals who understand the specific challenges of water quality in the NCR region.
                </p>

                <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">
                  Book Your Water Tank Cleaning Today
                </h3>
                <p>
                  Don't compromise on your family's health. Book Falkon Care's professional water tank cleaning service
                  today and enjoy clean, safe drinking water. With transparent pricing, same-day service availability,
                  and 100% satisfaction guarantee, we are your trusted partner for water tank maintenance in Delhi NCR.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

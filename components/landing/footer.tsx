"use client"

import { Icons } from "@/components/icons"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icons.droplets className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold">Falkon Care</span>
            </div>
            <p className="text-background/70 text-sm">
              Professional water tank cleaning services in Delhi NCR. Trusted by 10,000+ customers across Delhi, Noida, Gurgaon, Faridabad & Ghaziabad.
            </p>
            <p className="text-background/60 text-xs">
              <span className="font-semibold">Falkon Futurex Private Limited</span>
              <br />
              CIN: U39000DL2025PTC451909
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Water Tank Cleaning Delhi
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Tank Cleaning Noida
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Tank Cleaning Gurgaon
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Residential Tank Cleaning
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Commercial Tank Cleaning
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold mb-4">Service Areas</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Delhi (All Areas)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Noida & Greater Noida
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Gurgaon (Gurugram)
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Faridabad
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Ghaziabad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Falkon Care</h4>
            <ul className="space-y-3 text-sm text-background/70">
              <li className="flex items-center gap-2">
                <Icons.phone className="w-4 h-4" />
                <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-2">
                <Icons.mail className="w-4 h-4" />
                <a href="mailto:support@falkoncare.com" className="hover:text-primary">support@falkoncare.com</a>
              </li>
              <li className="flex items-start gap-2">
                <Icons.mapPin className="w-4 h-4 mt-0.5" />
                <span>South West Delhi, New Delhi, India - 110001</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-background/10">
              <h5 className="font-semibold text-xs mb-2">Quick Links</h5>
              <ul className="space-y-1 text-xs text-background/60">
                <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
                <li><Link href="/careers" className="hover:text-primary">Careers</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="hover:text-primary">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/50">
          <p className="mb-2">
            &copy; {new Date().getFullYear()} Falkon Care - Falkon Futurex Private Limited. All rights reserved.
          </p>
          <p className="text-xs">
            CIN: U39000DL2025PTC451909 | Professional Water Tank Cleaning Service in Delhi NCR
          </p>
        </div>
      </div>
    </footer>
  )
}

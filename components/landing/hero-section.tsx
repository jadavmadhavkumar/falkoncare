"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16 md:py-24 lg:py-32">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* CONTENT */}
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium">
              <Icons.falcon className="w-4 h-4" />
              Trusted by 10,000+ Customers
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
              <span className="text-primary">Falkon Care</span>{" "}
              <span className="block">
                Professional Water Tank Cleaning Service in Delhi NCR
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Expert water tank cleaning services in Delhi, Noida, Gurgaon,
              Faridabad & Ghaziabad. Certified technicians, hygienic process,
              and affordable pricing for residential & commercial tanks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/login">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
                >
                  Book Now
                  <Icons.arrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              <Link href="#services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 transition-transform hover:scale-105"
                >
                  View Services
                </Button>
              </Link>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icons.star
                    key={i}
                    className="w-4 h-4 fill-warning text-warning"
                  />
                ))}
                <span className="text-sm font-medium ml-1">4.9</span>
              </div>
              <span className="text-sm text-muted-foreground">
                500+ Verified Reviews
              </span>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative lg:order-last animate-in fade-in zoom-in duration-1000">
            <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted shadow-2xl">
              <Image
                src="/water-tank-cleaning-service.jpg"
                alt="Professional Water Tank Cleaning Service"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-6 bg-background/90 backdrop-blur-md rounded-xl border shadow-lg px-4 py-3 flex items-center gap-3">
              <Icons.checkCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-muted-foreground">Next Available</p>
                <p className="text-sm font-semibold">Tomorrow · 10:00 AM</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

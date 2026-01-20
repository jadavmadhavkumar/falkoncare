"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 sm:py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-20 sm:opacity-25 md:opacity-30">
        <div className="absolute top-10 sm:top-16 md:top-20 left-2 sm:left-5 md:left-10 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 sm:bottom-10 md:bottom-20 right-0 sm:right-5 md:right-10 w-40 sm:w-64 md:w-96 h-40 sm:h-64 md:h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary/10 rounded-full text-primary text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Icons.droplets className="w-3 h-3 sm:w-4 sm:h-4" />
              Trusted by 10,000+ Customers
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-forwards opacity-0">
              Professional <span className="text-primary">Water Tank</span> Cleaning Service
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-forwards opacity-0">
              Keep your water safe and clean with our expert tank cleaning services. We provide thorough cleaning,
              sanitization, and maintenance for all types of water tanks.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-forwards opacity-0">
              <Link href="/auth/login" className="flex-1 xs:flex-none">
                <Button
                  size="lg"
                  className="w-full xs:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                  Book Now
                  <Icons.arrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="#services" className="flex-1 xs:flex-none">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full xs:w-auto border-primary text-primary hover:bg-primary/5 bg-transparent text-sm sm:text-base transition-transform hover:scale-105 active:scale-95 duration-200"
                >
                  View Services
                </Button>
              </Link>
            </div>

            <div className="flex flex-col xs:flex-row xs:items-center gap-4 xs:gap-6 md:gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                    >
                      <img
                        src={`/diverse-customers.png?height=32&width=32&query=customer ${i}`}
                        alt="Customer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground">500+ Reviews</span>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Icons.star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-warning text-warning" />
                ))}
                <span className="text-xs sm:text-sm font-medium ml-1">4.9</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative lg:pl-8 mt-8 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-forwards opacity-0">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-2xl transition-transform hover:scale-[1.02] duration-500">
              <img src="/water-tank-cleaning-service.jpg" alt="Water Tank Cleaning Service" className="w-full h-auto" />
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 bg-background/95 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Next Available Slot</p>
                    <p className="text-sm sm:font-semibold text-foreground">Tomorrow, 10:00 AM</p>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2 text-green-600 dark:text-green-400">
                    <Icons.checkCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm font-medium">Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

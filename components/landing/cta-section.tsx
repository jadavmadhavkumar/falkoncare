"use client"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground text-balance">
            Ready for Clean Water?
          </h2>
          <p className="text-sm sm:text-base text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Book your water tank cleaning service today and ensure safe, clean water for your family.
          </p>
          <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4">
            <Link href="/auth/login" className="flex-1 xs:flex-none">
              <Button
                size="lg"
                variant="secondary"
                className="w-full xs:w-auto bg-background text-primary hover:bg-background/90 text-sm sm:text-base"
              >
                Get Started
                <Icons.arrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <a href="tel:+919876543210" className="flex-1 xs:flex-none">
              <Button
                size="lg"
                variant="outline"
                className="w-full xs:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent text-sm sm:text-base"
              >
                <Icons.phone className="w-4 h-4 mr-2" />
                Call Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

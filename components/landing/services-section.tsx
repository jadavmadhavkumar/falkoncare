"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { serviceCategories, serviceItems } from "@/lib/mock-data"
import { getServiceIcon, Icons } from "@/components/icons"
import Link from "next/link"

export function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
            Water Tank Cleaning Services in Delhi NCR
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Hygienic, certified, and affordable water tank cleaning for homes,
            societies, offices, and commercial buildings across Delhi, Noida,
            Gurgaon, Faridabad & Ghaziabad.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-14">
          {serviceCategories.map((category) => {
            const IconComponent = getServiceIcon(category.icon)
            const categoryServices = serviceItems.filter(
              (s) => s.categoryId === category.id
            )
            const startingPrice = Math.min(
              ...categoryServices.map((s) => s.basePrice)
            )

            return (
              <Card
                key={category.id}
                className="group relative overflow-hidden border-border bg-card transition-all duration-300
                hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40"
              >
                {/* Glow effect */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                  <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
                </div>

                <CardHeader className="relative z-10">
                  <div className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10
                    group-hover:bg-primary transition-colors">
                    <IconComponent className="w-6 h-6 text-primary group-hover:text-primary-foreground" />
                  </div>

                  <CardTitle className="text-xl text-foreground">
                    {category.name}
                  </CardTitle>

                  <CardDescription className="text-sm text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-col flex-1">
                  {/* Service list */}
                  <div className="space-y-3 flex-1">
                    {categoryServices.slice(0, 2).map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {service.name}
                        </span>
                        <span className="font-medium text-foreground flex items-center">
                          <Icons.rupee className="w-3 h-3 mr-0.5" />
                          {service.basePrice}+
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Starting from
                    </span>
                    <span className="text-lg font-bold text-primary flex items-center">
                      <Icons.rupee className="w-4 h-4 mr-0.5" />
                      {startingPrice}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/auth/login">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 transition-transform hover:scale-105"
            >
              Book a Service Now
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>

          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto hover:bg-primary/5"
            >
              View All Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

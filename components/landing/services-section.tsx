"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { serviceCategories, serviceItems } from "@/lib/mock-data"
import { getServiceIcon, Icons } from "@/components/icons"
import Link from "next/link"

export function ServicesSection() {
  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4 text-balance">
            Our Services
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Comprehensive water tank and pipe services to ensure clean, safe water for your home and business.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 md:mb-12">
          {serviceCategories.map((category) => {
            const IconComponent = getServiceIcon(category.icon)
            const categoryServices = serviceItems.filter((s) => s.categoryId === category.id)
            const startingPrice = Math.min(...categoryServices.map((s) => s.basePrice))

            return (
              <Card
                key={category.id}
                className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30 bg-card flex flex-col"
              >
                <CardHeader>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-primary/10 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl text-foreground">{category.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <div className="space-y-2 sm:space-y-3 flex-1">
                    {categoryServices.slice(0, 2).map((service) => (
                      <div key={service.id} className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground">{service.name}</span>
                        <span className="font-medium text-foreground flex items-center">
                          <Icons.rupee className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          {service.basePrice}+
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-muted-foreground">Starting from</span>
                      <span className="text-base sm:text-lg font-bold text-primary flex items-center">
                        <Icons.rupee className="w-3 h-3 sm:w-4 sm:h-4" />
                        {startingPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/auth/login">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm sm:text-base">
              Book a Service
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

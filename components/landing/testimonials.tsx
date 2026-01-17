"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/icons"

const testimonials = [
  {
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5,
    comment: "Excellent service! The team was professional and thorough. My tank has never been this clean.",
    image: "/indian-man.png",
  },
  {
    name: "Anita Sharma",
    location: "Delhi",
    rating: 5,
    comment: "Very impressed with the quality of work. They arrived on time and completed the job perfectly.",
    image: "/serene-indian-woman.png",
  },
  {
    name: "Vikram Patel",
    location: "Bangalore",
    rating: 5,
    comment: "Great value for money. The team was courteous and the tank cleaning was done efficiently.",
    image: "/indian-businessman.png",
  },
]

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Falkon for their water tank cleaning needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card border-border">
              <CardContent className="pt-4 sm:pt-6">
                <div className="flex items-center gap-0.5 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icons.star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm sm:font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-0.5">
                      <Icons.mapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

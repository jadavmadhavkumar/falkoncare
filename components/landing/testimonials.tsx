"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const testimonials = [
  {
    id: "1",
    name: "Rahul Mehta",
    location: "Mumbai",
    rating: 5,
    content: "Excellent service! The team was professional and thorough. My tank has never been this clean.",
    image: "/indian-man.png",
    role: "Homeowner",
  },
  {
    id: "2",
    name: "Anita Sharma",
    location: "Delhi",
    rating: 5,
    content: "Very impressed with the quality of work. They arrived on time and completed the job perfectly.",
    image: "/serene-indian-woman.png",
    role: "Apartment Resident",
  },
  {
    id: "3",
    name: "Vikram Patel",
    location: "Bangalore",
    rating: 5,
    content: "Great value for money. The team was courteous and the tank cleaning was done efficiently.",
    image: "/indian-businessman.png",
    role: "Business Owner",
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

        <div className="max-w-5xl mx-auto px-4 sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Card className="h-full border-border/50 bg-card hover:shadow-lg transition-all duration-300">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 border-2 border-primary/10">
                          <AvatarImage src={`/placeholder-user.jpg`} alt={testimonial.name} />
                          <AvatarFallback className="bg-primary/5 text-primary font-medium">
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-semibold text-sm sm:text-base text-foreground">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex mb-2 sm:mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Icons.star
                              key={i}
                              className={`w-3 h-3 sm:w-4 sm:h-4 ${i < testimonial.rating ? "text-warning fill-warning" : "text-muted"
                                }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed italic">
                          "{testimonial.content}"
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
            <CarouselNext className="hidden sm:flex -right-12 border-primary/20 hover:bg-primary/10 hover:text-primary" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

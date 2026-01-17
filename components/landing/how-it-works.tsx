"use client"

import { Icons } from "@/components/icons"

const steps = [
  {
    number: "01",
    title: "Choose Service",
    description: "Select from our range of water tank and pipe services",
    icon: Icons.clipboardList,
  },
  {
    number: "02",
    title: "Book a Slot",
    description: "Pick a convenient date and time for the service",
    icon: Icons.calendar,
  },
  {
    number: "03",
    title: "Confirm & Pay",
    description: "Complete booking with secure payment options",
    icon: Icons.creditCard,
  },
  {
    number: "04",
    title: "Service Done",
    description: "Our experts clean your tank professionally",
    icon: Icons.checkCircle,
  },
]

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 md:mb-4 text-balance">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            Book your water tank cleaning service in just 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-border" />
                )}

                <div className="text-center space-y-3 sm:space-y-4">
                  {/* Step Number */}
                  <div className="relative inline-flex mx-auto">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg sm:rounded-xl lg:rounded-2xl bg-primary/10 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

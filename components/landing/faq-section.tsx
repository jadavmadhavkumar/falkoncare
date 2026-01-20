"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
    {
        question: "How often should I clean my water tank?",
        answer:
            "For residential tanks, we recommend professional cleaning every 6 months to ensure water safety and hygiene. Commercial tanks may require more frequent cleaning depending on usage.",
    },
    {
        question: "Is the cleaning process safe for drinking water?",
        answer:
            "Absolutely. We use eco-friendly, food-grade cleaning agents and UV sanitization that effectively kills bacteria without leaving harmful residues.",
    },
    {
        question: "How long does the cleaning process take?",
        answer:
            "A standard overhead tank (1000L - 2000L) typically takes about 60-90 minutes to clean thoroughly. Sump cleaning might take slightly longer.",
    },
    {
        question: "Do you offer emergency cleaning services?",
        answer:
            "Yes, we provide same-day emergency services for urgent situations. Please contact our support team immediately for priority booking.",
    },
    {
        question: "What areas do you cover?",
        answer: "We currently serve the entire metropolitan area and surrounding suburbs. Check our booking page to confirm availability in your specific pincode.",
    },
]

export function FAQSection() {
    return (
        <section id="faq" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-3xl">
                <div className="text-center mb-10 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
                    <p className="text-muted-foreground">Everything you need to know about our services</p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/50">
                            <AccordionTrigger className="text-left text-base sm:text-lg font-medium py-5 hover:text-primary transition-colors">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

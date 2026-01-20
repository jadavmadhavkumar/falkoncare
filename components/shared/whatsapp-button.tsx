"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WhatsAppButtonProps {
  phoneNumber?: string
  message?: string
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

export function WhatsAppButton({
  phoneNumber = "+91 70113 65481", // Falkon support number
  message = "Hello! I'm interested in your water tank cleaning services.",
  className = "",
  variant = "default",
  size = "default",
}: WhatsAppButtonProps) {
  const handleWhatsAppClick = () => {
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappURL, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      variant={variant}
      size={size}
      className={`gap-2 bg-green-500 hover:bg-green-600 text-white ${className}`}
    >
      <MessageCircle className="h-5 w-5" />
      Chat on WhatsApp
    </Button>
  )
}

"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import Image from "next/image"
import { TopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { serviceItems, serviceCategories } from "@/lib/mock-data"
import { getServiceIcon, Icons } from "@/components/icons"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
// import { useAppStore } from "@/lib/store" // Removing store dependency for user/booking
import { cn } from "@/lib/utils"
// import type { Booking } from "@/lib/types" // Using Convex types implicitly or defined locally if needed
import { CalendarPicker } from "@/components/booking/calendar-picker"
import { LocationPicker } from "@/components/booking/location-picker"
import { PaymentMethods } from "@/components/payment/payment-methods"
import { WhatsAppButton } from "@/components/shared/whatsapp-button"
import type { PaymentMethod } from "@/lib/types"

import { useAuth } from "@clerk/nextjs"

export default function ServiceBookingPage() {
  const params = useParams()
  const router = useRouter()
  const { isSignedIn, userId } = useAuth()

  const user = useQuery(api.users.current);
  const createBooking = useMutation(api.bookings.create);

  // Debug logging
  console.log("Clerk isSignedIn:", isSignedIn, "userId:", userId);
  console.log("User from Convex query:", user);

  const service = serviceItems.find((s) => s.id === params.serviceId)
  const category = serviceCategories.find((c) => c.id === service?.categoryId)
  const IconComponent = getServiceIcon(category?.icon || "droplets")

  const [step, setStep] = useState(1)
  const [selectedTankSize, setSelectedTankSize] = useState<string | null>(null)
  const [selectedTankType, setSelectedTankType] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string>("")
  const [selectedPincode, setSelectedPincode] = useState<string | undefined>(undefined)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("wallet")
  const [notes, setNotes] = useState("")
  const [isBooking, setIsBooking] = useState(false)

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"]

  // Calculate price
  const calculatePrice = () => {
    if (!service) return 0
    let price = service.basePrice

    if (selectedTankSize && service.tankSizes) {
      const sizeOption = service.tankSizes.find((s) => s.size === selectedTankSize)
      if (sizeOption) {
        price = service.basePrice * sizeOption.priceMultiplier
      }
    }

    if (selectedTankType && service.tankTypes) {
      const typeOption = service.tankTypes.find((t) => t.type === selectedTankType)
      if (typeOption) {
        price += typeOption.priceAddition
      }
    }

    return Math.round(price)
  }

  const totalPrice = calculatePrice()

  const canProceedStep1 = () => {
    if (service?.tankSizes && !selectedTankSize) return false
    if (service?.tankTypes && !selectedTankType) return false
    return true
  }

  const canProceedStep2 = () => {
    return selectedDate && selectedTime && selectedAddress.trim() !== ""
  }

  const handleBooking = async () => {
    if (!service) {
      toast.error("Service not found. Please try again.")
      return
    }

    if (!isSignedIn) {
      toast.error("Please log in to book a service")
      return
    }

    setIsBooking(true)

    try {
      await createBooking({
        serviceName: service.name,
        date: new Date(selectedDate!).getTime(), // Convex expects number (timestamp)
        time: selectedTime!,
        amount: totalPrice,
        address: selectedAddress, // Use the selected address from location picker
        tankSize: selectedTankSize || undefined,
        tankType: selectedTankType || undefined,
        paymentMethod: selectedPaymentMethod === "wallet" ? "wallet" : "cash",
      });

      toast.success("Booking confirmed successfully!")
      setStep(5) // Success step
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("Insufficient wallet balance")) {
        toast.error("Insufficient wallet balance. Please add funds or choose Cash.");
      } else {
        toast.error("Failed to create booking. Please try again.");
      }
    } finally {
      setIsBooking(false)
    }
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <TopBar title="Service Not Found" />
        <div className="p-6 text-center">
          <p className="text-muted-foreground">The requested service was not found.</p>
          <Button className="mt-4" onClick={() => router.push("/dashboard/services")}>
            Browse Services
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="Book Service" />

      <div className="p-6 max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8 overflow-x-auto">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-shrink-0">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors",
                  step >= s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                {step > s ? <Icons.check className="w-5 h-5" /> : s}
              </div>
              {s < 4 && <div className={cn("w-16 h-1 mx-2 transition-colors", step > s ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>

        {/* Step 1: Service Options */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Service with Image */}
            <Card className="bg-card border-border overflow-hidden">
              {service.image && (
                <div className="h-64 bg-muted relative">
                  <Image src={service.image || "/placeholder.svg"} alt={service.name} fill className="object-cover" />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground">{service.name}</h2>
                    <p className="text-muted-foreground mt-1">{service.description}</p>
                    <div className="flex items-center gap-4 mt-3 flex-wrap">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Icons.clock className="w-4 h-4" />
                        {service.duration}
                      </span>
                      <span className="text-sm px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                        {category?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tank Size Selection */}
            {service.tankSizes && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Select Tank Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {service.tankSizes.map((option) => (
                      <button
                        key={option.size}
                        onClick={() => setSelectedTankSize(option.size)}
                        className={cn(
                          "p-4 rounded-lg border-2 text-center transition-all",
                          selectedTankSize === option.size
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <Icons.droplets
                          className={cn(
                            "w-6 h-6 mx-auto mb-2",
                            selectedTankSize === option.size ? "text-primary" : "text-muted-foreground",
                          )}
                        />
                        <p className="font-medium text-foreground">{option.size}</p>
                        <p className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                          <Icons.rupee className="w-3 h-3" />
                          {Math.round(service.basePrice * option.priceMultiplier)}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tank Type Selection */}
            {service.tankTypes && (
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">Select Tank Type</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {service.tankTypes.map((option) => (
                      <button
                        key={option.type}
                        onClick={() => setSelectedTankType(option.type)}
                        className={cn(
                          "p-4 rounded-lg border-2 text-left transition-all",
                          selectedTankType === option.type
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50",
                        )}
                      >
                        <p className="font-medium text-foreground">{option.type}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {option.priceAddition > 0
                            ? `+₹${option.priceAddition} additional charge`
                            : "No additional charge"}
                        </p>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Price Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-foreground">Estimated Price</span>
                  <span className="text-2xl font-bold text-primary flex items-center">
                    <Icons.rupee className="w-5 h-5" />
                    {totalPrice.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              disabled={!canProceedStep1()}
              onClick={() => setStep(2)}
            >
              Continue to Schedule
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Step 2: Date & Time Selection with Full Calendar */}
        {step === 2 && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setStep(1)} className="text-muted-foreground">
              <Icons.arrowLeft className="w-4 h-4 mr-2" />
              Back to Options
            </Button>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Calendar */}
              <CalendarPicker onDateSelect={setSelectedDate} selectedDate={selectedDate || undefined} />

              {/* Time Slots */}
              <Card className="bg-card border-border h-fit">
                <CardHeader>
                  <CardTitle className="text-foreground">Select Time Slot</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "p-3 rounded-lg border text-center transition-all",
                          selectedTime === time
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:border-primary/50 text-foreground",
                        )}
                      >
                        <Icons.clock className="w-4 h-4 mx-auto mb-1" />
                        {time}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Picker */}
            <LocationPicker
              onLocationSelect={(address, pincode) => {
                setSelectedAddress(address)
                setSelectedPincode(pincode)
              }}
              initialAddress={selectedAddress}
            />

            {/* Notes */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Additional Notes (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Any special instructions or requirements..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-background border-input"
                  rows={3}
                />
              </CardContent>
            </Card>

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              disabled={!canProceedStep2()}
              onClick={() => setStep(3)}
            >
              Continue to Payment
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setStep(2)} className="text-muted-foreground">
              <Icons.arrowLeft className="w-4 h-4 mr-2" />
              Back to Schedule
            </Button>

            <PaymentMethods
              selectedMethod={selectedPaymentMethod}
              onMethodSelect={setSelectedPaymentMethod}
              amount={totalPrice}
            />

            <Button
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              size="lg"
              onClick={() => setStep(4)}
            >
              Review Booking
              <Icons.arrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <Button variant="ghost" onClick={() => setStep(3)} className="text-muted-foreground">
              <Icons.arrowLeft className="w-4 h-4 mr-2" />
              Back to Payment
            </Button>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Service */}
                <div className="flex items-start gap-4 pb-4 border-b border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{category?.name}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3">
                  {selectedTankSize && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tank Size</span>
                      <span className="font-medium text-foreground">{selectedTankSize}</span>
                    </div>
                  )}
                  {selectedTankType && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tank Type</span>
                      <span className="font-medium text-foreground">{selectedTankType}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-medium text-foreground">
                      {selectedDate &&
                        new Date(selectedDate).toLocaleDateString("en-IN", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span className="font-medium text-foreground">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Method</span>
                    <span className="font-medium text-foreground capitalize">{selectedPaymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Address</span>
                    <span className="font-medium text-foreground text-right max-w-xs">{selectedAddress || "Address not provided"}</span>
                  </div>
                  {selectedPincode && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PIN Code</span>
                      <span className="font-medium text-foreground">{selectedPincode}</span>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="pt-4 border-t border-border space-y-2">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-foreground">Total Amount</span>
                    <span className="text-primary flex items-center">
                      <Icons.rupee className="w-4 h-4" />
                      {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-3">
              <Button
                variant="outline"
                size="lg"
                onClick={handleBooking}
                disabled={isBooking}
                className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
              >
                <Icons.check className="w-4 h-4 mr-2" />
                Confirm Booking
              </Button>
              <WhatsAppButton
                phoneNumber="+919876543210"
                message={`Hi Falkon! I want to book ${service.name} for ${selectedDate} at ${selectedTime}`}
                size="lg"
              />
            </div>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <Icons.checkCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Your {service.name} has been scheduled for{" "}
              {selectedDate &&
                new Date(selectedDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                })}{" "}
              at {selectedTime}. A confirmation has been sent to your email.
            </p>

            <div className="space-y-3 max-w-md mx-auto mb-8">
              <Card className="bg-green-500/5 border-green-500/20">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Booking ID</p>
                  <p className="font-mono font-semibold text-foreground">{`booking-${Date.now()}`.slice(0, 12)}</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-3">
              <WhatsAppButton
                phoneNumber="+919876543210"
                message="Hi Falkon! I have confirmed my booking and want to discuss further details."
              />
              <Button variant="outline" size="lg" onClick={() => router.push("/dashboard")} className="w-full">
                <Icons.home className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

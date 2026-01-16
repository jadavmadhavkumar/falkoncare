"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/dashboard/top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Link from "next/link"

type FilterType = "all" | "active" | "completed" | "cancelled"

interface Booking {
  id: string
  serviceId: string
  status: string
  bookingDate: string
  bookingTime: string
  amount: number
  address: string
  tankSize?: string
  tankType?: string
  createdAt: string
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => {
    try {
      const bookingsData = JSON.parse(localStorage.getItem("bookings") || "[]")
      setBookings(bookingsData)
    } catch (err) {
      setError("Failed to load bookings")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const filteredBookings = bookings.filter((booking) => {
    if (filter === "all") return true
    if (filter === "active") return ["pending", "confirmed", "in-progress"].includes(booking.status)
    if (filter === "completed") return booking.status === "completed"
    if (filter === "cancelled") return booking.status === "cancelled"
    return true
  })

  const filters: { label: string; value: FilterType }[] = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <TopBar title="My Bookings" />

      <div className="p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {filters.map((f) => (
              <Button
                key={f.value}
                variant={filter === f.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(f.value)}
                className={cn(
                  filter === f.value ? "bg-primary text-primary-foreground" : "border-border text-muted-foreground",
                )}
              >
                {f.label}
              </Button>
            ))}
          </div>
          <Link href="/dashboard/services">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Icons.plus className="w-4 h-4 mr-2" />
              New Booking
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Icons.loader className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : filteredBookings.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBookings.map((booking) => (
              <Card key={booking.id} className="bg-card border-border p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">Service Booking</p>
                      <p className="text-sm text-muted-foreground">{booking.id.slice(0, 8)}</p>
                    </div>
                    <span
                      className={cn(
                        "text-xs px-2 py-1 rounded-full font-medium",
                        booking.status === "completed" && "bg-success/10 text-success",
                        booking.status === "in-progress" && "bg-primary/10 text-primary",
                        booking.status === "confirmed" && "bg-accent/10 text-accent",
                        booking.status === "pending" && "bg-warning/10 text-warning",
                        booking.status === "cancelled" && "bg-destructive/10 text-destructive",
                      )}
                    >
                      {booking.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.calendar className="w-4 h-4" />
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.clock className="w-4 h-4" />
                      {booking.bookingTime}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.mapPin className="w-4 h-4" />
                      {booking.address}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="font-semibold text-foreground flex items-center">
                      <Icons.rupee className="w-4 h-4" />
                      {booking.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icons.calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No bookings found</h3>
            <p className="text-muted-foreground mb-6">
              {filter === "all" ? "You haven't made any bookings yet." : `No ${filter} bookings found.`}
            </p>
            <Link href="/dashboard/services">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Book Your First Service
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

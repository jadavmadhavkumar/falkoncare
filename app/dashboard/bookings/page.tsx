"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/dashboard/top-bar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"
import Link from "next/link"

type FilterType = "all" | "active" | "completed" | "cancelled"

interface Booking {
  id: string
  service_id: string
  status: string
  booking_date: string
  booking_time: string
  amount: number
  address: string
  tank_size?: string
  tank_type?: string
  created_at: string
}

export default function BookingsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [bookings, setBookings] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<FilterType>("all")

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data, error: fetchError } = await supabase
          .from("bookings")
          .select("*")
          .eq("customer_id", user.id)
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError

        setBookings(data || [])
      } catch (err) {
        console.error("Error fetching bookings:", err)
        setError(err instanceof Error ? err.message : "Failed to load bookings")
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [supabase, router])

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
                      {new Date(booking.booking_date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.clock className="w-4 h-4" />
                      {booking.booking_time}
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

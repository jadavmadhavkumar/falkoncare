"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminTopBar } from "@/components/admin/admin-top-bar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { RevenueMetrics } from "@/components/admin/revenue-metrics"
import { createClient } from "@/lib/supabase/client"

export default function AdminDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalStaff: 0,
    availableStaff: 0,
    recentBookings: [] as any[],
    staffMembers: [] as any[],
  })

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        // Fetch all bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select("*")
          .order("created_at", { ascending: false })

        if (bookingsError) throw bookingsError

        // Fetch all customers
        const { data: customersData, error: customersError } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "customer")

        if (customersError) throw customersError

        // Fetch all staff
        const { data: staffData, error: staffError } = await supabase.from("profiles").select("*").eq("role", "staff")

        if (staffError) throw staffError

        // Calculate statistics
        const bookings = bookingsData || []
        const customers = customersData || []
        const staff = staffData || []

        const pendingCount = bookings.filter((b) => b.status === "pending").length
        const todayCount = bookings.filter((b) => {
          const today = new Date().toISOString().split("T")[0]
          return b.booking_date === today
        }).length
        const completedCount = bookings.filter((b) => b.status === "completed").length
        const totalRev = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + (b.amount || 0), 0)
        const availableStaffCount = staff.filter((s) => s.status === "available").length

        setDashboardData({
          totalBookings: bookings.length,
          pendingBookings: pendingCount,
          todayBookings: todayCount,
          completedBookings: completedCount,
          totalRevenue: totalRev,
          totalCustomers: customers.length,
          totalStaff: staff.length,
          availableStaff: availableStaffCount,
          recentBookings: bookings.slice(0, 5),
          staffMembers: staff.slice(0, 5),
        })
      } catch (err) {
        console.error("Error fetching dashboard data:", err)
        setError(err instanceof Error ? err.message : "Failed to load dashboard")
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [supabase, router])

  const averageBookingValue =
    dashboardData.totalBookings > 0 ? Math.round(dashboardData.totalRevenue / dashboardData.completedBookings) : 0
  const pendingPayments = dashboardData.totalRevenue * 0.15 // Estimate based on pending bookings

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminTopBar title="Admin Dashboard" />
        <div className="flex items-center justify-center h-96">
          <Icons.loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminTopBar title="Admin Dashboard" />

      <div className="p-6 space-y-6">
        {error && (
          <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <RevenueMetrics
          totalRevenue={dashboardData.totalRevenue}
          monthlyGrowth={12}
          averageBookingValue={averageBookingValue}
          pendingPayments={pendingPayments}
        />

        {/* Basic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatsCard
            title="Today's Bookings"
            value={dashboardData.todayBookings}
            icon={Icons.calendarDays}
            trend="+12% from yesterday"
            trendUp={true}
          />
          <StatsCard title="Pending Approvals" value={dashboardData.pendingBookings} icon={Icons.clock} />
          <StatsCard
            title="Available Staff"
            value={`${dashboardData.availableStaff}/${dashboardData.totalStaff}`}
            icon={Icons.users}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Bookings */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Recent Bookings</CardTitle>
              <Link href="/admin/bookings">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                  <Icons.chevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {dashboardData.recentBookings.length === 0 ? (
                <div className="text-center py-8">
                  <Icons.calendar className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No recent bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icons.droplets className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">Service Booking</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(booking.booking_date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            at {booking.booking_time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {booking.staff_id ? (
                          <div className="hidden md:block">
                            <span className="text-sm text-muted-foreground">Staff Assigned</span>
                          </div>
                        ) : (
                          <span className="text-sm text-warning">Unassigned</span>
                        )}
                        <StatusBadge status={booking.status as any} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Staff Overview */}
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Staff Status</CardTitle>
              <Link href="/admin/staff">
                <Button variant="ghost" size="sm" className="text-primary">
                  Manage
                  <Icons.chevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {dashboardData.staffMembers.length === 0 ? (
                <div className="text-center py-8">
                  <Icons.users className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">No staff members</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {dashboardData.staffMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icons.user className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{member.full_name}</p>
                          <div className="flex items-center gap-1">
                            <Icons.star className="w-3 h-3 fill-warning text-warning" />
                            <span className="text-xs text-muted-foreground">{member.rating || 5}</span>
                          </div>
                        </div>
                      </div>
                      <span
                        className={cn(
                          "text-xs px-2 py-1 rounded-full font-medium",
                          member.status === "available" && "bg-success/10 text-success",
                          member.status === "busy" && "bg-warning/10 text-warning",
                          member.status === "off-duty" && "bg-muted text-muted-foreground",
                        )}
                      >
                        {member.status === "available" && "Available"}
                        {member.status === "busy" && "Busy"}
                        {member.status === "off-duty" && "Off Duty"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/admin/bookings">
            <Card className="bg-card border-border hover:border-primary/30 cursor-pointer transition-colors h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icons.calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Manage Bookings</h3>
                  <p className="text-sm text-muted-foreground">{dashboardData.pendingBookings} pending</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/staff">
            <Card className="bg-card border-border hover:border-primary/30 cursor-pointer transition-colors h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Icons.users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Staff Management</h3>
                  <p className="text-sm text-muted-foreground">{dashboardData.totalStaff} members</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/customers">
            <Card className="bg-card border-border hover:border-primary/30 cursor-pointer transition-colors h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Icons.user className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Customers</h3>
                  <p className="text-sm text-muted-foreground">{dashboardData.totalCustomers} total</p>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reports">
            <Card className="bg-card border-border hover:border-primary/30 cursor-pointer transition-colors h-full">
              <CardContent className="p-6 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Icons.barChart className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Reports</h3>
                  <p className="text-sm text-muted-foreground">View analytics</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}

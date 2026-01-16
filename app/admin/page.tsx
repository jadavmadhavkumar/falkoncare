"use client"

import { useEffect, useState } from "react"
import { AdminTopBar } from "@/components/admin/admin-top-bar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { Icons } from "@/components/icons"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AdminDashboardPage() {
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
    try {
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const bookings = JSON.parse(localStorage.getItem("bookings") || "[]")
      const staff = users.filter((u: any) => u.role === "staff")

      const pendingCount = bookings.filter((b: any) => b.status === "pending").length
      const completedCount = bookings.filter((b: any) => b.status === "completed").length
      const totalRev = bookings
        .filter((b: any) => b.status === "completed")
        .reduce((sum: number, b: any) => sum + (b.amount || 0), 0)
      const availableStaffCount = staff.filter((s: any) => s.status === "available").length

      setDashboardData({
        totalBookings: bookings.length,
        pendingBookings: pendingCount,
        todayBookings: bookings.filter((b: any) => {
          const today = new Date().toISOString().split("T")[0]
          return b.bookingDate === today
        }).length,
        completedBookings: completedCount,
        totalRevenue: totalRev,
        totalCustomers: users.filter((u: any) => u.role === "customer").length,
        totalStaff: staff.length,
        availableStaff: availableStaffCount,
        recentBookings: bookings.slice(0, 5),
        staffMembers: staff.slice(0, 5),
      })
    } catch (err) {
      console.error("Error loading dashboard data:", err)
      setError("Failed to load dashboard")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const averageBookingValue =
    dashboardData.totalBookings > 0 ? Math.round(dashboardData.totalRevenue / dashboardData.completedBookings) : 0

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="flex items-center justify-center h-64">
          <Icons.loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <AdminTopBar title="Dashboard" subtitle="Welcome to admin panel" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        <StatsCard
          title="Total Customers"
          value={dashboardData.totalCustomers.toString()}
          icon={<Icons.user className="w-5 h-5" />}
          color="primary"
        />
        <StatsCard
          title="Total Bookings"
          value={dashboardData.totalBookings.toString()}
          icon={<Icons.calendar className="w-5 h-5" />}
          color="accent"
        />
        <StatsCard
          title="Today's Bookings"
          value={dashboardData.todayBookings.toString()}
          icon={<Icons.calendarDays className="w-5 h-5" />}
          color="success"
          trend="+12% from yesterday"
          trendUp={true}
        />
        <StatsCard
          title="Pending Approvals"
          value={dashboardData.pendingBookings.toString()}
          icon={<Icons.clock className="w-5 h-5" />}
          color="warning"
        />
        <StatsCard
          title="Available Staff"
          value={`${dashboardData.availableStaff}/${dashboardData.totalStaff}`}
          icon={<Icons.users className="w-5 h-5" />}
          color="info"
        />
      </div>

      {error && <div className="mt-8 p-4 bg-red-500/10 text-red-500 rounded-lg">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/admin/customers" className={cn("block p-3 rounded-lg hover:bg-secondary")}>
              Manage Customers
            </Link>
            <Link href="/admin/staff" className={cn("block p-3 rounded-lg hover:bg-secondary")}>
              Manage Staff
            </Link>
            <Link href="/admin/bookings" className={cn("block p-3 rounded-lg hover:bg-secondary")}>
              Manage Bookings
            </Link>
            <Link href="/admin/reports" className={cn("block p-3 rounded-lg hover:bg-secondary")}>
              View Reports
            </Link>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1 bg-card border-border">
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
                {dashboardData.recentBookings.map((booking: any) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icons.droplets className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Service Booking</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.bookingDate).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}{" "}
                          at {booking.bookingTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {booking.staffId ? (
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

        <Card className="lg:col-span-1 bg-card border-border">
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
                {dashboardData.staffMembers.map((member: any) => (
                  <div key={member.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icons.user className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{member.fullName}</p>
                        <div className="flex items-center gap-1">
                          <Icons.star className="w-3 h-3 fill-warning text-warning" />
                          <span className="text-xs text-muted-foreground">5</span>
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
    </div>
  )
}

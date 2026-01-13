"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AdminTopBar } from "@/components/admin/admin-top-bar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface StaffMember {
  id: string
  full_name: string
  email: string
  phone_number: string
  status: string
  rating: number
  completed_jobs: number
}

export default function AdminStaffPage() {
  const router = useRouter()
  const supabase = createClient()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data, error: fetchError } = await supabase
          .from("profiles")
          .select("*")
          .eq("role", "staff")
          .order("created_at", { ascending: false })

        if (fetchError) throw fetchError

        setStaff(data || [])
      } catch (err) {
        console.error("Error fetching staff:", err)
        setError(err instanceof Error ? err.message : "Failed to load staff")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStaff()
  }, [supabase, router])

  const handleStatusChange = async (staffId: string, newStatus: string) => {
    try {
      const { error: updateError } = await supabase.from("profiles").update({ status: newStatus }).eq("id", staffId)

      if (updateError) throw updateError

      setStaff(staff.map((s) => (s.id === staffId ? { ...s, status: newStatus } : s)))
    } catch (err) {
      console.error("Error updating staff status:", err)
      setError(err instanceof Error ? err.message : "Failed to update staff status")
    }
  }

  const stats = [
    { label: "Total Staff", value: staff.length, icon: Icons.users },
    { label: "Available", value: staff.filter((s) => s.status === "available").length, icon: Icons.checkCircle },
    { label: "Busy", value: staff.filter((s) => s.status === "busy").length, icon: Icons.clock },
    { label: "Off Duty", value: staff.filter((s) => s.status === "off-duty").length, icon: Icons.xCircle },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminTopBar title="Staff Management" />
        <div className="flex items-center justify-center h-96">
          <Icons.loader className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminTopBar title="Staff Management" />

      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <Card key={stat.label} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Staff Grid */}
        {staff.length === 0 ? (
          <div className="text-center py-16">
            <Icons.users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No staff members found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <Card key={member.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icons.user className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{member.full_name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-1">
                            <Icons.star className="w-4 h-4 fill-warning text-warning" />
                            <span className="text-sm font-medium text-foreground">{member.rating}</span>
                          </div>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{member.completed_jobs} jobs</span>
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

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.phone className="w-4 h-4" />
                      <span>{member.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icons.mail className="w-4 h-4" />
                      <span>{member.email}</span>
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={member.status === "available" ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        member.status === "available" && "bg-success hover:bg-success/90 text-success-foreground",
                      )}
                      onClick={() => handleStatusChange(member.id, "available")}
                    >
                      Available
                    </Button>
                    <Button
                      size="sm"
                      variant={member.status === "busy" ? "default" : "outline"}
                      className={cn(
                        "flex-1",
                        member.status === "busy" && "bg-warning hover:bg-warning/90 text-warning-foreground",
                      )}
                      onClick={() => handleStatusChange(member.id, "busy")}
                    >
                      Busy
                    </Button>
                    <Button
                      size="sm"
                      variant={member.status === "off-duty" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => handleStatusChange(member.id, "off-duty")}
                    >
                      Off
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

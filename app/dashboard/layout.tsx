"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useUser()
  const ensureUser = useMutation(api.users.ensureUser)

  useEffect(() => {
    if (user) {
      ensureUser()
    }
  }, [user, ensureUser])

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="customer" />
      <main className="lg:ml-64 min-h-screen">{children}</main>
    </div>
  )
}

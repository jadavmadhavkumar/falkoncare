import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole="admin" />
      <main className="ml-64">{children}</main>
    </div>
  )
}

"use client"

import { useAppStore } from "@/lib/store"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface TopBarProps {
  title: string
  onMenuClick?: () => void
}

export function TopBar({ title, onMenuClick }: TopBarProps) {
  const { customer, notifications } = useAppStore()
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile Menu Button */}
        {onMenuClick && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Icons.menu className="w-5 h-5" />
          </Button>
        )}
        <h1 className="text-lg lg:text-xl font-semibold text-foreground">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Wallet Balance */}
        {customer && (
          <Link href="/dashboard/wallet">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
              <Icons.wallet className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary flex items-center">
                <Icons.rupee className="w-3 h-3" />
                {customer.walletBalance.toLocaleString()}
              </span>
            </div>
          </Link>
        )}

        {/* Notifications */}
        <Link href="/dashboard/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Icons.bell className="w-5 h-5 text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 text-xs font-medium rounded-full bg-destructive text-destructive-foreground flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>

        {/* Profile */}
        <Link href="/dashboard/profile">
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Icons.user className="w-5 h-5 text-primary" />
            </div>
            {customer && (
              <div className="hidden md:block">
                <p className="text-sm font-medium text-foreground">{customer.name}</p>
                <p className="text-xs text-muted-foreground">{customer.email}</p>
              </div>
            )}
          </div>
        </Link>
      </div>
    </header>
  )
}

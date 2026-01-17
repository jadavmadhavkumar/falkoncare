"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Improved logo styling with better visual weight */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg group-hover:shadow-lg transition-shadow">
              <Icons.droplets className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Falkon
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="#services"
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              About
            </Link>
            <Link
              href="/careers"
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              Careers
            </Link>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1"
            >
              <Icons.whatsapp className="w-4 h-4" />
              Contact
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="font-semibold">
                Login
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-primary-foreground font-semibold">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icons.menu className="w-6 h-6 text-foreground" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 space-y-4 animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-2">
              <Link
                href="#services"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Services
              </Link>
              <Link
                href="/about"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="/careers"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Careers
              </Link>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors font-medium flex items-center gap-1"
              >
                <Icons.whatsapp className="w-4 h-4" />
                WhatsApp Us
              </a>
            </nav>
            <div className="flex gap-2 pt-4 px-4">
              <Link href="/auth/login" className="flex-1">
                <Button variant="outline" className="w-full font-semibold bg-transparent">
                  Login
                </Button>
              </Link>
              <Link href="/auth/signup" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

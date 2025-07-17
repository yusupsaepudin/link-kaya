"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
          <span className="font-bold text-xl">BioLink</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
            Explore
          </Link>
          <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors">
            Brands
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How it Works
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Join as Reseller</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <nav className="container py-4 flex flex-col gap-4">
              <Link href="/explore" className="text-sm font-medium hover:text-primary transition-colors">
                Explore
              </Link>
              <Link href="/brands" className="text-sm font-medium hover:text-primary transition-colors">
                Brands
              </Link>
              <Link href="/how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
                How it Works
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/signin">Sign In</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/register">Join as Reseller</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
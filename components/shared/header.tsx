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
          <div className="flex items-center">
            <span className="text-2xl font-black">
              <span className="text-mediakaya-blue">M</span>
              <span className="text-mediakaya-blue">K</span>
            </span>
            <div className="ml-3 flex flex-col leading-none">
              <span className="text-sm font-bold">
                <span className="text-mediakaya-blue">MEDIA</span>
                <span className="text-mediakaya-red">KAYA</span>
              </span>
              <span className="text-xs font-semibold text-mediakaya-blue tracking-wider">NETWORK</span>
            </div>
          </div>
        </Link>

        

        <div className="flex items-center gap-4">
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/signin">Masuk</Link>
            </Button>
            <Button className="bg-mediakaya-blue hover:bg-mediakaya-blue-dark" asChild>
              <Link href="/register">Daftar Reseller</Link>
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
              
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href="/signin">Masuk</Link>
                </Button>
                <Button className="w-full bg-mediakaya-blue hover:bg-mediakaya-blue-dark" asChild>
                  <Link href="/register">Daftar Reseller</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
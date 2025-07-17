import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { FaInstagram, FaWhatsapp, FaTwitter } from "react-icons/fa"

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-b from-white via-gray-50 to-gray-100">
      <div className="container py-20">
        {/* Main Footer Content */}
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
            {/* About */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <span className="font-extrabold text-2xl text-gray-900 tracking-tight">BioLink</span>
              </div>
              <p className="text-gray-600 text-base leading-relaxed mb-8 max-w-xs">
                Platform bio link untuk reseller.<br />
                Mulai bisnis online Anda dengan mudah dan aman.
              </p>
              <div className="flex gap-3">
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-mediakaya-blue hover:text-white flex items-center justify-center transition-all duration-200 shadow hover:scale-105"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-lg" />
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-mediakaya-blue hover:text-white flex items-center justify-center transition-all duration-200 shadow hover:scale-105"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="text-lg" />
                </Link>
                <Link 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-200 hover:bg-mediakaya-blue hover:text-white flex items-center justify-center transition-all duration-200 shadow hover:scale-105"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-lg" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-5 text-gray-900 text-lg">Bantuan</h4>
              <ul className="space-y-4 text-base">
                <li>
                  <Link href="/help" className="text-gray-600 hover:text-mediakaya-blue transition-colors font-medium">
                    Cara Memulai
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-mediakaya-blue transition-colors font-medium">
                    Hubungi Kami
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-600 hover:text-mediakaya-blue transition-colors font-medium">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-5 text-gray-900 text-lg">Legal</h4>
              <ul className="space-y-4 text-base">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-mediakaya-blue transition-colors font-medium">
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-mediakaya-blue transition-colors font-medium">
                    Syarat & Ketentuan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <Separator className="mb-8" />
        <div className="pt-4">
          <div className="mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm">
                &copy; 2024 <span className="font-semibold text-mediakaya-blue">BioLink</span> by MediaKaya Network. All rights reserved.
              </p>
              <p className="text-gray-400 text-xs flex items-center gap-1">
                Made with <span className="text-red-500 text-base">❤️</span> in Indonesia
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
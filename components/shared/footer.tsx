import Link from "next/link"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
              <span className="font-bold text-xl">BioLink</span>
            </div>
            <p className="text-sm text-muted-foreground">
              The ultimate bio-link reseller platform. Connecting brands with resellers.
            </p>
          </div>

          {/* For Resellers */}
          <div>
            <h4 className="font-semibold mb-4">For Resellers</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/how-it-works" className="hover:text-foreground transition-colors">How it Works</Link></li>
              <li><Link href="/join" className="hover:text-foreground transition-colors">Join as Reseller</Link></li>
              <li><Link href="/success-stories" className="hover:text-foreground transition-colors">Success Stories</Link></li>
              <li><Link href="/reseller-guide" className="hover:text-foreground transition-colors">Reseller Guide</Link></li>
            </ul>
          </div>

          {/* For Brands */}
          <div>
            <h4 className="font-semibold mb-4">For Brands</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/brand-partnership" className="hover:text-foreground transition-colors">Partner with Us</Link></li>
              <li><Link href="/brand-benefits" className="hover:text-foreground transition-colors">Benefits</Link></li>
              <li><Link href="/brand-guide" className="hover:text-foreground transition-colors">Brand Guide</Link></li>
              <li><Link href="/brand-faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/help" className="hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 BioLink Reseller Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Instagram</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">WhatsApp</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
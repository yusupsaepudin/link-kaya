import { Header } from "@/components/shared/header"
import { Footer } from "@/components/shared/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Package, DollarSign } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Build Your Bio Link Store & Earn Commissions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of resellers creating profitable online stores. 
                Curate products from top brands, set your prices, and start earning today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Start Selling Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/explore">Explore Stores</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 border-y">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">Active Resellers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Partner Brands</div>
              </div>
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Products Listed</div>
              </div>
              <div>
                <div className="text-3xl font-bold">Rp 2M+</div>
                <div className="text-sm text-muted-foreground">Paid to Resellers</div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">1. Create Your Store</h3>
                <p className="text-sm text-muted-foreground">
                  Sign up and customize your bio link page with your brand identity
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/20 flex items-center justify-center mx-auto mb-4">
                  <Package className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-2">2. Add Products</h3>
                <p className="text-sm text-muted-foreground">
                  Browse our catalog and add products with your custom markup
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">3. Earn Commissions</h3>
                <p className="text-sm text-muted-foreground">
                  Share your link and earn on every sale you make
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose BioLink Reseller?</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "No inventory needed - we handle shipping",
                "Set your own prices and profit margins",
                "Real-time analytics and sales tracking",
                "Multiple payment methods supported",
                "Mobile-optimized stores",
                "24/7 customer support"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <Card className="p-8 md:p-12 text-center bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Business?</h2>
              <p className="text-lg mb-8 opacity-90">
                Join thousands of successful resellers today
              </p>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/register">
                  Create Your Store
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
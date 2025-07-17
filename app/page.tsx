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
        <section className="relative py-20 lg:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Buat Bio Link Store Anda & Mulai Jualan Online
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Platform sederhana untuk membuat toko online melalui bio link. 
                Pilih produk, atur harga, dan mulai berjualan dengan mudah.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-mediakaya-blue hover:bg-mediakaya-blue-dark" asChild>
                  <Link href="/register">
                    Mulai Berjualan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sarahbeauty">Lihat Contoh Toko</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">Mengapa Memilih Bio Link Store?</h2>
              <p className="text-gray-600 mb-12">
                Platform yang dirancang untuk memudahkan Anda memulai bisnis online tanpa ribet.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="w-12 h-12 bg-mediakaya-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div className="font-semibold text-gray-900">Mudah Digunakan</div>
                  <div className="text-sm text-gray-600">Setup dalam hitungan menit</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-mediakaya-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">💰</span>
                  </div>
                  <div className="font-semibold text-gray-900">Atur Harga Sendiri</div>
                  <div className="text-sm text-gray-600">Kontrol penuh atas profit</div>
                </div>
                <div>
                  <div className="w-12 h-12 bg-mediakaya-blue/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div className="font-semibold text-gray-900">Tanpa Modal Besar</div>
                  <div className="text-sm text-gray-600">Mulai tanpa stok barang</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Cara Kerjanya</h2>
              <p className="text-gray-600">
                Hanya 3 langkah sederhana untuk memulai toko online Anda
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-mediakaya-blue flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-mediakaya-blue">1</span>
                </div>
                <h3 className="font-semibold mb-3 text-gray-900">Buat Akun & Setup Toko</h3>
                <p className="text-gray-600">
                  Daftar dan buat halaman bio link Anda dalam beberapa menit
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-mediakaya-blue flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-mediakaya-blue">2</span>
                </div>
                <h3 className="font-semibold mb-3 text-gray-900">Pilih & Tambah Produk</h3>
                <p className="text-gray-600">
                  Pilih produk dari katalog dan tentukan harga jual Anda
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-mediakaya-blue flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold text-mediakaya-blue">3</span>
                </div>
                <h3 className="font-semibold mb-3 text-gray-900">Share & Mulai Jualan</h3>
                <p className="text-gray-600">
                  Bagikan link toko Anda dan mulai raih keuntungan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Fitur yang Membantu Anda</h2>
              <p className="text-gray-600">
                Tools sederhana namun lengkap untuk mendukung bisnis online Anda
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                "Tanpa perlu stok barang - kami yang urus pengiriman",
                "Bebas tentukan harga jual dan margin keuntungan",
                "Pantau penjualan melalui dashboard sederhana", 
                "Dukungan berbagai metode pembayaran",
                "Tampilan toko yang mobile-friendly",
                "Tim support yang siap membantu"
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-mediakaya-blue mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Siap Memulai Toko Online Anda?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Bergabunglah dengan reseller lainnya yang sudah memulai bisnis online mereka
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-mediakaya-blue hover:bg-mediakaya-blue-dark" asChild>
                  <Link href="/register">
                    Daftar Sekarang
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/sarahbeauty">Lihat Demo Toko</Link>
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                Gratis untuk memulai • Setup dalam 5 menit
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
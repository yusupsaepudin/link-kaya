import { SimpleHeader } from "@/components/features/bio-link/simple-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Copy, MessageCircle, Package } from "lucide-react"
import Link from "next/link"
import { formatCurrency } from "@/lib/utils/formatters"

interface OrderConfirmationPageProps {
  params: Promise<{
    username: string
    orderId: string
  }>
}

export default async function OrderConfirmationPage({ params }: OrderConfirmationPageProps) {
  const { username, orderId } = await params
  const invoiceId = `INV-${Date.now()}`

  // Mock order data
  const orderData = {
    invoiceId,
    orderId,
    total: 350000,
    paymentMethod: "Transfer Bank",
    bankAccount: {
      bank: "BCA",
      accountNumber: "1234567890",
      accountName: "PT BioLink Indonesia"
    },
    customerInfo: {
      name: "John Doe",
      phone: "+6281234567890",
      email: "john@example.com"
    }
  }

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(orderData.bankAccount.accountNumber)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader 
        username={username} 
        hideCartIcon={true}
        hideWishlistIcon={true}
      />
      
      <div className="bg-white min-h-screen">
        <div className="container-mobile py-12">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Pesanan Berhasil Dibuat!</h1>
              <p className="text-muted-foreground">
                Terima kasih atas pesanan Anda. Kami akan mengirimkan konfirmasi melalui WhatsApp.
              </p>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Detail Pesanan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Pesanan</span>
                    <span className="font-mono">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ID Invoice</span>
                    <span className="font-mono">{invoiceId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Pembayaran</span>
                    <span className="font-semibold">{formatCurrency(orderData.total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Metode Pembayaran</span>
                    <span>{orderData.paymentMethod}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Petunjuk Pembayaran</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Silakan selesaikan pembayaran dalam 24 jam untuk menghindari pembatalan pesanan.
                </p>
                
                <div className="bg-muted p-4 rounded-lg space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Bank</p>
                    <p className="font-semibold">{orderData.bankAccount.bank}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nomor Rekening</p>
                    <div className="flex items-center gap-2">
                      <p className="font-mono font-semibold">{orderData.bankAccount.accountNumber}</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={handleCopyAccount}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nama Pemilik</p>
                    <p className="font-semibold">{orderData.bankAccount.accountName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Jumlah Transfer</p>
                    <p className="text-2xl font-bold text-primary">{formatCurrency(orderData.total)}</p>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    <strong>Penting:</strong> Harap transfer dengan jumlah yang tepat termasuk 3 digit terakhir untuk memudahkan verifikasi.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" asChild>
                <Link href={`/${username}/track/${invoiceId}`}>
                  <Package className="mr-2 h-4 w-4" />
                  Lacak Pesanan
                </Link>
              </Button>
              <Button asChild className="bg-green-500 hover:bg-green-600">
                <a 
                  href={`https://wa.me/${orderData.customerInfo.phone.replace('+', '')}?text=Halo, saya baru saja melakukan pesanan ${orderId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Hubungi Penjual
                </a>
              </Button>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                Butuh bantuan? Hubungi tim dukungan kami
              </p>
              <Button variant="link" asChild>
                <Link href={`/${username}`}>Lanjut Belanja</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
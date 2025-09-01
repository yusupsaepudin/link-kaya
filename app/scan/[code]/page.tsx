'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CheckCircle, XCircle, Loader2, QrCode, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'
import { useCommunityStore } from '@/lib/stores/useCommunityStore'
import { useWalletStore } from '@/lib/stores/useWalletStore'
import { toast } from 'sonner'

export default function VoucherScanPage() {
  const params = useParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(true)
  const [scanResult, setScanResult] = useState<'success' | 'failed' | 'expired' | null>(null)
  const [voucherDetails, setVoucherDetails] = useState<any>(null)
  
  const { getVoucherByCode, redeemVoucher, setActiveVoucher } = useCommunityStore()
  const { processCommission } = useWalletStore()

  useEffect(() => {
    const processVoucherScan = async () => {
      try {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        const voucherCode = params.code as string
        const voucher = getVoucherByCode(voucherCode)
        
        if (!voucher) {
          setScanResult('failed')
          toast.error('Invalid voucher code')
          return
        }
        
        // Check if voucher is expired
        if (voucher.validUntil && new Date() > new Date(voucher.validUntil)) {
          setScanResult('expired')
          toast.error('This voucher has expired')
          return
        }
        
        // Check if voucher is at max redemptions
        if (voucher.maxRedemptions && voucher.currentRedemptions >= voucher.maxRedemptions) {
          setScanResult('failed')
          toast.error('This voucher has reached maximum redemptions')
          return
        }
        
        // Redeem the voucher
        const redeemedVoucher = redeemVoucher(voucherCode)
        
        if (redeemedVoucher) {
          setVoucherDetails(redeemedVoucher)
          setScanResult('success')
          
          // Process community commission
          const commissionAmount = 1000 * (redeemedVoucher.commissionPercentage / 100)
          processCommission(`voucher_${redeemedVoucher.id}`, {
            reseller: 0,
            community: commissionAmount
          })
          
          toast.success('Voucher redeemed successfully!')
          
          // If it's a product voucher, redirect to product
          if (redeemedVoucher.type === 'product' && redeemedVoucher.productId) {
            setTimeout(() => {
              router.push(`/produk/${redeemedVoucher.productId}`)
            }, 2000)
          }
        } else {
          setScanResult('failed')
          toast.error('Failed to redeem voucher')
        }
      } catch (error) {
        setScanResult('failed')
        toast.error('An error occurred while processing the voucher')
      } finally {
        setIsProcessing(false)
      }
    }
    
    processVoucherScan()
  }, [params.code])

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <QrCode className="h-16 w-16 text-muted-foreground" />
                <Loader2 className="h-16 w-16 absolute inset-0 animate-spin text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-lg">Processing Voucher</h3>
                <p className="text-sm text-muted-foreground">
                  Please wait while we verify your voucher...
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            {scanResult === 'success' ? (
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            ) : scanResult === 'expired' ? (
              <div className="h-20 w-20 rounded-full bg-yellow-100 flex items-center justify-center">
                <AlertCircle className="h-12 w-12 text-yellow-600" />
              </div>
            ) : (
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-center">
            {scanResult === 'success' ? 'Voucher Redeemed!' :
             scanResult === 'expired' ? 'Voucher Expired' :
             'Invalid Voucher'}
          </CardTitle>
          
          <CardDescription className="text-center">
            {scanResult === 'success' ? 'Your voucher has been successfully applied' :
             scanResult === 'expired' ? 'This voucher is no longer valid' :
             'The voucher code is invalid or has already been used'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {scanResult === 'success' && voucherDetails && (
            <>
              <div className="space-y-3 p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Voucher Type</span>
                  <Badge>{voucherDetails.type}</Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Code</span>
                  <span className="font-mono font-semibold">{voucherDetails.code}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Community</span>
                  <span className="font-medium">{voucherDetails.communityName}</span>
                </div>
                
                {voucherDetails.productName && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Product</span>
                    <span className="font-medium">{voucherDetails.productName}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Commission Earned</span>
                  <span className="font-medium text-green-600">
                    {voucherDetails.commissionPercentage}%
                  </span>
                </div>
              </div>
              
              {voucherDetails.type === 'event' && (
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your attendance has been recorded. Thank you for participating!
                  </AlertDescription>
                </Alert>
              )}
              
              {voucherDetails.type === 'product' && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Redirecting you to the product page...
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}
          
          <div className="flex gap-2">
            <Button 
              className="flex-1"
              onClick={() => router.push('/admin/community')}
            >
              View Dashboard
            </Button>
            
            {scanResult === 'success' && voucherDetails?.type === 'product' && (
              <Button 
                variant="outline"
                className="flex-1"
                onClick={() => router.push(`/produk/${voucherDetails.productId}`)}
              >
                View Product
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
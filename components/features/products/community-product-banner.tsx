'use client'

import { useState } from 'react'
import { QrCode, Users, Gift, CheckCircle, Scan } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import QRCode from 'react-qr-code'
import { toast } from 'sonner'

interface CommunityProductBannerProps {
  product: {
    id: string
    name: string
    isCommunityExclusive?: boolean
    commission: number
  }
  username: string
}

export function CommunityProductBanner({ product, username }: CommunityProductBannerProps) {
  const [showQRModal, setShowQRModal] = useState(false)
  const [scanResult, setScanResult] = useState<'idle' | 'scanning' | 'success'>('idle')
  const [scannedBy, setScannedBy] = useState('')
  
  if (!product.isCommunityExclusive) {
    return null
  }

  const handleSimulateScan = () => {
    setScanResult('scanning')
    // Simulate scanning delay
    setTimeout(() => {
      setScanResult('success')
      setScannedBy('Field Agent #001')
      toast.success('QR Code verified successfully!')
      
      // Reset after showing success
      setTimeout(() => {
        setScanResult('idle')
        setShowQRModal(false)
      }, 3000)
    }, 2000)
  }

  const qrData = JSON.stringify({
    type: 'community_product',
    productId: product.id,
    productName: product.name,
    username: username,
    timestamp: new Date().toISOString(),
    commission: product.commission
  })

  return (
    <>
      <Card className="mb-6 border-2 border-primary/20">
        <CardContent className="pt-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="h-5 w-5 text-primary" />
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  Community Exclusive
                </Badge>
                <Badge variant="outline" className="border-green-500 text-green-600">
                  {product.commission}% Commission
                </Badge>
              </div>
              
              <h3 className="font-semibold text-lg mb-2">Special Community Product</h3>
              <p className="text-sm text-muted-foreground mb-4">
                This is an exclusive product for community members. Show the QR code to field agents to verify your eligibility.
              </p>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
                <Users className="h-4 w-4 text-primary" />
                <div className="text-sm">
                  <span className="font-medium">How it works:</span>
                  <ol className="mt-1 space-y-1 text-muted-foreground">
                    <li>1. Click &ldquo;Show QR Code&rdquo; below</li>
                    <li>2. Show QR to field agent at event/meetup</li>
                    <li>3. Agent scans to verify community membership</li>
                    <li>4. Get exclusive pricing and benefits</li>
                  </ol>
                </div>
              </div>
              
              <Button 
                className="w-full" 
                size="lg"
                onClick={() => setShowQRModal(true)}
              >
                <QrCode className="mr-2 h-5 w-5" />
                Show QR Code for Verification
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Community Product QR Code</DialogTitle>
            <DialogDescription>
              Show this QR code to field agents for verification
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {scanResult === 'idle' && (
              <>
                <div className="flex justify-center p-6 bg-white rounded-lg">
                  <QRCode
                    value={qrData}
                    size={280}
                    level="H"
                    style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  />
                </div>
                
                <div className="space-y-3">
                  <Alert>
                    <QrCode className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Product:</strong> {product.name}<br />
                      <strong>Commission:</strong> {product.commission}%<br />
                      <strong>Status:</strong> Ready to scan
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleSimulateScan}
                  >
                    <Scan className="mr-2 h-4 w-4" />
                    Simulate Field Agent Scan (Demo)
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground">
                    In production, this QR will be scanned by authorized field agents
                  </p>
                </div>
              </>
            )}
            
            {scanResult === 'scanning' && (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-primary/10">
                  <Scan className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <h3 className="font-semibold mb-2">Scanning QR Code...</h3>
                <p className="text-sm text-muted-foreground">
                  Verifying community membership
                </p>
              </div>
            )}
            
            {scanResult === 'success' && (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Verification Successful!</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Community membership confirmed
                </p>
                <Badge variant="outline" className="text-green-600 border-green-500">
                  Scanned by: {scannedBy}
                </Badge>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
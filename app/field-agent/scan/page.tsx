'use client'

import { useState } from 'react'
import { Scan, CheckCircle, User, Package, Calendar, ArrowLeft, Users } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import Link from 'next/link'

export default function FieldAgentScanPage() {
  const [scanMode, setScanMode] = useState<'idle' | 'scanning' | 'result'>('idle')
  const [scanResult, setScanResult] = useState<{
    type: string
    reseller: string
    username: string
    productName?: string
    voucherName?: string
    communityName: string
    commission: number
    timestamp: string
  } | null>(null)
  const [manualCode, setManualCode] = useState('')
  const [agentId] = useState('AGENT-001')

  const handleScan = () => {
    setScanMode('scanning')
    
    // Simulate scanning delay
    setTimeout(() => {
      // Mock successful scan result
      const mockResult = {
        type: 'community_product',
        reseller: 'Sarah Johnson',
        productName: 'Jakarta Beauty Community Box',
        username: 'sarahbeauty',
        commission: 25,
        timestamp: new Date().toISOString(),
        communityName: 'Jakarta Beauty Community'
      }
      
      setScanResult(mockResult)
      setScanMode('result')
      toast.success('QR Code verified successfully!')
    }, 2000)
  }

  const handleManualSubmit = () => {
    if (!manualCode) {
      toast.error('Please enter a voucher code')
      return
    }
    
    // Process manual code
    if (manualCode === 'COMMUNITY2024') {
      const mockResult = {
        type: 'community_voucher',
        reseller: 'Community Member',
        username: 'community_member',
        voucherName: 'Jakarta Beauty Community Special',
        commission: 15,
        communityName: 'Jakarta Beauty Community',
        timestamp: new Date().toISOString()
      }
      
      setScanResult(mockResult)
      setScanMode('result')
      toast.success('Voucher code verified!')
    } else {
      toast.error('Invalid voucher code')
    }
  }

  const handleReset = () => {
    setScanMode('idle')
    setScanResult(null)
    setManualCode('')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
          <Badge variant="outline">
            Agent ID: {agentId}
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Field Agent Scanner</CardTitle>
            <CardDescription>
              Scan QR codes or enter voucher codes to verify community members
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {scanMode === 'idle' && (
              <>
                {/* QR Scanner Section */}
                <div className="space-y-4">
                  <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                    <div className="text-center space-y-4">
                      <Scan className="h-16 w-16 mx-auto text-gray-400" />
                      <div>
                        <h3 className="font-semibold text-lg">QR Code Scanner</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Position QR code within the frame
                        </p>
                      </div>
                      <Button onClick={handleScan} size="lg">
                        <Scan className="mr-2 h-5 w-5" />
                        Start Scanning
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">Or enter manually</span>
                  </div>
                </div>

                {/* Manual Entry Section */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-code">Voucher Code</Label>
                    <Input
                      id="manual-code"
                      placeholder="Enter voucher code (e.g., COMMUNITY2024)"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                      className="font-mono"
                    />
                  </div>
                  <Button 
                    onClick={handleManualSubmit} 
                    variant="outline" 
                    className="w-full"
                    disabled={!manualCode}
                  >
                    Verify Code
                  </Button>
                </div>

                <Alert>
                  <Scan className="h-4 w-4" />
                  <AlertDescription>
                    Scan community member QR codes to verify their eligibility for exclusive products and offers.
                  </AlertDescription>
                </Alert>
              </>
            )}

            {scanMode === 'scanning' && (
              <div className="py-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-primary/10">
                  <Scan className="h-10 w-10 text-primary animate-pulse" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Scanning...</h3>
                <p className="text-sm text-muted-foreground">
                  Verifying QR code authenticity
                </p>
              </div>
            )}

            {scanMode === 'result' && scanResult && (
              <div className="space-y-6">
                {/* Success Header */}
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">Verification Successful</h3>
                  <Badge variant="outline" className="text-green-600 border-green-500">
                    Valid {scanResult.type === 'community_product' ? 'Product QR' : 'Voucher'}
                  </Badge>
                </div>

                {/* Result Details */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  {scanResult.type === 'community_product' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <Package className="h-4 w-4" />
                          Product
                        </span>
                        <span className="font-medium">{scanResult.productName}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground flex items-center gap-2">
                          <User className="h-4 w-4" />
                          Member
                        </span>
                        <span className="font-medium">{scanResult.reseller}</span>
                      </div>
                    </>
                  )}
                  
                  {scanResult.type === 'community_voucher' && (
                    <>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Voucher Name</span>
                        <span className="font-medium">{scanResult.voucherName}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Community
                    </span>
                    <span className="font-medium">{scanResult.communityName}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Commission</span>
                    <span className="font-medium text-green-600">{scanResult.commission}%</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Scanned At
                    </span>
                    <span className="font-medium">
                      {new Date().toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Alert className="bg-green-50 border-green-200">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800">
                      Member is eligible for community benefits. 
                      {scanResult.type === 'community_product' && ' They can purchase this exclusive product.'}
                    </AlertDescription>
                  </Alert>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={handleReset}
                      className="flex-1"
                    >
                      Scan Another
                    </Button>
                    <Button 
                      variant="outline"
                      className="flex-1"
                      onClick={() => {
                        toast.success('Record saved to database')
                      }}
                    >
                      Save Record
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-base">Field Agent Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 text-sm text-muted-foreground">
              <li>1. Ask community member to show their QR code from the product page</li>
              <li>2. Scan the QR code or enter voucher code manually</li>
              <li>3. Verify the member&apos;s eligibility for community benefits</li>
              <li>4. Save the record for commission tracking</li>
              <li>5. Allow member to proceed with exclusive pricing</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
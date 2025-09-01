'use client'

import { useState, useEffect } from 'react'
import { Share2, QrCode, Link, MessageCircle, Facebook, Twitter, Copy, Check } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { QRCodeGenerator } from './QRCodeGenerator'
import { useCommunityStore } from '@/lib/stores/useCommunityStore'
import { useUserStore } from '@/lib/stores/useUserStore'
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  TelegramIcon
} from 'react-share'

interface ShareProductModalProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    description: string
    images: string[]
    sellingPrice: number
  }
  resellerId: string
}

export function ShareProductModal({ isOpen, onClose, product, resellerId }: ShareProductModalProps) {
  const [shareUrl, setShareUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState('qr')
  const { createCommunityShare, generateShareUrl } = useCommunityStore()
  const { currentUser } = useUserStore()

  useEffect(() => {
    if (isOpen && currentUser) {
      const url = generateShareUrl(product.id, currentUser.id)
      setShareUrl(url)
      
      // Create a community share record
      createCommunityShare({
        userId: currentUser.id,
        type: 'link_share',
        productId: product.id,
        referralCode: url.split('ref=')[1]?.split('&')[0] || '',
        shareUrl: url
      })
    }
  }, [isOpen, product.id, currentUser])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      toast.success('Link copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const shareTitle = `Check out ${product.name}`
  const shareDescription = product.description.substring(0, 100) + '...'

  const trackSocialShare = (platform: string) => {
    if (currentUser) {
      createCommunityShare({
        userId: currentUser.id,
        type: 'social_share',
        productId: product.id,
        referralCode: shareUrl.split('ref=')[1]?.split('&')[0] || '',
        shareUrl: shareUrl,
        metadata: { platform }
      })
    }
    toast.success(`Shared on ${platform}!`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Share Product</DialogTitle>
          <DialogDescription>
            Share this product with your community and earn commission on every sale
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="qr">
              <QrCode className="h-4 w-4 mr-2" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="link">
              <Link className="h-4 w-4 mr-2" />
              Share Link
            </TabsTrigger>
            <TabsTrigger value="social">
              <Share2 className="h-4 w-4 mr-2" />
              Social Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="space-y-4">
            <QRCodeGenerator
              value={shareUrl}
              title={product.name}
              description="Scan to view this product"
              size={300}
              showActions={true}
            />
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground text-center">
                  This QR code contains your unique referral link. 
                  You'll earn commission when someone makes a purchase through your link.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="link" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="share-link">Your Referral Link</Label>
              <div className="flex gap-2">
                <Input
                  id="share-link"
                  value={shareUrl}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Product</span>
                  <span className="font-medium">{product.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Your Commission</span>
                  <span className="font-medium text-green-600">10% per sale</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Community Bonus</span>
                  <span className="font-medium text-blue-600">5% to referrer</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <WhatsappShareButton
                url={shareUrl}
                title={shareTitle}
                separator=" - "
                className="w-full"
                onClick={() => trackSocialShare('WhatsApp')}
              >
                <Button variant="outline" className="w-full">
                  <WhatsappIcon size={20} round className="mr-2" />
                  WhatsApp
                </Button>
              </WhatsappShareButton>

              <FacebookShareButton
                url={shareUrl}
                quote={shareTitle}
                hashtag="#biolink"
                className="w-full"
                onClick={() => trackSocialShare('Facebook')}
              >
                <Button variant="outline" className="w-full">
                  <FacebookIcon size={20} round className="mr-2" />
                  Facebook
                </Button>
              </FacebookShareButton>

              <TwitterShareButton
                url={shareUrl}
                title={shareTitle}
                hashtags={['biolink', 'shopping']}
                className="w-full"
                onClick={() => trackSocialShare('Twitter')}
              >
                <Button variant="outline" className="w-full">
                  <TwitterIcon size={20} round className="mr-2" />
                  Twitter
                </Button>
              </TwitterShareButton>

              <TelegramShareButton
                url={shareUrl}
                title={shareTitle}
                className="w-full"
                onClick={() => trackSocialShare('Telegram')}
              >
                <Button variant="outline" className="w-full">
                  <TelegramIcon size={20} round className="mr-2" />
                  Telegram
                </Button>
              </TelegramShareButton>
            </div>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">How it works:</h4>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Share the product on your social media</li>
                    <li>Your followers click on your unique link</li>
                    <li>They make a purchase</li>
                    <li>You earn commission automatically!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
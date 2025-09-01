'use client'

import { useState } from 'react'
import QRCode from 'react-qr-code'
import { Download, Share2, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

interface QRCodeGeneratorProps {
  value: string
  title?: string
  description?: string
  size?: number
  showActions?: boolean
  onShare?: () => void
}

export function QRCodeGenerator({
  value,
  title = 'QR Code',
  description,
  size = 256,
  showActions = true,
  onShare
}: QRCodeGeneratorProps) {
  const [copied, setCopied] = useState(false)

  const handleDownload = () => {
    const svg = document.getElementById('qr-code-svg')
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${title.replace(/\s+/g, '-').toLowerCase()}-qr.png`
          a.click()
          URL.revokeObjectURL(url)
          toast.success('QR code downloaded successfully')
        }
      })
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      toast.success('Link copied to clipboard')
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description || `Check out this ${title}`,
          url: value
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          toast.error('Failed to share')
        }
      }
    } else {
      onShare?.()
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center p-4 bg-white rounded-lg">
          <QRCode
            id="qr-code-svg"
            value={value}
            size={size}
            level="H"
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          />
        </div>
        
        {showActions && (
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="flex items-center gap-2"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { QrCode, Calendar, Percent } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { useCommunityStore } from '@/lib/stores/useCommunityStore'
import { useAdminStore } from '@/lib/stores/useAdminStore'

const voucherSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  code: z.string().optional(),
  type: z.enum(['event', 'product', 'discount']),
  productId: z.string().optional(),
  communityId: z.string(),
  communityName: z.string(),
  commissionPercentage: z.number().min(1).max(50),
  maxRedemptions: z.number().optional(),
  validFrom: z.string(),
  validUntil: z.string().optional(),
  isActive: z.boolean()
})

type VoucherFormData = z.infer<typeof voucherSchema>

interface CreateVoucherModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateVoucherModal({ isOpen, onClose }: CreateVoucherModalProps) {
  const [voucherType, setVoucherType] = useState<'event' | 'product' | 'discount'>('event')
  const { createVoucher } = useCommunityStore()
  const { products } = useAdminStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch
  } = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      type: 'event',
      isActive: true,
      commissionPercentage: 10,
      validFrom: new Date().toISOString().split('T')[0]
    }
  })

  const watchType = watch('type')

  const onSubmit = async (data: VoucherFormData) => {
    try {
      const voucher = createVoucher({
        ...data,
        validFrom: new Date(data.validFrom),
        validUntil: data.validUntil ? new Date(data.validUntil) : undefined,
        createdBy: 'current-user-id', // This would come from user context
        productName: data.productId 
          ? products.find(p => p.id === data.productId)?.product?.name 
          : undefined
      })

      toast.success('Voucher created successfully!')
      reset()
      onClose()
    } catch (error) {
      toast.error('Failed to create voucher')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Community Voucher</DialogTitle>
          <DialogDescription>
            Create a QR code voucher for your community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Voucher Name</Label>
            <Input
              id="name"
              {...register('name')}
              placeholder="e.g., Community Meetup Special"
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register('description')}
              placeholder="Describe what this voucher is for..."
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Voucher Code (Optional)</Label>
            <Input
              id="code"
              {...register('code')}
              placeholder="Leave empty to auto-generate"
            />
            <p className="text-xs text-muted-foreground">
              If left empty, a unique code will be generated automatically
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Voucher Type</Label>
            <Select
              value={voucherType}
              onValueChange={(value: 'event' | 'product' | 'discount') => {
                setVoucherType(value)
                setValue('type', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voucher type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="event">Event Attendance</SelectItem>
                <SelectItem value="product">Product Specific</SelectItem>
                <SelectItem value="discount">General Discount</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {watchType === 'product' && (
            <div className="space-y-2">
              <Label htmlFor="productId">Select Product</Label>
              <Select onValueChange={(value) => setValue('productId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((item) => (
                    <SelectItem key={item.id} value={item.productId}>
                      {item.product?.name || 'Unknown Product'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="communityName">Community Name</Label>
            <Input
              id="communityName"
              {...register('communityName')}
              placeholder="e.g., Jakarta Developers"
              onChange={(e) => {
                setValue('communityName', e.target.value)
                setValue('communityId', `comm_${e.target.value.toLowerCase().replace(/\s+/g, '_')}`)
              }}
            />
            {errors.communityName && (
              <p className="text-sm text-destructive">{errors.communityName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="commissionPercentage">
              Commission Percentage
              <span className="ml-2 text-xs text-muted-foreground">
                (Community earnings per redemption)
              </span>
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="commissionPercentage"
                type="number"
                {...register('commissionPercentage', { valueAsNumber: true })}
                placeholder="10"
                min="1"
                max="50"
              />
              <Percent className="h-4 w-4 text-muted-foreground" />
            </div>
            {errors.commissionPercentage && (
              <p className="text-sm text-destructive">{errors.commissionPercentage.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maxRedemptions">
              Max Redemptions (Optional)
            </Label>
            <Input
              id="maxRedemptions"
              type="number"
              {...register('maxRedemptions', { valueAsNumber: true })}
              placeholder="Leave empty for unlimited"
              min="1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="validFrom">Valid From</Label>
              <Input
                id="validFrom"
                type="date"
                {...register('validFrom')}
              />
              {errors.validFrom && (
                <p className="text-sm text-destructive">{errors.validFrom.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until (Optional)</Label>
              <Input
                id="validUntil"
                type="date"
                {...register('validUntil')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="isActive" className="flex flex-col space-y-1">
              <span>Active Status</span>
              <span className="text-xs text-muted-foreground font-normal">
                Voucher can be redeemed immediately
              </span>
            </Label>
            <Switch
              id="isActive"
              defaultChecked
              onCheckedChange={(checked) => setValue('isActive', checked)}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Voucher'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { AlertCircle } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'
import { formatRupiah } from '@/lib/utils'
import { useWalletStore } from '@/lib/stores/useWalletStore'

const payoutSchema = z.object({
  amount: z.number().min(50000, 'Minimum payout is Rp 50,000'),
  method: z.enum(['bank', 'ewallet']),
  accountName: z.string().min(3, 'Account name is required'),
  accountNumber: z.string().min(5, 'Account number is required'),
  bankName: z.string().optional(),
  ewalletType: z.string().optional()
})

type PayoutFormData = z.infer<typeof payoutSchema>

interface PayoutRequestModalProps {
  isOpen: boolean
  onClose: () => void
  availableBalance: number
}

export function PayoutRequestModal({ isOpen, onClose, availableBalance }: PayoutRequestModalProps) {
  const [payoutMethod, setPayoutMethod] = useState<'bank' | 'ewallet'>('bank')
  const [amount, setAmount] = useState('')
  const { createPayoutRequest } = useWalletStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm<PayoutFormData>({
    resolver: zodResolver(payoutSchema),
    defaultValues: {
      method: 'bank'
    }
  })

  const onSubmit = async (data: PayoutFormData) => {
    try {
      const accountDetails: Record<string, string> = {
        accountName: data.accountName,
        accountNumber: data.accountNumber
      }

      if (data.method === 'bank' && data.bankName) {
        accountDetails.bankName = data.bankName
      } else if (data.method === 'ewallet' && data.ewalletType) {
        accountDetails.ewalletType = data.ewalletType
      }

      createPayoutRequest({
        userId: 'current-user-id', // This would come from user context
        amount: data.amount,
        method: data.method,
        accountDetails
      })

      toast.success('Payout request submitted successfully!')
      reset()
      onClose()
    } catch (_error) {
      toast.error('Failed to submit payout request')
    }
  }

  const handleAmountChange = (value: string) => {
    const numValue = value.replace(/\D/g, '')
    setAmount(numValue)
    setValue('amount', parseInt(numValue) || 0)
  }

  const quickAmounts = [100000, 250000, 500000, 1000000]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Payout</DialogTitle>
          <DialogDescription>
            Request a withdrawal of your available balance
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Available Balance</Label>
            <div className="text-2xl font-bold">{formatRupiah(availableBalance)}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount to Withdraw</Label>
            <Input
              id="amount"
              type="text"
              placeholder="Enter amount"
              value={amount ? formatRupiah(parseInt(amount)) : ''}
              onChange={(e) => handleAmountChange(e.target.value)}
            />
            {errors.amount && (
              <p className="text-sm text-destructive">{errors.amount.message}</p>
            )}
            <div className="flex gap-2 flex-wrap">
              {quickAmounts.map((quickAmount) => (
                <Button
                  key={quickAmount}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleAmountChange(quickAmount.toString())}
                  disabled={quickAmount > availableBalance}
                >
                  {formatRupiah(quickAmount)}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="method">Payout Method</Label>
            <Select
              value={payoutMethod}
              onValueChange={(value: 'bank' | 'ewallet') => {
                setPayoutMethod(value)
                setValue('method', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select payout method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bank">Bank Transfer</SelectItem>
                <SelectItem value="ewallet">E-Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {payoutMethod === 'bank' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Select onValueChange={(value) => setValue('bankName', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select bank" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BCA">BCA</SelectItem>
                    <SelectItem value="BNI">BNI</SelectItem>
                    <SelectItem value="BRI">BRI</SelectItem>
                    <SelectItem value="Mandiri">Mandiri</SelectItem>
                    <SelectItem value="CIMB">CIMB Niaga</SelectItem>
                    <SelectItem value="Permata">Permata Bank</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  {...register('accountNumber')}
                  placeholder="Enter account number"
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber.message}</p>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="ewalletType">E-Wallet Type</Label>
                <Select onValueChange={(value) => setValue('ewalletType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select e-wallet" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GoPay">GoPay</SelectItem>
                    <SelectItem value="OVO">OVO</SelectItem>
                    <SelectItem value="DANA">DANA</SelectItem>
                    <SelectItem value="ShopeePay">ShopeePay</SelectItem>
                    <SelectItem value="LinkAja">LinkAja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="accountNumber">Phone Number</Label>
                <Input
                  id="accountNumber"
                  {...register('accountNumber')}
                  placeholder="Enter phone number"
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber.message}</p>
                )}
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="accountName">Account Name</Label>
            <Input
              id="accountName"
              {...register('accountName')}
              placeholder="Enter account holder name"
            />
            {errors.accountName && (
              <p className="text-sm text-destructive">{errors.accountName.message}</p>
            )}
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Payout requests are processed within 1-2 business days. 
              A processing fee of 2.5% will be deducted from the payout amount.
            </AlertDescription>
          </Alert>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
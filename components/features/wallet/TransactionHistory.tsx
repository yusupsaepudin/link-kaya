'use client'

import { ArrowUpRight, ArrowDownRight, ShoppingBag, Users, UserPlus, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { formatRupiah } from '@/lib/utils'

interface Transaction {
  id: string
  type: 'credit' | 'debit' | 'payout' | 'commission' | 'community_share' | 'referral'
  amount: number
  description: string
  orderId?: string
  status: 'pending' | 'completed' | 'failed'
  createdAt: Date
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'commission':
        return <ShoppingBag className="h-4 w-4" />
      case 'community_share':
        return <Users className="h-4 w-4" />
      case 'referral':
        return <UserPlus className="h-4 w-4" />
      case 'payout':
        return <CreditCard className="h-4 w-4" />
      default:
        return type === 'credit' ? 
          <ArrowUpRight className="h-4 w-4" /> : 
          <ArrowDownRight className="h-4 w-4" />
    }
  }

  const getTransactionColor = (type: Transaction['type']) => {
    return type === 'debit' || type === 'payout' ? 'text-red-600' : 'text-green-600'
  }

  const getStatusBadge = (status: Transaction['status']) => {
    return (
      <Badge variant={
        status === 'completed' ? 'default' :
        status === 'pending' ? 'secondary' :
        'destructive'
      } className="text-xs">
        {status}
      </Badge>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No transactions yet
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-full bg-muted ${getTransactionColor(transaction.type)}`}>
              {getTransactionIcon(transaction.type)}
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {transaction.description}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(transaction.createdAt).toLocaleString()}
                {transaction.orderId && ` • Order #${transaction.orderId}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-medium ${getTransactionColor(transaction.type)}`}>
              {transaction.type === 'debit' || transaction.type === 'payout' ? '-' : '+'}
              {formatRupiah(transaction.amount)}
            </span>
            {getStatusBadge(transaction.status)}
          </div>
        </div>
      ))}
    </div>
  )
}
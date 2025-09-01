'use client'

import { useState } from 'react'
import { Check, X, Clock, AlertCircle, CreditCard, FileText, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { formatRupiah } from '@/lib/utils'
import { useWalletStore } from '@/lib/stores/useWalletStore'
import { PayoutRequest } from '@/types/user'
import { toast } from 'sonner'

export default function PayoutsPage() {
  const [selectedPayout, setSelectedPayout] = useState<PayoutRequest | null>(null)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [showRejectionDialog, setShowRejectionDialog] = useState(false)
  const [adminNotes, setAdminNotes] = useState('')
  const [rejectionReason, setRejectionReason] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  
  const { payoutRequests, updatePayoutStatus } = useWalletStore()

  // Filter payouts by status
  const pendingPayouts = payoutRequests.filter(p => p.status === 'pending')
  const approvedPayouts = payoutRequests.filter(p => p.status === 'approved')
  const processingPayouts = payoutRequests.filter(p => p.status === 'processing')
  const completedPayouts = payoutRequests.filter(p => p.status === 'completed')
  const rejectedPayouts = payoutRequests.filter(p => p.status === 'rejected')

  // Calculate statistics
  const totalPendingAmount = pendingPayouts.reduce((sum, p) => sum + p.amount, 0)
  const totalProcessingAmount = processingPayouts.reduce((sum, p) => sum + p.amount, 0)
  const totalCompletedAmount = completedPayouts.reduce((sum, p) => sum + p.amount, 0)

  const handleApprove = () => {
    if (selectedPayout) {
      updatePayoutStatus(selectedPayout.id, 'approved', adminNotes)
      toast.success('Payout request approved')
      setShowApprovalDialog(false)
      setSelectedPayout(null)
      setAdminNotes('')
    }
  }

  const handleReject = () => {
    if (selectedPayout) {
      updatePayoutStatus(selectedPayout.id, 'rejected', rejectionReason)
      toast.error('Payout request rejected')
      setShowRejectionDialog(false)
      setSelectedPayout(null)
      setRejectionReason('')
    }
  }

  const handleMarkAsProcessing = (payout: PayoutRequest) => {
    updatePayoutStatus(payout.id, 'processing')
    toast.info('Payout marked as processing')
  }

  const handleMarkAsCompleted = (payout: PayoutRequest) => {
    updatePayoutStatus(payout.id, 'completed')
    toast.success('Payout marked as completed')
  }

  const filteredPayouts = (payouts: PayoutRequest[]) => {
    if (!searchTerm) return payouts
    return payouts.filter(p => 
      p.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.accountDetails.accountName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const PayoutCard = ({ payout }: { payout: PayoutRequest }) => (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-semibold">{formatRupiah(payout.amount)}</p>
              <p className="text-sm text-muted-foreground">
                {payout.accountDetails.accountName}
              </p>
            </div>
            <Badge variant={
              payout.status === 'completed' ? 'default' :
              payout.status === 'approved' ? 'secondary' :
              payout.status === 'processing' ? 'outline' :
              payout.status === 'rejected' ? 'destructive' : 'secondary'
            }>
              {payout.status}
            </Badge>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Method</span>
              <span className="font-medium">{payout.method}</span>
            </div>
            {payout.method === 'bank' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bank</span>
                  <span className="font-medium">{payout.accountDetails.bankName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium font-mono">{payout.accountDetails.accountNumber}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">E-Wallet</span>
                  <span className="font-medium">{payout.accountDetails.ewalletType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{payout.accountDetails.accountNumber}</span>
                </div>
              </>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Requested</span>
              <span className="font-medium">
                {new Date(payout.requestedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          
          {payout.adminNotes && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Admin Notes: {payout.adminNotes}
              </AlertDescription>
            </Alert>
          )}
          
          {payout.rejectionReason && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Rejection Reason: {payout.rejectionReason}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex gap-2">
            {payout.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSelectedPayout(payout)
                    setShowApprovalDialog(true)
                  }}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setSelectedPayout(payout)
                    setShowRejectionDialog(true)
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </>
            )}
            {payout.status === 'approved' && (
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleMarkAsProcessing(payout)}
              >
                <Clock className="h-4 w-4 mr-2" />
                Mark as Processing
              </Button>
            )}
            {payout.status === 'processing' && (
              <Button
                size="sm"
                className="w-full"
                onClick={() => handleMarkAsCompleted(payout)}
              >
                <Check className="h-4 w-4 mr-2" />
                Mark as Completed
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payout Management</h1>
          <p className="text-muted-foreground">Review and approve payout requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by user or account name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayouts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {formatRupiah(totalPendingAmount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingPayouts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {formatRupiah(totalProcessingAmount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <Check className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedPayouts.length}</div>
            <p className="text-xs text-muted-foreground">
              Total: {formatRupiah(totalCompletedAmount)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <X className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedPayouts.length}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingPayouts.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedPayouts.length})
          </TabsTrigger>
          <TabsTrigger value="processing">
            Processing ({processingPayouts.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayouts(pendingPayouts).map((payout) => (
              <PayoutCard key={payout.id} payout={payout} />
            ))}
          </div>
          {pendingPayouts.length === 0 && (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No pending payout requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayouts(approvedPayouts).map((payout) => (
              <PayoutCard key={payout.id} payout={payout} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayouts(processingPayouts).map((payout) => (
              <PayoutCard key={payout.id} payout={payout} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayouts(completedPayouts).map((payout) => (
              <PayoutCard key={payout.id} payout={payout} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPayouts(rejectedPayouts).map((payout) => (
              <PayoutCard key={payout.id} payout={payout} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Approval Dialog */}
      <Dialog open={showApprovalDialog} onOpenChange={setShowApprovalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Payout Request</DialogTitle>
            <DialogDescription>
              Confirm approval for this payout request
            </DialogDescription>
          </DialogHeader>
          {selectedPayout && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Amount: {formatRupiah(selectedPayout.amount)}</p>
                <p className="text-sm text-muted-foreground">
                  To: {selectedPayout.accountDetails.accountName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="admin-notes">Admin Notes (Optional)</Label>
                <Textarea
                  id="admin-notes"
                  placeholder="Add any notes about this approval..."
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApprovalDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleApprove}>
              Approve Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={showRejectionDialog} onOpenChange={setShowRejectionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payout Request</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting this payout request
            </DialogDescription>
          </DialogHeader>
          {selectedPayout && (
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Amount: {formatRupiah(selectedPayout.amount)}</p>
                <p className="text-sm text-muted-foreground">
                  To: {selectedPayout.accountDetails.accountName}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="rejection-reason">Rejection Reason</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Explain why this payout is being rejected..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  required
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectionDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={!rejectionReason}>
              Reject Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
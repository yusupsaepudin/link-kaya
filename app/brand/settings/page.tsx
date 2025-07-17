"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Building, 
  Bell,
  Shield,
  DollarSign,
  Users,
  Save,
  Edit2
} from "lucide-react"
import { useUserStore } from "@/lib/stores/useUserStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function BrandSettingsPage() {
  const { currentUser: _currentUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  
  const [companyInfo, setCompanyInfo] = useState({
    companyName: "Beauty Brands Co.",
    description: "Premium skincare and beauty products for modern consumers",
    website: "https://beautybrands.co",
    email: "hello@beautybrands.co",
    phone: "+62 21 1234 5678",
    address: "Jl. Sudirman No. 123, Jakarta 10220"
  })

  const [commissionSettings, setCommissionSettings] = useState({
    defaultCommission: 20,
    minimumCommission: 15,
    maximumCommission: 30,
    tierBonuses: true,
    volumeDiscounts: true
  })

  const [partnerSettings, setPartnerSettings] = useState({
    autoApproval: false,
    requireVerification: true,
    minimumFollowers: 1000,
    allowInternational: true,
    exclusivePartners: false
  })

  const [notifications, setNotifications] = useState({
    newOrders: true,
    lowStock: true,
    newPartners: true,
    monthlyReports: true,
    payoutReminders: false
  })

  const commissionTiers = [
    { level: "Bronze", minOrders: 0, maxOrders: 49, rate: "18-22%" },
    { level: "Silver", minOrders: 50, maxOrders: 149, rate: "20-25%" },
    { level: "Gold", minOrders: 150, maxOrders: 299, rate: "22-28%" },
    { level: "Platinum", minOrders: 300, maxOrders: 999, rate: "25-30%" }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Brand Settings</h1>
          <p className="text-muted-foreground">
            Manage your brand profile, partnerships, and business settings.
          </p>
        </div>
        <Badge variant="secondary" className="px-3 py-1">
          <div className="h-2 w-2 bg-green-500 rounded-full mr-2" />
          Verified Brand
        </Badge>
      </div>

      {/* Company Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>Update your brand details and contact information</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit2 className="h-4 w-4 mr-2" />
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/api/placeholder/64/64" />
              <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
                {companyInfo.companyName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">Brand Logo</p>
              <p className="text-xs text-muted-foreground">
                Recommended: 400x400px, max 2MB
              </p>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Logo
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyInfo.companyName}
                onChange={(e) => setCompanyInfo({...companyInfo, companyName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyInfo.website}
                onChange={(e) => setCompanyInfo({...companyInfo, website: e.target.value})}
                disabled={!isEditing}
                placeholder="https://your-website.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Company Description</Label>
            <Textarea
              id="description"
              value={companyInfo.description}
              onChange={(e) => setCompanyInfo({...companyInfo, description: e.target.value})}
              disabled={!isEditing}
              placeholder="Describe your brand and products..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Business Email</Label>
              <Input
                id="email"
                type="email"
                value={companyInfo.email}
                onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={companyInfo.phone}
                onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <Input
              id="address"
              value={companyInfo.address}
              onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
              disabled={!isEditing}
            />
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Commission Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Commission Structure
          </CardTitle>
          <CardDescription>Configure how you reward your reseller partners</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="defaultCommission">Default Commission (%)</Label>
              <Input
                id="defaultCommission"
                type="number"
                value={commissionSettings.defaultCommission}
                onChange={(e) => setCommissionSettings({...commissionSettings, defaultCommission: parseInt(e.target.value)})}
                min="0"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minimumCommission">Minimum Rate (%)</Label>
              <Input
                id="minimumCommission"
                type="number"
                value={commissionSettings.minimumCommission}
                onChange={(e) => setCommissionSettings({...commissionSettings, minimumCommission: parseInt(e.target.value)})}
                min="0"
                max="50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maximumCommission">Maximum Rate (%)</Label>
              <Input
                id="maximumCommission"
                type="number"
                value={commissionSettings.maximumCommission}
                onChange={(e) => setCommissionSettings({...commissionSettings, maximumCommission: parseInt(e.target.value)})}
                min="0"
                max="50"
              />
            </div>
          </div>

          <Separator />

          <div>
            <h4 className="text-sm font-medium mb-4">Commission Tiers</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {commissionTiers.map((tier) => (
                <div key={tier.level} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-600">{tier.level}</p>
                    <p className="text-xs text-muted-foreground">
                      {tier.minOrders}+ orders/month
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold">{tier.rate}</p>
                    <p className="text-xs text-muted-foreground">Commission</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Additional Settings</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="tierBonuses" className="text-sm font-medium">
                  Tier-based Bonuses
                </Label>
                <p className="text-xs text-muted-foreground">
                  Offer performance-based commission increases
                </p>
              </div>
              <Switch
                id="tierBonuses"
                checked={commissionSettings.tierBonuses}
                onCheckedChange={(checked) => 
                  setCommissionSettings({...commissionSettings, tierBonuses: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="volumeDiscounts" className="text-sm font-medium">
                  Volume Discounts
                </Label>
                <p className="text-xs text-muted-foreground">
                  Provide bulk order discounts to resellers
                </p>
              </div>
              <Switch
                id="volumeDiscounts"
                checked={commissionSettings.volumeDiscounts}
                onCheckedChange={(checked) => 
                  setCommissionSettings({...commissionSettings, volumeDiscounts: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partner Requirements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Partner Requirements
          </CardTitle>
          <CardDescription>Set criteria for reseller partnership approval</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="autoApproval" className="text-sm font-medium">
                Auto-approve Partners
              </Label>
              <p className="text-xs text-muted-foreground">
                Automatically approve qualified applicants
              </p>
            </div>
            <Switch
              id="autoApproval"
              checked={partnerSettings.autoApproval}
              onCheckedChange={(checked) => 
                setPartnerSettings({...partnerSettings, autoApproval: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="requireVerification" className="text-sm font-medium">
                Require Identity Verification
              </Label>
              <p className="text-xs text-muted-foreground">
                Partners must verify their identity before approval
              </p>
            </div>
            <Switch
              id="requireVerification"
              checked={partnerSettings.requireVerification}
              onCheckedChange={(checked) => 
                setPartnerSettings({...partnerSettings, requireVerification: checked})
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minimumFollowers">Minimum Social Media Followers</Label>
            <Input
              id="minimumFollowers"
              type="number"
              value={partnerSettings.minimumFollowers}
              onChange={(e) => setPartnerSettings({...partnerSettings, minimumFollowers: parseInt(e.target.value)})}
              min="0"
            />
            <p className="text-xs text-muted-foreground">
              Minimum follower count across all social platforms
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="allowInternational" className="text-sm font-medium">
                Allow International Partners
              </Label>
              <p className="text-xs text-muted-foreground">
                Accept applications from partners outside Indonesia
              </p>
            </div>
            <Switch
              id="allowInternational"
              checked={partnerSettings.allowInternational}
              onCheckedChange={(checked) => 
                setPartnerSettings({...partnerSettings, allowInternational: checked})
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="exclusivePartners" className="text-sm font-medium">
                Exclusive Partnerships Only
              </Label>
              <p className="text-xs text-muted-foreground">
                Partners cannot sell competing brand products
              </p>
            </div>
            <Switch
              id="exclusivePartners"
              checked={partnerSettings.exclusivePartners}
              onCheckedChange={(checked) => 
                setPartnerSettings({...partnerSettings, exclusivePartners: checked})
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newOrders" className="text-sm font-medium">
                  New Orders
                </Label>
                <p className="text-xs text-muted-foreground">
                  Instant notifications for new customer orders
                </p>
              </div>
              <Switch
                id="newOrders"
                checked={notifications.newOrders}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, newOrders: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="lowStock" className="text-sm font-medium">
                  Low Stock Alerts
                </Label>
                <p className="text-xs text-muted-foreground">
                  Alerts when product inventory is running low
                </p>
              </div>
              <Switch
                id="lowStock"
                checked={notifications.lowStock}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, lowStock: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newPartners" className="text-sm font-medium">
                  New Partner Applications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Notifications when new resellers apply to join
                </p>
              </div>
              <Switch
                id="newPartners"
                checked={notifications.newPartners}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, newPartners: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="monthlyReports" className="text-sm font-medium">
                  Monthly Reports
                </Label>
                <p className="text-xs text-muted-foreground">
                  Comprehensive monthly performance reports
                </p>
              </div>
              <Switch
                id="monthlyReports"
                checked={notifications.monthlyReports}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, monthlyReports: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="payoutReminders" className="text-sm font-medium">
                  Payout Reminders
                </Label>
                <p className="text-xs text-muted-foreground">
                  Reminders about scheduled commission payouts
                </p>
              </div>
              <Switch
                id="payoutReminders"
                checked={notifications.payoutReminders}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, payoutReminders: checked})
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Access
          </CardTitle>
          <CardDescription>Manage account security and API access</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground">
                Last changed 2 months ago
              </p>
            </div>
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground">
                Enhanced security for your brand account
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">API Access</p>
              <p className="text-xs text-muted-foreground">
                Generate API keys for integration
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage API Keys
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Active Sessions</p>
              <p className="text-xs text-muted-foreground">
                View and manage active login sessions
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Sessions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save All Changes */}
      <div className="flex justify-end gap-2">
        <Button variant="outline">Reset to Default</Button>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </div>
    </div>
  )
}
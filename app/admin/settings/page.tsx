"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  User, 
  Store, 
  Bell,
  Shield,
  Link as LinkIcon,
  Save,
  Eye,
  Edit2
} from "lucide-react"
import { useUserStore } from "@/lib/stores/useUserStore"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function SettingsPage() {
  const { currentUser } = useUserStore()
  const [isEditing, setIsEditing] = useState(false)
  
  const [profile, setProfile] = useState({
    displayName: currentUser?.displayName || "",
    bio: currentUser?.bio || "",
    website: "",
    phone: "",
    email: ""
  })

  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newProducts: true,
    promotions: false,
    weeklyReport: true
  })

  const [storeSettings, setStoreSettings] = useState({
    storeName: currentUser?.displayName + "'s Store",
    storeDescription: "Amazing products curated just for you!",
    showViewCount: true,
    enableReviews: true,
    autoRestock: false
  })

  const socialPlatforms = [
    { name: "Instagram", icon: "📸", url: "", placeholder: "@username" },
    { name: "TikTok", icon: "🎵", url: "", placeholder: "@username" },
    { name: "YouTube", icon: "📺", url: "", placeholder: "Channel URL" },
    { name: "Twitter", icon: "🐦", url: "", placeholder: "@username" },
    { name: "WhatsApp", icon: "💬", url: "", placeholder: "Phone number" }
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and store preferences.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${currentUser?.username}`}>
            <Eye className="h-4 w-4 mr-2" />
            Preview Store
          </Link>
        </Button>
      </div>

      {/* Profile Settings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal information and bio</CardDescription>
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
              <AvatarImage src={currentUser?.avatar} />
              <AvatarFallback>
                {currentUser?.displayName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium">Profile Picture</p>
              <p className="text-xs text-muted-foreground">
                Recommended: 400x400px, max 2MB
              </p>
              {isEditing && (
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                value={profile.displayName}
                onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                value={currentUser?.username}
                disabled
                className="text-muted-foreground"
              />
              <p className="text-xs text-muted-foreground">
                Username cannot be changed
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({...profile, bio: e.target.value})}
              disabled={!isEditing}
              placeholder="Tell people about yourself..."
              rows={3}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={profile.website}
                onChange={(e) => setProfile({...profile, website: e.target.value})}
                disabled={!isEditing}
                placeholder="https://yourwebsite.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                disabled={!isEditing}
                placeholder="+62 xxx xxx xxxx"
              />
            </div>
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

      {/* Social Links */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            Social Media Links
          </CardTitle>
          <CardDescription>Connect your social media accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialPlatforms.map((platform) => (
              <div key={platform.name} className="flex items-center gap-4">
                <div className="text-2xl">{platform.icon}</div>
                <div className="flex-1">
                  <Label className="text-sm font-medium">{platform.name}</Label>
                  <Input
                    placeholder={platform.placeholder}
                    value={platform.url}
                    className="mt-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Store Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Store Settings
          </CardTitle>
          <CardDescription>Configure your bio-link store</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="storeName">Store Name</Label>
            <Input
              id="storeName"
              value={storeSettings.storeName}
              onChange={(e) => setStoreSettings({...storeSettings, storeName: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="storeDescription">Store Description</Label>
            <Textarea
              id="storeDescription"
              value={storeSettings.storeDescription}
              onChange={(e) => setStoreSettings({...storeSettings, storeDescription: e.target.value})}
              rows={2}
            />
          </div>

          <Separator />

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Display Options</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="showViewCount" className="text-sm font-medium">
                  Show View Count
                </Label>
                <p className="text-xs text-muted-foreground">
                  Display visitor count on your store
                </p>
              </div>
              <Switch
                id="showViewCount"
                checked={storeSettings.showViewCount}
                onCheckedChange={(checked) => 
                  setStoreSettings({...storeSettings, showViewCount: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="enableReviews" className="text-sm font-medium">
                  Enable Reviews
                </Label>
                <p className="text-xs text-muted-foreground">
                  Allow customers to leave product reviews
                </p>
              </div>
              <Switch
                id="enableReviews"
                checked={storeSettings.enableReviews}
                onCheckedChange={(checked) => 
                  setStoreSettings({...storeSettings, enableReviews: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoRestock" className="text-sm font-medium">
                  Auto Restock Notifications
                </Label>
                <p className="text-xs text-muted-foreground">
                  Get notified when products are restocked
                </p>
              </div>
              <Switch
                id="autoRestock"
                checked={storeSettings.autoRestock}
                onCheckedChange={(checked) => 
                  setStoreSettings({...storeSettings, autoRestock: checked})
                }
              />
            </div>
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
                <Label htmlFor="orderUpdates" className="text-sm font-medium">
                  Order Updates
                </Label>
                <p className="text-xs text-muted-foreground">
                  Notifications about new orders and status changes
                </p>
              </div>
              <Switch
                id="orderUpdates"
                checked={notifications.orderUpdates}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, orderUpdates: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="newProducts" className="text-sm font-medium">
                  New Products
                </Label>
                <p className="text-xs text-muted-foreground">
                  Alerts when new products are available in catalog
                </p>
              </div>
              <Switch
                id="newProducts"
                checked={notifications.newProducts}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, newProducts: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="promotions" className="text-sm font-medium">
                  Promotions & Tips
                </Label>
                <p className="text-xs text-muted-foreground">
                  Marketing tips and promotional opportunities
                </p>
              </div>
              <Switch
                id="promotions"
                checked={notifications.promotions}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, promotions: checked})
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="weeklyReport" className="text-sm font-medium">
                  Weekly Report
                </Label>
                <p className="text-xs text-muted-foreground">
                  Summary of your store performance each week
                </p>
              </div>
              <Switch
                id="weeklyReport"
                checked={notifications.weeklyReport}
                onCheckedChange={(checked) => 
                  setNotifications({...notifications, weeklyReport: checked})
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
            Security
          </CardTitle>
          <CardDescription>Manage your account security</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Password</p>
              <p className="text-xs text-muted-foreground">
                Last changed 3 months ago
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
                Add an extra layer of security to your account
              </p>
            </div>
            <Button variant="outline" size="sm">
              Enable 2FA
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Active Sessions</p>
              <p className="text-xs text-muted-foreground">
                Manage devices connected to your account
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
"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useUserStore } from "@/lib/stores/useUserStore"
import { UserProfile } from "@/types"

export default function RegisterPage() {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    username: "",
    bio: "",
    role: "reseller" as "reseller" | "brand"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Mock user creation
    const newUser = {
      id: Date.now().toString(),
      email: formData.email,
      username: formData.username,
      displayName: formData.fullName,
      bio: formData.bio,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=" + formData.username,
      role: formData.role,
      socialLinks: [],
      ...(formData.role === "reseller" && {
        resellerInfo: {
          joinedAt: new Date(),
          totalSales: 0,
          totalEarnings: 0,
          productsListed: 0,
          rating: 0,
          reviewCount: 0
        }
      }),
      ...(formData.role === "brand" && {
        brandInfo: {
          companyName: formData.fullName,
          description: formData.bio,
          website: "",
          joinedAt: new Date(),
          totalProducts: 0,
          totalResellers: 0,
          totalRevenue: 0,
          commissionRate: 20
        }
      }),
      createdAt: new Date(),
      updatedAt: new Date()
    }

    setUser(newUser as UserProfile)
    toast.success("Account created successfully!")
    
    // Redirect based on role
    if (formData.role === "reseller") {
      router.push("/admin/dashboard")
    } else {
      router.push("/brand/dashboard")
    }
    
    setIsLoading(false)
  }

  return (
    <>
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Link>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-pink-600" />
            <span className="font-bold text-xl">BioLink</span>
          </div>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Join as a reseller or brand partner
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Join as</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as "reseller" | "brand" })}
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reseller" id="reseller" />
                  <Label htmlFor="reseller" className="font-normal cursor-pointer">
                    Reseller - Sell products and earn commissions
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="brand" id="brand" />
                  <Label htmlFor="brand" className="font-normal cursor-pointer">
                    Brand - List products for resellers
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {formData.role === "brand" ? "Company Name" : "Full Name"}
                </Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value.toLowerCase() })}
                  placeholder="yourstore"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">
                {formData.role === "brand" ? "Company Description" : "Bio"}
              </Label>
              <Textarea
                id="bio"
                placeholder={formData.role === "brand" ? "Tell us about your brand..." : "Tell your customers about yourself..."}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                disabled={isLoading}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
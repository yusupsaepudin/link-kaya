import { ProfileHeader } from "@/components/profile/profile-header"
import { LinkList } from "@/components/profile/link-list"
import { ProductSection } from "@/components/profile/product-section"
import { Toaster } from "@/components/ui/sonner"

// This would normally fetch from a database
async function getProfileData(username: string) {
  // Mock data for demonstration
  return {
    username,
    name: "Sarah Johnson",
    bio: "Digital creator, designer, and entrepreneur. Helping you build your dream business.",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`,
    links: [
      { id: "1", title: "My Website", url: "https://example.com", icon: "globe", clicks: 1234 },
      { id: "2", title: "Instagram", url: "https://instagram.com", icon: "instagram", clicks: 5678 },
      { id: "3", title: "YouTube Channel", url: "https://youtube.com", icon: "youtube", clicks: 3456 },
      { id: "4", title: "Twitter", url: "https://twitter.com", icon: "twitter", clicks: 2345 },
      { id: "5", title: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", clicks: 1890 },
    ],
    products: [
      { 
        id: "1", 
        title: "Digital Marketing Course", 
        description: "Learn how to grow your online presence",
        price: "$49", 
        image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f2c804?w=400&h=300&fit=crop"
      },
      { 
        id: "2", 
        title: "Design Templates Pack", 
        description: "100+ professional templates",
        price: "$29", 
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
      },
    ],
    theme: {
      background: "gradient-bg-1",
      buttonStyle: "rounded-lg",
      fontFamily: "font-sans"
    }
  }
}

export default async function ProfilePage({ params }: { params: { username: string } }) {
  const profile = await getProfileData(params.username)

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="fixed inset-0 gradient-bg-1 opacity-10" />
      
      {/* Content */}
      <div className="relative z-10 container max-w-2xl mx-auto px-4 py-8">
        <ProfileHeader profile={profile} />
        <LinkList links={profile.links} />
        {profile.products.length > 0 && (
          <ProductSection products={profile.products} />
        )}
      </div>
      
      <Toaster />
    </div>
  )
}
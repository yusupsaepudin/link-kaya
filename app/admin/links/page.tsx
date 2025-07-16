"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Plus,
  ExternalLink,
  Eye,
  Edit,
  Trash2,
  GripVertical
} from "lucide-react"
import { motion, Reorder } from "framer-motion"
import { toast } from "sonner"

const initialLinks = [
  { id: "1", title: "My Website", url: "https://example.com", clicks: 1234, active: true },
  { id: "2", title: "Instagram", url: "https://instagram.com", clicks: 5678, active: true },
  { id: "3", title: "YouTube Channel", url: "https://youtube.com", clicks: 3456, active: true },
  { id: "4", title: "Twitter", url: "https://twitter.com", clicks: 2345, active: false },
  { id: "5", title: "LinkedIn", url: "https://linkedin.com", clicks: 1890, active: true },
]

export default function LinksPage() {
  const [links, setLinks] = useState(initialLinks)

  const handleDelete = (id: string) => {
    setLinks(links.filter(link => link.id !== id))
    toast.success("Link deleted successfully")
  }

  const toggleActive = (id: string) => {
    setLinks(links.map(link => 
      link.id === id ? { ...link, active: !link.active } : link
    ))
    toast.success("Link status updated")
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Links</h1>
          <p className="text-muted-foreground">Manage your links and track their performance</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Link
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Links</CardTitle>
          <CardDescription>Drag to reorder, click to edit</CardDescription>
        </CardHeader>
        <CardContent>
          <Reorder.Group
            axis="y"
            values={links}
            onReorder={setLinks}
            className="space-y-4"
          >
            {links.map((link) => (
              <Reorder.Item
                key={link.id}
                value={link}
                className="group"
              >
                <motion.div
                  layout
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                >
                  <GripVertical className="w-5 h-5 text-muted-foreground cursor-move" />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{link.title}</h3>
                      <Badge variant={link.active ? "default" : "secondary"}>
                        {link.active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <ExternalLink className="w-3 h-3" />
                        {link.url}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {link.clicks} clicks
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleActive(link.id)}
                    >
                      {link.active ? "Disable" : "Enable"}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(link.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </CardContent>
      </Card>
    </div>
  )
}
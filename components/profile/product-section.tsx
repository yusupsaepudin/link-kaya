"use client"

import { motion } from "framer-motion"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

interface Product {
  id: string
  title: string
  description: string
  price: string
  image: string
}

interface ProductSectionProps {
  products: Product[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function ProductSection({ products }: ProductSectionProps) {
  const handlePurchase = (product: Product) => {
    // In a real app, this would initiate the purchase flow
    toast.success(`Added "${product.title}" to cart!`)
  }

  return (
    <div className="mb-12">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-semibold mb-6 text-center"
      >
        Featured Products
      </motion.h2>
      
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        {products.map((product) => (
          <motion.div key={product.id} variants={item}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <Badge variant="secondary">{product.price}</Badge>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => handlePurchase(product)}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Purchase
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
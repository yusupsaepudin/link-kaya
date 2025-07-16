"use client"

import { motion } from "framer-motion"
import { 
  Link2, 
  BarChart3, 
  Palette, 
  Smartphone,
  DollarSign,
  Users,
  Calendar
} from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Link2,
    title: "Unlimited Links",
    description: "Add as many links as you need. Social media, websites, products, and more.",
    gradient: "gradient-bg-1"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track clicks, views, and engagement with detailed insights and reports.",
    gradient: "gradient-bg-2"
  },
  {
    icon: Palette,
    title: "Custom Themes",
    description: "Personalize your page with custom colors, fonts, and layouts.",
    gradient: "gradient-bg-3"
  },
  {
    icon: DollarSign,
    title: "Sell Products",
    description: "Turn your link page into a storefront. Sell digital products, services, and more.",
    gradient: "gradient-bg-1"
  },
  {
    icon: Calendar,
    title: "Book Appointments",
    description: "Let followers book consultations and meetings directly from your link page.",
    gradient: "gradient-bg-2"
  },
  {
    icon: Users,
    title: "Build Community",
    description: "Connect with your audience through exclusive content and interactions.",
    gradient: "gradient-bg-3"
  }
]

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

export function Features() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Powerful features to help you share, sell, and grow your online presence
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="relative p-6 h-full hover:shadow-lg transition-shadow group overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity">
                  <div className={`absolute inset-0 ${feature.gradient}`} />
                </div>
                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-lg ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile-first section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glass-border mb-8">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">Mobile-First Design</span>
          </div>
          <h3 className="text-3xl font-bold mb-4">
            Built for Mobile, Beautiful Everywhere
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our pages are optimized for the mobile experience where 95% of your audience will view them. 
            Lightning fast, responsive, and gorgeous on any device.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
"use client"

import { formatCurrency } from "@/lib/utils/formatters"

// Mock data for sales chart
const salesData = [
  { day: "Mon", sales: 1200000 },
  { day: "Tue", sales: 1800000 },
  { day: "Wed", sales: 1500000 },
  { day: "Thu", sales: 2200000 },
  { day: "Fri", sales: 2800000 },
  { day: "Sat", sales: 3200000 },
  { day: "Sun", sales: 2600000 },
]

export function SalesChart() {
  const maxSales = Math.max(...salesData.map(d => d.sales))

  return (
    <div className="w-full">
      <div className="flex items-end justify-between gap-2 h-[200px]">
        {salesData.map((data, index) => {
          const height = (data.sales / maxSales) * 100
          return (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-muted rounded-t flex flex-col justify-end relative group">
                <div
                  className="bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                  style={{ height: `${height}%` }}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                  {formatCurrency(data.sales)}
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{data.day}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
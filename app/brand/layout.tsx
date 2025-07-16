import { BrandLayout } from "@/components/layouts/brand-layout"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <BrandLayout>{children}</BrandLayout>
}
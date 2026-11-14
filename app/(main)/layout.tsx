
import Navbar from "@/components/home/Navbar"
import FooterSection from "@/components/home/Footer"
import BackToTop from "@/components/home/BackToTop"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
      <BackToTop />
      <FooterSection />
    </>
  )
}

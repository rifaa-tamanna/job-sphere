import Hero from "@/components/home/Hero"
import CounterSection from "@/components/home/CounterSection"
import CallToActionSection from "@/components/home/CallToActionSection"
import PricingSection from "@/components/home/PricingSection"

export default function Page() {
  return (
    <main>
      <Hero />
      <CounterSection />
      <CallToActionSection />
      <PricingSection />
    </main>
  )
}

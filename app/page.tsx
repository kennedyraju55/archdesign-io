import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ArchPreview from "@/components/sections/ArchPreview";
import AuthorSection from "@/components/sections/AuthorSection";
import HowItWorks from "@/components/sections/HowItWorks";
import WhyBetter from "@/components/sections/WhyBetter";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <ArchPreview />
      <AuthorSection />
      <HowItWorks />
      <WhyBetter />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

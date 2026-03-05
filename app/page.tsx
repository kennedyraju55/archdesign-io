import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ArchPreview from "@/components/sections/ArchPreview";
import AuthorSection from "@/components/sections/AuthorSection";
import HowItWorks from "@/components/sections/HowItWorks";
import PodcastSection from "@/components/sections/PodcastSection";
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
      <HowItWorks />
      <PodcastSection />
      <AuthorSection />
      <WhyBetter />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

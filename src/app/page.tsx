import { ContactCta } from "@/components/sections/home/contact-cta";
import { CredibilityStrip } from "@/components/sections/home/credibility-strip";
import { EngineeringApproach } from "@/components/sections/home/engineering-approach";
import { EngineeringFocus } from "@/components/sections/home/engineering-focus";
import { ExperiencePreview } from "@/components/sections/home/experience-preview";
import { FeaturedWork } from "@/components/sections/home/featured-work";
import { HeroSection } from "@/components/sections/home/hero-section";
import { LatestThinking } from "@/components/sections/home/latest-thinking";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CredibilityStrip />
      <EngineeringFocus />
      <FeaturedWork />
      <EngineeringApproach />
      <LatestThinking />
      <ExperiencePreview />
      <ContactCta />
    </>
  );
}

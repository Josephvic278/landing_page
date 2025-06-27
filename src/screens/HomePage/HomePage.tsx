import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { FeatureIconsSection } from "./sections/FeatureIconsSection";
import { FeaturesOverviewSection } from "./sections/FeaturesOverviewSection/FeaturesOverviewSection";
import { HeroSection } from "./sections/HeroSection";
import { IntroductionSection } from "./sections/IntroductionSection";
import { MainContentWrapperSection } from "./sections/MainContentWrapperSection/MainContentWrapperSection";
import { NavigationSection } from "./sections/NavigationSection/NavigationSection";
import { PricingPlansSection } from "./sections/PricingPlansSection/PricingPlansSection";
import { UserTestimonialsSection } from "./sections/UserTestimonialsSection/UserTestimonialsSection";
import { CTASection } from "./sections/CTASection";

export const HomePage = (): JSX.Element => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);
  const blogsRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToBlogs = () => {
    blogsRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // University logos data for the carousel
  const universityLogos = [
    {
      src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/harvard-university-coat-of-arms-svg-1.png",
      alt: "Harvard university",
    },
    { src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/images--2--1.png", alt: "Images" },
    { src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/images--1--1.png", alt: "Images" },
    {
      src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/peking-university-seal-svg-1.png",
      alt: "Peking university",
    },
    { src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/images--3--1.png", alt: "Images" },
    { src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/oxweb-logo-1.png", alt: "Oxweb logo" },
    { src: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/su-sealcolor-web3-1.png", alt: "Su sealcolor" },
  ];

  return (
    <div className="w-full bg-white overflow-x-hidden">
      <div className="relative w-full">
        {/* Background blur effects */}
        <div className="fixed top-[1000px] right-0 bg-[#eff5ff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />
        <div className="fixed top-[3228px] right-0 bg-[#eff5ff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />
        <div className="fixed top-[5000px] right-0 bg-[#eff5ff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />
        <div className="fixed top-[2000px] left-0 bg-[#eff5ff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />
        <div className="fixed top-[3713px] left-0 bg-[#effeff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />
        <div className="fixed top-[6390px] left-0 bg-[#effeff] w-[433px] h-[433px] rounded-[216.5px] blur-[142px] opacity-70" />

        {/* Main content container */}
        <div className="flex flex-col w-full max-w-[1440px] mx-auto relative">
          <Header 
            onAboutClick={scrollToAbout} 
            onPricingClick={scrollToPricing}
            onBlogsClick={scrollToBlogs}
          />
          <MainContentWrapperSection />

          {/* University logos section */}
          <section className="flex flex-col items-center justify-center gap-[40px] px-4 sm:px-6 md:px-[110px] py-[40px] w-full">
            <div className="flex flex-col items-center gap-[30px] w-full">
              <h3 className="font-medium text-xl text-gray-500 text-center">
                Our Users Study at the Top Universities in the World
              </h3>

              <div className="relative w-full px-8 sm:px-12 md:px-16">
                <Carousel className="w-full">
                  <CarouselContent className="flex items-center justify-between w-full">
                    {universityLogos.map((logo, index) => (
                      <CarouselItem
                        key={index}
                        className="flex-grow-0 flex-shrink-0 basis-auto"
                      >
                        <img
                          className="w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[110px] md:h-[110px] object-cover mx-auto"
                          alt={logo.alt}
                          src={logo.src}
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#ffffffe6] rounded-full border border-solid border-[#d7dbe0] backdrop-blur-sm backdrop-brightness-[100%] shadow-md hover:bg-white transition-colors">
                    <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </CarouselPrevious>
                  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center bg-[#ffffffe6] rounded-full border border-solid border-[#d7dbe0] backdrop-blur-sm backdrop-brightness-[100%] shadow-md hover:bg-white transition-colors">
                    <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  </CarouselNext>
                </Carousel>
              </div>
            </div>
          </section>

          <div ref={aboutRef}>
            <FeatureIconsSection />
          </div>
          <HeroSection />
          <NavigationSection />
          <IntroductionSection />
          <div ref={pricingRef} id="pricing" className="scroll-mt-24">
            <PricingPlansSection />
          </div>
          <div ref={blogsRef} className="scroll-mt-24">
            <UserTestimonialsSection />
          </div>
          <CTASection />
          <Footer 
            onAboutClick={scrollToAbout} 
            onPricingClick={scrollToPricing} 
            onBlogsClick={scrollToBlogs}
          />
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { Button } from "../../../../components/ui/button";
const shape_element_1 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/shape-element-1.svg'
const shape_element_2 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/shape-element-2.svg'
export const CTASection = (): JSX.Element => {
  return (
    <section className="px-6 md:px-[110px] py-20">
      <div className="w-full bg-primary-500 rounded-3xl relative overflow-hidden">
        <img 
          src={shape_element_1} 
          alt="" 
          className="absolute left-8 top-8 w-12 h-12"
          aria-hidden="true"
        />
        <img 
          src={shape_element_2}
          alt="" 
          className="absolute right-8 bottom-8 w-16 h-16"
          aria-hidden="true"
        />
        <div className="flex flex-col items-center justify-center font-montserrat text-center py-20 px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">
            Ready to Elevate Your Academic Journey?
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl">
            Sign up today and unlock the full potential of AI-powered learning.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button size="lg" className="bg-white text-primary-500 hover:bg-gray-100">
              Get Started Now
            </Button>
            <Button size="lg" variant="ghost" className="text-white hover:bg-primary-400">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
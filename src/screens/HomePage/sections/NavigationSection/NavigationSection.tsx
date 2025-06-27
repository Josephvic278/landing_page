import { PlayIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
const frame_2085665034 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2085665034-1.png'
export const NavigationSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center gap-[40px] px-6 py-12 w-full md:px-[110px]">
      {/* Header content */}
      <div className="flex flex-col items-center justify-center gap-3 max-w-[800px] text-center">
        <Badge
          variant="outline"
          className="bg-[#eff5ff] text-primary-500 border-none px-4 py-2.5 rounded-full"
        >
          How&nbsp;&nbsp;it Works
        </Badge>

        <h2 className="font-text-4xl-font-bold font-[number:var(--text-4xl-font-bold-font-weight)] text-black text-[length:var(--text-4xl-font-bold-font-size)] tracking-[var(--text-4xl-font-bold-letter-spacing)] leading-[var(--text-4xl-font-bold-line-height)] [font-style:var(--text-4xl-font-bold-font-style)]">
          Discover How It Works
        </h2>

        <p className="font-text-lg-font-normal font-[number:var(--text-lg-font-normal-font-weight)] text-gray-500 text-[length:var(--text-lg-font-normal-font-size)] tracking-[var(--text-lg-font-normal-letter-spacing)] leading-[var(--text-lg-font-normal-line-height)] [font-style:var(--text-lg-font-normal-font-style)]">
          Watch our quick introductory video to explore how our AI tools can
          revolutionize your assignments, lessons, and productivity. Learn how
          to unlock your potential with ease!
        </p>
      </div>

      {/* Video card */}
      <Card className="relative w-full max-w-[1000px] h-[458px] rounded-2xl overflow-hidden border-none p-0 [background:linear-gradient(180deg,rgb(59,130,246)_0%,rgb(59,186.1,246)_51.9%,rgb(59,242.2,246)_100%)]">
        <CardContent className="p-0 h-full">
          <div className="relative w-full h-full overflow-hidden">
            {/* Diagonal stripe */}
            <div className="absolute w-[188px] h-[1068px] top-[-89px] left-[calc(50%+69px)] bg-primary-500 rotate-[44.80deg]" />

            {/* Text content */}
            <div className="flex flex-col items-start gap-4 absolute top-[38px] left-7 z-10 max-w-[490px]">
              <Badge
                variant="outline"
                className="bg-[#eff5ff] text-primary-500 border-none px-4 py-2.5 rounded-full"
              >
                A Complete Guide
              </Badge>

              <h3 className="[font-family:'Anton_SC',Helvetica] font-normal text-white text-[80px] tracking-[0] leading-[90px]">
                HOW TO USE <br />
                MY STUDY PAL
              </h3>

              <p className="font-text-2xl-font-bold font-[number:var(--text-2xl-font-bold-font-weight)] text-white text-[length:var(--text-2xl-font-bold-font-size)] tracking-[var(--text-2xl-font-bold-letter-spacing)] leading-[var(--text-2xl-font-bold-line-height)] [font-style:var(--text-2xl-font-bold-font-style)] mt-10">
                In 60 seconds Only
              </p>
            </div>

            {/* Video thumbnail image */}
            <img
              className="absolute w-[467px] h-[452px] top-[6px] right-7 z-0"
              alt="Video thumbnail"
              src={frame_2085665034}
            />

            {/* PlayIcon button */}
            <Button
              size="icon"
              className="absolute w-[68px] h-[68px] top-[201px] left-[calc(50%-56px)] bg-primary-500 rounded-full border-4 border-solid border-[#93bbfd] shadow-[0px_4px_60px_#3b60f6] z-20"
            >
              <PlayIcon className="w-6 h-6 text-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
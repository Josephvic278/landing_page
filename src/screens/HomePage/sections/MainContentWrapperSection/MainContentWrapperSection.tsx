import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
const frame_2121452939 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2121452939.png'
const play_icon = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/cp-icons-multimedia-and-audio-solid-play.svg'
const play_outline = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/play-outline.svg'
export const MainContentWrapperSection = (): JSX.Element => {
  return (
    <section className="w-full py-14 [background:linear-gradient(180deg,rgba(247.35,250.25,255,0.15)_0%,rgba(160,249,255,0.04)_100%)]">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="flex flex-col items-center justify-center gap-3 max-w-3xl text-center mb-8">
          <Badge
            variant="secondary"
            className="bg-[#eff5ff] text-primary-500 px-4 py-2.5 rounded-[565px] font-medium"
          >
            #1 AI-Powered Learning Tool
          </Badge>

          <h1 className="font-['Montserrat',Helvetica] text-center">
            <span className="font-bold text-[#333333] text-5xl leading-[72px]">
              Unlock Your Academic <p className='text-[#3B82F6]'>Potential with AI</p>
            </span>
          </h1>

          <p className="text-gray-800 text-xl text-center font-bold">
            My Study Pal helps you write, research, study, and learn faster with a suite of AI-powered tools. Join thousands of students upgrading their grades and confidence.
          </p>
        </div>

        <div className="relative w-full max-w-[1220px] h-[460px] rounded-3xl overflow-hidden">
          <img 
            src={frame_2121452939}
            alt="My Study Pal Demo"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#00000080] flex items-center justify-center">
            <button className="w-[60px] h-[60px] flex items-center justify-center bg-white/60 rounded-full hover:bg-white/70 transition-colors">
              <img
                className="w-8 h-8"
                alt="Play video"
                src={play_icon}
              />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-8">
          <Button className="h-12 px-5 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors">
            Get Started for free
          </Button>

          <Button
            variant="outline"
            className="h-12 px-5 py-3 border-blue-500 text-primary-500 rounded-lg flex items-center hover:bg-gray-50 transition-colors"
          >
            <img
              className="w-6 h-6 mr-2"
              alt="Play icon"
              src={play_outline}
            />
            Watch a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};
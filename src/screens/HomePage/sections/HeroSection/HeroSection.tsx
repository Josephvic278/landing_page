import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const frame_1597883951 = "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-1597883951.png"
const frame_2085664993 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2085664993.png'
const frame_2085665027 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2085665027.png'
const frame_2085665003 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2085665003.png'
const frame_2085665023 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/frame-2085665023.png'

export const HeroSection = (): JSX.Element => {
  // Feature cards data for mapping
  const featureCards = [
    {
      id: 1,
      title: "Assignment Feedback",
      description:
        "Get instant, detailed feedback on your assignments to improve clarity, structure, and academic quality.",
      bgColor: "bg-[#e5f3ff]",
      imageSrc: frame_1597883951,
      width: "flex-1",
    },
    {
      id: 2,
      title: "Grammar Checker",
      description:
        "Polish your writing with AI-powered grammar, punctuation, and spelling corrections in seconds.",
      bgColor: "bg-[#edf8ec]",
      imageSrc: frame_2085664993,
      width: "flex-1",
    },
    {
      id: 3,
      title: "AI Teacher",
      description:
        "Your personal tutor, providing interactive and engaging lessons tailored to your unique learning needs and goals.",
      bgColor: "bg-[#fff5e5]",
      imageSrc: frame_2085665027,
      width: "w-full",
      imagePosition: "right",
    },
    {
      id: 4,
      title: "Summarizer",
      description:
        "Quickly condense lengthy texts into concise summaries while retaining key points and context.",
      bgColor: "bg-[#f8ecf8]",
      imageSrc: frame_2085665003,
      width: "w-full", // Modified to use flexbox proportions instead
    },
    {
      id: 5,
      title: "Text-to-Speech",
      description:
        "Transform written content into natural-sounding audio, making learning accessible and engaging.",
      bgColor: "bg-[#fbfbfb]",
      imageSrc: frame_2085665023,
      width: "w-full", // Modified to use flexbox proportions instead
      textColor: "text-[#333333]",
    },
  ];

  return (
    <section className="flex flex-col items-start justify-center gap-8 md:gap-[40px] px-4 sm:px-6 md:px-8 lg:px-[110px] py-8 md:py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6 md:gap-0">
        <div className="flex flex-col max-w-full md:max-w-[800px] items-start justify-center gap-3">
          <Badge
            variant="secondary"
            className="bg-[#eff5ff] text-primary-500 rounded-full px-4 py-2.5"
          >
            <span className="font-text-sm-font-medium text-[length:var(--text-sm-font-medium-font-size)] tracking-[var(--text-sm-font-medium-letter-spacing)] leading-[var(--text-sm-font-medium-line-height)]">
              Top Features
            </span>
          </Badge>

          <h2 className="font-text-4xl-font-bold text-black text-[length:var(--text-4xl-font-bold-font-size)] tracking-[var(--text-4xl-font-bold-letter-spacing)] leading-[var(--text-4xl-font-bold-line-height)]">
            Get Started with Our Core Features
          </h2>

          <p className="font-text-lg-font-normal text-gray-500 text-[length:var(--text-lg-font-normal-font-size)] tracking-[var(--text-lg-font-normal-letter-spacing)] leading-[var(--text-lg-font-normal-line-height)]">
            Jump right into the tools that matter most to you. From personalized
            AI tutoring to advanced writing support, everything is just a click
            away!
          </p>
        </div>

        <Button className="h-12 px-5 py-3 bg-primary-500 text-white rounded-lg self-start md:self-auto">
          <span className="font-text-base-font-medium text-[length:var(--text-base-font-medium-font-size)] tracking-[var(--text-base-font-medium-letter-spacing)] leading-[var(--text-base-font-medium-line-height)]">
            Explore All Features
          </span>
        </Button>
      </div>

      <div className="flex flex-col w-full max-w-full md:max-w-[1220px] gap-4 md:gap-[30px]">
        {/* First row - two cards */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full">
          {featureCards.slice(0, 2).map((card) => (
            <Card
              key={card.id}
              className={`${card.bgColor} rounded-2xl overflow-hidden h-auto sm:h-[352px] w-full ${card.width}`}
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex flex-col w-full items-start gap-3 p-4 md:p-6">
                  <h3 className="font-text-2xl-font-semibold text-[#000000] text-[length:var(--text-2xl-font-semibold-font-size)] tracking-[var(--text-2xl-font-semibold-letter-spacing)] leading-[var(--text-2xl-font-semibold-line-height)]">
                    {card.title}
                  </h3>
                  <p className="font-text-base-font-normal text-gray-500 text-[length:var(--text-base-font-normal-font-size)] tracking-[var(--text-base-font-normal-letter-spacing)] leading-[var(--text-base-font-normal-line-height)]">
                    {card.description}
                  </p>
                </div>
                <div className="flex-grow flex items-end justify-center px-4 md:px-6">
                  <img
                    className="w-full h-40 md:h-48 object-cover rounded-t-xl"
                    alt={card.title}
                    src={card.imageSrc}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Second row - one full-width card */}
        <div className="flex items-center gap-6 w-full">
          <Card
            className={`${featureCards[2].bgColor} rounded-2xl overflow-hidden h-auto md:h-[352px] w-full`}
          >
            <CardContent className="p-0 relative flex flex-col md:block">
              <div className="flex flex-col w-full md:w-[424px] items-start gap-3 p-4 md:p-7 md:pl-8">
                <h3 className="font-text-2xl-font-semibold text-[#000000] text-[length:var(--text-2xl-font-semibold-font-size)] tracking-[var(--text-2xl-font-semibold-letter-spacing)] leading-[var(--text-2xl-font-semibold-line-height)]">
                  {featureCards[2].title}
                </h3>
                <p className="font-text-base-font-normal text-gray-500 text-[length:var(--text-base-font-normal-font-size)] tracking-[var(--text-base-font-normal-letter-spacing)] leading-[var(--text-base-font-normal-line-height)]">
                  {featureCards[2].description}
                </p>
              </div>
              <img
                className="w-full h-auto md:absolute md:w-[755px] md:h-[324px] md:top-7 md:left-[465px] object-cover rounded-l-none md:rounded-l-xl"
                alt={featureCards[2].title}
                src={featureCards[2].imageSrc}
              />
            </CardContent>
          </Card>
        </div>

        {/* Third row - two cards with different widths */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 md:gap-6 w-full">
          {featureCards.slice(3, 5).map((card, index) => (
            <Card
              key={card.id}
              className={`${card.bgColor} rounded-2xl overflow-hidden h-auto sm:h-[352px] w-full sm:w-1/2 ${
                index === 0 ? 'sm:flex-[1.4]' : 'sm:flex-1'
              }`}
            >
              <CardContent className="p-0 flex flex-col h-full">
                <div className="flex flex-col w-full items-start gap-3 p-4 md:p-6">
                  <h3
                    className={`font-text-2xl-font-semibold ${card.textColor || "text-[#000000]"} text-[length:var(--text-2xl-font-semibold-font-size)] tracking-[var(--text-2xl-font-semibold-letter-spacing)] leading-[var(--text-2xl-font-semibold-line-height)]`}
                  >
                    {card.title}
                  </h3>
                  <p className="font-text-base-font-normal text-gray-500 text-[length:var(--text-base-font-normal-font-size)] tracking-[var(--text-base-font-normal-letter-spacing)] leading-[var(--text-base-font-normal-line-height)]">
                    {card.description}
                  </p>
                </div>
                <div className="flex-grow flex items-end justify-center px-4 md:px-6">
                  <img
                    className="w-full h-40 md:h-48 object-cover rounded-t-xl"
                    alt={card.title}
                    src={card.imageSrc}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
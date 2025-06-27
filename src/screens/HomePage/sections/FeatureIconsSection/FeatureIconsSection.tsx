import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";

// Stats data for mapping
const statsData = [
  { value: "2K+", label: "Total Users" },
  { value: "10K+", label: "Assignments Simplified" },
  { value: "4.8/5", label: "Average Rating" },
];
const image_9 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-9.png'
export const FeatureIconsSection = (): JSX.Element => {
  return (
    <section className="py-12 px-6 md:px-20 lg:px-[110px] w-full">
      <div className="flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="flex flex-col items-start justify-center gap-12 flex-1">
          <div className="flex flex-col items-start gap-3 w-full">
            <Badge
              variant="secondary"
              className="bg-[#eff5ff] text-primary-500 font-text-sm-font-medium rounded-[565px] px-4 py-2.5"
            >
              About
            </Badge>

            <h2 className="font-text-4xl-font-bold text-black text-[length:var(--text-4xl-font-bold-font-size)] tracking-[var(--text-4xl-font-bold-letter-spacing)] leading-[var(--text-4xl-font-bold-line-height)]">
              What is My Study Pal?
            </h2>

            <p className="font-text-lg-font-normal text-gray-500 text-[length:var(--text-lg-font-normal-font-size)] tracking-[var(--text-lg-font-normal-letter-spacing)] leading-[var(--text-lg-font-normal-line-height)]">
             <span className="font-bold"> Your all-in-one AI-powered study companion.</span> <br/><br/>My Study Pal is built to help students and lifelong learners study smarter, write better, and stay organized. With intelligent tools for feedback, paraphrasing, summaries, research, and more — it's everything you need to boost productivity and confidence, all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start w-full">
            {statsData.map((stat, index) => (
              <Card
                key={index}
                className={`flex-1 border-0 ${
                  index < statsData.length - 1
                    ? "border-r border-[#edeef1] rounded-none"
                    : "rounded-none"
                }`}
              >
                <CardContent className="px-[27px] py-6">
                  <div className="flex flex-col items-start">
                    <span className="font-text-4xl-font-semibold text-text-black text-[length:var(--text-4xl-font-semibold-font-size)] tracking-[var(--text-4xl-font-semibold-letter-spacing)] leading-[var(--text-4xl-font-semibold-line-height)]">
                      {stat.value}
                    </span>
                    <span className="font-text-lg-font-medium text-gray-500 text-[length:var(--text-lg-font-medium-font-size)] tracking-[var(--text-lg-font-medium-letter-spacing)] leading-[var(--text-lg-font-medium-line-height)]">
                      {stat.label}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative w-full md:w-[516px] h-[507px]">
          <div className="relative h-[507px]">
            <div className="absolute w-[101px] h-[101px] top-[406px] left-0 bg-primary-500 rounded-[90px_90px_90px_0px]" />
            <div className="absolute w-[113px] h-[113px] top-0 left-[403px] bg-primary-950 rounded-[0px_0px_40px_0px]" />
            <img
              className="absolute w-[450px] h-[444px] top-8 left-[33px] object-cover"
              alt="Student using My Study Pal"
              src={image_9}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
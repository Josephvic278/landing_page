import React from "react";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Card, CardContent } from "../../../../components/ui/card";
const profile_pic_1 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic-1.png'
const profile_pic = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic.png'
// Testimonial data for mapping
const testimonials = [
  {
    id: 1,
    name: "Daniel T.",
    role: "Undergraduate Student",
    image: profile_pic,
    text: "The feedback tool is a game-changer! I improved my essay grade from a B to an A in just one week.",
  },
  {
    id: 2,
    name: "Josh L.",
    role: "Final-Year Law Student",
    image: profile_pic_1,
    text: "My Study Pal makes studying feel less overwhelming. I use it daily for paraphrasing and outlines.",
  },
  {
    id: 3,
    name: "Dr. Fiona W.",
    role: "Lecturer & Academic Coach",
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic-2.png",
    text: "As a teacher, I recommend this to all my students. The tools are accurate, insightful, and save us hours.",
  },
  {
    id: 4,
    name: "Mei C.",
    role: "A-Level Student",
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic-3.png",
    text: "The AI teacher broke down concepts I couldn't understand in class. It's like having a tutor 24/7.",
  },
  {
    id: 5,
    name: "Carlos R.",
    role: "MSc Candidate",
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic-4.png",
    text: "I've tried other apps, but nothing matches the simplicity and power of My Study Pal.",
  },
];

export const IntroductionSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center gap-[40px] px-6 py-12 w-full md:px-[110px]">
      <div className="flex flex-col items-center justify-center gap-3 max-w-[800px] w-full">
        <Badge
          variant="outline"
          className="bg-[#eff5ff] text-primary-500 rounded-full px-4 py-2.5 font-text-sm-font-medium"
        >
          Testimonials
        </Badge>

        <h2 className="text-4xl font-bold text-black text-center">
          Hear from Our Happy Users
        </h2>

        <p className="font-text-lg-font-normal text-gray-500 text-center">
          <span className="font-bold">Thousands of learners are transforming their studies with My Study Pal.</span> <br/>Don't just take our word for it — see how students and educators are using AI to save time, boost grades, and stay on track.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 w-full max-w-[1220px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-[#d7dbe0] rounded-[10px]"
            >
              <CardContent className="flex flex-col gap-6 p-[25px]">
                <div className="flex items-start gap-3">
                  <Avatar className="w-[50px] h-[50px] rounded-[50px] bg-primary-500">
                    <AvatarImage
                      src={testimonial.image}
                      alt={`${testimonial.name}'s profile`}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="flex flex-col gap-0.5">
                    <span className="font-text-base-font-medium text-black">
                      {testimonial.name}
                    </span>
                    <span className="font-text-sm-font-normal text-gray-500">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                <p className="font-text-base-font-medium text-gray-500">
                  {testimonial.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {testimonials.slice(3, 5).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="border border-[#d7dbe0] rounded-[10px]"
            >
              <CardContent className="flex flex-col gap-6 p-[25px]">
                <div className="flex items-start gap-3">
                  <Avatar className="w-[50px] h-[50px] rounded-[50px] bg-primary-500">
                    <AvatarImage
                      src={testimonial.image}
                      alt={`${testimonial.name}'s profile`}
                      className="object-cover"
                    />
                  </Avatar>

                  <div className="flex flex-col gap-0.5">
                    <span className="font-text-base-font-medium text-black">
                      {testimonial.name}
                    </span>
                    <span className="font-text-sm-font-normal text-gray-500">
                      {testimonial.role}
                    </span>
                  </div>
                </div>

                <p className="font-text-base-font-medium text-gray-500">
                  {testimonial.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
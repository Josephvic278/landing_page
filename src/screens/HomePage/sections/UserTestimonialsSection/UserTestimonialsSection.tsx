import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../components/ui/carousel";
const arrow_left = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/arrow-left.svg'
const arrow_right = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/arrow-right.svg'
const arrow_up_right = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/arrow-up-right.svg'

// Blog post data for mapping
const blogPosts = [
  {
    id: 1,
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image.png",
    date: "20 Jan 2024",
    title: "How to Write Essays That Actually Score High",
    description: "Master essay structure, meet assignment criteria, and impress markers using proven AI-backed writing strategies.",
    tags: [
      { name: "Essay Writing", color: "bg-blue-50 text-blue-700" },
      { name: "Academic Tips", color: "bg-indigo-50 text-indigo-700" },
      { name: "Structure", color: "bg-pink-50 text-pink-700" },
    ],
  },
  {
    id: 2,
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-1.png",
    date: "19 Jan 2024",
    title: "5 Proven Ways to Beat Study Burnout",
    description: "Boost energy, stay motivated, and avoid burnout with simple, science-backed tips and My Study Pal tools.",
    tags: [
      { name: "Study Habits", color: "bg-cyan-50 text-cyan-700" },
      { name: "Mental Health", color: "bg-pink-50 text-pink-700" },
      { name: "Motivation", color: "bg-purple-50 text-purple-700" },
    ],
  },
  {
    id: 3,
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-2.png",
    date: "18 Jan 2024",
    title: "From C to A: A Student's Journey with AI Feedback",
    description: "Discover how one student transformed her grades using real-time feedback from AI-powered tools.",
    tags: [
      { name: "Grade Improvement", color: "bg-green-50 text-green-700" },
      { name: "AI Feedback", color: "bg-pink-50 text-pink-700" },
      { name: "Student Story", color: "bg-indigo-50 text-indigo-700" },
    ],
  },
  {
    id: 4,
    image: "https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-3.png",
    date: "17 Jan 2024",
    title: "The Science of Effective Revision",
    description: "Learn how memory works and use smarter revision techniques to retain more in less time.",
    tags: [
      { name: "Memory Hacks", color: "bg-blue-50 text-blue-700" },
      { name: "Revision Tips", color: "bg-slate-50 text-slate-700" },
      { name: "Learning Science", color: "bg-green-50 text-green-700" },
    ],
  },
];

export const UserTestimonialsSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center gap-[40px] px-6 md:px-[110px] py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between w-full gap-6">
        <div className="flex flex-col items-start justify-center gap-3 max-w-[800px]">
          <Badge className="bg-[#eff5ff] text-primary-500 hover:bg-[#eff5ff] hover:text-primary-500 px-4 py-2.5 rounded-[565px] ">
            Blogs & Articles
          </Badge>

          <h2 className="text-4xl font-bold text-black text-left">
            Study Smarter with Expert Insights
          </h2>

          <p className="font-text-lg-font-normal text-gray-500 ">
            Tips, strategies, and success stories to fuel your academic journey.
          </p>
        </div>

        <Link to="/blogs">
          <Button variant="flat" className="h-12 px-5 py-3 bg-primary-500 text-white hover:bg-primary-600 transition-colors">
            See all blogs
          </Button>
        </Link>
      </div>

      <div className="w-full">
        <Carousel className="w-full">
          <div className="flex items-start mb-8">
            <CarouselPrevious className="relative static mr-4 w-14 h-14 rounded-[28px] border border-gray-200 bg-[#ffffffe6]">
              <img
                className="w-6 h-6"
                alt="Arrow left"
                src={arrow_left}
              />
            </CarouselPrevious>
            <CarouselNext className="relative static w-14 h-14 rounded-[28px] border border-gray-200 bg-[#ffffffe6]">
              <img
                className="w-6 h-6"
                alt="Arrow right"
                src={arrow_right}
              />
            </CarouselNext>
          </div>

          <CarouselContent className="-ml-4">
            {blogPosts.map((post) => (
              <CarouselItem
                key={post.id}
                className="pl-4 md:basis-1/2 lg:basis-1/3"
              >
                <Link to={`/blogs/${post.id}`} className="block">
                  <div className="flex flex-col w-full items-start gap-6">
                    <div
                      className="w-full h-64 rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />

                    <div className="flex flex-col items-start gap-4 w-full px-1">
                      <div className="text-sm text-primary-500">
                        {post.date}
                      </div>

                      <div className="flex items-start gap-4 w-full group">
                        <h3 className="flex-1 font-bold text-2xl text-gray-900 group-hover:text-primary-500 transition-colors">
                          {post.title}
                        </h3>

                        <div className="pt-1">
                          <img
                            className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                            alt="Arrow up right"
                            src={arrow_up_right}
                          />
                        </div>
                      </div>

                      <p className="font-text-lg-font-normal text-gray-500  line-clamp-2">
                        {post.description}
                      </p>

                      <div className="flex flex-wrap items-start gap-2 w-full">
                        {post.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            className={`${tag.color} px-3 py-1 rounded-full text-xs font-medium`}
                            variant="flat"
                          >
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};
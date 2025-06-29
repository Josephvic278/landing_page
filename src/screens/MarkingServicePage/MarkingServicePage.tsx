import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'

export const MarkingServicePage = (): JSX.Element => {
  const navigate = useNavigate();

  // Navigation handlers for Header component
  const handleAboutClick = () => {
    navigate('/#about');
  };
  
  const handlePricingClick = () => {
    navigate('/#pricing');
  };
  
  const handleBlogsClick = () => {
    navigate('/blogs');
  };

  const steps = [
    { number: 1, text: "Upload Assignment" },
    { number: 2, text: "Words & Price" },
    { number: 3, text: "Additional Materials" },
    { number: 4, text: "Review Order" },
    { number: 5, text: "Make Payment" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header 
        onAboutClick={handleAboutClick}
        onPricingClick={handlePricingClick}
        onBlogsClick={handleBlogsClick}
      />

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary-500 hover:underline">Home</Link>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">Marking Services</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#F3F4F6] py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-4 md:mb-6">
              <div className="bg-blue-50 text-primary-500 px-4 py-2 rounded-full text-sm font-medium">
                Service
              </div>
            </div>
            <h1 className="text-3xl md:text-[45px] font-bold text-[#333333] mb-4 md:mb-6">
              Achieve Academic Excellence with Expert Reviews
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Get personalized feedback, in-depth edits, and expert guidance to enhance your assignments and boost your grades.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="lg:w-1/2 w-full">
              <Badge className="mb-4 bg-blue-50 text-primary-500">About</Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#333333] mb-6">
                Boost Your Grades with Expert Assignment Reviews
              </h2>
              <p className="text-gray-600 mb-6">
                Struggling to improve your assignments? Our Marking Service connects you with subject-matter experts who provide in-depth feedback to help you achieve higher grades. Get expert comments, editing, and structural improvements tailored to your work.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-primary-500">→</span>
                  In-text comments on areas needing improvement
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-primary-500">→</span>
                  Detailed explanations and suggestions
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-primary-500">→</span>
                  Grammar and structure corrections
                </li>
                <li className="flex items-center gap-2 text-gray-600">
                  <span className="text-primary-500">→</span>
                  Academic integrity compliance guidance
                </li>
              </ul>
            </div>
            <div className="lg:w-1/2 w-full relative">
              <div className="aspect-video rounded-lg overflow-hidden relative">
                <img
                  src="https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-9.png"
                  alt="Student using marking service"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <button className="w-12 h-12 md:w-16 md:h-16 flex items-center justify-center bg-white/60 rounded-full hover:bg-white/70 transition-colors">
                    <img
                      className="w-6 h-6 md:w-8 md:h-8"
                      alt="Play video"
                      src="https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/6de39572aee1e60a2f67a6e896be89e141d9afa8/cp-icons-multimedia-and-audio-solid-play.svg"
                    />
                  </button>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-24 h-24 md:w-32 md:h-32 bg-primary-500 rounded-tr-[90px] hidden md:block" />
              <div className="absolute -top-10 -left-10 w-20 h-20 md:w-24 md:h-24 bg-primary-950 rounded-br-[40px] hidden md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Assignment Submission Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Assignment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Assignment Submission</h2>
            
            {/* Steps */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{step.text}</span>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignments</label>
                <Textarea 
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                />
                <Button variant="outline" className="mt-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Or Upload File
                </Button>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignment Instructions</label>
                <Textarea 
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                />
                <Button variant="outline" className="mt-4 flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M5.83333 8.33333L10 12.5M10 12.5L14.1667 8.33333M10 12.5V2.5" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Or Upload File
                </Button>
              </div>

              <Button className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3">
                Next
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer 
        onAboutClick={handleAboutClick}
        onPricingClick={handlePricingClick}
        onBlogsClick={handleBlogsClick}
      />
    </div>
  );
};
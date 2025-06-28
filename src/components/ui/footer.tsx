import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Input } from "./input";

// Define the link data for reusability and maintainability
const quickLinks = [
  { text: "Blogs", path: "/blogs" },
  { text: "Affiliate Program", path: "/affiliate-program" },
  { text: "Marking Service", path: "/marking-service" },
  { text: "Contact Us", path: "/contact" },
];

const writingTools = [
  { text: "Assignment Feedback", url: "https://v0-newnow21.vercel.app/assignment-feedback" },
  { text: "Paraphrasing", url: "https://v0-newnow21.vercel.app/paraphrasing" },
  { text: "Grammar Checker", url: "https://v0-newnow21.vercel.app/grammar-checker" },
  { text: "Outline Generator", url: "https://v0-newnow21.vercel.app/outline-generator" },
];

const learningTools = ["Summarizer", "Text to Speech"];
const aiTools = ["AI Teacher"];

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'

interface FooterProps {
  onAboutClick?: () => void;
  onPricingClick?: () => void;
  onBlogsClick?: () => void;
}

export const Footer = ({ onAboutClick, onPricingClick, onBlogsClick }: FooterProps): JSX.Element => {
  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white py-16 w-full">
      <div className="w-full px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <div className="col-span-1">
            <img src={logowhite} alt="My Study Pal" className="h-12 mb-6" />
            <p className="text-gray-400">
              Helping students learn better, write smarter, and achieve more with powerful AI academic tools.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
            <div className="flex flex-col md:flex-row items-start gap-8 flex-1">
              {/* Quick Links */}
              <div className="flex flex-col items-start gap-4 flex-1">
                <h3 className="text-gray-300 font-text-sm-font-medium">
                  Quick Links
                </h3>
                <div className="flex flex-col items-start gap-3 w-full">
                  {quickLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      className="text-gray-100 hover:text-white font-text-base-font-medium transition-colors"
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Writing Tools */}
              <div className="flex flex-col items-start gap-4">
                <h3 className="text-gray-300 font-text-sm-font-medium">
                  Writing Tools
                </h3>
                <div className="flex flex-col items-start gap-3 w-full">
                  {writingTools.map((tool, index) => (
                    <a
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-100 hover:text-white font-text-base-font-medium transition-colors"
                    >
                      {tool.text}
                    </a>
                  ))}
                </div>
              </div>

              {/* Learning Tools and AI Tools */}
              <div className="flex flex-col items-start justify-center gap-6 flex-1">
                <div className="flex flex-col gap-4 w-full items-start">
                  <h3 className="text-gray-300 font-text-sm-font-medium">
                    Learning Tools
                  </h3>
                  <div className="flex flex-col gap-3 w-full items-start">
                    {learningTools.map((tool, index) => (
                      <Button
                        key={index}
                        variant="link"
                        className="p-0 h-auto text-gray-100 font-text-base-font-medium justify-start hover:text-white transition-colors"
                      >
                        {tool}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-4 w-full items-start">
                  <h3 className="text-gray-300 font-text-sm-font-medium">
                    AI Tools
                  </h3>
                  <div className="flex flex-col gap-3 w-full items-start">
                    {aiTools.map((tool, index) => (
                      <Button
                        key={index}
                        variant="link"
                        className="p-0 h-auto text-gray-100 font-text-base-font-medium justify-start hover:text-white transition-colors"
                      >
                        {tool}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter subscription */}
            <div className="flex flex-col w-full md:w-80 items-start gap-4">
              <h3 className="text-basewhite font-text-sm-font-medium">
                Stay up to date
              </h3>
              <div className="flex items-start gap-4 w-full">
                <div className="flex-1">
                  <Input
                    className="bg-basewhite text-gray-500 font-text-base-font-normal border-[#cfd4dc]"
                    placeholder="Enter your email"
                  />
                </div>
                <Button className="bg-primary-500 text-white font-text-sm-font-medium hover:bg-primary-600 transition-colors">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-800 w-full">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            <p className="text-gray-400">© {currentYear} My Study Pal. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
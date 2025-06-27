import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { Input } from "./input";

interface FooterProps {
  onAboutClick?: () => void;
  onPricingClick?: () => void;
  onBlogsClick?: () => void;
}
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
export const Footer = ({ onAboutClick, onPricingClick, onBlogsClick }: FooterProps): JSX.Element => {
  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1">
            <img src={logowhite} alt="My Study Pal" className="h-12 mb-6" />
            <p className="text-gray-400">
              Helping students learn better, write smarter, and achieve more with powerful AI academic tools.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={onAboutClick}
                  className="text-gray-400 hover:text-white"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={onPricingClick}
                  className="text-gray-400 hover:text-white"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button 
                  onClick={onBlogsClick}
                  className="text-gray-400 hover:text-white"
                >
                  Blogs
                </button>
              </li>
              <li>
                <Link to="/affiliate-program" className="text-gray-400 hover:text-white">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Writing Tools</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Assignment Feedback
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Paraphrasing
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Grammar Checker
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-400 hover:text-white">
                  Outline Generator
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium mb-4">Stay up to date</h3>
            <div className="flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-black"
              />
              <Button className="bg-primary-500">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2077 My Study Pal. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
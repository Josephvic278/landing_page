import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface HeaderProps {
  onAboutClick?: () => void;
  onPricingClick?: () => void;
  onBlogsClick?: () => void;
}

const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png';

export const Header = ({ onAboutClick, onPricingClick, onBlogsClick }: HeaderProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/">
            <img src={logoblack} alt="My Study Pal" className="h-8" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={onAboutClick} 
              className="text-gray-600 hover:text-gray-900 text-left"
            >
              About Us
            </button>
            <button 
              onClick={onPricingClick}
              className="text-gray-600 hover:text-gray-900 text-left"
            >
              Pricing
            </button>
            <button 
              onClick={onBlogsClick}
              className="text-gray-600 hover:text-gray-900 text-left"
            >
              Blogs
            </button>
            <Link to="/affiliate-program" className="text-gray-600 hover:text-gray-900 text-left">
              Affiliate Program
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 text-left">
              Contact Us
            </Link>
            <Link to="/marking-service" className="text-gray-600 hover:text-gray-900 text-left">
              Marking Services
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden flex flex-col justify-center items-center"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block w-6 h-0.5 bg-gray-600 my-0.5 transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
            
            <div className="hidden md:flex items-center space-x-4">
              <Button variant="outline" className="border-primary-500 text-primary-500">
                Sign Up
              </Button>
              <Button className="bg-primary-500 text-white">
                Sign In
              </Button>
            </div>
          </div>
        </nav>
        
        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? 'max-h-screen py-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-4">
            <button 
              onClick={onAboutClick} 
              className="text-gray-600 hover:text-gray-900 py-2 text-left"
            >
              About Us
            </button>
            <button 
              onClick={onPricingClick}
              className="text-gray-600 hover:text-gray-900 py-2 text-left"
            >
              Pricing
            </button>
            <button 
              onClick={onBlogsClick}
              className="text-gray-600 hover:text-gray-900 py-2 text-left"
            >
              Blogs
            </button>
            <Link to="/affiliate-program" className="text-gray-600 hover:text-gray-900 py-2 text-left">
              Affiliate Program
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 py-2 text-left">
              Contact Us
            </Link>
            <Link to="/marking-service" className="text-gray-600 hover:text-gray-900 py-2 text-left">
              Marking Services
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="outline" className="border-primary-500 text-primary-500 w-full">
                Sign Up
              </Button>
              <Button className="bg-primary-500 text-white w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
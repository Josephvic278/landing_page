import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";
const image = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const profile_pic = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic.png'
const image_2 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-2.png'
const image_1 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-1.png'
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
export const CallToActionSection = (): JSX.Element => {
  // Navigation menu items data
  const navItems = [
    { text: "About Us", path: "#" },
    { text: "Pricing", path: "#" },
    { text: "Blogs", path: "/blogs" },
    { text: "Affiliate Program", path: "/affiliate-program" },
    { text: "Contact Us", path: "/contact" },
    { text: "Marking Services", path: "/marking-service" },
  ];

  return (
    <header className="flex w-full h-24 items-center justify-between px-6 md:px-[110px] py-4 bg-white">
      <div className="flex items-center gap-4 md:gap-14">
        {/* Logo */}
        <div className="relative h-[52px] w-[175px]">
          <img
            className="h-[38px] w-auto object-contain"
            alt="Company Logo"
            src={logoblack}
          />
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex items-center gap-6">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <Link
                  to={item.path}
                  className="font-text-base-font-medium text-black hover:text-primary-500 transition-colors"
                >
                  {item.text}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* CTA Buttons */}
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="h-12 px-5 py-3 border-blue-500 text-primary-500 font-text-base-font-medium"
        >
          Sign Up
        </Button>
        <Button className="h-12 px-5 py-3 bg-primary-500 text-white font-text-base-font-medium">
          Sign In
        </Button>
      </div>
    </header>
  );
};
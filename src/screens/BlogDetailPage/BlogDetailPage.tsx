import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/ui/header";

const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const profile_pic = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic.png'
const image_2 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-2.png'
const image_1 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-1.png'
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'

// Mock data for the blog post
const blogPost = {
  title: "UX review presentations",
  author: {
    name: "Olivia Rhye",
    image: profile_pic,
    role: "Product Designer",
  },
  date: "20 Jan 2022",
  readTime: "5 min read",
  content: `
    How do you create compelling presentations that wow your colleagues and impress your managers? Here's a step-by-step guide to creating presentations that get your point across effectively.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  `,
  tags: ["Design", "Research", "Presentation"],
  relatedPosts: [
    {
      id: 1,
      title: "Building your API Stack",
      author: "Lana Steiner",
      date: "18 Jan 2022",
      image: image_2,
      description:
        "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      tags: ["Software Development", "Tools"],
    },
    {
      id: 2,
      title: "Migrating to Linear 101",
      author: "Phoenix Baker",
      date: "19 Jan 2022",
      image: image_1,
      description:
        "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      tags: ["Product", "Tools", "SaaS"],
    },
  ],
};

export const BlogDetailPage = (): JSX.Element => {
  const navigate = useNavigate();

  // Navigation handlers for Header component
  const handleAboutClick = () => navigate('/about');
  const handlePricingClick = () => navigate('/pricing');
  const handleBlogsClick = () => navigate('/blogs');

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
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
            <Link to="/blogs" className="text-primary-500 hover:underline">Blogs</Link>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">{blogPost.title}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Article header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{blogPost.title}</h1>
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={blogPost.author.image} alt={blogPost.author.name} />
              </Avatar>
              <div>
                <p className="text-gray-900 font-medium">{blogPost.author.name}</p>
                <p className="text-gray-500 text-sm">{blogPost.author.role}</p>
              </div>
              <div className="text-gray-500 text-sm">
                <span>{blogPost.date}</span>
                <span className="mx-2">•</span>
                <span>{blogPost.readTime}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blogPost.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-50 text-blue-700"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Article content */}
          <div className="prose max-w-none mb-12">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {blogPost.content}
            </p>
          </div>

          {/* Related posts */}
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPost.relatedPosts.map((post) => (
                <div key={post.id} className="group cursor-pointer">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="mb-2">
                    <span className="text-sm text-primary-500">
                      {post.author} • {post.date}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-500 transition-colors mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 mb-4">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1">
              <img src={logowhite} alt="My Study Pal" className="h-12 mb-6" />
              <p className="text-gray-400">
                Design amazing digital experiences that create more happy in the world.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Blogs</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Affiliate Program</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Writing Tools</h3>
              <ul className="space-y-3">
                <li><Link to="#" className="text-gray-400 hover:text-white">Assignment Feedback</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Paraphrasing</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Grammar Checker</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Outline Generator</Link></li>
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
                <Link to="#" className="text-gray-400 hover:text-white">Terms</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Privacy</Link>
                <Link to="#" className="text-gray-400 hover:text-white">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
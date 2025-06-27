import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/ui/header";

const image = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const profile_pic = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/profile-pic.png'
const image_2 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-2.png'
const image_1 = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/image-1.png'
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'

// Blog post data
const blogPosts = [
  {
    id: 1,
    image: image,
    date: "20 Jan 2022",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 2,
    image: image_1,
    date: "19 Jan 2022",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    tags: ["Product", "Tools", "SaaS"],
  },
  {
    id: 3,
    image: image_2,
    date: "18 Jan 2022",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    tags: ["Software Development", "Tools"],
  },
  {
    id: 4,
    image: image,
    date: "20 Jan 2022",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 5,
    image: image,
    date: "19 Jan 2022",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    tags: ["Product", "Tools", "SaaS"],
  },
  {
    id: 6,
    image: image_2,
    date: "18 Jan 2022",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    tags: ["Software Development", "Tools"],
  },
  {
    id: 7,
    image: image,
    date: "20 Jan 2022",
    title: "UX review presentations",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    tags: ["Design", "Research", "Presentation"],
  },
  {
    id: 8,
    image: image_1,
    date: "19 Jan 2022",
    title: "Migrating to Linear 101",
    description:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    tags: ["Product", "Tools", "SaaS"],
  },
  {
    id: 9,
    image: image_2,
    date: "18 Jan 2022",
    title: "Building your API Stack",
    description:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    tags: ["Software Development", "Tools"],
  },
];

export const BlogPage = (): JSX.Element => {
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
            <span className="text-gray-600">Blogs</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Insights for Lifelong Learning
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Explore expert tips, educational strategies, and success stories to fuel your growth.
          </p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-10"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select className="border rounded-lg px-4 py-2 text-gray-700 w-full md:w-auto">
            <option>Newest First</option>
            <option>Oldest First</option>
            <option>Most Popular</option>
          </select>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <Link to={`/blogs/${post.id}`} key={post.id}>
              <Card className="group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary-500">
                        {post.date}
                      </span>
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-primary-500 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
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
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            className="text-gray-500"
            disabled
          >
            Previous
          </Button>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="w-10 h-10 bg-primary-500 text-white"
            >
              1
            </Button>
            <Button
              variant="outline"
              className="w-10 h-10 text-gray-500"
            >
              2
            </Button>
            <Button
              variant="outline"
              className="w-10 h-10 text-gray-500"
            >
              3
            </Button>
            <span className="text-gray-500">...</span>
            <Button
              variant="outline"
              className="w-10 h-10 text-gray-500"
            >
              100
            </Button>
          </div>
          <Button
            variant="outline"
            className="text-gray-500"
          >
            Next
          </Button>
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
                <li><a href="#" className="text-gray-400 hover:text-white">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blogs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Affiliate Program</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-4">Writing Tools</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white">Assignment Feedback</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Paraphrasing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Grammar Checker</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Outline Generator</a></li>
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
                <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

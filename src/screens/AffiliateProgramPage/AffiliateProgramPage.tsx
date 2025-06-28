import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { UserPlus, Share2, Gift, ChevronDown, ChevronUp, Plus } from "lucide-react";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const handshakeimg = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/affiliate-handshake-2.png'
const affiliatewoman = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/affiliate-woman.png'

// FAQ data
const faqs = [
  {
    question: "How do I join the affiliate program?",
    answer: "Sign up by creating an account through our affiliate portal. Once approved, you'll receive your personal referral code and access to your dashboard. No prior experience needed — just passion for helping students and sharing about useful tools.",
  },
  {
    question: "How much can I earn per referral?",
    answer: "You'll earn a percentage of every successful subscription made through your referral. Commissions are tiered based on performance — the more you refer, the more you earn. Top affiliates enjoy bonus incentives and exclusive perks.",
  },
  {
    question: "When and how do I get paid?",
    answer: "Payouts are processed monthly via PayPal or Payooner, depending on your chosen method. You must meet the minimum payout threshold to receive your earnings. All referrals and commissions are tracked in real-time on your affiliate dashboard.",
  },
  {
    question: "Where can I promote My Study Pal with my referral code?",
    answer: "Anywhere your audience engages — blogs, YouTube, Instagram, TikTok, LinkedIn, or email newsletters. Just make sure to follow our promotional guidelines to ensure compliance.",
  },
  {
    question: "Do I need to be a student or educator to join?",
    answer: "Not at all! While many of our affiliates are students, educators, or creators in the academic space, anyone with a relevant audience or passion for learning can join. We welcome influencers, content creators, tutors, and tech lovers too.",
  },
  {
    question: "Can I track my referrals and performance?",
    answer: "Yes, your affiliate dashboard provides real-time stats on clicks, signups, and commissions earned. You can also view historical data to optimize your strategy and boost your earnings over time. No guessing — just clear insights.",
  },
];

// Steps data
const steps = [
  {
    number: "①",
    title: "Sign Up & Get Approved",
    description: "Create your affiliate account and gain instant access to your personalised referral dashboard and tools.",
    color: "blue"
  },
  {
    number: "②", 
    title: "Share Your Unique Referral Code",
    description: "Promote My Study Pal through social media, email, blogs, or your website — it's all trackable.",
    color: "orange"
  },
  {
    number: "③",
    title: "Earn Money for Every Referral", 
    description: "Get paid for every successful signup that subscribes. Monitor earnings and clicks in real-time, hassle-free.",
    color: "green"
  },
];

export const AffiliateProgramPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Navigation handlers for Header component
  const handleAboutClick = () => {
    // Scroll to about section or navigate to home page about section
    navigate('/#about');
  };
  
  const handlePricingClick = () => {
    // Navigate to home page pricing section
    navigate('/#pricing');
  };
  
  const handleBlogsClick = () => {
    navigate('/blogs');
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

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
            <span className="text-gray-600">Affiliate Program</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="p-8">
        <section className="bg-[#4285F4] text-white rounded-2xl overflow-hidden relative">
          <div className="container mx-auto px-8 pt-16 pb-32 md:pb-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 z-10 relative">
                {/* Mobile semi-transparent background overlay */}
                <div className="absolute inset-0 bg-[#4285F4]/80 backdrop-blur-sm rounded-2xl md:hidden -m-4 p-4"></div>
                
                <div className="relative z-10">
                  <div className="bg-[#EFF5FF] text-[#4285F4] inline-block px-4 py-2 rounded-full mb-6">
                    Join Now
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">
                    Become an Affiate & Earn Commissions
                  </h1>
                  <p className="text-lg mb-8 text-white/90">
                    Join our affiliate program and get paid to promote an AI-powered platform that helps learners thrive. Simple setup, high commissions, zero hassle.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                      className="bg-white rounded-sm text-[#4285F4] hover:bg-gray-100 h-10 px-4 text-sm font-medium"
                    >
                      Start Earning today
                    </button>
                    <button 
                      className="border rounded-sm border-white text-white h-10 px-4 text-sm font-medium hover:bg-white/10 backdrop-blur-sm"
                    >
                      See How it Works
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 absolute bottom-0 right-0 md:relative opacity-40 md:opacity-100">
                <img 
                  src={affiliatewoman}
                  alt="Happy affiliate partner showing phone and gift" 
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden">
                <img 
                  src={handshakeimg}
                  alt="About Affiliate Program"
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="inline-block bg-blue-50 text-[#4285F4] px-4 py-2 rounded-full mb-6">
                About
              </div>
              <h2 className="text-3xl font-bold mb-6">About the My Study Pal Affiliate Program</h2>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  Join a growing network of partners earning commissions by empowering students with smarter study tools. As an affiliate, you'll earn commission for subscriptions from every referral — all while promoting meaningful learning.
                </p>
                
                <p className="text-gray-600">
                  With real-time tracking, your own referral dashboard, and marketing assets, we make it easy to grow your impact and income.
                </p>
                
                <p className="text-gray-600">
                  Whether you're an educator, content creator, or just passionate about helping students succeed — we'd love to have you on board.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block bg-blue-50 text-[#4285F4] px-4 py-2 rounded-full mb-6">
            How it Works
          </div>
          <h2 className="text-3xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
          <p className="text-gray-600 mb-12">Joining the Affiliate Program is quick, easy, and rewarding. Here's how:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 mx-auto ${
                  step.color === 'blue' ? 'bg-blue-50' :
                  step.color === 'orange' ? 'bg-orange-50' :
                  'bg-green-50'
                }`}>
                  <span className={`text-2xl font-bold ${
                    step.color === 'blue' ? 'text-blue-500' :
                    step.color === 'orange' ? 'text-orange-500' :
                    'text-green-500'
                  }`}>
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-blue-50 text-[#4285F4] px-4 py-2 rounded-full mb-6">
              FAQ's
            </div>
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 mb-12">Find answers to common queries and learn how to make the most of our tools and features.</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-center w-full text-left p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Plus className="w-5 h-5 text-[#4285F4] flex-shrink-0" />
                      <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    </div>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
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
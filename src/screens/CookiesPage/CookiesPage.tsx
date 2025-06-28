import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";

const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'

export const CookiesPage = (): JSX.Element => {
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
            <span className="text-gray-600">Cookies Policy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookies Policy</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This policy explains how My Study Pal uses cookies and similar technologies to enhance your experience on our platform.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 mb-4">
              Cookies are small text files that are placed on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, analyzing how you use our service, and enabling certain features to work properly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
            
            <h3 className="text-xl font-semibold mb-2">Essential Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies are necessary for the website to function properly. They enable core functionality such as security, account authentication, and remembering your preferences. You cannot opt out of these cookies.
            </p>

            <h3 className="text-xl font-semibold mb-2">Performance Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website's performance and user experience.
            </p>

            <h3 className="text-xl font-semibold mb-2">Functionality Cookies</h3>
            <p className="text-gray-600 mb-4">
              These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
            </p>

            <h3 className="text-xl font-semibold mb-2">Analytics Cookies</h3>
            <p className="text-gray-600 mb-4">
              We use analytics cookies to understand how you interact with our website, which pages are most popular, and how you arrived at our site. This helps us measure and improve our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How Long Do Cookies Last?</h2>
            <p className="text-gray-600 mb-4">
              Cookies can be either session cookies or persistent cookies:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Session Cookies: These temporary cookies expire when you close your browser.</li>
              <li>Persistent Cookies: These remain on your device until they expire or you delete them manually.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-600 mb-4">
              Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may affect your experience of our website.
            </p>
            <p className="text-gray-600 mb-4">
              To manage your cookie preferences on My Study Pal:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-600">
              <li>Click on the cookie preferences button in our cookie banner</li>
              <li>Select your preferred cookie settings</li>
              <li>Save your preferences</li>
            </ol>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 mb-4">
              Some of our pages may contain content from third parties (like social media widgets or payment processors). These third parties may set their own cookies. We do not control these cookies and encourage you to check the cookie policies of these third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Updates to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Cookie Policy from time to time to reflect changes in our practices or for operational, legal, or regulatory reasons. We will notify you of any material changes through our website or other communication channels.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our use of cookies, please contact us at:
            </p>
            <p className="text-gray-600">Email: privacy@mystudypal.com</p>
          </section>
        </div>
      </div>

      {/* Footer */}
      <Footer 
        onAboutClick={handleAboutClick}
        onPricingClick={handlePricingClick}
        onBlogsClick={handleBlogsClick}
      />
    </div>
  );
};
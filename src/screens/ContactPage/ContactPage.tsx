import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Header } from "../../components/ui/header";
import { useToastContext } from "../../contexts/ToastContext";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const contact_image = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/09082f60bc86ab2c09d3d731b545b8f6.jpg'

// FAQ interface
interface FAQ {
  question: string;
  answer: string;
}

// Contact form interface
interface ContactForm {
  fullName: string;
  email: string;
  phoneNumber: string;
  subject: string;
  message: string;
  acceptTerms: boolean;
}

export const ContactPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToastContext();

  // Navigation handlers for Header component
  const handleAboutClick = () => navigate('/about');
  const handlePricingClick = () => navigate('/pricing');
  const handleBlogsClick = () => navigate('/blogs');

  // Updated FAQ data
  const faqs: FAQ[] = [
    {
      question: "What can I use My Study Pal for?",
      answer: "My Study Pal offers tools to help you write essays, paraphrase content, summarize documents, and get AI feedback — all designed to make studying easier and more effective.",
    },
    {
      question: "Is the platform beginner-friendly?",
      answer: "Absolutely! My Study Pal is built for all levels. No tech skills required — just log in and start using our tools with simple, guided steps.",
    },
    {
      question: "How does the free trial work?",
      answer: "You get 7 days of free access to all premium tools — no credit card required. It's the best way to explore everything before deciding on a plan.",
    },
    {
      question: "Will my data and documents be safe?",
      answer: "Yes. We use secure, encrypted storage and never share your documents. Your privacy and academic integrity are top priorities.",
    },
    {
      question: "Can I use My Study Pal on mobile?",
      answer: "Yes! The web app is fully responsive and works smoothly on smartphones, tablets, and desktops.",
    },
    {
      question: "What happens when my trial ends?",
      answer: "You can choose a subscription plan to continue using premium features. If you don't upgrade, your account will remain active, but access will be limited.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel or switch plans from your dashboard. There are no hidden fees or long-term commitments.",
    },
    {
      question: "Who do I contact for technical support?",
      answer: "You can reach out through our in-app chat or the Contact form. Our team usually replies within 24 hours on business days.",
    },
  ];

  // Form state
  const [formData, setFormData] = useState<ContactForm>({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subject options
  const subjectOptions = [
    "General Inquiry",
    "Technical Support",
    "Billing Question",
    "Feature Request",
    "Other"
  ];

  // Form validation
  const validateForm = () => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formData.subject) {
      newErrors.subject = "Please select a subject";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "Please accept the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form to API
  const submitForm = async (formData: ContactForm) => {
    try {
      const response = await fetch('https://submitcontactform-inypszbbea-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await submitForm(formData);
      
      // Show success toast
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');
      
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        subject: "",
        message: "",
        acceptTerms: false,
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('There was an error sending your message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof ContactForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Check if form is valid
  const isFormValid = formData.fullName.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     /\S+@\S+\.\S+/.test(formData.email) &&
                     formData.subject !== '' && 
                     formData.message.trim() !== '' && 
                     formData.acceptTerms;

  return (
    <div className="min-h-screen bg-white">
      {/* Header Component */}
      <Header 
        onAboutClick={handleAboutClick}
        onPricingClick={handlePricingClick}
        onBlogsClick={handleBlogsClick}
      />

      {/* Contact Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start gap-16">
            {/* Left Column - Form */}
            <div className="w-full md:w-1/2">
              <div className="mb-10">
                <Badge className="mb-4 bg-blue-50 text-primary-500">Contact Us</Badge>
                <h1 className="text-4xl font-bold mb-4">Get in Touch</h1>
                <p className="text-gray-600">Our friendly team would love to hear from you!</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`h-12 ${errors.fullName ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="h-12"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full h-12 rounded-md border ${errors.subject ? 'border-red-500' : 'border-gray-200'} bg-white px-3 py-2`}
                    disabled={isSubmitting}
                  >
                    <option value="">Select a subject</option>
                    {subjectOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    className={`h-32 ${errors.message ? "border-red-500" : ""}`}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="acceptTerms"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    disabled={isSubmitting}
                  />
                  <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
                    I agree to My Study Pal's{" "}
                    <Link to="/terms" className="text-primary-500 hover:underline">
                      Terms & Conditions
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-500">{errors.acceptTerms}</p>
                )}

                <Button 
                  type="submit" 
                  className={`w-full h-12 transition-all duration-200 ${
                    isFormValid && !isSubmitting
                      ? 'bg-primary-500 hover:bg-primary-600 text-white cursor-pointer' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isFormValid || isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Right Column - Image */}
            <div className="w-full md:w-1/2">
              <img
                src={contact_image}
                alt="Contact support"
                className="w-full h-[700px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Left Column - Introduction */}
            <div>
              <Badge className="mb-4 bg-blue-50 text-primary-500">FAQ's</Badge>
              <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find answers to common queries and learn how to make the most of our tools and features.
              </p>
            </div>

            {/* Right Column - Featured FAQ */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4">{faqs[0].question}</h3>
              <p className="text-gray-600">{faqs[0].answer}</p>
            </div>
          </div>

          {/* Full FAQ List */}
          <div className="max-w-4xl mx-auto mt-20">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.slice(1).map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border border-gray-200 px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li><Link to="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                <li><Link to="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
                <li><Link to="/blogs" className="text-gray-400 hover:text-white">Blogs</Link></li>
                <li><Link to="/affiliate-program" className="text-gray-400 hover:text-white">Affiliate Program</Link></li>
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
                <Link to="/terms" className="text-gray-400 hover:text-white">Terms</Link>
                <Link to="/privacy" className="text-gray-400 hover:text-white">Privacy</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white">Cookies</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
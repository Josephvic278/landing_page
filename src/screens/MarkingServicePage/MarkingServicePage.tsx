import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { useToastContext } from "../../contexts/ToastContext";
import FirebaseFileUploader from "../../components/FirebaseFileUploader";
import { CheckCircle, Clock, Users, Award, Star, FileText, Upload, DollarSign } from "lucide-react";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const marking_hero = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/marking-hero.png'

// Pricing plans data
const pricingPlans = [
  {
    id: 'basic',
    name: 'Basic Marking',
    price: 15,
    originalPrice: 20,
    discount: '25% OFF',
    turnaround: '3-5 days',
    features: [
      'Detailed feedback on content and structure',
      'Grammar and style corrections',
      'Grade estimation with justification',
      'Improvement suggestions'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Marking',
    price: 25,
    originalPrice: 35,
    discount: '29% OFF',
    turnaround: '1-2 days',
    features: [
      'Everything in Basic',
      'Line-by-line annotations',
      'Detailed rubric assessment',
      'Video feedback (5 minutes)',
      'One revision round included'
    ],
    popular: true
  },
  {
    id: 'express',
    name: 'Express Marking',
    price: 40,
    originalPrice: 55,
    discount: '27% OFF',
    turnaround: '24 hours',
    features: [
      'Everything in Premium',
      'Priority processing',
      'Extended video feedback (10 minutes)',
      'Two revision rounds included',
      'Direct tutor contact'
    ],
    popular: false
  }
];

// Stats data
const stats = [
  { icon: Users, value: '500+', label: 'Assignments Marked' },
  { icon: Star, value: '4.9/5', label: 'Average Rating' },
  { icon: Clock, value: '24hrs', label: 'Fastest Turnaround' },
  { icon: Award, value: '98%', label: 'Student Satisfaction' }
];

// How it works steps
const steps = [
  {
    number: '01',
    title: 'Upload Your Assignment',
    description: 'Submit your assignment along with marking criteria or rubric'
  },
  {
    number: '02',
    title: 'Expert Review',
    description: 'Our qualified tutors review and mark your work thoroughly'
  },
  {
    number: '03',
    title: 'Receive Feedback',
    description: 'Get detailed feedback, grade, and improvement suggestions'
  }
];

export const MarkingServicePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToastContext();

  // Form state
  const [formData, setFormData] = useState({
    userEmail: '',
    assignmentTitle: '',
    additionalInstructions: '',
    selectedPlan: 'premium'
  });

  // File upload state
  const [assignmentFile, setAssignmentFile] = useState<{
    url: string;
    name: string;
    path: string;
  } | null>(null);

  const [instructionsFile, setInstructionsFile] = useState<{
    url: string;
    name: string;
    path: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Form handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanSelect = (planId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: planId
    }));
  };

  // File upload handlers
  const handleAssignmentFileUploaded = (fileUrl: string, fileName: string, filePath: string) => {
    setAssignmentFile({ url: fileUrl, name: fileName, path: filePath });
    toast.success('Assignment file uploaded successfully!');
  };

  const handleAssignmentFileRemoved = () => {
    setAssignmentFile(null);
    toast.success('Assignment file removed');
  };

  const handleInstructionsFileUploaded = (fileUrl: string, fileName: string, filePath: string) => {
    setInstructionsFile({ url: fileUrl, name: fileName, path: filePath });
    toast.success('Instructions file uploaded successfully!');
  };

  const handleInstructionsFileRemoved = () => {
    setInstructionsFile(null);
    toast.success('Instructions file removed');
  };

  // Form validation
  const isFormValid = () => {
    return (
      formData.userEmail.trim() !== '' &&
      formData.assignmentTitle.trim() !== '' &&
      assignmentFile !== null &&
      formData.selectedPlan !== ''
    );
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please fill in all required fields and upload your assignment');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPlan = pricingPlans.find(plan => plan.id === formData.selectedPlan);
      if (!selectedPlan) {
        throw new Error('Selected plan not found');
      }

      // Prepare checkout data with returnUrl and using email as userId
      const checkoutData = {
        userId: formData.userEmail, // Use email as userId
        amount: selectedPlan.price,
        productName: "marking services",
        customerEmail: formData.userEmail,
        customerName: `User ${formData.userEmail}`,
        planId: formData.selectedPlan,
        returnUrl: "https://v0-newnow21.vercel.app/signup"
      };

      // Submit to checkout API
      const response = await fetch('https://create2checkoutpayment-inypszbbea-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(checkoutData),
      });

      if (!response.ok) {
        throw new Error(`Checkout failed: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.checkoutUrl) {
        // Redirect to checkout
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }

    } catch (error) {
      console.error('Submission error:', error);
      toast.error('Failed to process your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            <span className="text-gray-600">Marking Service</span>
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

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-primary-500" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
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

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Pricing Plans</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Marking Package</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Select the perfect marking service for your needs. All plans include expert feedback and detailed assessment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : ''} bg-white rounded-lg p-8 cursor-pointer transition-all duration-200 ${
                  formData.selectedPlan === plan.id ? 'ring-2 ring-primary-500 shadow-lg' : 'hover:shadow-md'
                }`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white">
                    Most Popular
                  </Badge>
                )}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-lg text-gray-500 line-through">${plan.originalPrice}</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {plan.discount}
                  </Badge>
                  <p className="text-gray-600 mt-2">Turnaround: {plan.turnaround}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="text-center">
                  <div className={`w-6 h-6 rounded-full border-2 mx-auto ${
                    formData.selectedPlan === plan.id 
                      ? 'border-primary-500 bg-primary-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.selectedPlan === plan.id && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-1"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Submit Your Assignment</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get Professional Marking</h2>
            <p className="text-lg text-gray-600">
              Fill out the form below to submit your assignment for professional marking and feedback.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="email"
                    name="userEmail"
                    value={formData.userEmail}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Assignment Details */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Assignment Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assignment Title <span className="text-red-500">*</span>
                  </label>
                  <Input
                    type="text"
                    name="assignmentTitle"
                    value={formData.assignmentTitle}
                    onChange={handleInputChange}
                    placeholder="Enter assignment title"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Assignment <span className="text-red-500">*</span>
                  </label>
                  <FirebaseFileUploader
                    userId={formData.userEmail || 'anonymous'}
                    onFileUploaded={handleAssignmentFileUploaded}
                    onFileRemoved={handleAssignmentFileRemoved}
                    buttonText="Upload Assignment File"
                    accept=".txt,.pdf,.doc,.docx"
                    maxSizeMB={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Marking Criteria/Rubric (Optional)
                  </label>
                  <FirebaseFileUploader
                    userId={formData.userEmail || 'anonymous'}
                    onFileUploaded={handleInstructionsFileUploaded}
                    onFileRemoved={handleInstructionsFileRemoved}
                    buttonText="Upload Marking Criteria"
                    accept=".txt,.pdf,.doc,.docx"
                    maxSizeMB={10}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Instructions (Optional)
                  </label>
                  <Textarea
                    name="additionalInstructions"
                    value={formData.additionalInstructions}
                    onChange={handleInputChange}
                    placeholder="Any specific requirements or instructions for marking..."
                    rows={4}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Selected Plan Summary */}
            {formData.selectedPlan && (
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                {(() => {
                  const selectedPlan = pricingPlans.find(plan => plan.id === formData.selectedPlan);
                  return selectedPlan ? (
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{selectedPlan.name}</p>
                        <p className="text-sm text-gray-600">Turnaround: {selectedPlan.turnaround}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">${selectedPlan.price}</p>
                        <p className="text-sm text-gray-500 line-through">${selectedPlan.originalPrice}</p>
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <Button 
                type="submit" 
                size="lg"
                disabled={!isFormValid() || isSubmitting}
                className="bg-primary-500 hover:bg-primary-600 px-8"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                You'll be redirected to secure payment processing
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-50 text-primary-500">How It Works</Badge>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting your assignment professionally marked is quick and easy. Here's how it works.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 text-white rounded-full text-xl font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
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
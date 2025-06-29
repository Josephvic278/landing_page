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

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'

export const MarkingServicePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToastContext();

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

  // Form state
  const [formData, setFormData] = useState({
    userEmail: '',
    assignmentTitle: '',
    assignmentText: '',
    instructionsText: '',
    additionalInstructions: '',
    selectedPlan: 'premium'
  });

  // File upload state
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [instructionsFile, setInstructionsFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const steps = [
    { number: 1, text: "Upload Assignment" },
    { number: 2, text: "Words & Price" },
    { number: 3, text: "Additional Materials" },
    { number: 4, text: "Review Order" },
    { number: 5, text: "Make Payment" },
  ];

  // File upload handlers
  const handleAssignmentFileUploaded = (fileUrl, fileName, filePath) => {
    setAssignmentFile({ url: fileUrl, name: fileName, path: filePath });
    toast.success('Assignment file uploaded successfully!');
  };

  const handleAssignmentFileRemoved = () => {
    setAssignmentFile(null);
    toast.success('Assignment file removed');
  };

  const handleInstructionsFileUploaded = (fileUrl, fileName, filePath) => {
    setInstructionsFile({ url: fileUrl, name: fileName, path: filePath });
    toast.success('Instructions file uploaded successfully!');
  };

  const handleInstructionsFileRemoved = () => {
    setInstructionsFile(null);
    toast.success('Instructions file removed');
  };

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlanSelect = (planId) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: planId
    }));
  };

  // Form validation
  const isFormValid = () => {
    return (
      formData.userEmail.trim() !== '' &&
      formData.assignmentTitle.trim() !== '' &&
      (formData.assignmentText.trim() !== '' || assignmentFile !== null) &&
      formData.selectedPlan !== ''
    );
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedPlan = pricingPlans.find(plan => plan.id === formData.selectedPlan);
      if (!selectedPlan) {
        throw new Error('Selected plan not found');
      }

      // Prepare checkout data with returnUrl
      const checkoutData = {
        userId: formData.userEmail,
        amount: selectedPlan.price,
        productName: "marking services",
        customerEmail: formData.userEmail,
        customerName: `User ${formData.userEmail}`,
        planId: formData.selectedPlan,
        returnUrl: "https://v0-newnow21.vercel.app/signup"
      };

      // Submit to checkout API
      const response = await fetch('https://createcheckoutsession-inypszbbea-uc.a.run.app', {
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
      
      if (result.url) {
        // Redirect to checkout
        window.location.href = result.url;
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
                className={`relative bg-white rounded-lg p-8 ${plan.popular ? 'ring-2 ring-primary-500 shadow-lg' : 'border border-gray-200'}`}
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
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    formData.selectedPlan === plan.id 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handlePlanSelect(plan.id)}
                >
                  {formData.selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Assignment Submission Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Assignment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Assignment Submission</h2>
            
            {/* Steps */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-16 gap-4">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index === 0 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step.number}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{step.text}</span>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block w-8 h-px bg-gray-300 mx-4" />
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Contact Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
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

              {/* Assignment Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
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

              {/* Assignment */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Assignments <span className="text-red-500">*</span>
                </label>
                <Textarea 
                  name="assignmentText"
                  value={formData.assignmentText}
                  onChange={handleInputChange}
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                  disabled={!!assignmentFile}
                />
                <div className="mt-4">
                  <FirebaseFileUploader
                    userId={formData.userEmail || 'anonymous'}
                    onFileUploaded={handleAssignmentFileUploaded}
                    onFileRemoved={handleAssignmentFileRemoved}
                    buttonText="Or Upload File"
                    accept=".txt,.pdf,.doc,.docx"
                    maxSizeMB={10}
                  />
                </div>
              </div>

              {/* Assignment Instructions */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignment Instructions</label>
                <Textarea 
                  name="instructionsText"
                  value={formData.instructionsText}
                  onChange={handleInputChange}
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                  disabled={!!instructionsFile}
                />
                <div className="mt-4">
                  <FirebaseFileUploader
                    userId={formData.userEmail || 'anonymous'}
                    onFileUploaded={handleInstructionsFileUploaded}
                    onFileRemoved={handleInstructionsFileRemoved}
                    buttonText="Or Upload File"
                    accept=".txt,.pdf,.doc,.docx"
                    maxSizeMB={10}
                  />
                </div>
              </div>

              {/* Additional Instructions */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Instructions (Optional)</label>
                <Textarea 
                  name="additionalInstructions"
                  value={formData.additionalInstructions}
                  onChange={handleInputChange}
                  placeholder="Any specific requirements or instructions for marking..."
                  className="w-full h-24 p-4 border border-gray-200 rounded-lg"
                />
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

              <Button 
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3"
              >
                {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
              </Button>
            </form>
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
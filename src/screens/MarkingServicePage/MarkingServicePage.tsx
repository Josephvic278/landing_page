import React, { useState, useEffect, useRef } from "react";
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

  // State for form data
  const [formData, setFormData] = useState({
    userEmail: "",
    assignmentTitle: "",
    wordCount: "",
    assignmentText: "",
    instructionsText: "",
    selectedPlan: "basic",
  });

  // State for file uploads
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [instructionsFile, setInstructionsFile] = useState(null);

  // State for submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");

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

  // Pricing plans
  const pricingPlans = [
    {
      id: "basic",
      name: "Basic Review",
      price: 49,
      features: [
        "Comprehensive feedback on structure and content",
        "Grammar and style corrections",
        "Suggestions for improvement",
        "48-hour turnaround"
      ]
    },
    {
      id: "premium",
      name: "Premium Review",
      price: 79,
      features: [
        "Everything in Basic Review",
        "In-depth analysis and critique",
        "Detailed improvement roadmap",
        "24-hour turnaround",
        "One revision round included"
      ]
    },
    {
      id: "expert",
      name: "Expert Review",
      price: 129,
      features: [
        "Everything in Premium Review",
        "Subject matter expert review",
        "Academic writing coaching",
        "12-hour turnaround",
        "Two revision rounds included"
      ]
    }
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle assignment file upload
  const handleAssignmentFileUploaded = (fileUrl, fileName, filePath) => {
    setAssignmentFile({
      name: fileName,
      url: fileUrl,
      path: filePath
    });
    // Clear assignment text when file is uploaded
    setFormData(prev => ({
      ...prev,
      assignmentText: ""
    }));
  };

  const handleAssignmentFileRemoved = () => {
    setAssignmentFile(null);
  };

  // Handle instructions file upload
  const handleInstructionsFileUploaded = (fileUrl, fileName, filePath) => {
    setInstructionsFile({
      name: fileName,
      url: fileUrl,
      path: filePath
    });
    // Clear instructions text when file is uploaded
    setFormData(prev => ({
      ...prev,
      instructionsText: ""
    }));
  };

  const handleInstructionsFileRemoved = () => {
    setInstructionsFile(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.userEmail) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!formData.assignmentTitle) {
      toast.error("Please enter an assignment title");
      return;
    }
    
    if (!formData.wordCount || parseInt(formData.wordCount) <= 0) {
      toast.error("Please enter a valid word count");
      return;
    }
    
    if (!formData.assignmentText && !assignmentFile) {
      toast.error("Please provide your assignment either as text or upload a file");
      return;
    }

    setIsSubmitting(true);

    try {
      // Get selected plan details
      const selectedPlan = pricingPlans.find(plan => plan.id === formData.selectedPlan);
      
      // Create the 2Checkout payload
      const checkoutData = {
        userId: formData.userEmail,
        amount: selectedPlan.price,
        productName: "marking services",
        customerEmail: formData.userEmail,
        customerName: `User ${formData.userEmail}`,
        planId: formData.selectedPlan,
        returnUrl: "https://v0-newnow21.vercel.app/signup"
      };

      // Call the 2Checkout API
      const checkoutResponse = await fetch("https://create2checkoutpayment-inypszbbea-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (!checkoutResponse.ok) {
        const errorText = await checkoutResponse.text();
        throw new Error(`Checkout API error (${checkoutResponse.status}): ${errorText}`);
      }

      const checkoutResult = await checkoutResponse.json();

      // Check for the checkoutUrl and store it
      if (checkoutResult.success && checkoutResult.checkoutUrl) {
        setCheckoutUrl(checkoutResult.checkoutUrl);
        setShowSuccessPopup(true);
        toast.success("Order created successfully!");
      } else {
        console.error("Invalid checkout result:", checkoutResult);
        throw new Error("Failed to create payment link");
      }

    } catch (error) {
      console.error("Error in order process:", error);
      toast.error(`Failed to create order: ${error.message}`);
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

      {/* Pricing Plans Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Pricing</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Choose Your Review Plan</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the review level that best fits your needs and budget. All plans include expert feedback and detailed suggestions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`bg-white rounded-lg p-6 border-2 cursor-pointer transition-all ${
                  formData.selectedPlan === plan.id
                    ? "border-primary-500 shadow-lg"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => handleInputChange("selectedPlan", plan.id)}
              >
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-primary-500 mb-4">
                    ${plan.price}
                  </div>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary-500 mt-1">✓</span>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
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
            
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              {/* Contact Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <Input 
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-12 p-4 border border-gray-200 rounded-lg"
                  value={formData.userEmail}
                  onChange={(e) => handleInputChange("userEmail", e.target.value)}
                  required
                />
              </div>

              {/* Assignment Title */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignment Title *</label>
                <Input 
                  placeholder="Enter assignment title"
                  className="w-full h-12 p-4 border border-gray-200 rounded-lg"
                  value={formData.assignmentTitle}
                  onChange={(e) => handleInputChange("assignmentTitle", e.target.value)}
                  required
                />
              </div>

              {/* Word Count */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Word Count *</label>
                <Input 
                  type="number"
                  placeholder="Enter word count"
                  className="w-full h-12 p-4 border border-gray-200 rounded-lg"
                  value={formData.wordCount}
                  onChange={(e) => handleInputChange("wordCount", e.target.value)}
                  required
                />
              </div>

              {/* Assignment Content */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignment *</label>
                <Textarea 
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                  value={formData.assignmentText}
                  onChange={(e) => handleInputChange("assignmentText", e.target.value)}
                  disabled={!!assignmentFile}
                />
                <div className="mt-4">
                  <FirebaseFileUploader
                    userId={formData.userEmail || "temp-user"}
                    onFileUploaded={handleAssignmentFileUploaded}
                    onFileRemoved={handleAssignmentFileRemoved}
                    buttonText={assignmentFile ? "Uploaded" : "Or Upload File"}
                    accept=".txt,.pdf,.doc,.docx"
                    disabled={!!formData.assignmentText.trim()}
                  />
                </div>
              </div>

              {/* Assignment Instructions */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Assignment Instructions</label>
                <Textarea 
                  placeholder="Write text here ..."
                  className="w-full h-32 p-4 border border-gray-200 rounded-lg"
                  value={formData.instructionsText}
                  onChange={(e) => handleInputChange("instructionsText", e.target.value)}
                  disabled={!!instructionsFile}
                />
                <div className="mt-4">
                  <FirebaseFileUploader
                    userId={formData.userEmail || "temp-user"}
                    onFileUploaded={handleInstructionsFileUploaded}
                    onFileRemoved={handleInstructionsFileRemoved}
                    buttonText={instructionsFile ? "Uploaded" : "Or Upload File"}
                    accept=".txt,.pdf,.doc,.docx"
                    disabled={!!formData.instructionsText.trim()}
                  />
                </div>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 h-12"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit Assignment"}
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Order Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Your assignment has been submitted. Click below to complete your payment.
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => {
                  if (checkoutUrl) {
                    window.open(checkoutUrl, '_blank');
                    setShowSuccessPopup(false);
                  }
                }}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Complete Payment
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowSuccessPopup(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer 
        onAboutClick={handleAboutClick}
        onPricingClick={handlePricingClick}
        onBlogsClick={handleBlogsClick}
      />
    </div>
  );
};
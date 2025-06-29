import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  CheckCircle,
  Upload,
  FileText,
  Calendar,
} from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { useToastContext } from "../../contexts/ToastContext";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'

// Default pricing values for fallback
const DEFAULT_PRICING = {
  "24hours": 50,
  "48hours": 25,
  "72hours": 20,
  "120hours": 15,
}

export const MarkingServicePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToastContext();
  
  // Form state
  const [userEmail, setUserEmail] = useState('');
  const [userEnteredWordCount, setUserEnteredWordCount] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [assignmentText, setAssignmentText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [additionalInstructionsText, setAdditionalInstructionsText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [wordCount, setWordCount] = useState("1,000");
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [pricingData, setPricingData] = useState(null);
  
  // File upload states
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [instructionsFile, setInstructionsFile] = useState(null);
  const [additionalInstructionsFiles, setAdditionalInstructionsFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({
    assignment: null,
    instructions: null,
    additionalInstructions: [],
    additional: [],
  });

  const [orderDetails, setOrderDetails] = useState({
    title: "",
    wordCount: "",
    turnaroundTime: "",
    totalAmount: "",
  });

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

  // File upload handlers (simplified for this example)
  const handleAssignmentFileUploaded = (fileUrl, fileName) => {
    setUploadedFiles({
      ...uploadedFiles,
      assignment: {
        name: fileName,
        size: "Unknown",
        url: fileUrl,
      },
    });
    setAssignmentFile({ name: fileName, url: fileUrl });
  };

  const handleAssignmentFileRemoved = () => {
    setUploadedFiles({
      ...uploadedFiles,
      assignment: null,
    });
    setAssignmentFile(null);
  };

  const handleInstructionsFileUploaded = (fileUrl, fileName) => {
    setUploadedFiles({
      ...uploadedFiles,
      instructions: {
        name: fileName,
        size: "Unknown",
        url: fileUrl,
      },
    });
    setInstructionsFile({ name: fileName, url: fileUrl });
  };

  const handleInstructionsFileRemoved = () => {
    setUploadedFiles({
      ...uploadedFiles,
      instructions: null,
    });
    setInstructionsFile(null);
  };

  const handleAdditionalInstructionsFileUploaded = (fileUrl, fileName) => {
    const newFile = {
      name: fileName,
      size: "Unknown",
      url: fileUrl,
    };
    setUploadedFiles({
      ...uploadedFiles,
      additionalInstructions: [...uploadedFiles.additionalInstructions, newFile],
    });
    setAdditionalInstructionsFiles([...additionalInstructionsFiles, { name: fileName, url: fileUrl }]);
  };

  const handleAdditionalInstructionsFileRemoved = (index) => {
    const newAdditionalInstructions = [...uploadedFiles.additionalInstructions];
    newAdditionalInstructions.splice(index, 1);

    setUploadedFiles({
      ...uploadedFiles,
      additionalInstructions: newAdditionalInstructions,
    });

    const newFiles = [...additionalInstructionsFiles];
    newFiles.splice(index, 1);
    setAdditionalInstructionsFiles(newFiles);
  };

  // Calculate price using fallback if API fails
  const calculatePrice = async (wordCountValue, duration) => {
    setIsCalculatingPrice(true);

    try {
      const parsedWordCount = Number.parseInt(wordCountValue.toString().replace(/,/g, ""));

      if (isNaN(parsedWordCount) || parsedWordCount <= 0) {
        throw new Error("Invalid word count");
      }

      const durationKey = duration.replace(/\s/g, "");

      try {
        const response = await fetch("https://calculateorderprice-inypszbbea-uc.a.run.app", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wordCount: parsedWordCount,
            duration: durationKey,
          }),
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();

        setOrderDetails(prevDetails => ({
          ...prevDetails,
          turnaroundTime: duration,
          totalAmount: `$${data.totalCost}`,
        }));
        setPricingData(data);

        return {
          success: true,
          price: data.totalCost,
          data: data,
        };
      } catch (apiError) {
        console.error("API Error:", apiError);

        const durationMapping = {
          "24hours": "24hours",
          "48hours": "48hours",
          "72hours": "72hours",
          "120hours": "120hours",
          "5days": "120hours",
        };

        const lookupKey = durationMapping[durationKey] || durationKey;
        const ratePerThousand = DEFAULT_PRICING[lookupKey] || 50;
        const wordCountMultiplier = Math.ceil(parsedWordCount / 1000);
        const fallbackPrice = wordCountMultiplier * ratePerThousand;

        const fallbackData = {
          success: true,
          totalCost: fallbackPrice,
          currency: "USD",
          breakdown: {
            baseRate: ratePerThousand,
            wordsPerRate: 1000,
            wordCount: parsedWordCount,
            wordCountMultiplier: wordCountMultiplier,
            duration: durationKey,
            durationMultiplier: 1,
            calculation: `${ratePerThousand} × ${wordCountMultiplier} × 1 = ${fallbackPrice}`,
          },
        };

        setOrderDetails({
          ...orderDetails,
          turnaroundTime: duration,
          totalAmount: `$${fallbackPrice}`,
        });
        setPricingData(fallbackData);

        return {
          success: false,
          fallback: true,
          price: fallbackPrice,
          data: fallbackData,
        };
      }
    } catch (error) {
      console.error("Price calculation error:", error);
      const fallbackPrice = 50;

      const fallbackData = {
        success: true,
        totalCost: fallbackPrice,
        currency: "USD",
        breakdown: {
          baseRate: 50,
          wordsPerRate: 1000,
          wordCount: 1000,
          wordCountMultiplier: 1,
          duration: "24hours",
          durationMultiplier: 1,
          calculation: `50 × 1 × 1 = 50`,
        },
      };

      setOrderDetails({
        ...orderDetails,
        turnaroundTime: duration,
        totalAmount: `$${fallbackPrice}`,
      });
      setPricingData(fallbackData);

      return {
        success: false,
        fallback: true,
        price: fallbackPrice,
        data: fallbackData,
        error: error.message,
      };
    } finally {
      setIsCalculatingPrice(false);
    }
  };

  // Handle next step in new order flow
  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate inputs
      if (!userEmail.trim() || !/\S+@\S+\.\S+/.test(userEmail)) {
        toast.error("Please enter a valid email address");
        return;
      }
      
      if (!userEnteredWordCount || Number.parseInt(userEnteredWordCount) <= 0) {
        toast.error("Please enter a valid word count");
        return;
      }
      
      if (!orderDetails.title.trim()) {
        toast.error("Please enter a title for your assignment");
        return;
      }

      const formattedWordCount = userEnteredWordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      setWordCount(formattedWordCount);
      
      const updatedOrderDetails = {
        ...orderDetails,
        wordCount: `${formattedWordCount} words`,
      };
      
      setOrderDetails(updatedOrderDetails);
      
      const result = await calculatePrice(userEnteredWordCount, "24 hours");

      if (!result.success && result.fallback) {
        toast.error("Using default pricing due to calculation service unavailability");
      }
      
      setOrderDetails(prevState => ({
        ...prevState,
        turnaroundTime: "24 hours",
        totalAmount: result.success ? `$${result.price}` : (result.fallback ? `$${result.price}` : "$0"),
        wordCount: `${formattedWordCount} words`,
      }));

      setCurrentStep(currentStep + 1);
    } else if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle price option selection
  const handlePriceOptionSelect = async (duration) => {
    if (isCalculatingPrice) return;

    const result = await calculatePrice(wordCount.replace(/,/g, ""), duration);

    if (!result.success && result.fallback) {
      toast.error("Using default pricing due to calculation service unavailability");
    }
    
    const currentWordCount = orderDetails.wordCount;
    
    setOrderDetails(prevDetails => {
      return {
        ...prevDetails,
        turnaroundTime: duration,
        totalAmount: result.success ? `$${result.price}` : (result.fallback ? `$${result.price}` : prevDetails.totalAmount),
        wordCount: currentWordCount,
      };
    });
  };

  // Handle order submission
  const handleOrderSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      let formattedDuration = orderDetails.turnaroundTime.replace(/\s+/g, "");
      
      const durationMap = {
        "24hours": "24hours",
        "48hours": "48hours", 
        "72hours": "72hours",
        "120hours": "72hours",
      };
      
      formattedDuration = durationMap[formattedDuration] || "24hours";
      
      const orderData = {
        userId: userEmail, // Use email as userId
        assignmentTitle: orderDetails.title,
        wordCount: Number.parseInt(wordCount.replace(/,/g, "")),
        duration: formattedDuration,
        assignmentText: assignmentText || "",
        assignmentFileUrl: uploadedFiles.assignment?.url || "",
        instructions: instructionsText || "",
        instructionsFileUrl: uploadedFiles.instructions?.url || "",
        additionalNotes: additionalInstructionsText || "",
        supportingMaterial: additionalInstructionsText || "", 
        supportingMaterialUrl: uploadedFiles.additionalInstructions.length > 0 ? 
          uploadedFiles.additionalInstructions[0].url : "",
      };

      const orderResponse = await fetch("https://createorder-inypszbbea-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      
      if (!orderResponse.ok) {
        const errorText = await orderResponse.text();
        throw new Error(`Order API error (${orderResponse.status}): ${errorText}`);
      }
      
      const amountStr = orderDetails.totalAmount.replace("$", "");
      const amount = parseFloat(amountStr);
      
      const planId = `${userEmail}-${Date.now()}`;
      
      const checkoutData = {
        userId: userEmail, // Use email as userId
        amount: amount,
        productName: "marking services",
        customerEmail: userEmail,
        customerName: `User ${userEmail}`,
        planId: planId
      };
      
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
      
      if (checkoutResult.success && checkoutResult.checkoutUrl) {
        setCheckoutUrl(checkoutResult.checkoutUrl);
        setShowSuccessPopup(true);
      } else {
        console.error("Invalid checkout result:", checkoutResult);
        throw new Error("Failed to create payment link");
      }
      
    } catch (error) {
      console.error("Error in order or payment process:", error);
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = ["Upload Assignment", "Words & Price", "Additional Materials", "Review Order"];

    return (
      <div style={{ width: "100%", overflowX: "auto", paddingBottom: "20px", marginBottom: "20px" }}>
        <div style={{ display: "table", minWidth: "100%", tableLayout: "fixed" }}>
          {steps.map((step, index) => (
            <div key={index} style={{ display: "table-cell", textAlign: "center", position: "relative" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: `1px solid ${currentStep === index + 1 ? "#3b82f6" : currentStep > index + 1 ? "#3b82f6" : "#d1d5db"}`,
                  backgroundColor: currentStep > index + 1 ? "#3b82f6" : "transparent",
                  color: currentStep > index + 1 ? "white" : currentStep === index + 1 ? "#3b82f6" : "#9ca3af",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "8px",
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: currentStep === index + 1 ? "#3b82f6" : "#6b7280",
                }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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

      {/* Assignment Submission Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-blue-50 text-primary-500">Assignment</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Assignment Submission</h2>
            
            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* Step 1: Upload Assignment */}
            {currentStep === 1 && (
              <div style={{ maxWidth: "768px", margin: "0 auto" }}>
                {/* Email Input */}
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                    Email Address <span style={{ color: "#ef4444" }}>*</span>
                  </h3>
                  <input
                    type="email"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                    placeholder="Enter your email address"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>Assignments</h3>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      height: "160px",
                      resize: "vertical",
                      outline: "none",
                    }}
                    placeholder="Write text here ..."
                    value={assignmentText}
                    onChange={(e) => setAssignmentText(e.target.value)}
                    disabled={!!uploadedFiles.assignment}
                  ></textarea>
                  <Button variant="outline" className="mt-4 flex items-center gap-2">
                    <Upload size={20} />
                    Or Upload File
                  </Button>
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                    Assignment Instructions
                  </h3>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      height: "160px",
                      resize: "vertical",
                      outline: "none",
                    }}
                    placeholder="Write text here ..."
                    value={instructionsText}
                    onChange={(e) => setInstructionsText(e.target.value)}
                    disabled={!!uploadedFiles.instructions}
                  ></textarea>
                  <Button variant="outline" className="mt-4 flex items-center gap-2">
                    <Upload size={20} />
                    Or Upload File
                  </Button>
                </div>

                {/* Word count input */}
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>Word Count</h3>
                  <input
                    type="number"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                    placeholder="Enter word count"
                    value={userEnteredWordCount}
                    onChange={(e) => setUserEnteredWordCount(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>Assignment Title</h3>
                  <input
                    type="text"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                    placeholder="Enter assignment title"
                    value={orderDetails.title}
                    onChange={(e) => setOrderDetails({...orderDetails, title: e.target.value})}
                  />
                </div>

                <div style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#e5e7eb",
                      color: "#4b5563",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </button>
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleNextStep}
                    disabled={isCalculatingPrice}
                  >
                    {isCalculatingPrice ? (
                      <>
                        <Loader2
                          size={20}
                          style={{ marginRight: "8px", animation: "spin 1s linear infinite" }}
                        />
                        Calculating...
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Words & Price */}
            {currentStep === 2 && (
              <div style={{ maxWidth: "900px", margin: "0 auto" }}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: "32px",
                    marginBottom: "32px",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>Total Words</h3>
                    <div
                      style={{
                        backgroundColor: "#f9fafb",
                        borderRadius: "8px",
                        padding: "24px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{ marginBottom: "16px" }}>
                        <p style={{ fontSize: "15px", fontWeight: "500", marginBottom: "8px" }}>Word Count</p>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            backgroundColor: "#fff",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            padding: "12px 16px",
                          }}
                        >
                          <span style={{ fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                            {wordCount}
                          </span>
                          <span style={{ fontSize: "15px", color: "#6b7280", marginLeft: "4px" }}>words</span>
                        </div>
                      </div>
                      <div style={{ fontSize: "14px", color: "#6b7280" }}>
                        <p style={{ margin: "0" }}>This is the word count you entered.</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                      Pricing Calculation
                    </h3>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        marginBottom: "24px",
                      }}
                    >
                      {/* 24 hours option */}
                      <div
                        style={{
                          border: `1px solid ${orderDetails.turnaroundTime === "24 hours" ? "#3b82f6" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          padding: "20px",
                          cursor: "pointer",
                          backgroundColor:
                            orderDetails.turnaroundTime === "24 hours" ? "#eff6ff" : "transparent",
                          boxShadow:
                            orderDetails.turnaroundTime === "24 hours"
                              ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handlePriceOptionSelect("24 hours")}
                      >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `1px solid ${orderDetails.turnaroundTime === "24 hours" ? "#3b82f6" : "#d1d5db"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            {orderDetails.turnaroundTime === "24 hours" && (
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: "#3b82f6",
                                }}
                              ></div>
                            )}
                          </div>
                          <span style={{ marginLeft: "8px", fontWeight: "500", fontSize: "16px" }}>
                            24 hours
                          </span>
                        </div>
                        <p
                          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#111827" }}
                        >
                          $50 <span style={{ fontSize: "16px", fontWeight: "500" }}>per</span>
                        </p>
                        <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>1,000 words</p>
                      </div>

                      {/* 48 hours option */}
                      <div
                        style={{
                          border: `1px solid ${orderDetails.turnaroundTime === "48 hours" ? "#3b82f6" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          padding: "20px",
                          cursor: "pointer",
                          backgroundColor:
                            orderDetails.turnaroundTime === "48 hours" ? "#eff6ff" : "transparent",
                          boxShadow:
                            orderDetails.turnaroundTime === "48 hours"
                              ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handlePriceOptionSelect("48 hours")}
                      >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `1px solid ${orderDetails.turnaroundTime === "48 hours" ? "#3b82f6" : "#d1d5db"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            {orderDetails.turnaroundTime === "48 hours" && (
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: "#3b82f6",
                                }}
                              ></div>
                            )}
                          </div>
                          <span style={{ marginLeft: "8px", fontWeight: "500", fontSize: "16px" }}>
                            48 hours
                          </span>
                        </div>
                        <p
                          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#111827" }}
                        >
                          $25 <span style={{ fontSize: "16px", fontWeight: "500" }}>per</span>
                        </p>
                        <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>1,000 words</p>
                      </div>

                      {/* 72 hours option */}
                      <div
                        style={{
                          border: `1px solid ${orderDetails.turnaroundTime === "72 hours" ? "#3b82f6" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          padding: "20px",
                          cursor: "pointer",
                          backgroundColor:
                            orderDetails.turnaroundTime === "72 hours" ? "#eff6ff" : "transparent",
                          boxShadow:
                            orderDetails.turnaroundTime === "72 hours"
                              ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handlePriceOptionSelect("72 hours")}
                      >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `1px solid ${orderDetails.turnaroundTime === "72 hours" ? "#3b82f6" : "#d1d5db"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            {orderDetails.turnaroundTime === "72 hours" && (
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: "#3b82f6",
                                }}
                              ></div>
                            )}
                          </div>
                          <span style={{ marginLeft: "8px", fontWeight: "500", fontSize: "16px" }}>
                            72 hours
                          </span>
                        </div>
                        <p
                          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#111827" }}
                        >
                          $20 <span style={{ fontSize: "16px", fontWeight: "500" }}>per</span>
                        </p>
                        <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>1,000 words</p>
                      </div>

                      {/* 120 hours option */}
                      <div
                        style={{
                          border: `1px solid ${orderDetails.turnaroundTime === "120 hours" ? "#3b82f6" : "#e5e7eb"}`,
                          borderRadius: "8px",
                          padding: "20px",
                          cursor: "pointer",
                          backgroundColor:
                            orderDetails.turnaroundTime === "120 hours" ? "#eff6ff" : "transparent",
                          boxShadow:
                            orderDetails.turnaroundTime === "120 hours"
                              ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
                              : "none",
                          transition: "all 0.2s ease",
                        }}
                        onClick={() => handlePriceOptionSelect("120 hours")}
                      >
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                          <div
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              border: `1px solid ${orderDetails.turnaroundTime === "120 hours" ? "#3b82f6" : "#d1d5db"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            {orderDetails.turnaroundTime === "120 hours" && (
                              <div
                                style={{
                                  width: "12px",
                                  height: "12px",
                                  borderRadius: "50%",
                                  backgroundColor: "#3b82f6",
                                }}
                              ></div>
                            )}
                          </div>
                          <span style={{ marginLeft: "8px", fontWeight: "500", fontSize: "16px" }}>
                            120 hours
                          </span>
                        </div>
                        <p
                          style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#111827" }}
                        >
                          $15 <span style={{ fontSize: "16px", fontWeight: "500" }}>per</span>
                        </p>
                        <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>1,000 words</p>
                      </div>

                      {pricingData && (
                        <div
                          style={{
                            marginTop: "16px",
                            backgroundColor: "#f9fafb",
                            padding: "12px",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            gridColumn: "span 2",
                          }}
                        >
                          <p style={{ fontWeight: "500", marginBottom: "8px" }}>Price Breakdown:</p>
                          <p style={{ margin: "4px 0", fontSize: "14px" }}>
                            Base Rate: ${pricingData.breakdown.baseRate} per{" "}
                            {pricingData.breakdown.wordsPerRate} words
                          </p>
                          <p style={{ margin: "4px 0", fontSize: "14px" }}>
                            Word Count: {pricingData.breakdown.wordCount} words
                          </p>
                          <p style={{ margin: "4px 0", fontSize: "14px" }}>
                            Duration: {pricingData.breakdown.duration}
                          </p>
                          <p style={{ margin: "8px 0 0 0", fontSize: "14px", fontWeight: "500" }}>
                            Calculation: {pricingData.breakdown.calculation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  style={{ marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                >
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#e5e7eb",
                      color: "#4b5563",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleNextStep}
                    disabled={isCalculatingPrice}
                  >
                    {isCalculatingPrice ? (
                      <>
                        <Loader2
                          size={20}
                          style={{ marginRight: "8px", animation: "spin 1s linear infinite" }}
                        />
                        Processing...
                      </>
                    ) : (
                      "Next"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Materials */}
            {currentStep === 3 && (
              <div style={{ maxWidth: "768px", margin: "0 auto" }}>
                <div style={{ marginBottom: "32px" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "16px" }}>
                    Supporting Materials (Optional)
                  </h3>
                  <textarea
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      height: "160px",
                      resize: "vertical",
                      outline: "none",
                    }}
                    placeholder="Write text here ..."
                    value={additionalInstructionsText}
                    onChange={(e) => setAdditionalInstructionsText(e.target.value)}
                  ></textarea>

                  <Button variant="outline" className="mt-4 flex items-center gap-2">
                    <Upload size={20} />
                    Upload File
                  </Button>
                </div>

                <div
                  style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                >
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#e5e7eb",
                      color: "#4b5563",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handleNextStep}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Review Order */}
            {currentStep === 4 && (
              <div style={{ maxWidth: "768px", margin: "0 auto" }}>
                <div
                  style={{
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    padding: "24px",
                    marginBottom: "32px",
                  }}
                >
                  <h3 style={{ fontSize: "18px", fontWeight: "500", marginBottom: "24px" }}>Order Summary</h3>

                  <div
                    style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "16px" }}
                  >
                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Email</p>
                    <p style={{ fontWeight: "500" }}>{userEmail}</p>
                  </div>

                  <div
                    style={{ borderBottom: "1px solid #e5e7eb", paddingBottom: "16px", marginBottom: "16px" }}
                  >
                    <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Assignment Title</p>
                    <p style={{ fontWeight: "500" }}>{orderDetails.title}</p>
                  </div>

                  <div
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                      paddingBottom: "16px",
                      marginBottom: "16px",
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Word Count</p>
                      <p style={{ margin: "0" }}>{orderDetails.wordCount}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Turnaround Time</p>
                      <p style={{ margin: "0" }}>{orderDetails.turnaroundTime}</p>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingTop: "16px",
                    }}
                  >
                    <p style={{ fontWeight: "500" }}>Total Amount</p>
                    <p style={{ fontSize: "20px", fontWeight: "700" }}>{orderDetails.totalAmount}</p>
                  </div>
                </div>

                <div
                  style={{ marginTop: "32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
                >
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#e5e7eb",
                      color: "#4b5563",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={handlePreviousStep}
                  >
                    Back
                  </button>
                  <button
                    style={{
                      padding: "12px",
                      backgroundColor: "#3b82f6",
                      color: "white",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onClick={handleOrderSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={20}
                          style={{ marginRight: "8px", animation: "spin 1s linear infinite" }}
                        />
                        Processing...
                      </>
                    ) : (
                      "Order"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "32px",
              textAlign: "center",
              maxWidth: "400px",
            }}
          >
            <CheckCircle size={48} color="#22c55e" style={{ marginBottom: "16px" }} />
            <h2 style={{ fontSize: "24px", fontWeight: "600", marginBottom: "8px" }}>Order Created Successfully!</h2>
            <p style={{ color: "#6b7280", marginBottom: "24px" }}>
              Your order has been submitted successfully. Click the button below to complete your payment.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => {
                  if (checkoutUrl) {
                    window.open(checkoutUrl, '_blank');
                    setShowSuccessPopup(false);
                  }
                }}
                style={{
                  backgroundColor: "#22c55e",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "500",
                }}
              >
                Click to Make Payment
              </button>
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
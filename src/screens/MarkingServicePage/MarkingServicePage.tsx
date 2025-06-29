import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Header } from "../../components/ui/header";
import { Footer } from "../../components/ui/footer";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { useToastContext } from "../../contexts/ToastContext";
import FirebaseFileUploader from "../../components/FirebaseFileUploader";
import {
  MessageCircle,
  Loader2,
  ArrowLeft,
  CheckCircle,
  X,
  BookOpen,
  Sparkles,
  Upload,
  Send,
  Paperclip,
  Calendar,
  FileText,
  Eye,
  CreditCard,
} from "lucide-react";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
const marking_hero = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/marking-hero.png'

// Default pricing values for fallback
const DEFAULT_PRICING = {
  "24hours": 50,
  "48hours": 25,
  "72hours": 20,
  "120hours": 15,
}

// Sample data for orders
const sampleOrders = [
  {
    id: "order1",
    title: "Research Paper on AI",
    status: "In Progress",
    wordCount: "1,000 words",
    turnaroundTime: "24 hours",
    additionalServices: "None",
    date: "Feb 27, 2025",
    subject: "Computer Science",
    academicLevel: "Masters",
    assignmentType: "Research Paper",
    feedback: {
      positiveAspects: [
        "The report has a well-organized structure with distinct sections.",
        "The introduction effectively sets the context for the topic.",
        "Data points are relevant and support the main argument.",
      ],
      gaps: [
        "Depth of Analysis: Provide more examples to strengthen your arguments.",
        "Conclusion: The conclusion is brief and does not summarize key findings effectively.",
        "Formatting Consistency: Ensure uniform citation formatting (APA style).",
      ],
      structuralFeedback: [
        "Academic Readability: Suitable for undergraduate level.",
        "Improvement Suggestion: Simplify complex sentences for broader understanding.",
      ],
      suggestedImprovements: [
        "Add visuals such as charts or graphs to make data interpretation easier.",
        "Reorganize Section 3 to flow logically with preceding arguments.",
        "Highlight key takeaways in bullet points for quick readability.",
      ],
    },
  },
];

// Payment method data
const paymentMethods = [
  { id: "visa", name: "VISA" },
  { id: "amex", name: "AMEX" },
  { id: "discover", name: "DISCOVER" },
  { id: "mastercard", name: "MASTERCARD" },
];

export const MarkingServicePage = (): JSX.Element => {
  const navigate = useNavigate();
  const { toast } = useToastContext();

  // State variables
  const [userEnteredWordCount, setUserEnteredWordCount] = useState("");
  const [activeTab, setActiveTab] = useState("new");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [question, setQuestion] = useState("");
  const [improvedVersion, setImprovedVersion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [instructionsFile, setInstructionsFile] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [assignmentText, setAssignmentText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [additionalInstructionsText, setAdditionalInstructionsText] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [submittedOrders, setSubmittedOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState(null);
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
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    totalPayable: "$49",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa");
  const fileInputRef = useRef(null);
  const [checkoutUrl, setCheckoutUrl] = useState("");
  const [wordCount, setWordCount] = useState("1,000");
  const [additionalInstructionsFiles, setAdditionalInstructionsFiles] = useState([]);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);

  // Navigation handlers
  const handleAboutClick = () => {
    navigate('/#about');
  };
  
  const handlePricingClick = () => {
    navigate('/#pricing');
  };
  
  const handleBlogsClick = () => {
    navigate('/blogs');
  };

  // Handler for additional instructions file upload
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

  const fetchOrdersByStatus = async (status) => {
    setIsLoadingOrders(true);
    setOrdersError(null);
    
    try {
      const response = await fetch("https://getordersbystatus-inypszbbea-uc.a.run.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "user123", // Replace with actual USER_ID
          status: status
        }),
      });

      if (!response.ok) {
        throw new Error(`Error fetching orders: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        if (status === "submitted") {
          setSubmittedOrders(data.orders || []);
        } else if (status === "completed") {
          setCompletedOrders(data.orders || []);
        }
      } else {
        throw new Error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error(`Error fetching ${status} orders:`, error);
      setOrdersError(error.message);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (activeTab === "submitted") {
      fetchOrdersByStatus("submitted");
    } else if (activeTab === "completed") {
      fetchOrdersByStatus("completed");
    }
  }, [activeTab]);

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

  // Handle order selection
  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
  };

  // Handle going back to the orders list
  const handleBackToOrders = () => {
    setSelectedOrder(null);
  };

  // Handle asking a question
  const handleAskQuestion = () => {
    if (!question.trim()) return;
    alert(`Question submitted: ${question}`);
    setQuestion("");
  };

  // Handle submitting improved version
  const handleSubmitImprovedVersion = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      alert("Improved version submitted successfully!");
      setImprovedVersion("");
      setIsSubmitting(false);
    }, 1000);
  };

  // Handler for assignment file upload
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
    toast.success('Assignment file uploaded successfully!');
  };

  const handleAssignmentFileRemoved = () => {
    setUploadedFiles({
      ...uploadedFiles,
      assignment: null,
    });
    setAssignmentFile(null);
    toast.success('Assignment file removed');
  };

  // Handler for instructions file upload
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
    toast.success('Instructions file uploaded successfully!');
  };

  const handleInstructionsFileRemoved = () => {
    setUploadedFiles({
      ...uploadedFiles,
      instructions: null,
    });
    setInstructionsFile(null);
    toast.success('Instructions file removed');
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
    
    if (value === "new") {
      setSelectedOrder(null);
      setCurrentStep(1);
    } else if (value === "submitted") {
      fetchOrdersByStatus("submitted");
    } else if (value === "completed") {
      fetchOrdersByStatus("completed");
    }
  };

  // Handle next step in new order flow
  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!userEnteredWordCount || Number.parseInt(userEnteredWordCount) <= 0) {
        alert("Please enter a valid word count");
        return;
      }
      
      if (!orderDetails.title.trim()) {
        alert("Please enter a title for your assignment");
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
        alert("Using default pricing due to calculation service unavailability");
      }
      
      setOrderDetails(prevState => ({
        ...prevState,
        turnaroundTime: "24 hours",
        totalAmount: result.success ? `$${result.price}` : (result.fallback ? `$${result.price}` : "$0"),
        wordCount: `${formattedWordCount} words`,
      }));

      setCurrentStep(currentStep + 1);
    } else if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step in new order flow
  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      setActiveTab("submitted");
    }
  };

  // Handle payment method selection
  const handlePaymentMethodSelect = (method) => {
    setSelectedPaymentMethod(method);
  };

  // Handle payment form input
  const handlePaymentInput = (field, value) => {
    setPaymentDetails({
      ...paymentDetails,
      [field]: value,
    });
  };

  // Handle final payment submission
  const handlePaymentSubmit = () => {
    alert("Payment processed successfully! Your order has been placed.");
    setActiveTab("submitted");
    setCurrentStep(1);
  };

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
        userId: "user123", // Replace with actual USER_ID
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
      
      const planId = `user123-${Date.now()}`;
      
      const checkoutData = {
        userId: "user123", // Replace with actual USER_ID
        amount: amount,
        productName: "marking services",
        customerEmail: `user-user123@example.com`,
        customerName: `User user123`,
        planId: planId,
        returnUrl: "https://v0-newnow21.vercel.app/signup"
      };
      
      const checkoutResponse = await fetch("https://createcheckoutsession-inypszbbea-uc.a.run.app", {
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
      
      if (checkoutResult.url) {
        setCheckoutUrl(checkoutResult.url);
        setShowSuccessPopup(true);
      } else {
        throw new Error("Failed to create payment link");
      }
      
    } catch (error) {
      console.error("Error in order or payment process:", error);
      toast.error(`Failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle price option selection
  const handlePriceOptionSelect = async (duration) => {
    if (isCalculatingPrice) return;

    const result = await calculatePrice(wordCount.replace(/,/g, ""), duration);

    if (!result.success && result.fallback) {
      alert("Using default pricing due to calculation service unavailability");
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

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = ["Upload Assignment", "Words & Price", "Additional Materials", "Review Order", "Make Payment"];

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
    <div
      style={{
        display: "flex",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f9fafb",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {/* Sidebar - Placeholder for DashboardSidebar */}
      <div style={{ width: "250px", backgroundColor: "#1f2937", color: "white", padding: "20px" }}>
        <h2 style={{ marginBottom: "20px" }}>My Study Pal</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>Dashboard</li>
            <li style={{ marginBottom: "10px" }}>Assignment Feedback</li>
            <li style={{ marginBottom: "10px" }}>Paraphrasing</li>
            <li style={{ marginBottom: "10px" }}>Grammar Checker</li>
            <li style={{ marginBottom: "10px" }}>Outline Generator</li>
            <li style={{ marginBottom: "10px" }}>Summarizer</li>
            <li style={{ marginBottom: "10px" }}>Text to Speech</li>
            <li style={{ marginBottom: "10px" }}>AI Teacher</li>
            <li style={{ marginBottom: "10px", backgroundColor: "#3b82f6", padding: "8px", borderRadius: "4px" }}>Marking Services</li>
            <li style={{ marginBottom: "10px" }}>Settings</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: "1", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header - Placeholder for StandardHeader */}
        <div style={{ backgroundColor: "white", padding: "16px 24px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "600", margin: 0 }}>Marking Services</h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", backgroundColor: "#3b82f6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "500" }}>
              NR
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <main style={{ flex: "1", padding: "16px", overflowY: "auto" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {selectedOrder ? (
              // Order Details View
              <div>
                <button
                  onClick={handleBackToOrders}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    color: "#3b82f6",
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    marginBottom: "24px",
                    padding: "0",
                  }}
                >
                  <ArrowLeft size={16} style={{ marginRight: "8px" }} />
                  Back to orders
                </button>

                {/* Order Summary */}
                <div
                  style={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                    padding: "24px",
                    marginBottom: "24px",
                  }}
                >
                  <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "16px" }}>{selectedOrder.title}</h2>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "16px" }}>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Word Count</p>
                      <p style={{ fontWeight: "500" }}>{selectedOrder.wordCount}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Turnaround Time</p>
                      <p style={{ fontWeight: "500" }}>{selectedOrder.turnaroundTime}</p>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Subject</p>
                      <p style={{ fontWeight: "500" }}>{selectedOrder.subject || "Not specified"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Academic Level</p>
                      <p style={{ fontWeight: "500" }}>{selectedOrder.academicLevel || "Not specified"}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "4px" }}>Assignment Type</p>
                      <p style={{ fontWeight: "500" }}>{selectedOrder.assignmentType || "Not specified"}</p>
                    </div>
                  </div>

                  <div style={{ marginTop: "16px", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "#3b82f6",
                        border: "none",
                        background: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Eye size={16} style={{ marginRight: "8px" }} />
                      View Original Submission
                    </button>
                  </div>
                </div>

                {/* Feedback and Improved Version Panels */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px" }}>
                  {/* Feedback Panel */}
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      padding: "24px",
                    }}
                  >
                    <h2 style={{ fontSize: "20px", fontWeight: "500", marginBottom: "24px" }}>
                      Detailed/Summary Feedback
                    </h2>

                    {/* Positive Aspects */}
                    <div style={{ marginBottom: "32px" }}>
                      <div style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
                        <div
                          style={{
                            width: "24px",
                            height: "24px",
                            borderRadius: "50%",
                            backgroundColor: "#dcfce7",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "12px",
                          }}
                        >
                          <CheckCircle size={16} color="#22c55e" />
                        </div>
                        <h3 style={{ fontSize: "18px", fontWeight: "500" }}>Positive Aspects:</h3>
                      </div>
                      <ul style={{ paddingLeft: "36px", marginTop: "0", marginBottom: "0" }}>
                        {selectedOrder.feedback?.positiveAspects.map((item, index) => (
                          <li
                            key={`positive-${index}`}
                            style={{ display: "flex", alignItems: "flex-start", marginBottom: "8px" }}
                          >
                            <span style={{ color: "#9ca3af", marginRight: "8px" }}>•</span>
                            <span style={{ color: "#374151" }}>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Question Input */}
                    <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
                      <div style={{ position: "relative" }}>
                        <input
                          type="text"
                          placeholder="Ask a question"
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            paddingRight: "80px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            outline: "none",
                          }}
                          value={question}
                          onChange={(e) => setQuestion(e.target.value)}
                        />
                        <div
                          style={{
                            position: "absolute",
                            right: "8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#9ca3af",
                              cursor: "pointer",
                              padding: "4px",
                            }}
                          >
                            <Paperclip size={20} />
                          </button>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              color: "#3b82f6",
                              cursor: "pointer",
                              padding: "4px",
                            }}
                            onClick={handleAskQuestion}
                          >
                            <Send size={20} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload Improved Version Panel */}
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      padding: "24px",
                    }}
                  >
                    <h2 style={{ fontSize: "20px", fontWeight: "500", marginBottom: "24px" }}>
                      Upload Improved Version
                    </h2>

                    <div style={{ marginBottom: "16px" }}>
                      <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
                        Improved Version
                      </label>
                      <textarea
                        style={{
                          width: "100%",
                          padding: "12px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          height: "256px",
                          resize: "vertical",
                        }}
                        placeholder="Write here ..."
                        value={improvedVersion}
                        onChange={(e) => setImprovedVersion(e.target.value)}
                      ></textarea>
                    </div>

                    <div style={{ marginBottom: "24px" }}>
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          border: "1px solid #3b82f6",
                          color: "#3b82f6",
                          borderRadius: "6px",
                          background: "none",
                          cursor: "pointer",
                        }}
                      >
                        <Upload size={16} style={{ marginRight: "8px" }} />
                        Upload
                      </button>
                    </div>

                    <button
                      style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                      }}
                      onClick={handleSubmitImprovedVersion}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 size={20} style={{ marginRight: "8px", animation: "spin 1s linear infinite" }} />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Orders List or New Order View
              <div>
                {/* Custom Tab Navigation */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    borderRadius: "6px",
                    border: "1px solid #e5e7eb",
                    marginBottom: "32px",
                    width: "100%",
                    overflow: "hidden",
                  }}
                >
                  <button
                    style={{
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "none",
                      background: activeTab === "new" ? "#3b82f6" : "#f9fafb",
                      color: activeTab === "new" ? "white" : "#4b5563",
                      cursor: "pointer",
                      flex: "1",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    onClick={() => handleTabChange("new")}
                  >
                    Start New Order
                  </button>
                  <button
                    style={{
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "none",
                      background: activeTab === "submitted" ? "#3b82f6" : "#f9fafb",
                      color: activeTab === "submitted" ? "white" : "#4b5563",
                      cursor: "pointer",
                      flex: "1",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    onClick={() => handleTabChange("submitted")}
                  >
                    Submitted Orders
                  </button>
                  <button
                    style={{
                      padding: "10px 16px",
                      fontSize: "14px",
                      fontWeight: "500",
                      border: "none",
                      background: activeTab === "completed" ? "#3b82f6" : "#f9fafb",
                      color: activeTab === "completed" ? "white" : "#4b5563",
                      cursor: "pointer",
                      flex: "1",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    onClick={() => handleTabChange("completed")}
                  >
                    Completed Orders
                  </button>
                </div>

                {activeTab === "new" ? (
                  // New Order Form
                  <div
                    style={{
                      backgroundColor: "white",
                      borderRadius: "8px",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      padding: "16px 24px",
                    }}
                  >
                    <h2
                      style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        textAlign: "center",
                        marginBottom: "24px",
                      }}
                    >
                      Assignment Submission
                    </h2>

                    {/* Step Indicator */}
                    {renderStepIndicator()}

                    {/* Step 1: Upload Assignment */}
                    {currentStep === 1 && (
                      <div style={{ maxWidth: "768px", margin: "0 auto" }}>
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
                          <div style={{ marginTop: "16px" }}>
                            <FirebaseFileUploader
                              userId="user123"
                              onFileUploaded={handleAssignmentFileUploaded}
                              onFileRemoved={handleAssignmentFileRemoved}
                              buttonText="Or Upload File"
                              accept=".pdf,.doc,.docx,.txt"
                              disabled={isSubmitting}
                            />
                          </div>
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

                          <div style={{ marginTop: "16px" }}>
                            <FirebaseFileUploader
                              userId="user123"
                              onFileUploaded={handleInstructionsFileUploaded}
                              onFileRemoved={handleInstructionsFileRemoved}
                              buttonText="Or Upload File"
                              accept=".pdf,.doc,.docx,.txt"
                              disabled={!!instructionsText.trim() || isSubmitting}
                            />
                          </div>
                        </div>

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
                            onClick={() => setActiveTab("submitted")}
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
                              {/* Pricing options */}
                              {[
                                { duration: "24 hours", price: "$50" },
                                { duration: "48 hours", price: "$25" },
                                { duration: "72 hours", price: "$20" },
                                { duration: "120 hours", price: "$15" },
                              ].map((option) => (
                                <div
                                  key={option.duration}
                                  style={{
                                    border: `1px solid ${orderDetails.turnaroundTime === option.duration ? "#3b82f6" : "#e5e7eb"}`,
                                    borderRadius: "8px",
                                    padding: "20px",
                                    cursor: "pointer",
                                    backgroundColor:
                                      orderDetails.turnaroundTime === option.duration ? "#eff6ff" : "transparent",
                                    boxShadow:
                                      orderDetails.turnaroundTime === option.duration
                                        ? "0 0 0 2px rgba(59, 130, 246, 0.3)"
                                        : "none",
                                    transition: "all 0.2s ease",
                                  }}
                                  onClick={() => handlePriceOptionSelect(option.duration)}
                                >
                                  <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                    <div
                                      style={{
                                        width: "20px",
                                        height: "20px",
                                        borderRadius: "50%",
                                        border: `1px solid ${orderDetails.turnaroundTime === option.duration ? "#3b82f6" : "#d1d5db"}`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        marginRight: "8px",
                                      }}
                                    >
                                      {orderDetails.turnaroundTime === option.duration && (
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
                                      {option.duration}
                                    </span>
                                  </div>
                                  <p
                                    style={{ fontSize: "24px", fontWeight: "700", marginBottom: "4px", color: "#111827" }}
                                  >
                                    {option.price} <span style={{ fontSize: "16px", fontWeight: "500" }}>per</span>
                                  </p>
                                  <p style={{ color: "#6b7280", margin: "0", fontSize: "15px" }}>1,000 words</p>
                                </div>
                              ))}
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

                          <div style={{ marginTop: "16px" }}>
                            <FirebaseFileUploader
                              userId="user123"
                              onFileUploaded={handleAdditionalInstructionsFileUploaded}
                              onFileRemoved={() => {}}
                              buttonText="Upload File"
                              accept=".pdf,.doc,.docx,.txt"
                              disabled={isSubmitting}
                            />
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
                ) : activeTab === "submitted" ? (
                  <div style={{ display: "grid", gap: "16px" }}>
                    {isLoadingOrders ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader2 size={40} color="#3b82f6" style={{ marginBottom: "16px", animation: "spin 1s linear infinite" }} />
                        <p style={{ color: "#6b7280", fontSize: "16px" }}>Loading your submitted orders...</p>
                      </div>
                    ) : ordersError ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center" 
                        }}
                      >
                        <p style={{ color: "#ef4444", marginBottom: "16px" }}>Error loading orders: {ordersError}</p>
                        <button
                          onClick={() => fetchOrdersByStatus("submitted")}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Try Again
                        </button>
                      </div>
                    ) : submittedOrders.length === 0 ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center" 
                        }}
                      >
                        <p style={{ color: "#6b7280", marginBottom: "16px" }}>You don't have any submitted orders yet.</p>
                        <button
                          onClick={() => setActiveTab("new")}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Create New Order
                        </button>
                      </div>
                    ) : (
                      submittedOrders.map((order) => (
                        <div
                          key={order.id}
                          style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: `1px solid ${selectedOrder?.id === order.id ? "#3b82f6" : "#e5e7eb"}`,
                            padding: "24px",
                            cursor: "pointer",
                            transition: "box-shadow 0.2s ease",
                            boxShadow: selectedOrder?.id === order.id ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none",
                          }}
                          onClick={() => handleOrderSelect(order)}
                        >
                          <div style={{ marginBottom: "8px" }}>
                            <div style={{ marginBottom: "8px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  backgroundColor: "#dbeafe",
                                  color: "#1e40af",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  marginBottom: "8px",
                                }}
                              >
                                Submitted
                              </span>
                              <h3 style={{ fontSize: "20px", fontWeight: "500", margin: "0" }}>{order.assignmentTitle}</h3>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
                              <Calendar size={16} style={{ marginRight: "8px" }} />
                              <span style={{ fontSize: "14px" }}>
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "16px",
                              display: "grid",
                              gridTemplateColumns: "1fr",
                              gap: "16px",
                            }}
                          >
                            <div>
                              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0" }}>Word Count</p>
                              <p style={{ margin: "0" }}>{order.wordCount} words</p>
                            </div>
                            <div>
                              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0" }}>Turnaround Time</p>
                              <p style={{ margin: "0" }}>
                                {order.duration === "24hours" ? "24 hours" : 
                                order.duration === "48hours" ? "48 hours" : 
                                order.duration === "72hours" ? "72 hours" : 
                                order.duration === "120hours" ? "120 hours" : 
                                order.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div style={{ display: "grid", gap: "16px" }}>
                    {isLoadingOrders ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center"
                        }}
                      >
                        <Loader2 size={40} color="#3b82f6" style={{ marginBottom: "16px", animation: "spin 1s linear infinite" }} />
                        <p style={{ color: "#6b7280", fontSize: "16px" }}>Loading your completed orders...</p>
                      </div>
                    ) : ordersError ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center" 
                        }}
                      >
                        <p style={{ color: "#ef4444", marginBottom: "16px" }}>Error loading orders: {ordersError}</p>
                        <button
                          onClick={() => fetchOrdersByStatus("completed")}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Try Again
                        </button>
                      </div>
                    ) : completedOrders.length === 0 ? (
                      <div 
                        style={{ 
                          backgroundColor: "white", 
                          borderRadius: "8px", 
                          padding: "40px", 
                          textAlign: "center" 
                        }}
                      >
                        <p style={{ color: "#6b7280", marginBottom: "16px" }}>You don't have any completed orders yet.</p>
                        <button
                          onClick={() => setActiveTab("new")}
                          style={{
                            backgroundColor: "#3b82f6",
                            color: "white",
                            padding: "8px 16px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                          }}
                        >
                          Create New Order
                        </button>
                      </div>
                    ) : (
                      completedOrders.map((order) => (
                        <div
                          key={order.id}
                          style={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: `1px solid ${selectedOrder?.id === order.id ? "#3b82f6" : "#e5e7eb"}`,
                            padding: "24px",
                            cursor: "pointer",
                            transition: "box-shadow 0.2s ease",
                            boxShadow: selectedOrder?.id === order.id ? "0 0 0 2px rgba(59, 130, 246, 0.3)" : "none",
                          }}
                          onClick={() => handleOrderSelect(order)}
                        >
                          <div style={{ marginBottom: "8px" }}>
                            <div style={{ marginBottom: "8px" }}>
                              <span
                                style={{
                                  display: "inline-block",
                                  backgroundColor: "#dcfce7",
                                  color: "#166534",
                                  fontSize: "12px",
                                  padding: "4px 8px",
                                  borderRadius: "4px",
                                  marginBottom: "8px",
                                }}
                              >
                                Completed
                              </span>
                              <h3 style={{ fontSize: "20px", fontWeight: "500", margin: "0" }}>{order.assignmentTitle}</h3>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", color: "#6b7280" }}>
                              <Calendar size={16} style={{ marginRight: "8px" }} />
                              <span style={{ fontSize: "14px" }}>
                                {new Date(order.createdAt).toLocaleDateString('en-US', { 
                                  month: 'short', 
                                  day: 'numeric', 
                                  year: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>

                          <div
                            style={{
                              marginTop: "16px",
                              display: "grid",
                              gridTemplateColumns: "1fr",
                              gap: "16px",
                            }}
                          >
                            <div>
                              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0" }}>Word Count</p>
                              <p style={{ margin: "0" }}>{order.wordCount} words</p>
                            </div>
                            <div>
                              <p style={{ fontSize: "14px", color: "#6b7280", margin: "0 0 4px 0" }}>Turnaround Time</p>
                              <p style={{ margin: "0" }}>
                                {order.duration === "24hours" ? "24 hours" : 
                                order.duration === "48hours" ? "48 hours" : 
                                order.duration === "72hours" ? "72 hours" : 
                                order.duration === "120hours" ? "120 hours" : 
                                order.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

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
    </div>
  );
};
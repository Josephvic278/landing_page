import React, { useState, useEffect, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import { Badge } from "../../components/ui/badge";

import { Button } from "../../components/ui/button";

import { Input } from "../../components/ui/input";

import { Textarea } from "../../components/ui/textarea";

import { Header } from "../../components/ui/header";

import { Footer } from "../../components/ui/footer";

import { useToastContext } from "../../contexts/ToastContext";

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

  Plus,

} from "lucide-react";

const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'

const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'

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

  {

    id: "order2",

    title: "Literature Review on Climate Change",

    status: "Completed",

    wordCount: "2,500 words",

    turnaroundTime: "48 hours",

    additionalServices: "Plagiarism Check",

    date: "Feb 20, 2025",

  },

];

// Payment method data

const paymentMethods = [

  { id: "visa", name: "VISA" },

  { id: "amex", name: "AMEX" },

  { id: "discover", name: "DISCOVER" },

  { id: "mastercard", name: "MASTERCARD" },

]

export const MarkingServicePage = (): JSX.Element => {

  const navigate = useNavigate();

  const { toast } = useToastContext();

  

  // State management

  const [userEmail, setUserEmail] = useState("")

  const [userEnteredWordCount, setUserEnteredWordCount] = useState("")

  const [activeTab, setActiveTab] = useState("new")

  const [selectedOrder, setSelectedOrder] = useState(null)

  const [question, setQuestion] = useState("")

  const [improvedVersion, setImprovedVersion] = useState("")

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)

  const [assignmentFile, setAssignmentFile] = useState(null)

  const [instructionsFile, setInstructionsFile] = useState(null)

  const [additionalFiles, setAdditionalFiles] = useState([])

  const [completedOrders, setCompletedOrders] = useState([])

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  const [assignmentText, setAssignmentText] = useState("")

  const [instructionsText, setInstructionsText] = useState("")

  const [additionalInstructionsText, setAdditionalInstructionsText] = useState("")

  const [pricingData, setPricingData] = useState(null)

  const [submittedOrders, setSubmittedOrders] = useState(sampleOrders)

  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  const [ordersError, setOrdersError] = useState(null)

  const [uploadedFiles, setUploadedFiles] = useState({

    assignment: null,

    instructions: null,

    additional: [],

  })

  const [orderDetails, setOrderDetails] = useState({

    title: "",

    wordCount: "",

    turnaroundTime: "",

    totalAmount: "",

  })

  const [paymentDetails, setPaymentDetails] = useState({

    cardName: "",

    cardNumber: "",

    expiryDate: "",

    cvv: "",

    totalPayable: "$49",

  })

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("visa")

  const [checkoutUrl, setCheckoutUrl] = useState("")

  const [wordCount, setWordCount] = useState("1,000")

  const [additionalInstructionsFiles, setAdditionalInstructionsFiles] = useState([])

  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false)

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

  // Calculate price using fallback if API fails

  const calculatePrice = async (wordCountValue, duration) => {

    setIsCalculatingPrice(true)

    try {

      // Parse word count, removing commas

      const parsedWordCount = Number.parseInt(wordCountValue.toString().replace(/,/g, ""))

      // Validate word count

      if (isNaN(parsedWordCount) || parsedWordCount <= 0) {

        throw new Error("Invalid word count")

      }

      // Format duration for API - remove spaces and convert "5 days" to "120hours" if needed

      const durationKey = duration.replace(/\s/g, "")

      // Try to get price from API with increased timeout

      try {

        // Create AbortController with longer timeout (15 seconds)

        const controller = new AbortController();

        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch("https://calculateorderprice-inypszbbea-uc.a.run.app", {

          method: "POST",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            wordCount: parsedWordCount,

            duration: durationKey,

          }),

          signal: controller.signal,

        })

        // Clear the timeout if request completes

        clearTimeout(timeoutId);

        if (!response.ok) {

          throw new Error(`API returned status ${response.status}`)

        }

        const data = await response.json()

        // Update state with API response

        setOrderDetails(prevDetails => ({

          ...prevDetails,

          turnaroundTime: duration,

          totalAmount: `$${data.totalCost}`,

        }))

        setPricingData(data)

        return {

          success: true,

          price: data.totalCost,

          data: data,

        }

      } catch (apiError) {

        console.error("API Error:", apiError)

        // Show user-friendly message for timeout

        if (apiError.name === 'AbortError') {

          toast.error("Price calculation service is taking longer than expected. Using default pricing.")

        } else {

          toast.error("Unable to connect to pricing service. Using default pricing.")

        }

        // Calculate fallback price

        const durationMapping = {

          "24hours": "24hours",

          "48hours": "48hours",

          "72hours": "72hours",

          "120hours": "120hours",

          "5days": "120hours",

        }

        const lookupKey = durationMapping[durationKey] || durationKey

        const ratePerThousand = DEFAULT_PRICING[lookupKey] || 50

        const wordCountMultiplier = Math.ceil(parsedWordCount / 1000)

        const fallbackPrice = wordCountMultiplier * ratePerThousand

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

        }

        setOrderDetails({

          ...orderDetails,

          turnaroundTime: duration,

          totalAmount: `$${fallbackPrice}`,

        })

        setPricingData(fallbackData)

        return {

          success: false,

          fallback: true,

          price: fallbackPrice,

          data: fallbackData,

        }

      }

    } catch (error) {

      console.error("Price calculation error:", error)

      toast.error("Error calculating price. Using default pricing.")

      

      const fallbackPrice = 50

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

      }

      setOrderDetails({

        ...orderDetails,

        turnaroundTime: duration,

        totalAmount: `$${fallbackPrice}`,

      })

      setPricingData(fallbackData)

      return {

        success: false,

        fallback: true,

        price: fallbackPrice,

        data: fallbackData,

        error: error.message,

      }

    } finally {

      setIsCalculatingPrice(false)

    }

  }

  // Handle order selection

  const handleOrderSelect = (order) => {

    setSelectedOrder(order)

  }

  // Handle going back to the orders list

  const handleBackToOrders = () => {

    setSelectedOrder(null)

  }

  // Handle asking a question

  const handleAskQuestion = () => {

    if (!question.trim()) return

    toast.success(`Question submitted: ${question}`)

    setQuestion("")

  }

  // Handle submitting improved version

  const handleSubmitImprovedVersion = () => {

    setIsSubmitting(true)

    setTimeout(() => {

      toast.success("Improved version submitted successfully!")

      setImprovedVersion("")

      setIsSubmitting(false)

    }, 1000)

  }

  // Handle tab change

  const handleTabChange = (value) => {

    setActiveTab(value)

    

    if (value === "new") {

      setSelectedOrder(null)

      setCurrentStep(1)

    }

  }

  // Handle next step in new order flow

  const handleNextStep = async () => {

    if (currentStep === 1) {

      // Validate inputs

      if (!userEmail.trim()) {

        toast.error("Please enter your email address")

        return

      }

      

      // Basic email validation

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(userEmail)) {

        toast.error("Please enter a valid email address")

        return

      }

      

      if (!userEnteredWordCount || Number.parseInt(userEnteredWordCount) <= 0) {

        toast.error("Please enter a valid word count")

        return

      }

      

      if (!orderDetails.title.trim()) {

        toast.error("Please enter a title for your assignment")

        return

      }

      // Format the word count with commas for display

      const formattedWordCount = userEnteredWordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

      

      setWordCount(formattedWordCount)

      

      const updatedOrderDetails = {

        ...orderDetails,

        wordCount: `${formattedWordCount} words`,

      }

      

      setOrderDetails(updatedOrderDetails)

      

      const result = await calculatePrice(userEnteredWordCount, "24 hours")

      if (!result.success && result.fallback) {

        // Don't show error toast here as it's already shown in calculatePrice

        console.log("Using fallback pricing")

      }

      

      setOrderDetails(prevState => ({

        ...prevState,

        turnaroundTime: "24 hours",

        totalAmount: result.success ? `$${result.price}` : (result.fallback ? `$${result.price}` : "$0"),

        wordCount: `${formattedWordCount} words`,

      }))

      setCurrentStep(currentStep + 1)

    } else if (currentStep < 5) {

      setCurrentStep(currentStep + 1)

    }

  }

  // Handle previous step in new order flow

  const handlePreviousStep = () => {

    if (currentStep > 1) {

      setCurrentStep(currentStep - 1)

    } else {

      setActiveTab("submitted")

    }

  }

  // Handle file upload - Fixed version

  const handleFileUpload = async (type) => {

    const fileInput = document.createElement("input")

    fileInput.type = "file"

    fileInput.accept = ".pdf,.doc,.docx,.txt"

    fileInput.onchange = async (e) => {

      const file = e.target.files[0]

      if (!file) return

      try {

        // Validate file size (max 10MB)

        const maxSize = 10 * 1024 * 1024; // 10MB in bytes

        if (file.size > maxSize) {

          toast.error("File size must be less than 10MB")

          return

        }

        // Validate file type

        const allowedTypes = [

          'application/pdf',

          'application/msword',

          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',

          'text/plain'

        ]

        

        if (!allowedTypes.includes(file.type)) {

          toast.error("Please upload a PDF, DOC, DOCX, or TXT file")

          return

        }

        // Create file data object with local file reference

        const fileData = {

          name: file.name,

          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,

          type: file.type,

          lastModified: file.lastModified,

          file: file, // Store the actual file object for later use

          url: URL.createObjectURL(file), // Create a local URL for the file

        }

        // Update state based on upload type

        if (type === "assignment") {

          setUploadedFiles(prev => ({

            ...prev,

            assignment: fileData,

          }))

          setAssignmentText("") // Clear text when file is uploaded

          toast.success(`Assignment file "${file.name}" uploaded successfully`)

        } else if (type === "instructions") {

          setUploadedFiles(prev => ({

            ...prev,

            instructions: fileData,

          }))

          setInstructionsText("") // Clear text when file is uploaded

          toast.success(`Instructions file "${file.name}" uploaded successfully`)

        } else if (type === "additional") {

          setUploadedFiles(prev => ({

            ...prev,

            additional: [...prev.additional, fileData],

          }))

          toast.success(`Additional file "${file.name}" uploaded successfully`)

        } else if (type === "improved") {

          // Handle improved version upload

          toast.success(`Improved version file "${file.name}" uploaded successfully`)

        }

      } catch (error) {

        console.error("Upload error:", error)

        toast.error(`Failed to upload file: ${error.message}`)

      }

    }

    fileInput.click()

  }

  // Handle file removal

  const handleRemoveFile = (type, index = null) => {

    if (type === "assignment") {

      // Revoke the object URL to free memory

      if (uploadedFiles.assignment?.url) {

        URL.revokeObjectURL(uploadedFiles.assignment.url)

      }

      setUploadedFiles({

        ...uploadedFiles,

        assignment: null,

      })

      // Clear the assignment text to allow text input again

      // setAssignmentText("") - Don't clear text, let user decide

      toast.success("Assignment file removed")

    } else if (type === "instructions") {

      // Revoke the object URL to free memory

      if (uploadedFiles.instructions?.url) {

        URL.revokeObjectURL(uploadedFiles.instructions.url)

      }

      setUploadedFiles({

        ...uploadedFiles,

        instructions: null,

      })

      // Clear the instructions text to allow text input again

      // setInstructionsText("") - Don't clear text, let user decide

      toast.success("Instructions file removed")

    } else if (type === "additional" && index !== null) {

      const newAdditional = [...uploadedFiles.additional]

      const removedFile = newAdditional.splice(index, 1)[0]

      

      // Revoke the object URL to free memory

      if (removedFile?.url) {

        URL.revokeObjectURL(removedFile.url)

      }

      

      setUploadedFiles({

        ...uploadedFiles,

        additional: newAdditional,

      })

      toast.success(`File "${removedFile.name}" removed`)

    }

  }

  // Handle payment method selection

  const handlePaymentMethodSelect = (method) => {

    setSelectedPaymentMethod(method)

  }

  // Handle payment form input

  const handlePaymentInput = (field, value) => {

    setPaymentDetails({

      ...paymentDetails,

      [field]: value,

    })

  }

  // Handle final payment submission

  const handlePaymentSubmit = () => {

    toast.success("Payment processed successfully! Your order has been placed.")

    setActiveTab("submitted")

    setCurrentStep(1)

  }

  // Updated handleOrderSubmit function

  const handleOrderSubmit = async () => {

    try {

      setIsSubmitting(true);

      

      // Format the duration according to the API requirements - must be one of: 24hours, 48hours, 72hours

      let formattedDuration = orderDetails.turnaroundTime.replace(/\s+/g, ""); // Remove spaces

      

      // Map the duration to the expected format

      const durationMap = {

        "24hours": "24hours",

        "48hours": "48hours", 

        "72hours": "72hours",

        "120hours": "72hours", // If 120hours is not supported, map to 72hours

      };

      

      formattedDuration = durationMap[formattedDuration] || "24hours"; // Default to 24hours if not in map

      

      // Format the order data according to the API requirements

      const orderData = {

        userId: userEmail,

        assignmentTitle: orderDetails.title,

        wordCount: Number.parseInt(wordCount.replace(/,/g, "")),

        duration: formattedDuration,

        assignmentText: assignmentText || "",

        assignmentFileUrl: uploadedFiles.assignment?.url || "",

        instructions: instructionsText || "",

        instructionsFileUrl: uploadedFiles.instructions?.url || "",

        additionalNotes: additionalInstructionsText || "",

        supportingMaterial: additionalInstructionsText || "", 

        supportingMaterialUrl: uploadedFiles.additional.length > 0 ? 

          uploadedFiles.additional[0].url : "",

      };

      // Create the order

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

      

      // Successfully created the order

      

      // Extract amount for the 2Checkout API

      const amountStr = orderDetails.totalAmount.replace("$", "");

      const amount = parseFloat(amountStr);

      

      // Create a simple planId using timestamp and user email

      const planId = `${userEmail}-${Date.now()}`;

      

      // Create the 2Checkout payload

      const checkoutData = {

        userId: userEmail,

        amount: amount,

        productName: "marking services",

        customerEmail: userEmail,

        customerName: `User ${userEmail}`,

        planId: planId,

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

  // Handle price option selection

  const handlePriceOptionSelect = async (duration) => {

    if (isCalculatingPrice) return

    const result = await calculatePrice(wordCount.replace(/,/g, ""), duration)

    if (!result.success && result.fallback) {

      // Don't show error toast here as it's already shown in calculatePrice

      console.log("Using fallback pricing for duration selection")

    }

    

    const currentWordCount = orderDetails.wordCount

    

    setOrderDetails(prevDetails => {

      return {

        ...prevDetails,

        turnaroundTime: duration,

        totalAmount: result.success ? `$${result.price}` : (result.fallback ? `$${result.price}` : prevDetails.totalAmount),

        wordCount: currentWordCount,

      }

    })

  }

  // Render step indicator

  const renderStepIndicator = () => {

    const steps = ["Upload Assignment", "Words & Price", "Additional Materials", "Review Order", "Make Payment"]

    return (

      <div className="w-full overflow-x-auto pb-5 mb-5">

        <div className="flex justify-between min-w-full">

          {steps.map((step, index) => (

            <div key={index} className="flex flex-col items-center flex-1 relative">

              <div

                className={`w-8 h-8 rounded-full border flex items-center justify-center mb-2 ${

                  currentStep === index + 1 

                    ? "border-blue-500 text-blue-500" 

                    : currentStep > index + 1 

                    ? "bg-blue-500 text-white border-blue-500" 

                    : "border-gray-300 text-gray-400"

                }`}

              >

                {index + 1}

              </div>

              <div

                className={`text-sm text-center ${

                  currentStep === index + 1 ? "text-blue-500" : "text-gray-600"

                }`}

              >

                {step}

              </div>

              {index < steps.length - 1 && (

                <div className="absolute top-4 left-1/2 w-full h-px bg-gray-300 -z-10" />

              )}

            </div>

          ))}

        </div>

      </div>

    )

  }

  return (

    <div className="min-h-screen bg-white">

      {/* Header */}

      <Header 

        onAboutClick={handleAboutClick}

        onPricingClick={handlePricingClick}

        onBlogsClick={handleBlogsClick}

      />

 <div className="bg-gray-50 py-4">

        <div className="container mx-auto px-4">

          <div className="flex items-center space-x-2 text-sm">

            <Link to="/" className="text-primary-500 hover:underline">Home</Link>

            <span className="text-gray-400">→</span>

            <span className="text-gray-600">Marking Services</span>

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

      {/* Main Content */}

      <div className="container mx-auto px-4 py-8">

        <div className="max-w-6xl mx-auto">

          {selectedOrder ? (

            // Order Details View

            <div>

              {/* Back button */}

              <button

                onClick={handleBackToOrders}

                className="flex items-center text-blue-500 hover:text-blue-600 mb-6"

              >

                <ArrowLeft size={16} className="mr-2" />

                Back to orders

              </button>

              {/* Order Summary */}

              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">

                <h2 className="text-2xl font-bold mb-4">{selectedOrder.title}</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">

                  <div>

                    <p className="text-sm text-gray-600 mb-1">Word Count</p>

                    <p className="font-medium">{selectedOrder.wordCount}</p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-600 mb-1">Turnaround Time</p>

                    <p className="font-medium">{selectedOrder.turnaroundTime}</p>

                  </div>

                  <div>

                    <p className="text-sm text-gray-600 mb-1">Status</p>

                    <span className={`inline-block px-2 py-1 rounded text-xs ${

                      selectedOrder.status === "Completed" 

                        ? "bg-green-100 text-green-800" 

                        : "bg-blue-100 text-blue-800"

                    }`}>

                      {selectedOrder.status}

                    </span>

                  </div>

                </div>

                <div className="flex justify-end">

                  <button className="flex items-center text-blue-500 hover:text-blue-600">

                    <Eye size={16} className="mr-2" />

                    View Original Submission

                  </button>

                </div>

              </div>

              {/* Feedback and Improved Version Panels */}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left Panel - Feedback */}

                <div className="bg-white rounded-lg shadow-sm p-6">

                  <h2 className="text-xl font-medium mb-6">Detailed/Summary Feedback</h2>

                  {/* Positive Aspects */}

                  <div className="mb-8">

                    <div className="flex items-center mb-4">

                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">

                        <CheckCircle size={16} className="text-green-600" />

                      </div>

                      <h3 className="text-lg font-medium">Positive Aspects:</h3>

                    </div>

                    <ul className="pl-9 space-y-2">

                      {selectedOrder.feedback?.positiveAspects.map((item, index) => (

                        <li key={index} className="flex items-start">

                          <span className="text-gray-400 mr-2">•</span>

                          <span className="text-gray-700">{item}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* Gaps */}

                  <div className="mb-8">

                    <div className="flex items-center mb-4">

                      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3">

                        <X size={16} className="text-red-600" />

                      </div>

                      <h3 className="text-lg font-medium">Gaps:</h3>

                    </div>

                    <ul className="pl-9 space-y-2">

                      {selectedOrder.feedback?.gaps.map((item, index) => (

                        <li key={index} className="flex items-start">

                          <span className="text-gray-400 mr-2">•</span>

                          <span className="text-gray-700">{item}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* Structural Feedback */}

                  <div className="mb-8">

                    <div className="flex items-center mb-4">

                      <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-3">

                        <BookOpen size={16} className="text-yellow-600" />

                      </div>

                      <h3 className="text-lg font-medium">Structural Feedback:</h3>

                    </div>

                    <ul className="pl-9 space-y-2">

                      {selectedOrder.feedback?.structuralFeedback.map((item, index) => (

                        <li key={index} className="flex items-start">

                          <span className="text-gray-400 mr-2">•</span>

                          <span className="text-gray-700">{item}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* Suggested Improvements */}

                  <div className="mb-8">

                    <div className="flex items-center mb-4">

                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3">

                        <Sparkles size={16} className="text-blue-600" />

                      </div>

                      <h3 className="text-lg font-medium">Suggested Improvements:</h3>

                    </div>

                    <ul className="pl-9 space-y-2">

                      {selectedOrder.feedback?.suggestedImprovements.map((item, index) => (

                        <li key={index} className="flex items-start">

                          <span className="text-gray-400 mr-2">•</span>

                          <span className="text-gray-700">{item}</span>

                        </li>

                      ))}

                    </ul>

                  </div>

                  {/* Question Input */}

                  <div className="pt-4 border-t border-gray-200">

                    <div className="relative">

                      <input

                        type="text"

                        placeholder="Ask a question"

                        className="w-full p-3 pr-20 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                        value={question}

                        onChange={(e) => setQuestion(e.target.value)}

                      />

                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">

                        <button className="p-1 text-gray-400 hover:text-gray-600">

                          <Paperclip size={20} />

                        </button>

                        <button

                          className="p-1 text-blue-500 hover:text-blue-600"

                          onClick={handleAskQuestion}

                        >

                          <Send size={20} />

                        </button>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Right Panel - Upload Improved Version */}

                <div className="bg-white rounded-lg shadow-sm p-6">

                  <h2 className="text-xl font-medium mb-6">Upload Improved Version</h2>

                  <div className="mb-4">

                    <label className="block mb-2 font-medium">Improved Version</label>

                    <textarea

                      className="w-full p-3 border border-gray-300 rounded-lg h-64 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"

                      placeholder="Write here ..."

                      value={improvedVersion}

                      onChange={(e) => setImprovedVersion(e.target.value)}

                    />

                  </div>

                  <div className="mb-6">

                    <button

                      onClick={() => handleFileUpload("improved")}

                      className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"

                    >

                      <Upload size={16} className="mr-2" />

                      Upload

                    </button>

                  </div>

                  <button

                    className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center disabled:opacity-50"

                    onClick={handleSubmitImprovedVersion}

                    disabled={isSubmitting}

                  >

                    {isSubmitting ? (

                      <>

                        <Loader2 size={20} className="mr-2 animate-spin" />

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

              <div className="flex flex-wrap border border-gray-200 rounded-lg mb-8 overflow-hidden">

              </div>

              {activeTab === "new" ? (

                // New Order Form

                <div className="bg-white rounded-lg shadow-sm p-6">

                  <h2 className="text-2xl font-bold text-center mb-6">Assignment Submission</h2>

                  {/* Step Indicator */}

                  {renderStepIndicator()}

                  {/* Step 1: Upload Assignment */}

                  {currentStep === 1 && (

                    <div className="max-w-2xl mx-auto">

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Email Address</h3>

                        <input

                          type="email"

                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                          placeholder="Enter your email address"

                          value={userEmail}

                          onChange={(e) => setUserEmail(e.target.value)}

                        />

                      </div>

                      

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Assignments</h3>

                        <textarea

                          className={`w-full p-3 border border-gray-300 rounded-lg h-40 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 ${

                            !!uploadedFiles.assignment ? 'bg-gray-100 cursor-not-allowed' : ''

                          }`}

                          placeholder="Write text here ..."

                          value={assignmentText}

                          onChange={(e) => setAssignmentText(e.target.value)}

                          disabled={!!uploadedFiles.assignment}

                        />

                        <div className="mt-4 flex items-center justify-between">

                          <button

                            onClick={() => handleFileUpload("assignment")}

                            disabled={!!assignmentText.trim()}

                            className={`flex items-center px-4 py-2 border rounded-lg ${

                              !!assignmentText.trim() 

                                ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' 

                                : 'border-blue-500 text-blue-500 hover:bg-blue-50'

                            }`}

                          >

                            <Upload size={16} className="mr-2" />

                            Or Upload File

                          </button>

                          {uploadedFiles.assignment && (

                            <div className="flex items-center">

                              <div className="flex items-center mr-4">

                                <FileText size={20} className="text-blue-500 mr-2" />

                                <div>

                                  <p className="font-medium text-sm">{uploadedFiles.assignment.name}</p>

                                  <p className="text-xs text-gray-600">{uploadedFiles.assignment.size}</p>

                                </div>

                              </div>

                              <button

                                onClick={() => handleRemoveFile("assignment")}

                                className="text-red-500 hover:text-red-600"

                              >

                                <X size={16} />

                              </button>

                            </div>

                          )}

                        </div>

                      </div>

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Assignment Instructions</h3>

                        <textarea

                          className={`w-full p-3 border border-gray-300 rounded-lg h-40 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500 ${

                            !!uploadedFiles.instructions ? 'bg-gray-100 cursor-not-allowed' : ''

                          }`}

                          placeholder="Write text here ..."

                          value={instructionsText}

                          onChange={(e) => setInstructionsText(e.target.value)}

                          disabled={!!uploadedFiles.instructions}

                        />

                        <div className="mt-4 flex items-center justify-between">

                          <button

                            onClick={() => handleFileUpload("instructions")}

                            disabled={!!instructionsText.trim()}

                            className={`flex items-center px-4 py-2 border rounded-lg ${

                              !!instructionsText.trim() 

                                ? 'border-gray-300 text-gray-400 bg-gray-100 cursor-not-allowed' 

                                : 'border-blue-500 text-blue-500 hover:bg-blue-50'

                            }`}

                          >

                            <Upload size={16} className="mr-2" />

                            Or Upload File

                          </button>

                          {uploadedFiles.instructions && (

                            <div className="flex items-center">

                              <div className="flex items-center mr-4">

                                <FileText size={20} className="text-blue-500 mr-2" />

                                <div>

                                  <p className="font-medium text-sm">{uploadedFiles.instructions.name}</p>

                                  <p className="text-xs text-gray-600">{uploadedFiles.instructions.size}</p>

                                </div>

                              </div>

                              <button

                                onClick={() => handleRemoveFile("instructions")}

                                className="text-red-500 hover:text-red-600"

                              >

                                <X size={16} />

                              </button>

                            </div>

                          )}

                        </div>

                      </div>

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Word Count</h3>

                        <input

                          type="number"

                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                          placeholder="Enter word count"

                          value={userEnteredWordCount}

                          onChange={(e) => setUserEnteredWordCount(e.target.value)}

                        />

                      </div>

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Assignment Title</h3>

                        <input

                          type="text"

                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                          placeholder="Enter assignment title"

                          value={orderDetails.title}

                          onChange={(e) => setOrderDetails({...orderDetails, title: e.target.value})}

                        />

                      </div>

                      <div className="grid grid-cols-2 gap-4">

                        <button

                          className="py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"

                          onClick={() => setActiveTab("submitted")}

                        >

                          Back

                        </button>

                        <button

                          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center disabled:opacity-50"

                          onClick={handleNextStep}

                          disabled={isCalculatingPrice}

                        >

                          {isCalculatingPrice ? (

                            <>

                              <Loader2 size={20} className="mr-2 animate-spin" />

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

                    <div className="max-w-4xl mx-auto">

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                        <div>

                          <h3 className="text-lg font-medium mb-4">Total Words</h3>

                          <div className="bg-gray-50 rounded-lg p-6 border">

                            <div className="mb-4">

                              <p className="text-sm font-medium mb-2">Word Count</p>

                              <div className="bg-white border rounded-lg p-3">

                                <span className="text-lg font-semibold text-gray-900">{wordCount}</span>

                                <span className="text-sm text-gray-600 ml-1">words</span>

                              </div>

                            </div>

                            <p className="text-sm text-gray-600">This is the word count you entered.</p>

                          </div>

                        </div>

                        <div className="lg:col-span-2">

                          <h3 className="text-lg font-medium mb-4">Pricing Calculation</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                            {/* 24 hours option */}

                            <div

                              className={`border rounded-lg p-5 cursor-pointer transition-all ${

                                orderDetails.turnaroundTime === "24 hours"

                                  ? "border-blue-500 bg-blue-50 shadow-md"

                                  : "border-gray-200 hover:border-gray-300"

                              }`}

                              onClick={() => handlePriceOptionSelect("24 hours")}

                            >

                              <div className="flex items-center mb-3">

                                <div

                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${

                                    orderDetails.turnaroundTime === "24 hours"

                                      ? "border-blue-500"

                                      : "border-gray-300"

                                  }`}

                                >

                                  {orderDetails.turnaroundTime === "24 hours" && (

                                    <div className="w-3 h-3 rounded-full bg-blue-500" />

                                  )}

                                </div>

                                <span className="font-medium">24 hours</span>

                              </div>

                              <p className="text-2xl font-bold mb-1">

                                $50 <span className="text-base font-medium">per</span>

                              </p>

                              <p className="text-gray-600 text-sm">1,000 words</p>

                            </div>

                            {/* 48 hours option */}

                            <div

                              className={`border rounded-lg p-5 cursor-pointer transition-all ${

                                orderDetails.turnaroundTime === "48 hours"

                                  ? "border-blue-500 bg-blue-50 shadow-md"

                                  : "border-gray-200 hover:border-gray-300"

                              }`}

                              onClick={() => handlePriceOptionSelect("48 hours")}

                            >

                              <div className="flex items-center mb-3">

                                <div

                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${

                                    orderDetails.turnaroundTime === "48 hours"

                                      ? "border-blue-500"

                                      : "border-gray-300"

                                  }`}

                                >

                                  {orderDetails.turnaroundTime === "48 hours" && (

                                    <div className="w-3 h-3 rounded-full bg-blue-500" />

                                  )}

                                </div>

                                <span className="font-medium">48 hours</span>

                              </div>

                              <p className="text-2xl font-bold mb-1">

                                $25 <span className="text-base font-medium">per</span>

                              </p>

                              <p className="text-gray-600 text-sm">1,000 words</p>

                            </div>

                            {/* 72 hours option */}

                            <div

                              className={`border rounded-lg p-5 cursor-pointer transition-all ${

                                orderDetails.turnaroundTime === "72 hours"

                                  ? "border-blue-500 bg-blue-50 shadow-md"

                                  : "border-gray-200 hover:border-gray-300"

                              }`}

                              onClick={() => handlePriceOptionSelect("72 hours")}

                            >

                              <div className="flex items-center mb-3">

                                <div

                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${

                                    orderDetails.turnaroundTime === "72 hours"

                                      ? "border-blue-500"

                                      : "border-gray-300"

                                  }`}

                                >

                                  {orderDetails.turnaroundTime === "72 hours" && (

                                    <div className="w-3 h-3 rounded-full bg-blue-500" />

                                  )}

                                </div>

                                <span className="font-medium">72 hours</span>

                              </div>

                              <p className="text-2xl font-bold mb-1">

                                $20 <span className="text-base font-medium">per</span>

                              </p>

                              <p className="text-gray-600 text-sm">1,000 words</p>

                            </div>

                            {/* 120 hours option */}

                            <div

                              className={`border rounded-lg p-5 cursor-pointer transition-all ${

                                orderDetails.turnaroundTime === "120 hours"

                                  ? "border-blue-500 bg-blue-50 shadow-md"

                                  : "border-gray-200 hover:border-gray-300"

                              }`}

                              onClick={() => handlePriceOptionSelect("120 hours")}

                            >

                              <div className="flex items-center mb-3">

                                <div

                                  className={`w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${

                                    orderDetails.turnaroundTime === "120 hours"

                                      ? "border-blue-500"

                                      : "border-gray-300"

                                  }`}

                                >

                                  {orderDetails.turnaroundTime === "120 hours" && (

                                    <div className="w-3 h-3 rounded-full bg-blue-500" />

                                  )}

                                </div>

                                <span className="font-medium">120 hours</span>

                              </div>

                              <p className="text-2xl font-bold mb-1">

                                $15 <span className="text-base font-medium">per</span>

                              </p>

                              <p className="text-gray-600 text-sm">1,000 words</p>

                            </div>

                          </div>

                          {pricingData && (

                            <div className="bg-gray-50 p-3 rounded-lg border">

                              <p className="font-medium mb-2">Price Breakdown:</p>

                              <p className="text-sm mb-1">

                                Base Rate: ${pricingData.breakdown.baseRate} per {pricingData.breakdown.wordsPerRate} words

                              </p>

                              <p className="text-sm mb-1">Word Count: {pricingData.breakdown.wordCount} words</p>

                              <p className="text-sm mb-1">Duration: {pricingData.breakdown.duration}</p>

                              <p className="text-sm font-medium mt-2">

                                Calculation: {pricingData.breakdown.calculation}

                              </p>

                            </div>

                          )}

                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-4">

                        <button

                          className="py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"

                          onClick={handlePreviousStep}

                        >

                          Back

                        </button>

                        <button

                          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center disabled:opacity-50"

                          onClick={handleNextStep}

                          disabled={isCalculatingPrice}

                        >

                          {isCalculatingPrice ? (

                            <>

                              <Loader2 size={20} className="mr-2 animate-spin" />

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

                    <div className="max-w-2xl mx-auto">

                      <div className="mb-8">

                        <h3 className="text-lg font-medium mb-4">Supporting Materials (Optional)</h3>

                        <textarea

                          className="w-full p-3 border border-gray-300 rounded-lg h-40 resize-vertical focus:outline-none focus:ring-2 focus:ring-blue-500"

                          placeholder="Write text here ..."

                          value={additionalInstructionsText}

                          onChange={(e) => setAdditionalInstructionsText(e.target.value)}

                        />

                        <div className="mt-4 flex items-center justify-between">

                          <button

                            onClick={() => handleFileUpload("additional")}

                            className="flex items-center px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"

                          >

                            <Upload size={16} className="mr-2" />

                            Upload File

                          </button>

                        </div>

                        

                        {/* Display uploaded additional files */}

                        {uploadedFiles.additional.length > 0 && (

                          <div className="mt-4 space-y-2">

                            <p className="text-sm font-medium text-gray-700">Uploaded Files:</p>

                            {uploadedFiles.additional.map((file, index) => (

                              <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">

                                <div className="flex items-center">

                                  <FileText size={20} className="text-blue-500 mr-2" />

                                  <div>

                                    <p className="font-medium text-sm">{file.name}</p>

                                    <p className="text-xs text-gray-600">{file.size}</p>

                                  </div>

                                </div>

                                <button

                                  onClick={() => handleRemoveFile("additional", index)}

                                  className="text-red-500 hover:text-red-600"

                                >

                                  <X size={16} />

                                </button>

                              </div>

                            ))}

                          </div>

                        )}

                      </div>

                      <div className="grid grid-cols-2 gap-4">

                        <button

                          className="py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"

                          onClick={handlePreviousStep}

                        >

                          Back

                        </button>

                        <button

                          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"

                          onClick={handleNextStep}

                        >

                          Next

                        </button>

                      </div>

                    </div>

                  )}

                  {/* Step 4: Review Order */}

                  {currentStep === 4 && (

                    <div className="max-w-2xl mx-auto">

                      <div className="bg-gray-50 rounded-lg p-6 mb-8">

                        <h3 className="text-lg font-medium mb-6">Order Summary</h3>

                        <div className="border-b border-gray-200 pb-4 mb-4">

                          <p className="text-sm text-gray-600 mb-1">Email Address</p>

                          <p className="font-medium">{userEmail}</p>

                        </div>

                        

                        <div className="border-b border-gray-200 pb-4 mb-4">

                          <p className="text-sm text-gray-600 mb-1">Assignment Title</p>

                          <p className="font-medium">{orderDetails.title}</p>

                        </div>

                        <div className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 mb-4">

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Word Count</p>

                            <p>{orderDetails.wordCount}</p>

                          </div>

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Turnaround Time</p>

                            <p>{orderDetails.turnaroundTime}</p>

                          </div>

                        </div>

                        <div className="grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 mb-4">

                          <div>

                            <p className="text-sm text-gray-600 mb-2">Uploaded Assignment</p>

                            {uploadedFiles.assignment ? (

                              <div className="flex items-center">

                                <FileText size={20} className="text-blue-500 mr-2" />

                                <div>

                                  <p className="font-medium">{uploadedFiles.assignment.name}</p>

                                  <p className="text-xs text-gray-600">{uploadedFiles.assignment.size}</p>

                                </div>

                              </div>

                            ) : assignmentText ? (

                              <p className="text-gray-700 bg-white p-2 rounded border text-sm">

                                {assignmentText.substring(0, 100)}

                                {assignmentText.length > 100 && "..."}

                              </p>

                            ) : (

                              <p className="text-gray-400">No assignment provided</p>

                            )}

                          </div>

                          <div>

                            <p className="text-sm text-gray-600 mb-2">Instructions Document</p>

                            {uploadedFiles.instructions ? (

                              <div className="flex items-center">

                                <FileText size={20} className="text-blue-500 mr-2" />

                                <div>

                                  <p className="font-medium">{uploadedFiles.instructions.name}</p>

                                  <p className="text-xs text-gray-600">{uploadedFiles.instructions.size}</p>

                                </div>

                              </div>

                            ) : instructionsText ? (

                              <p className="text-gray-700 bg-white p-2 rounded border text-sm">

                                {instructionsText.substring(0, 100)}

                                {instructionsText.length > 100 && "..."}

                              </p>

                            ) : (

                              <p className="text-gray-400">No instructions provided</p>

                            )}

                          </div>

                          {uploadedFiles.additional.length > 0 && (

                            <div>

                              <p className="text-sm text-gray-600 mb-2">Additional Files</p>

                              <div className="space-y-2">

                                {uploadedFiles.additional.map((file, index) => (

                                  <div key={index} className="flex items-center">

                                    <FileText size={20} className="text-blue-500 mr-2" />

                                    <div>

                                      <p className="font-medium">{file.name}</p>

                                      <p className="text-xs text-gray-600">{file.size}</p>

                                    </div>

                                  </div>

                                ))}

                              </div>

                            </div>

                          )}

                        </div>

                        <div className="flex justify-between items-center pt-4">

                          <p className="font-medium">Total Amount</p>

                          <p className="text-xl font-bold">{orderDetails.totalAmount}</p>

                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-4">

                        <button

                          className="py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"

                          onClick={handlePreviousStep}

                        >

                          Back

                        </button>

                        <button

                          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center disabled:opacity-50"

                          onClick={handleOrderSubmit}

                          disabled={isSubmitting}

                        >

                          {isSubmitting ? (

                            <>

                              <Loader2 size={20} className="mr-2 animate-spin" />

                              Processing...

                            </>

                          ) : (

                            "Order"

                          )}

                        </button>

                      </div>

                    </div>

                  )}

                  {/* Step 5: Make Payment */}

                  {currentStep === 5 && (

                    <div className="max-w-2xl mx-auto">

                      <div className="flex flex-wrap justify-center gap-4 mb-8">

                        {paymentMethods.map((method) => (

                          <div

                            key={method.id}

                            onClick={() => handlePaymentMethodSelect(method.id)}

                            className={`flex items-center justify-center w-20 h-12 border rounded-lg p-2 cursor-pointer ${

                              selectedPaymentMethod === method.id

                                ? "border-blue-500 bg-blue-50 shadow-md"

                                : "border-gray-300 hover:border-gray-400"

                            }`}

                          >

                            <div className="flex items-center">

                              <CreditCard size={16} className="mr-1" />

                              <span className="text-xs font-medium">{method.name}</span>

                            </div>

                          </div>

                        ))}

                      </div>

                      <div className="flex justify-end mb-8">

                        <div className="text-right">

                          <p className="text-sm text-gray-600">Total Payable:</p>

                          <p className="text-2xl font-bold text-blue-500">{orderDetails.totalAmount}</p>

                        </div>

                      </div>

                      <div className="space-y-6">

                        <div>

                          <label className="block text-sm font-medium mb-2">Name on Card</label>

                          <input

                            type="text"

                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            placeholder="Enter name"

                            value={paymentDetails.cardName}

                            onChange={(e) => handlePaymentInput("cardName", e.target.value)}

                          />

                        </div>

                        <div>

                          <label className="block text-sm font-medium mb-2">Card Number</label>

                          <input

                            type="text"

                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                            placeholder="2356-4589-7890"

                            value={paymentDetails.cardNumber}

                            onChange={(e) => handlePaymentInput("cardNumber", e.target.value)}

                          />

                        </div>

                        <div className="grid grid-cols-2 gap-4">

                          <div>

                            <label className="block text-sm font-medium mb-2">Expiry Date</label>

                            <input

                              type="text"

                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                              placeholder="11/20"

                              value={paymentDetails.expiryDate}

                              onChange={(e) => handlePaymentInput("expiryDate", e.target.value)}

                            />

                          </div>

                          <div>

                            <label className="block text-sm font-medium mb-2">CVV Code</label>

                            <input

                              type="text"

                              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                              placeholder="1234"

                              value={paymentDetails.cvv}

                              onChange={(e) => handlePaymentInput("cvv", e.target.value)}

                            />

                          </div>

                        </div>

                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-8">

                        <button

                          className="py-3 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"

                          onClick={handlePreviousStep}

                        >

                          Back

                        </button>

                        <button

                          className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"

                          onClick={handlePaymentSubmit}

                        >

                          Pay Now

                        </button>

                      </div>

                    </div>

                  )}

                </div>

              ) : activeTab === "submitted" ? (

                // Submitted Orders List

                <div className="space-y-4">

                  {isLoadingOrders ? (

                    <div className="bg-white rounded-lg p-10 text-center">

                      <Loader2 size={40} className="mx-auto mb-4 text-blue-500 animate-spin" />

                      <p className="text-gray-600">Loading your submitted orders...</p>

                    </div>

                  ) : submittedOrders.length === 0 ? (

                    <div className="bg-white rounded-lg p-10 text-center">

                      <p className="text-gray-600 mb-4">You don't have any submitted orders yet.</p>

                      <button

                        onClick={() => setActiveTab("new")}

                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"

                      >

                        Create New Order

                      </button>

                    </div>

                  ) : (

                    submittedOrders.map((order) => (

                      <div

                        key={order.id}

                        className={`bg-white rounded-lg border p-6 cursor-pointer transition-all hover:shadow-md ${

                          selectedOrder?.id === order.id ? "border-blue-500 shadow-md" : "border-gray-200"

                        }`}

                        onClick={() => handleOrderSelect(order)}

                      >

                        <div className="mb-2">

                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">

                            {order.status}

                          </span>

                          <h3 className="text-xl font-medium">{order.title}</h3>

                        </div>

                        <div className="flex items-center text-gray-600 mb-4">

                          <Calendar size={16} className="mr-2" />

                          <span className="text-sm">{order.date}</span>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Word Count</p>

                            <p>{order.wordCount}</p>

                          </div>

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Turnaround Time</p>

                            <p>{order.turnaroundTime}</p>

                          </div>

                        </div>

                      </div>

                    ))

                  )}

                </div>

              ) : (

                // Completed Orders List

                <div className="space-y-4">

                  {completedOrders.length === 0 ? (

                    <div className="bg-white rounded-lg p-10 text-center">

                      <p className="text-gray-600 mb-4">You don't have any completed orders yet.</p>

                      <button

                        onClick={() => setActiveTab("new")}

                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"

                      >

                        Create New Order

                      </button>

                    </div>

                  ) : (

                    completedOrders.map((order) => (

                      <div

                        key={order.id}

                        className={`bg-white rounded-lg border p-6 cursor-pointer transition-all hover:shadow-md ${

                          selectedOrder?.id === order.id ? "border-blue-500 shadow-md" : "border-gray-200"

                        }`}

                        onClick={() => handleOrderSelect(order)}

                      >

                        <div className="mb-2">

                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mb-2">

                            Completed

                          </span>

                          <h3 className="text-xl font-medium">{order.title}</h3>

                        </div>

                        <div className="flex items-center text-gray-600 mb-4">

                          <Calendar size={16} className="mr-2" />

                          <span className="text-sm">{order.date}</span>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Word Count</p>

                            <p>{order.wordCount}</p>

                          </div>

                          <div>

                            <p className="text-sm text-gray-600 mb-1">Turnaround Time</p>

                            <p>{order.turnaroundTime}</p>

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

      </div>

      {/* Success Popup */}

      {showSuccessPopup && (

        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white rounded-lg p-8 text-center max-w-md">

            <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />

            <h2 className="text-2xl font-semibold mb-2">Order Created Successfully!</h2>

            <p className="text-gray-600 mb-6">

              Your order has been submitted successfully. Click the button below to complete your payment.

            </p>

            <div className="flex gap-3 justify-center">

              <button

                onClick={() => {

                  if (checkoutUrl) {

                    window.open(checkoutUrl, '_blank');

                    setShowSuccessPopup(false);

                  } else {

                    toast.error("Payment link not available");

                  }

                }}

                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"

                disabled={!checkoutUrl}

              >

                Complete Payment

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
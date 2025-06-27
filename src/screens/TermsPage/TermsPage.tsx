import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Header } from "../../components/ui/header";
import { Input } from "../../components/ui/input";
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
  // Navigation handlers for Header component
  const handleAboutClick = () => navigate('/about');
  const handlePricingClick = () => navigate('/pricing');
  const handleBlogsClick = () => navigate('/blogs');
export const TermsPage = (): JSX.Element => {
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
            <span className="text-gray-600">Terms & Conditions</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            <strong>Last Updated:</strong> March 30, 2025
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            Welcome to My Study Pal! These Terms and Conditions ("Terms") govern your use of our web application, tools, and services ("Service"). By accessing or using My Study Pal, you agree to be legally bound by these Terms. If you do not agree, please do not use our Service.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">1. Who We Are</h2>
            <p className="text-gray-600 mb-4">
              My Study Pal is owned and operated by Provedor Global Limited, headquartered in Lagos, Nigeria. Our platform provides AI-powered academic tools to students and educators to support learning, writing, and studying.
            </p>
            <p className="text-gray-600">
              <strong>Contact Us:</strong><br />
              Email: info@mystudypal.com
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">2. Acceptance of These Terms</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Binding Agreement</h3>
            <p className="text-gray-600 mb-4">
              By creating an account, accessing, or using the Service, you acknowledge that you have read, understood, and agree to be bound by these Terms and any additional policies referenced herein (including our Privacy Policy).
            </p>
            <h3 className="text-xl font-semibold mb-3">2.2 Updates to Terms</h3>
            <p className="text-gray-600">
              We reserve the right to modify or update these Terms at any time. Material changes will be communicated via email or through a prominent notice on our website. Your continued use of the Service after any such modifications constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">3. Eligibility</h2>
            <h3 className="text-xl font-semibold mb-3">3.1 Age Requirements</h3>
            <p className="text-gray-600 mb-4">
              To use the Service, you must be at least 16 years old or have explicit consent from a parent or legal guardian. By using the Service, you warrant that you meet this requirement.
            </p>
            <h3 className="text-xl font-semibold mb-3">3.2 User Restrictions</h3>
            <p className="text-gray-600">
              If you are using the Service on behalf of a company, institution, or organization, you represent and warrant that you have the authority to bind that entity to these Terms. If you do not have such authority, you may not use the Service on behalf of that entity.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">4. Description of Service</h2>
            <h3 className="text-xl font-semibold mb-3">4.1 Available Tools</h3>
            <p className="text-gray-600 mb-4">
              My Study Pal offers features including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>AI Feedback Tool</li>
              <li>Paraphrasing Assistant</li>
              <li>Summarizer</li>
              <li>Outline Generator</li>
              <li>Grammar Checker</li>
              <li>Text-to-Speech Converter</li>
              <li>Interactive AI Teacher</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.2 Purpose</h3>
            <p className="text-gray-600 mb-4">
              These tools are designed to assist with academic tasks. They are not a substitute for teacher instruction, professional tutoring, or institutional guidelines. By using these tools, you acknowledge that you remain responsible for adhering to your school or organization's academic integrity rules.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.3 Usage Limitations</h3>
            <p className="text-gray-600">
              My Study Pal may impose limits on the number of requests, document sizes, or usage frequency. These limits may vary based on your subscription plan or general system constraints.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">5. Account Registration</h2>
            <h3 className="text-xl font-semibold mb-3">5.1 User Obligations</h3>
            <p className="text-gray-600 mb-4">
              To access the majority of features, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Provide accurate and complete information during sign-up.</li>
              <li>Maintain the confidentiality of your login credentials.</li>
              <li>Notify us immediately of any unauthorized access or breach of your account.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">5.2 Account Responsibility</h3>
            <p className="text-gray-600 mb-4">
              You are solely responsible for all activities that occur under your account. My Study Pal is not liable for any losses or damages resulting from unauthorized use of your account.
            </p>

            <h3 className="text-xl font-semibold mb-3">5.3 Account Suspension or Termination</h3>
            <p className="text-gray-600">
              We reserve the right to suspend or terminate your account if we suspect any violation of these Terms or fraudulent activity. Such measures may be taken without prior notice if necessary to protect our platform or users.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">6. Subscription and Payment</h2>
            <h3 className="text-xl font-semibold mb-3">6.1 Free, Basic, and Premium Plans</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>Free Plan:</strong> 7-day trial with limited access to certain features.</li>
              <li><strong>Basic & Premium Plans:</strong> Monthly or annual billing options, offering additional features, higher usage limits, or priority support.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.2 Payment Processing</h3>
            <p className="text-gray-600 mb-4">
              All payments are processed securely via third-party payment gateways. By providing payment information, you authorize My Study Pal and its agents to charge you for the applicable fees.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.3 Automatic Renewals</h3>
            <p className="text-gray-600 mb-4">
              Subscriptions automatically renew at the end of each billing cycle unless canceled. You can manage or cancel your subscription at any time via your dashboard or by contacting Customer Support.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.4 Refunds</h3>
            <p className="text-gray-600 mb-4">
              Refund requests are handled per our Refund Policy, which may allow for partial or full refunds in certain circumstances. The availability of refunds depends on factors such as how much of the Service was used and compliance with these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.5 Taxes</h3>
            <p className="text-gray-600">
              You are responsible for paying all applicable taxes, levies, or duties imposed by governmental authorities. We reserve the right to collect such taxes where required by law.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">7. License and Access</h2>
            <h3 className="text-xl font-semibold mb-3">7.1 Limited License</h3>
            <p className="text-gray-600 mb-4">
              We grant you a personal, non-exclusive, non-transferable, revocable license to access and use My Study Pal for non-commercial, academic, or personal study-related purposes in accordance with these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-3">7.2 Prohibited Actions</h3>
            <p className="text-gray-600 mb-4">You may not:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Reverse engineer or decompile any part of the platform.</li>
              <li>Distribute, resell, or lease the Service or any part thereof.</li>
              <li>Circumvent any technical measures or security features.</li>
              <li>Use the Service to violate academic integrity, plagiarize, or facilitate unlawful activities.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.3 No Implicit Rights</h3>
            <p className="text-gray-600">
              All rights not expressly granted in these Terms are reserved by My Study Pal. You acquire no ownership interest in the Service, its technology, or any intellectual property by using the platform.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">8. User Content</h2>
            <h3 className="text-xl font-semibold mb-3">8.1 Your Content</h3>
            <p className="text-gray-600 mb-4">
              Any documents, text, images, or other materials ("User Content") you upload remain your property. By submitting such content, you grant My Study Pal a limited, non-exclusive, worldwide, royalty-free license to process, analyze, store, and reproduce User Content solely for the purpose of providing the Service (e.g., generating feedback or summaries).
            </p>

            <h3 className="text-xl font-semibold mb-3">8.2 Content Responsibility</h3>
            <p className="text-gray-600 mb-4">
              You are responsible for the legality, reliability, and appropriateness of the User Content you submit. My Study Pal disclaims all liability for any claims related to your User Content.
            </p>

            <h3 className="text-xl font-semibold mb-3">8.3 Content Storage and Deletion</h3>
            <p className="text-gray-600">
              We reserve the right (but have no obligation) to remove or delete any User Content that violates these Terms or is otherwise objectionable. Upon account termination or cancellation, we may delete your User Content from our servers; however, some residual copies may remain in our backups or archival systems.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">9. Academic Integrity</h2>
            <h3 className="text-xl font-semibold mb-3">9.1 Ethical Usage</h3>
            <p className="text-gray-600 mb-4">
              My Study Pal is meant to supplement your educational efforts. You agree to use the platform ethically, respecting your institution's rules against plagiarism, cheating, or unauthorized collaboration.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.2 No Guarantee of Academic Outcomes</h3>
            <p className="text-gray-600 mb-4">
              We do not guarantee that the use of our AI tools will result in improved grades, academic success, or compliance with any institutional guidelines.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.3 User Responsibility</h3>
            <p className="text-gray-600">
              You remain solely responsible for how you integrate outputs generated by My Study Pal into your academic work. Misuse of the Service in violation of institutional policies may lead to disciplinary actions by your educational institution.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">10. Prohibited Conduct</h2>
            <h3 className="text-xl font-semibold mb-3">10.1 Illegal or Harmful Activities</h3>
            <p className="text-gray-600 mb-4">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Upload or transmit any content that is unlawful, defamatory, harassing, violent, obscene, or otherwise objectionable.</li>
              <li>Use any malware, bots, or other technology to disrupt or harm the Service, its users, or My Study Pal systems.</li>
              <li>Engage in phishing, spamming, or other deceptive practices.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">10.2 System Abuse</h3>
            <p className="text-gray-600 mb-4">You must not attempt to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Gain unauthorized access to any servers, databases, or systems.</li>
              <li>Overload or disrupt the Service through denial-of-service attacks or excessive usage beyond defined limits.</li>
              <li>Collect or harvest information about other users without their consent.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">10.3 Consequences of Violations</h3>
            <p className="text-gray-600">
              Any breach of this section may lead to immediate suspension or termination of your account, legal actions, and possible reporting to law enforcement where required.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">11. Intellectual Property</h2>
            <h3 className="text-xl font-semibold mb-3">11.1 Ownership</h3>
            <p className="text-gray-600 mb-4">
              All content, text, graphics, logos, user interfaces, trademarks, trade names, and software ("IP") on or associated with My Study Pal are the sole property of My Study Pal or its licensors.
            </p>

            <h3 className="text-xl font-semibold mb-3">11.2 Restrictions</h3>
            <p className="text-gray-600 mb-4">
              You may not copy, modify, reproduce, create derivative works, sell, or distribute our IP without our prior written consent.
            </p>

            <h3 className="text-xl font-semibold mb-3">11.3 Feedback</h3>
            <p className="text-gray-600">
              Any feedback, comments, or suggestions you provide regarding the Service may be used by My Study Pal without restriction or obligation to you, even after termination of your account.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">12. Third-Party Services</h2>
            <h3 className="text-xl font-semibold mb-3">12.1 Integrations</h3>
            <p className="text-gray-600 mb-4">
              My Study Pal may integrate with third-party services (e.g., payment processors, analytics providers, and text-to-speech APIs). Your use of these integrated services may be subject to additional terms and privacy policies.
            </p>

            <h3 className="text-xl font-semibold mb-3">12.2 No Endorsement</h3>
            <p className="text-gray-600">
              My Study Pal is not responsible for the practices, security, or functionality of any third-party websites or services. You acknowledge that any reliance on such third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">13. Privacy</h2>
            <h3 className="text-xl font-semibold mb-3">13.1 Data Practices</h3>
            <p className="text-gray-600 mb-4">
              Our Privacy Policy describes how we collect, use, and store your personal information. By using the Service, you consent to our data practices.
            </p>

            <h3 className="text-xl font-semibold mb-3">13.2 Cookies and Tracking</h3>
            <p className="text-gray-600 mb-4">
              We may use cookies, pixels, or similar technologies to analyze usage, improve user experience, and for authentication. You can manage cookie preferences through your browser settings.
            </p>

            <h3 className="text-xl font-semibold mb-3">13.3 Data Security</h3>
            <p className="text-gray-600">
              While we employ commercially reasonable security measures, no online system is completely secure. You agree that you submit information at your own risk, and My Study Pal is not responsible for unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">14. AI-Specific Disclaimers</h2>
            <h3 className="text-xl font-semibold mb-3">14.1 Nature of AI Outputs</h3>
            <p className="text-gray-600 mb-4">
              Our AI tools generate responses based on patterns from training data and user inputs. Outputs may be inaccurate, incomplete, or biased. You are responsible for verifying the accuracy and suitability of AI-generated content before using it in academic or professional contexts.
            </p>

            <h3 className="text-xl font-semibold mb-3">14.2 No Professional Advice</h3>
            <p className="text-gray-600 mb-4">
              The AI-generated responses do not constitute legal, medical, financial, or any other professional advice. You should consult a qualified professional where appropriate.
            </p>

            <h3 className="text-xl font-semibold mb-3">14.3 User Monitoring</h3>
            <p className="text-gray-600">
              My Study Pal does not actively monitor every AI response. If you encounter inappropriate, harmful, or illegal content generated by the AI, please contact support immediately.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">15. Disclaimers</h2>
            <h3 className="text-xl font-semibold mb-3">15.1 "As Is" Basis</h3>
            <p className="text-gray-600 mb-4">
              The Service is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied.
            </p>

            <h3 className="text-xl font-semibold mb-3">15.2 No Warranty</h3>
            <p className="text-gray-600 mb-4">We do not guarantee that:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>The Service will meet your specific needs.</li>
              <li>The Service will be uninterrupted, timely, secure, or error-free.</li>
              <li>The information or output generated by our AI tools is complete, accurate, or reliable.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">15.3 Use at Your Own Risk</h3>
            <p className="text-gray-600">
              You acknowledge and agree that any reliance on the Service or its outputs is at your own risk. My Study Pal is not liable for academic or other outcomes resulting from your use or misuse of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">16. Limitation of Liability</h2>
            <h3 className="text-xl font-semibold mb-3">16.1 Maximum Liability</h3>
            <p className="text-gray-600 mb-4">
              To the extent permitted by law, in no event shall My Study Pal, its affiliates, employees, agents, or licensors be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Indirect, incidental, or consequential damages, including loss of data, revenues, or profits.</li>
              <li>Academic penalties or institutional disciplinary actions arising from misuse of the Service.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">16.2 Aggregate Liability</h3>
            <p className="text-gray-600">
              My Study Pal's total liability to you for any claims arising out of or in connection with the Service shall not exceed the total amount you paid (if any) for the Service in the twelve (12) months preceding the event giving rise to liability.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">17. Indemnification</h2>
            <h3 className="text-xl font-semibold mb-3">17.1 Your Obligation to Indemnify</h3>
            <p className="text-gray-600 mb-4">
              You agree to defend, indemnify, and hold harmless My Study Pal, its affiliates, and employees from and against any and all claims, liabilities, damages, losses, costs, and expenses (including legal fees) arising out of or in any way connected with:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Your use of the Service or content generated by the Service.</li>
              <li>Your User Content or any information submitted.</li>
              <li>Your violation of these Terms or applicable law.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">18. Governing Law and Dispute Resolution</h2>
            <h3 className="text-xl font-semibold mb-3">18.1 Governing Law</h3>
            <p className="text-gray-600 mb-4">
              These Terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
            </p>

            <h3 className="text-xl font-semibold mb-3">18.2 Jurisdiction</h3>
            <p className="text-gray-600 mb-4">
              You agree that any legal action or proceeding arising out of or related to these Terms shall be brought exclusively in the courts located in Nigeria, and you consent to the exercise of personal jurisdiction in such courts.
            </p>

            <h3 className="text-xl font-semibold mb-3">18.3 Informal Resolution</h3>
            <p className="text-gray-600">
              Before filing any formal dispute, you agree to contact us at info@mystudypal.com to attempt an informal resolution. We will do our best to address and resolve your concerns quickly and efficiently.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">19. Termination</h2>
            <h3 className="text-xl font-semibold mb-3">19.1 User Termination</h3>
            <p className="text-gray-600 mb-4">
              You may terminate your account at any time by contacting support or through the account dashboard. Any pre-paid fees are subject to our Refund Policy.
            </p>

            <h3 className="text-xl font-semibold mb-3">19.2 Termination by My Study Pal</h3>
            <p className="text-gray-600 mb-4">
              We may suspend or terminate your access to the Service immediately, with or without notice, if we believe you are in breach of these Terms or applicable laws.
            </p>

            <h3 className="text-xl font-semibold mb-3">19.3 Effect of Termination</h3>
            <p className="text-gray-600">
              Upon termination, the limited license granted to you in these Terms ends immediately. We may delete or retain your User Content at our discretion, subject to applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">20. Miscellaneous</h2>
            <h3 className="text-xl font-semibold mb-3">20.1 Entire Agreement</h3>
            <p className="text-gray-600 mb-4">
              These Terms, along with our Privacy Policy and any other documents referenced herein, constitute the entire agreement between you and My Study Pal regarding the Service. They supersede any prior agreements or understandings, whether written or oral.
            </p>

            <h3 className="text-xl font-semibold mb-3">20.2 Severability</h3>
            <p className="text-gray-600 mb-4">
              If any provision of these Terms is held to be invalid or unenforceable, that provision shall be interpreted to fulfill its intended purpose to the greatest extent permitted by law, and the remaining provisions remain in full force and effect.
            </p>

            <h3 className="text-xl font-semibold mb-3">20.3 No Waiver</h3>
            <p className="text-gray-600 mb-4">
              My Study Pal's failure to enforce any right or provision in these Terms does not constitute a waiver of such right or provision unless acknowledged and agreed to by us in writing.
            </p>

            <h3 className="text-xl font-semibold mb-3">20.4 Assignment</h3>
            <p className="text-gray-600">
              You may not assign or transfer these Terms or your rights or obligations hereunder without our prior written consent. We may assign or transfer these Terms without restriction or notice to you.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">21. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions, concerns, or feedback regarding these Terms, please contact us:
            </p>
            <p className="text-gray-600">
              <strong>Email:</strong> info@mystudypal.com
            </p>
          </section>
        </div>
      </div>

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
                <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
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
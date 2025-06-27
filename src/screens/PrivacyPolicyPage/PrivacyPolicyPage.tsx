import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Header } from "../../components/ui/header";
const logowhite = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/2.png'
const logoblack = 'https://raw.githubusercontent.com/Etherlabs-dev/studypalassets/refs/heads/main/1.png'
  // Navigation handlers for Header component
  const handleAboutClick = () => navigate('/about');
  const handlePricingClick = () => navigate('/pricing');
  const handleBlogsClick = () => navigate('/blogs');
export const PrivacyPolicyPage = (): JSX.Element => {
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
            <span className="text-gray-600">Privacy Policy</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            My Study Pal ("we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, store, and share your personal data when you access or use our web application ("Service") at www.mystudypal.com. We comply with global data protection regulations including, but not limited to, the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), UK GDPR, and other applicable data protection laws worldwide.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <section>
            <h2 className="text-3xl font-bold mb-6">1. Who We Are</h2>
            <p className="text-gray-600 mb-4">
              My Study Pal is owned and operated by Provedor Global Limited, headquartered in Lagos, Nigeria. Under applicable data protection laws, Provedor Global Limited is the Data Controller of your personal information.
            </p>
            <p className="text-gray-600 mb-4">
              Email: info@mystudypal.com
            </p>
            <p className="text-gray-600">
              If you have any questions or concerns regarding our data practices, please reach out to us at the above email address.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">2. Scope and Definitions</h2>
            <h3 className="text-xl font-semibold mb-3">2.1 Scope</h3>
            <p className="text-gray-600 mb-4">
              This Privacy Policy applies to all visitors, registered users, and subscribers who access or use our Service. By using the Service, you acknowledge that you have read and understood the practices described herein.
            </p>
            <h3 className="text-xl font-semibold mb-3">2.2 Personal Data</h3>
            <p className="text-gray-600 mb-4">
              "Personal Data" means any information relating to an identified or identifiable individual, such as name, email address, or any other data that can be linked to you.
            </p>
            <h3 className="text-xl font-semibold mb-3">2.3 Service</h3>
            <p className="text-gray-600">
              The term "Service" refers to our web application, features, and tools made available at www.mystudypal.com or any other domain or subdomain we operate.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">3. Data We Collect</h2>
            <p className="text-gray-600 mb-6">We collect different types of data depending on how you interact with our platform:</p>
            
            <h3 className="text-xl font-semibold mb-3">3.1 Information You Provide Voluntarily</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>Full Name:</strong> Used for account creation and personalization.</li>
              <li><strong>Email Address:</strong> Used for login credentials, account verification, and notifications.</li>
              <li><strong>Academic Profile:</strong> May include your academic level, subject preferences, or study goals to tailor study recommendations and user experience.</li>
              <li><strong>Uploaded Documents:</strong> Such as essays, notes, or assignments used by our AI tools (e.g., for paraphrasing, summarizing).</li>
              <li><strong>Feedback and Survey Responses:</strong> Information you provide in user surveys, feedback forms, or support tickets.</li>
              <li><strong>Support Communications:</strong> Messages or attachments you send to our support team.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.2 Automatically Collected Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>IP Address:</strong> For location estimates, security monitoring, and analytics.</li>
              <li><strong>Browser Type and Operating System:</strong> Helps us optimize user experience and troubleshoot compatibility issues.</li>
              <li><strong>Device Identifiers and Settings:</strong> Includes unique device IDs and configurations for mobile or desktop.</li>
              <li><strong>Log Data:</strong> Pages viewed, features used, timestamps, and referral/exiting URLs to understand usage patterns.</li>
              <li><strong>Language Preferences:</strong> For localized content and interface settings.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.3 Payment and Subscription Data</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>Billing Information:</strong> Collected and processed by our secure third-party payment processors (e.g., Stripe, PayPal). We do not store your full payment card details on our servers.</li>
              <li><strong>Subscription Details:</strong> Plan type, subscription status, renewal date.</li>
              <li><strong>Transaction ID and Payment Method:</strong> For record-keeping, tax, and audit purposes.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">3.4 Cookies and Tracking Technologies</h3>
            <p className="text-gray-600">
              We use cookies, web beacons, pixels, and similar tracking technologies to analyze user behavior and session data for analytics, personalization, and marketing. For more details, refer to Section 7 (Cookies and Similar Technologies).
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">4. How We Use Your Data</h2>
            <p className="text-gray-600 mb-6">We use your personal data for the following purposes:</p>

            <h3 className="text-xl font-semibold mb-3">4.1 Account Registration and Authentication</h3>
            <p className="text-gray-600 mb-4">
              To register your account, verify your identity, and manage your login credentials.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.2 Provision of Services</h3>
            <p className="text-gray-600 mb-4">
              To deliver the functionalities of our AI-powered tools (e.g., paraphrasing, summarizing, feedback). This may involve processing your uploaded documents and user inputs.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.3 Subscription Management and Payments</h3>
            <p className="text-gray-600 mb-4">
              To process your payments, handle billing inquiries, and manage your subscription status (upgrades, downgrades, renewals).
            </p>

            <h3 className="text-xl font-semibold mb-3">4.4 Communication</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li><strong>Service-Related Notifications:</strong> Account updates, subscription reminders, critical alerts.</li>
              <li><strong>Marketing Communications:</strong> Promotions, offers, newsletters. You can opt out at any time.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">4.5 Personalization and Recommendations</h3>
            <p className="text-gray-600 mb-4">
              To tailor content, study suggestions, or AI outputs based on your academic profile and preferences.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.6 Analytics and Platform Improvement</h3>
            <p className="text-gray-600 mb-4">
              To analyze usage trends, user behavior, and feature performance. This helps us refine our AI models, improve platform design, and optimize the user experience.
            </p>

            <h3 className="text-xl font-semibold mb-3">4.7 Legal Compliance</h3>
            <p className="text-gray-600 mb-4">
              To comply with applicable laws, regulations, and legal processes (e.g., tax laws, subpoenas, court orders).
            </p>

            <h3 className="text-xl font-semibold mb-3">4.8 Fraud Detection and Security</h3>
            <p className="text-gray-600">
              To protect the integrity of our platform, safeguard user accounts, detect malicious or fraudulent activity, and respond to security incidents.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">5. Legal Bases for Processing (GDPR Compliance)</h2>
            <p className="text-gray-600 mb-4">Under the GDPR, we rely on the following lawful bases to process your Personal Data:</p>
            <ul className="list-disc pl-6 space-y-3 text-gray-600">
              <li><strong>Consent (Article 6(1)(a)):</strong> For sending marketing communications or using certain optional cookies, we obtain your explicit consent.</li>
              <li><strong>Contractual Necessity (Article 6(1)(b)):</strong> We process your data to fulfill our contractual obligations (e.g., delivering subscribed services).</li>
              <li><strong>Legitimate Interests (Article 6(1)(f)):</strong> We process data to improve our Service, provide customer support, conduct analytics, and ensure security, in ways that do not override your fundamental rights.</li>
              <li><strong>Legal Obligation (Article 6(1)(c)):</strong> We process data to meet applicable legal requirements (e.g., financial record-keeping, responding to lawful requests).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">6. Sharing Your Information</h2>
            <h3 className="text-xl font-semibold mb-3">6.1 Service Providers</h3>
            <p className="text-gray-600 mb-4">
              We may share your personal data with trusted third-party vendors who perform tasks on our behalf:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li>Hosting and Cloud Storage Providers: For secure data storage and access.</li>
              <li>Customer Support Platforms: To track and respond to your inquiries efficiently.</li>
              <li>Analytics Tools: To collect usage statistics and performance metrics.</li>
              <li>Payment Processors: To process billing information securely.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">6.2 Business Partners</h3>
            <p className="text-gray-600 mb-4">
              In cases of co-branded promotions or integrated services, we may share necessary data with our business partners. Such partners are required to adhere to data protection standards that align with ours.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.3 Legal and Regulatory</h3>
            <p className="text-gray-600 mb-4">
              We may disclose data if required to do so by law or in response to valid legal requests (e.g., subpoenas, court orders) or to protect our rights, safety, or property.
            </p>

            <h3 className="text-xl font-semibold mb-3">6.4 Corporate Transactions</h3>
            <p className="text-gray-600">
              If My Study Pal is involved in a merger, acquisition, asset sale, or bankruptcy, your personal data may be transferred as part of that transaction. We will notify you if such a change in ownership or data transfer occurs.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">7. Cookies and Similar Technologies</h2>
            <h3 className="text-xl font-semibold mb-3">7.1 Types of Cookies We Use</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>Essential Cookies:</strong> Necessary for the operation of the Service (e.g., session cookies, security tokens).</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform, e.g., Google Analytics.</li>
              <li><strong>Functional Cookies:</strong> Store user preferences, such as language settings.</li>
              <li><strong>Marketing Cookies:</strong> Used for advertising and retargeting (only used if you give consent).</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.2 Cookie Choices</h3>
            <p className="text-gray-600 mb-4">You can manage or reject non-essential cookies through:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
              <li><strong>Cookie Consent Banner:</strong> Presented when you first visit our site.</li>
              <li><strong>Browser Settings:</strong> Adjust your cookie preferences or block them entirely. Please note that blocking cookies may affect some functionalities of the Service.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">7.3 Other Tracking Technologies</h3>
            <p className="text-gray-600">
              We may use web beacons, pixels, and device fingerprints to track user engagement. These technologies allow us to measure the effectiveness of our marketing campaigns and understand user flows.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">8. Data Retention Policy</h2>
            <p className="text-gray-600 mb-4">
              We retain your personal data only for as long as it is necessary to fulfill the purposes outlined in this Privacy Policy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li><strong>Account Data:</strong> Retained until you delete your account or after an inactivity period of 24 months.</li>
              <li><strong>Uploaded Documents:</strong> Retained for a maximum of 12 months or until you manually delete them.</li>
              <li><strong>Payment Records:</strong> Retained for 7 years (or longer if required by tax laws) for financial compliance.</li>
              <li><strong>Cookies:</strong> Stored based on their type and your browser settings, generally up to 13 months for analytics or marketing cookies.</li>
            </ul>
            <p className="text-gray-600">
              We securely delete or anonymize data once it is no longer required for legitimate business or legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">9. Your Data Rights</h2>
            <p className="text-gray-600 mb-6">Depending on your location and applicable laws, you may have the following rights:</p>

            <h3 className="text-xl font-semibold mb-3">9.1 Right to Access</h3>
            <p className="text-gray-600 mb-4">
              You can request a copy of the personal data we hold about you, along with information on how we process it.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.2 Right to Rectification</h3>
            <p className="text-gray-600 mb-4">
              You may ask us to correct or update any inaccurate or outdated personal data.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.3 Right to Erasure ("Right to be Forgotten")</h3>
            <p className="text-gray-600 mb-4">
              You can request the deletion of your account and any personal data we hold about you, subject to certain legal exceptions (e.g., compliance with record-keeping regulations).
            </p>

            <h3 className="text-xl font-semibold mb-3">9.4 Right to Withdraw Consent</h3>
            <p className="text-gray-600 mb-4">
              If we rely on your consent to process certain data (e.g., marketing, non-essential cookies), you can withdraw that consent at any time.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.5 Right to Object</h3>
            <p className="text-gray-600 mb-4">
              You can object to the processing of your personal data for direct marketing or where we rely on legitimate interests.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.6 Right to Restrict Processing</h3>
            <p className="text-gray-600 mb-4">
              You can ask us to restrict the processing of your personal data under certain circumstances (e.g., if you contest the data's accuracy).
            </p>

            <h3 className="text-xl font-semibold mb-3">9.7 Right to Data Portability</h3>
            <p className="text-gray-600 mb-4">
              Where applicable, you can request a copy of your data in a structured, commonly used, and machine-readable format.
            </p>

            <h3 className="text-xl font-semibold mb-3">9.8 Right to Lodge a Complaint</h3>
            <p className="text-gray-600 mb-4">
              If you believe we have infringed upon your data protection rights, you can file a complaint with a relevant supervisory authority (e.g., in the EU, the local Data Protection Authority).
            </p>
            <p className="text-gray-600">
              To exercise any of the above rights, please contact us at privacy@mystudypal.com. We will respond to your request within the timeframe required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">10. International Data Transfers</h2>
            <p className="text-gray-600 mb-4">
              We may transfer your personal data to servers or service providers located in countries outside your own, including those outside the European Economic Area (EEA). When we do so, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission.</li>
              <li>Data Processing Agreements with third parties that include robust data protection obligations.</li>
              <li>Regular Security Audits and Compliance Checks to ensure ongoing adherence to data protection standards.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">11. Children's Privacy</h2>
            <p className="text-gray-600">
              My Study Pal is not intended for use by individuals under 16 years of age. We do not knowingly collect or solicit personal data from children. If we become aware that we have collected personal data from a child under 16 without verified parental or guardian consent, we will take steps to delete that information promptly. If you believe we may have collected data from a minor, please contact us immediately at info@mystudypal.com.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">12. Data Security Measures</h2>
            <p className="text-gray-600 mb-4">
              We take your privacy seriously and employ robust security measures to safeguard your data:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li><strong>TLS/SSL Encryption:</strong> Protects data in transit between your device and our servers.</li>
              <li><strong>Encrypted Data Storage:</strong> Sensitive data is stored in encrypted formats on secure servers.</li>
              <li><strong>Role-Based Access Controls:</strong> Only authorized personnel can access or process personal data.</li>
              <li><strong>Activity Monitoring:</strong> Audit logs track administrative access and modifications.</li>
              <li><strong>Security Testing:</strong> We conduct regular penetration tests and vulnerability assessments to maintain a high security standard.</li>
            </ul>
            <p className="text-gray-600">
              Despite our efforts, no online platform is entirely invulnerable. We encourage you to keep your password secure and notify us of any suspected unauthorized access to your account.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">13. Changes to This Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update or modify this Privacy Policy to reflect changes in our legal, operational, or technological environment. When we make material changes, we will:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
              <li>Update the "Last Updated" date at the top of this Privacy Policy.</li>
              <li>Notify you via email or by posting a prominent notice on our website.</li>
            </ul>
            <p className="text-gray-600">
              Your continued use of the Service after any modifications to this Privacy Policy constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-6">14. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions, concerns, or requests about how we handle your personal data, please contact us at:
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Email:</strong> info@mystudypal.com
            </p>
            <p className="text-gray-600">
              We value your trust and will do our best to address your concerns promptly.
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
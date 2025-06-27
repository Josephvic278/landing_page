import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import { CheckIcon, XIcon, Gift, Zap, Crown } from "lucide-react";

const plans = [
  {
    name: "Free Plan",
    price: "$0",
    period: "for 7 Days",
    features: [
      "10,000 Tokens",
      "Access to Core Tools:",
      "• AI Feedback Tool",
      "• Paraphrasing Tool",
      "• Outline Generator",
      "• Summarizer",
      "• Grammar Checker",
      "AI Teacher",
      { text: "Text-to-Speech", available: false },
      { text: "Discount on Expert Marking", available: false },
    ],
    cta: "Try it all — risk-free for 7 days!",
    ctaIcon: Gift,
    ctaIconColor: "text-blue-500",
    highlighted: false,
    badge: null,
  },
  {
    name: "Basic Plan",
    price: "$11.99",
    period: "/month (billed annually)",
    subPrice: "$14.99/month (monthly plan)",
    features: [
      "1,000,000 Tokens",
      "All Free Plan Features",
      "5 Hours of Text-to-Speech",
      "5% Discount on Expert Marking",
    ],
    cta: "Great for regular users who want more power and flexibility",
    ctaIcon: Zap,
    ctaIconColor: "text-yellow-500",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "Premium Plan",
    price: "$14.99",
    period: "/month (billed annually)",
    subPrice: "$19.99/month (monthly plan)",
    features: [
      "3,000,000 Tokens",
      "All Basic Plan Features",
      "10 Hours of Text-to-Speech",
      "10% Discount on Expert Marking",
    ],
    cta: "Perfect for power users, final-year students, and academic overachievers",
    ctaIcon: Crown,
    ctaIconColor: "text-purple-500",
    highlighted: false,
    badge: null,
  },
];

export const PricingPlansSection = (): JSX.Element => {
  const renderFeature = (feature, plan, idx) => {
    // Handle object features (with available property)
    if (typeof feature === 'object') {
      return (
        <div key={idx} className="flex items-start gap-3">
          <XIcon 
            className="w-5 h-5 flex-shrink-0 text-red-500"
          />
          <span
            className={`font-montserrat ${
              plan.highlighted ? "text-white/80" : "text-gray-400"
            }`}
          >
            {feature.text}
          </span>
        </div>
      );
    }

    // Handle string features
    const isSubFeature = feature.startsWith("•");
    
    return (
      <div key={idx} className="flex items-start gap-3">
        {!isSubFeature && (
          <CheckIcon 
            className={`w-5 h-5 flex-shrink-0 ${
              plan.highlighted ? "text-white" : "text-primary-500"
            }`}
          />
        )}
        <span
          className={`font-montserrat ${
            plan.highlighted ? "text-white" : "text-gray-600"
          } ${isSubFeature ? "ml-6" : ""}`}
        >
          {feature}
        </span>
      </div>
    );
  };

  return (
    <section className="py-12 px-4 md:px-6 lg:px-[110px] font-montserrat">
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-blue-50 text-primary-500 px-4 py-2 rounded-full font-montserrat">
          Pricing
        </Badge>
        <h2 className="text-4xl font-bold text-black text-center">
          Choose the Plan That Fits Your Needs
        </h2>
        <p className="font-text-lg-font-normal mt-2 text-gray-500 text-center">
          Flexible pricing options designed to provide the best value for learners and professionals alike.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`flex flex-col relative ${
              plan.highlighted
                ? "bg-primary-500 text-white border-2 border-primary-500 shadow-xl transform hover:scale-105 transition-transform duration-300"
                : "bg-white border border-gray-200 hover:border-primary-500 hover:shadow-lg transition-all duration-300"
            } rounded-2xl overflow-hidden font-montserrat`}
          >
            {plan.badge && (
              <Badge
                className="absolute top-6 right-6 bg-white text-primary-500 font-medium font-montserrat"
              >
                {plan.badge}
              </Badge>
            )}
            <div className="flex flex-col h-full p-6 lg:p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-text-base-font-medium font-montserrat">{plan.name}</h3>
                </div>
                <div className="flex flex-col font-montserrat">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-text-base-font-medium tracking-tight">{plan.price}</span>
                    <span className="text-sm ml-1 opacity-80">{plan.period}</span>
                  </div>
                  {plan.subPrice && (
                    <div className={`text-sm mt-1 ${plan.highlighted ? "text-white/80" : "text-gray-500"}`}>
                      {plan.subPrice}
                    </div>
                  )}
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#F0F1F4] mb-8" />

              {/* Features */}
              <div className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, idx) => renderFeature(feature, plan, idx))}
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full h-11 font-montserrat mb-4 ${
                  plan.highlighted
                    ? "bg-white text-primary-500 hover:bg-gray-50"
                    : "bg-white text-primary-500 border-primary-500 border hover:bg-gray-50"
                }`}
              >
                Get Started
              </Button>

              {/* Small description text */}
              <div className={`flex items-center justify-center gap-1 text-xs text-center font-montserrat ${
                plan.highlighted ? "text-white/80" : "text-gray-500"
              }`}>
                <plan.ctaIcon className={`w-5 h-5 ${plan.ctaIconColor}`} />
                <p>{plan.cta}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};
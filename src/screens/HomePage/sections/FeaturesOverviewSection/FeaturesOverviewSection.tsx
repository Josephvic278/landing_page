import { CheckIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from "../../../../components/ui/card";

export const FeaturesOverviewSection = (): JSX.Element => {
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
        "❌ Text-to-Speech",
        "❌ Discount on Expert Marking",
      ],
      cta: "Try it all — risk-free for 7 days!",
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
      highlighted: false,
      badge: null,
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
      highlighted: true,
      badge: "Most Popular",
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-[60px] px-6 py-20 md:px-[110px] w-full">
      <div className="flex flex-col items-center justify-center gap-3 max-w-[500px]">
        <Badge
          variant="outline"
          className="bg-[#eff5ff] text-primary-500 rounded-full px-4 py-2.5"
        >
          Pricing
        </Badge>

        <h2 className="font-text-4xl-font-bold text-black text-center">
          Choose the Right Plan for You
        </h2>

        <p className="font-text-lg-font-normal text-gray-500 text-center">
          Flexible pricing that fits every stage of your academic journey — from curious beginner to productivity pro.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {plans.map((plan, index) => (
          <Card
            key={index}
            className={`w-full md:w-[392px] ${
              plan.highlighted
                ? "bg-primary-500 text-white border-0"
                : "bg-white border-[#edeef1]"
            } ${plan.highlighted ? "h-[612px]" : "h-[582px]"} rounded-2xl`}
          >
            <CardContent className="flex flex-col items-center justify-center gap-[60px] p-6">
              <div className="flex flex-col items-start gap-[30px] w-full">
                <div className="flex flex-col items-start gap-[15px] w-full">
                  <CardTitle
                    className={`font-text-3xl-font-semibold ${plan.highlighted ? "text-white" : "text-black"}`}
                  >
                    {plan.name}
                  </CardTitle>

                  <div className="flex flex-col w-full">
                    <div
                      className={`font-normal ${plan.highlighted ? "text-white" : "text-black"} text-xl`}
                    >
                      <span className="font-bold leading-[30px]">
                        {plan.price}
                      </span>
                      <span className="text-sm leading-[21px]">
                        {plan.period}
                      </span>
                    </div>
                    {plan.subPrice && (
                      <div className={`text-sm ${plan.highlighted ? "text-white/80" : "text-gray-500"}`}>
                        {plan.subPrice}
                      </div>
                    )}
                  </div>

                  {plan.badge && (
                    <Badge className="bg-[#eff5ff] text-primary-500 rounded-[33px] px-[17px] py-2">
                      {plan.badge}
                    </Badge>
                  )}
                </div>

                <div className="w-full h-px bg-[#edeef1]" />

                <div className="flex flex-col items-start gap-[15px] w-full">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 w-full">
                      {!feature.startsWith("❌") && !feature.startsWith("•") && (
                        <CheckIcon className={`w-5 h-5 ${plan.highlighted ? "text-white" : "text-primary-500"}`} />
                      )}
                      <span
                        className={`font-text-base-font-medium ${
                          plan.highlighted ? "text-white" : "text-gray-500"
                        } ${feature.startsWith("•") ? "ml-6" : ""}`}
                      >
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <CardFooter className="p-0 w-full">
                <Button
                  variant={plan.highlighted ? "outline" : "default"}
                  className={`w-full h-12 ${
                    plan.highlighted
                      ? "bg-white text-primary-500"
                      : "bg-primary-500 text-white"
                  }`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
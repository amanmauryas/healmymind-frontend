import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, X, ArrowRight, Sparkles, Shield, Brain, FileText } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const plans = [
    {
      name: "Basic",
      price: "Free",
      description: "Essential mental health screening",
      features: [
        { text: "Access to all screening tests", included: true },
        { text: "Basic test results and scoring", included: true },
        { text: "Simple interpretation of results", included: true },
        { text: "Limited AI-powered insights", included: true },
        { text: "Save results for 7 days", included: true },
        { text: "Comprehensive analysis report", included: false },
        { text: "Personalized recommendations", included: false },
        { text: "Trend analysis across multiple tests", included: false },
      ],
      cta: "Start Free",
      color: "blue",
      icon: <Brain className="text-blue-400" />,
    },
    {
      name: "Premium",
      price: "$9.99",
      description: "Comprehensive mental health analysis",
      features: [
        { text: "Access to all screening tests", included: true },
        { text: "Detailed test results and scoring", included: true },
        { text: "In-depth interpretation of results", included: true },
        { text: "Advanced AI-powered insights", included: true },
        { text: "Save results indefinitely", included: true },
        { text: "Comprehensive analysis report", included: true },
        { text: "Personalized recommendations", included: true },
        { text: "Trend analysis across multiple tests", included: false },
      ],
      cta: "Get Premium",
      color: "purple",
      popular: true,
      icon: <Sparkles className="text-purple-400" />,
    },
    {
      name: "Professional",
      price: "$19.99",
      description: "Complete mental health monitoring",
      features: [
        { text: "Access to all screening tests", included: true },
        { text: "Detailed test results and scoring", included: true },
        { text: "Expert interpretation of results", included: true },
        { text: "Premium AI-powered insights", included: true },
        { text: "Save results indefinitely", included: true },
        { text: "Comprehensive analysis report", included: true },
        { text: "Personalized recommendations", included: true },
        { text: "Trend analysis across multiple tests", included: true },
      ],
      cta: "Get Professional",
      color: "green",
      icon: <Shield className="text-green-400" />,
    },
  ];

  return (
    <section className="py-20 bg-gray-900" id="pricing">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Comprehensive Analysis Plans
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose the plan that best fits your mental health journey. Unlock deeper insights with our premium AI-powered analysis.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              variants={itemVariants}
              className={`bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700 hover:border-${plan.color}-500/50 transition-all duration-300 relative ${
                plan.popular ? "transform md:-translate-y-4" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 inset-x-0">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-medium py-1 text-center">
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`h-2 bg-${plan.color}-500`}></div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <div className={`bg-gray-700 p-3 rounded-lg mr-3`}>
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== "Free" && (
                      <span className="text-gray-400 ml-1">/month</span>
                    )}
                  </div>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      {feature.included ? (
                        <Check size={18} className={`text-${plan.color}-400 mt-0.5 mr-2 flex-shrink-0`} />
                      ) : (
                        <X size={18} className="text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                      )}
                      <span className={feature.included ? "text-gray-300" : "text-gray-500"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full bg-${plan.color}-600 hover:bg-${plan.color}-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center`}
                >
                  {plan.cta} <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto border border-gray-700"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="bg-purple-900/30 p-4 rounded-full">
              <FileText size={32} className="text-purple-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-white">What's in our Comprehensive Analysis?</h3>
              <p className="text-gray-300">
                Our premium AI-powered analysis goes beyond basic test results. You'll receive a detailed report with personalized insights, 
                potential connections between symptoms, tailored recommendations, and self-care strategies specific to your mental health profile.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
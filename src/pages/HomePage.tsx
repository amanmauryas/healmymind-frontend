import React, { useState } from 'react';
import TestSuggestionDialog from '../components/TestSuggestionDialog';
import { Link } from 'react-router-dom';
import { Shield, Heart, BookOpen, ArrowRight, Sparkles, Activity, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import AnimatedBrain from '../components/AnimatedBrain';
import PricingSection from '../components/PricingSection';

const HomePage: React.FC = () => {
  const [showSuggestionDialog, setShowSuggestionDialog] = useState(false);
  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [testsRef, testsInView] = useInView({
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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-hero-pattern">
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-900/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-900/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col lg:flex-row items-center justify-between gap-12"
          >
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="gradient-text">Understand Your Mind</span>
                <span className="block mt-2 text-white">Take Control of Your Mental Health</span>
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0"
              >
                Discover insights about your mental wellbeing with our scientifically-backed screening tools and AI-powered analysis.
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
              >
                <button 
                  onClick={() => setShowSuggestionDialog(true)}
                  className="btn-primary flex items-center justify-center"
                >
                  Suggest Me a Test <Bot size={18} className="ml-2" />
                </button>
                <Link 
                  to="/about" 
                  className="btn-secondary"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            
            <motion.div 
              variants={itemVariants}
              className="lg:w-1/2 flex justify-center"
            >
              <AnimatedBrain />
            </motion.div>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">500K+</div>
              <p className="text-gray-400">Tests Completed</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <p className="text-gray-400">User Satisfaction</p>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center"
            >
              <div className="text-3xl font-bold text-purple-400 mb-2">3</div>
              <p className="text-gray-400">Validated Assessments</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            ref={featuresRef}
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="section-title">How healmymind.ai Helps You</motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <motion.div variants={itemVariants} className="card group">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:shadow-purple-500/20 group-hover:shadow-lg transition-all duration-300">
                  <Activity size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Scientifically Validated Tests</h3>
                <p className="text-gray-400">
                  Our screening tools are based on clinically validated questionnaires used by mental health professionals worldwide.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="card group">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:shadow-purple-500/20 group-hover:shadow-lg transition-all duration-300">
                  <Shield size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Private & Secure</h3>
                <p className="text-gray-400">
                  Your privacy matters. All test results are confidential and we don't store any personal health information.
                </p>
              </motion.div>
              
              <motion.div variants={itemVariants} className="card group">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-4 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 group-hover:shadow-purple-500/20 group-hover:shadow-lg transition-all duration-300">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">AI-Powered Insights</h3>
                <p className="text-gray-400">
                  Receive personalized analysis and recommendations based on your test results using advanced AI technology.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Available Tests Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            ref={testsRef}
            initial="hidden"
            animate={testsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h2 variants={itemVariants} className="section-title">Available Mental Health Screenings</motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:border-blue-500/50 transition-all duration-300 group">
                <div className="h-2 bg-blue-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-blue-400 transition-colors">Depression Screening (PHQ-9)</h3>
                  <p className="text-gray-400 mb-4">
                    The Patient Health Questionnaire (PHQ-9) is a widely used tool for screening and measuring the severity of depression.
                  </p>
                  <Link 
                    to="/test/depression" 
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center"
                  >
                    Take this test <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 group">
                <div className="h-2 bg-green-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-green-400 transition-colors">Anxiety Screening (GAD-7)</h3>
                  <p className="text-gray-400 mb-4">
                    The Generalized Anxiety Disorder scale (GAD-7) helps identify and measure the severity of anxiety symptoms.
                  </p>
                  <Link 
                    to="/test/anxiety" 
                    className="text-green-400 hover:text-green-300 font-medium inline-flex items-center"
                  >
                    Take this test <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="bg-gray-900 rounded-xl shadow-md overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="h-2 bg-purple-500"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-purple-400 transition-colors">PTSD Screening (PCL-5)</h3>
                  <p className="text-gray-400 mb-4">
                    The PTSD Checklist (PCL-5) helps screen for and measure symptoms of post-traumatic stress disorder.
                  </p>
                  <Link 
                    to="/test/ptsd" 
                    className="text-purple-400 hover:text-purple-300 font-medium inline-flex items-center"
                  >
                    Take this test <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="text-center mt-12">
              <Link 
                to="/tests" 
                className="btn-primary inline-flex items-center"
              >
                View All Tests <ArrowRight size={16} className="ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Testimonials */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="absolute -top-4 left-6 text-5xl text-purple-500">"</div>
              <p className="text-gray-300 mt-4 mb-6">
                healmymind.ai helped me understand my anxiety symptoms and gave me the confidence to finally talk to a therapist. The AI analysis was surprisingly insightful.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">S</div>
                <div className="ml-3">
                  <div className="text-white font-medium">Sarah K.</div>
                  <div className="text-gray-400 text-sm">Anxiety Test</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="absolute -top-4 left-6 text-5xl text-purple-500">"</div>
              <p className="text-gray-300 mt-4 mb-6">
                I've been struggling with my mental health for years but was afraid to seek help. The depression screening gave me the validation I needed to reach out for professional support.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">M</div>
                <div className="ml-3">
                  <div className="text-white font-medium">Michael T.</div>
                  <div className="text-gray-400 text-sm">Depression Test</div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 relative">
              <div className="absolute -top-4 left-6 text-5xl text-purple-500">"</div>
              <p className="text-gray-300 mt-4 mb-6">
                The premium analysis report was worth every penny. It helped me identify patterns I never noticed before and gave me specific strategies that have made a real difference in my daily life.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold">J</div>
                <div className="ml-3">
                  <div className="text-white font-medium">Jamie L.</div>
                  <div className="text-gray-400 text-sm">Premium Subscriber</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-12 bg-gray-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-red-900/30 p-6 rounded-xl shadow-md border border-red-800/50">
            <h3 className="text-xl font-semibold mb-3 text-red-300">Important Disclaimer</h3>
            <p className="text-gray-300">
              The screening tools provided on this website are for informational and educational purposes only. 
              They are not intended to diagnose any health condition or to replace professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </p>
            <p className="text-gray-300 mt-3">
              If you're experiencing thoughts of harming yourself or others, please contact emergency services 
              immediately or call the National Suicide Prevention Lifeline at <a href="tel:988" className="text-red-300 hover:text-red-200 font-medium">988</a> or <a href="tel:1-800-273-8255" className="text-red-300 hover:text-red-200 font-medium">1-800-273-8255</a>.
            </p>
          </div>
        </div>
      </section>
      <TestSuggestionDialog 
        isOpen={showSuggestionDialog} 
        onClose={() => setShowSuggestionDialog(false)} 
      />
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Shield, Heart, Brain } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">About neuralytics.ai</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              neuralytics.ai was created with a simple but powerful mission: to make mental health screening accessible to everyone. 
              We believe that understanding your mental health is the first step toward wellness, and our goal is to provide 
              tools that help you gain insights into your psychological well-being.
            </p>
            <p className="text-gray-700">
              By combining scientifically validated screening tools with advanced AI analysis, we aim to bridge the gap between 
              self-awareness and professional help, empowering you to make informed decisions about your mental health journey.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Our Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Brain size={36} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Evidence-Based</h3>
                <p className="text-gray-600">
                  We use clinically validated screening tools that are widely employed by mental health professionals worldwide.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Shield size={36} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Privacy-Focused</h3>
                <p className="text-gray-600">
                  Your privacy is paramount. We don't store your personal health information, and all analyses are conducted securely.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-purple-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Heart size={36} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Compassionate</h3>
                <p className="text-gray-600">
                  We approach mental health with empathy and understanding, recognizing the courage it takes to seek help.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4">About Our Tests</h2>
            <p className="text-gray-700 mb-4">
              The screening tools available on neuralytics.ai are based on standardized questionnaires used by healthcare professionals:
            </p>
            
            <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700">
              <li>
                <strong>PHQ-9 (Patient Health Questionnaire):</strong> A widely used depression screening tool that helps assess the severity of depressive symptoms.
              </li>
              <li>
                <strong>GAD-7 (Generalized Anxiety Disorder):</strong> A screening tool for identifying and measuring the severity of anxiety symptoms.
              </li>
              <li>
                <strong>PCL-5 (PTSD Checklist):</strong> A questionnaire that helps screen for and measure symptoms of post-traumatic stress disorder.
              </li>
            </ul>
            
            <p className="text-gray-700">
              These tests are designed to help identify potential mental health concerns, but they are not diagnostic tools. 
              A proper diagnosis can only be made by a qualified healthcare professional after a comprehensive evaluation.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h2>
            <p className="text-gray-700 mb-4">
              Our platform uses advanced artificial intelligence to analyze your test results and provide personalized insights. 
              The AI considers patterns across different tests and offers recommendations based on your specific responses.
            </p>
            <p className="text-gray-700 mb-4">
              While our AI analysis is designed to be helpful and informative, it's important to remember that it's not a 
              substitute for professional medical advice. The analysis aims to provide context for your results and guide 
              you toward appropriate resources.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-yellow-800">
                <strong>Important:</strong> neuralytics.ai is an educational tool, not a diagnostic service. Always consult with 
                a healthcare professional for proper evaluation, diagnosis, and treatment of mental health conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
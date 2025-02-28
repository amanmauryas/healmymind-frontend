import React from 'react';
import { Phone, Globe, BookOpen, Users } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Mental Health Resources</h1>
          
          {/* Emergency Resources */}
          <div className="bg-red-50 rounded-lg shadow-md p-8 mb-8 border-l-4 border-red-500">
            <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-700">
              <Phone size={24} className="mr-2" /> Emergency Resources
            </h2>
            <p className="text-gray-700 mb-4">
              If you're experiencing a mental health crisis or having thoughts of harming yourself or others, 
              please reach out to one of these emergency resources immediately:
            </p>
            
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-1">988 Suicide & Crisis Lifeline</h3>
                <p className="text-gray-600 mb-2">24/7 support for people in distress</p>
                <p className="font-medium">Call or text: <a href="tel:988" className="text-blue-600 hover:underline">988</a></p>
              </li>
              
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-1">Crisis Text Line</h3>
                <p className="text-gray-600 mb-2">24/7 text-based crisis support</p>
                <p className="font-medium">Text HOME to <a href="sms:741741" className="text-blue-600 hover:underline">741741</a></p>
              </li>
              
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-1">National Suicide Prevention Lifeline</h3>
                <p className="text-gray-600 mb-2">24/7 support network</p>
                <p className="font-medium">Call: <a href="tel:1-800-273-8255" className="text-blue-600 hover:underline">1-800-273-8255</a></p>
              </li>
              
              <li className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-1">Emergency Services</h3>
                <p className="text-gray-600 mb-2">For immediate emergency assistance</p>
                <p className="font-medium">Call: <a href="tel:911" className="text-blue-600 hover:underline">911</a></p>
              </li>
            </ul>
          </div>
          
          {/* Find Help */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Globe size={24} className="mr-2" /> Find Professional Help
            </h2>
            <p className="text-gray-700 mb-4">
              Finding the right mental health professional is an important step in your mental health journey. 
              These resources can help you locate therapists, counselors, and other mental health providers:
            </p>
            
            <ul className="space-y-3 mb-4">
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Psychology Today Therapist Directory</a>
                  <p className="text-gray-600">Search for therapists by location, specialty, insurance, and more.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.goodtherapy.org/find-therapist.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">GoodTherapy</a>
                  <p className="text-gray-600">Find therapists and counselors committed to ethical practice.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.betterhelp.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">BetterHelp</a>
                  <p className="text-gray-600">Online counseling and therapy services.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.talkspace.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Talkspace</a>
                  <p className="text-gray-600">Online therapy platform with licensed therapists.</p>
                </div>
              </li>
            </ul>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">
                <strong>Tip:</strong> When searching for a therapist, it's important to find someone you feel comfortable with. 
                Don't hesitate to speak with multiple providers until you find the right fit for your needs.
              </p>
            </div>
          </div>
          
          {/* Educational Resources */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <BookOpen size={24} className="mr-2" /> Educational Resources
            </h2>
            <p className="text-gray-700 mb-4">
              Learning about mental health can help you better understand your experiences and develop effective coping strategies. 
              These resources offer reliable information about various mental health conditions:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="https://www.nimh.nih.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-1">National Institute of Mental Health</h3>
                <p className="text-gray-600">Research-based information on mental disorders.</p>
              </a>
              
              <a 
                href="https://www.nami.org/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-1">National Alliance on Mental Illness</h3>
                <p className="text-gray-600">Education, support, and advocacy for individuals affected by mental illness.</p>
              </a>
              
              <a 
                href="https://www.mentalhealth.gov/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-1">MentalHealth.gov</h3>
                <p className="text-gray-600">U.S. government information and resources on mental health.</p>
              </a>
              
              <a 
                href="https://www.mind.org.uk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <h3 className="font-semibold text-lg mb-1">Mind</h3>
                <p className="text-gray-600">Information and support for better mental health.</p>
              </a>
            </div>
          </div>
          
          {/* Support Groups */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users size={24} className="mr-2" /> Support Groups
            </h2>
            <p className="text-gray-700 mb-4">
              Connecting with others who share similar experiences can provide comfort, understanding, and practical advice. 
              These organizations offer support groups for various mental health conditions:
            </p>
            
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.dbsalliance.org/support/chapters-and-support-groups/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Depression and Bipolar Support Alliance</a>
                  <p className="text-gray-600">Support groups for people with depression and bipolar disorder.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://adaa.org/supportgroups" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">Anxiety and Depression Association of America</a>
                  <p className="text-gray-600">Resources for finding anxiety and depression support groups.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.nami.org/Support-Education/Support-Groups" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">NAMI Support Groups</a>
                  <p className="text-gray-600">Support groups for individuals and families affected by mental illness.</p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="bg-purple-100 p-1 rounded-full mr-2 mt-1">
                  <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                </div>
                <div>
                  <a href="https://www.ptsd.va.gov/gethelp/find_support.asp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">National Center for PTSD</a>
                  <p className="text-gray-600">Resources for finding PTSD support.</p>
                </div>
              </li>
            </ul>
            
            <div className="mt-6 p-4 bg-green-50 rounded-lg">
              <p className="text-green-800">
                <strong>Remember:</strong> Seeking help is a sign of strength, not weakness. Taking steps to address your mental health 
                shows courage and self-awareness. You don't have to face mental health challenges alone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
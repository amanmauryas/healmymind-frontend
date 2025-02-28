import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">healmymind.ai</h3>
            <p className="text-gray-400">
              A mental health screening tool to help you understand your symptoms.
              This is not a diagnostic tool and should not replace professional medical advice.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Important Notice</h3>
            <p className="text-gray-400">
              If you're experiencing a mental health emergency, please call your local emergency services
              or a mental health crisis hotline immediately.
            </p>
            <p className="text-gray-400 mt-2">
              National Suicide Prevention Lifeline: <a href="tel:988" className="text-purple-300 hover:text-purple-400 transition-colors">988</a> or <a href="tel:1-800-273-8255" className="text-purple-300 hover:text-purple-400 transition-colors">1-800-273-8255</a>
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Links</h3>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/about" className="hover:text-purple-300 transition-colors">About Us</a></li>
              <li><a href="/resources" className="hover:text-purple-300 transition-colors">Resources</a></li>
              <li><a href="/privacy" className="hover:text-purple-300 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-purple-300 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500">
          <p className="flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-pink-500" /> for mental health awareness
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} healmymind.ai. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
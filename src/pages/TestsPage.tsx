import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  ArrowRight, 
  Activity, 
  Shield, 
  Heart, 
  Zap, 
  Moon, 
  UserPlus, 
  Wine, 
  Puzzle,
  Sparkles
} from 'lucide-react';
import testsData from '../data/tests.json';

interface Test {
  id: string;
  name: string;
  description: string;
}

interface TestCategory {
  name: string;
  icon: React.ReactNode;
  color: string;
  tests: Test[];
}

const TestsPage: React.FC = () => {
  const [categories, setCategories] = useState<TestCategory[]>([]);

  useEffect(() => {
    // Organize tests into categories
    const categorizedTests: Record<string, TestCategory> = {
      'mood': {
        name: 'Mood Disorders',
        icon: <Heart size={24} className="text-red-400" />,
        color: 'red-500',
        tests: []
      },
      'anxiety': {
        name: 'Anxiety Disorders',
        icon: <Activity size={24} className="text-blue-400" />,
        color: 'blue-500',
        tests: []
      },
      'trauma': {
        name: 'Trauma & Stress',
        icon: <Shield size={24} className="text-purple-400" />,
        color: 'purple-500',
        tests: []
      },
      'personality': {
        name: 'Personality',
        icon: <UserPlus size={24} className="text-green-400" />,
        color: 'green-500',
        tests: []
      },
      'sleep': {
        name: 'Sleep Disorders',
        icon: <Moon size={24} className="text-indigo-400" />,
        color: 'indigo-500',
        tests: []
      },
      'substance': {
        name: 'Substance Use',
        icon: <Wine size={24} className="text-pink-400" />,
        color: 'pink-500',
        tests: []
      }
    };

    // Categorize tests based on their IDs
    testsData.tests.forEach(test => {
      if (test.id.includes('depress') || test.id.includes('bipolar')) {
        categorizedTests.mood.tests.push(test);
      } else if (test.id.includes('anxiety') || test.id.includes('gad') || test.id.includes('social')) {
        categorizedTests.anxiety.tests.push(test);
      } else if (test.id.includes('ptsd') || test.id.includes('trauma')) {
        categorizedTests.trauma.tests.push(test);
      } else if (test.id.includes('personality') || test.id.includes('borderline')) {
        categorizedTests.personality.tests.push(test);
      } else if (test.id.includes('sleep') || test.id.includes('insomnia')) {
        categorizedTests.sleep.tests.push(test);
      } else if (test.id.includes('substance') || test.id.includes('alcohol')) {
        categorizedTests.substance.tests.push(test);
      }
    });

    // Filter out empty categories and set state
    setCategories(Object.values(categorizedTests).filter(cat => cat.tests.length > 0));
  }, []);

  // Map test IDs to icons and colors for individual tests
  const getTestIcon = (testId: string): { icon: React.ReactNode; color: string } => {
    if (testId.includes('depress')) {
      return { icon: <Heart size={24} className="text-red-400" />, color: 'red-500' };
    }
    if (testId.includes('anxiety') || testId.includes('gad')) {
      return { icon: <Activity size={24} className="text-blue-400" />, color: 'blue-500' };
    }
    if (testId.includes('bipolar')) {
      return { icon: <Zap size={24} className="text-yellow-400" />, color: 'yellow-500' };
    }
    if (testId.includes('social')) {
      return { icon: <UserPlus size={24} className="text-green-400" />, color: 'green-500' };
    }
    return { icon: <Puzzle size={24} className="text-purple-400" />, color: 'purple-500' };
  };

  return (
    <div className="min-h-screen bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Mental Health Screening Tests</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Select a test below to begin your mental health screening. All tests are confidential and take approximately 5-10 minutes to complete.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.name} className="mb-16">
            <div className="flex items-center mb-8">
              <div className={`p-3 rounded-lg bg-${category.color}/10 mr-4`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-white">{category.name}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.tests.map((test) => (
                <div 
                  key={test.id}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className={`h-2 bg-${getTestIcon(test.id).color}`}></div>
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="bg-gray-700 p-3 rounded-lg mr-3 group-hover:bg-gray-700/70 transition-colors">
                        {getTestIcon(test.id).icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white">{test.name}</h3>
                    </div>
                    
                    <p className="text-gray-400 mb-6">
                      {test.description}
                    </p>
                    
                    <Link 
                      to={`/test/${test.id}`}
                      className="inline-flex items-center text-purple-400 font-medium hover:text-purple-300 transition-colors"
                    >
                      Start Test <ArrowRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto border border-gray-700">
          <div className="flex items-center mb-6">
            <Sparkles size={24} className="text-purple-400 mr-3" />
            <h2 className="text-2xl font-semibold text-white">About Our Screening Tools</h2>
          </div>
          <p className="text-gray-300 mb-4">
            Our mental health screening tools are based on clinically validated questionnaires that are widely used by healthcare professionals. 
            These screenings can help you better understand your symptoms and determine if you might benefit from seeking professional help.
          </p>
          <p className="text-gray-300 mb-4">
            After completing a test, you'll receive an immediate score and interpretation, along with an AI-generated analysis that provides 
            personalized insights and recommendations based on your responses.
          </p>
          <div className="bg-yellow-900/30 border-l-4 border-yellow-600 p-4 mt-4">
            <p className="text-yellow-200">
              <strong>Important:</strong> These screening tools are not designed to make a diagnosis or take the place of a professional 
              evaluation. They are provided for educational purposes only. If you're experiencing a mental health emergency, please contact 
              emergency services or call the National Crisis Hotline at 988.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestsPage;

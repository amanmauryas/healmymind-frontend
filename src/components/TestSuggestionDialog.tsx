import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, Brain, AlertTriangle } from 'lucide-react';
import { suggestTestWithAI } from '../utils/testSuggestion';

interface TestSuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Question {
  id: string;
  question: string;
  subtext: string;
  options: string[];
}

const questions: Question[] = [
  {
    id: 'feeling',
    question: 'How have you been feeling lately?',
    subtext: 'Choose the option that best describes your predominant emotional state.',
    options: [
      'Generally okay but concerned about specific issues',
      'Sad, down, or depressed',
      'Anxious, worried, or on edge',
      'Overwhelmed or stressed',
      'Having mood swings or extreme changes in energy',
      'Having trouble with sleep or concentration',
      'Experiencing intrusive thoughts or compulsions',
      'Having concerns about eating or body image',
      'Having relationship or personality concerns'
    ]
  },
  {
    id: 'concerns',
    question: 'What specific concerns brought you here today?',
    subtext: 'Select the option that best matches your primary concern.',
    options: [
      'Changes in mood or emotional state',
      'Persistent worry or anxiety',
      'Difficulty with daily tasks or concentration',
      'Sleep problems or fatigue',
      'Relationship or interpersonal difficulties',
      'Substance use concerns',
      'Eating or body image issues',
      'Traumatic experiences or memories',
      'Identity or personality concerns'
    ]
  },
  {
    id: 'duration',
    question: 'How long have you been experiencing these feelings or concerns?',
    subtext: 'This helps us understand if your symptoms are acute or chronic.',
    options: [
      'Less than 2 weeks',
      '2-4 weeks',
      '1-3 months',
      '3-6 months',
      'More than 6 months',
      'More than a year'
    ]
  },
  {
    id: 'symptoms',
    question: 'Which symptoms do you experience most frequently?',
    subtext: 'Choose the option that best describes your most troubling symptoms.',
    options: [
      'Changes in sleep or appetite',
      'Difficulty concentrating or making decisions',
      'Excessive worry or racing thoughts',
      'Physical symptoms (heart racing, sweating, trembling)',
      'Repetitive thoughts or behaviors',
      'Mood swings or emotional instability',
      'Problems with alcohol or substances',
      'Social withdrawal or relationship problems',
      'Traumatic memories or flashbacks'
    ]
  }
];

const TestSuggestionDialog: React.FC<TestSuggestionDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState({
    feeling: '',
    concerns: '',
    duration: '',
    symptoms: ''
  });

  const handleAnswer = async (answer: string) => {
    const newAnswers = {
      ...answers,
      [questions[currentStep].id]: answer
    };
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsLoading(true);
      try {
        const suggestedTest = await suggestTestWithAI(newAnswers);
        navigate(`/test/${suggestedTest}`);
        onClose();
      } catch (error) {
        console.error('Error suggesting test:', error);
        navigate('/test/depression-phq9');
        onClose();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 overflow-y-auto py-8 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-purple-500 hover:scrollbar-thumb-purple-400">
      <style>{`
        /* Webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.5);
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.7);
        }

        /* Firefox */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.5) rgba(31, 41, 55, 0.5);
        }

        .dialog-content {
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
        }

        .dialog-content::-webkit-scrollbar {
          width: 6px;
        }

        .dialog-content::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.3);
          border-radius: 3px;
        }

        .dialog-content::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.4);
          border-radius: 3px;
        }

        .dialog-content::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.6);
        }
      `}</style>

      <div className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full mx-4 my-auto relative border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="dialog-content pr-2">
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Brain size={32} className="text-purple-500 mr-3" />
              <h2 className="text-2xl font-bold text-white">Find the Right Test</h2>
            </div>
            <p className="text-gray-400">
              Answer a few questions to help us suggest the most relevant mental health screening test for you.
            </p>
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <Loader2 size={48} className="animate-spin mx-auto text-purple-500 mb-4" />
                <p className="text-xl text-white mb-2">Analyzing Your Responses</p>
                <p className="text-gray-400">
                  We're using AI to find the most appropriate screening test for you...
                </p>
              </div>
            ) : (
              <div className="mb-4">
                <h3 className="text-xl text-white mb-2">{questions[currentStep].question}</h3>
                <p className="text-gray-400 mb-6">{questions[currentStep].subtext}</p>
                
                <div className="space-y-3">
                  {questions[currentStep].options.map((option: string) => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      className="w-full text-left px-4 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors duration-200"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between items-center mt-8">
              <div>
                {currentStep > 0 && !isLoading && (
                  <button
                    onClick={handlePrevious}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    ← Previous
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: questions.length }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      i === currentStep ? 'bg-purple-500' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-900/20 rounded-lg border border-yellow-900/50">
            <div className="flex items-start">
              <AlertTriangle size={20} className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-yellow-200 text-sm">
                This questionnaire is for screening purposes only and is not a diagnostic tool. 
                Your responses will help us suggest an appropriate screening test, but only a qualified 
                mental health professional can provide a proper diagnosis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSuggestionDialog;

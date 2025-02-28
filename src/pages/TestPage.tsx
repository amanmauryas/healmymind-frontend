import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import testsData from '../data/tests.json';

interface Option {
  value: number;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
}

interface ScoringRange {
  min: number;
  max: number;
  severity: string;
  description: string;
}

interface Test {
  id: string;
  name: string;
  description: string;
  instructions: string;
  questions: Question[];
  scoring: {
    ranges: ScoringRange[];
  };
}

interface Answer {
  questionId: string;
  questionText: string;
  answer: string;
  value: number;
}

const TestPage: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<ScoringRange | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Find the test with the matching ID
    const foundTest = testsData.tests.find(t => t.id === testId);
    
    if (foundTest) {
      setTest(foundTest);
      // Initialize answers array with empty values
      const initialAnswers = foundTest.questions.map(q => ({
        questionId: q.id,
        questionText: q.text,
        answer: '',
        value: -1
      }));
      setAnswers(initialAnswers);
    } else {
      setError(`Test with ID "${testId}" not found.`);
    }
    
    setLoading(false);
  }, [testId]);

  const handleAnswer = (option: Option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      ...updatedAnswers[currentQuestionIndex],
      answer: option.text,
      value: option.value
    };
    
    setAnswers(updatedAnswers);
    
    // Move to next question or complete the test
    if (currentQuestionIndex < (test?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      completeTest(updatedAnswers);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const completeTest = (finalAnswers: Answer[]) => {
    // Calculate total score
    const totalScore = finalAnswers.reduce((sum, answer) => sum + answer.value, 0);
    setScore(totalScore);
    
    // Determine result based on score ranges
    const matchingRange = test?.scoring.ranges.find(
      range => totalScore >= range.min && totalScore <= range.max
    ) || null;
    
    setResult(matchingRange);
    setIsCompleted(true);
    
    // Store test results in session storage for the results page
    const testResult = {
      testId: test?.id,
      testName: test?.name,
      score: totalScore,
      severity: matchingRange?.severity,
      description: matchingRange?.description,
      answers: finalAnswers
    };
    
    // Get existing results or initialize empty array
    const existingResults = JSON.parse(sessionStorage.getItem('testResults') || '[]');
    
    // Add new result
    const updatedResults = [...existingResults, testResult];
    
    // Save to session storage
    sessionStorage.setItem('testResults', JSON.stringify(updatedResults));
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            onClick={() => navigate('/tests')}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center text-red-600 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Test Not Found</h2>
          </div>
          <p className="text-gray-700 mb-6">The requested test could not be found.</p>
          <button
            onClick={() => navigate('/tests')}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center text-green-600 mb-6">
              <CheckCircle size={32} className="mr-3" />
              <h1 className="text-2xl font-bold">Test Completed</h1>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">{test.name}</h2>
            
            <div className="mt-6 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Your Score:</span>
                <span className="font-bold text-lg">{score}</span>
              </div>
              
              {result && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Severity Level:</span>
                    <span className="font-semibold">{result.severity}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Interpretation:</h3>
                    <p className="text-gray-700">{result.description}</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800">
                <strong>Next Steps:</strong> View your comprehensive AI-generated analysis for personalized insights and recommendations.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/tests')}
                className="flex items-center text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft size={16} className="mr-1" /> Back to Tests
              </button>
              
              <button
                onClick={handleViewResults}
                className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                View Analysis <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = test.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / test.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-2">{test.name}</h1>
          
          <div className="mb-6">
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-purple-600 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-500 mt-1">
              Question {currentQuestionIndex + 1} of {test.questions.length}
            </div>
          </div>
          
          {currentQuestionIndex === 0 && (
            <div className="mb-6 p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-700">{test.instructions}</p>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.text}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestionIndex].value === option.value
                      ? 'bg-purple-100 border-purple-500'
                      : 'border-gray-300 hover:bg-gray-50'
                  } transition-colors`}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={goToPreviousQuestion}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center ${
                currentQuestionIndex === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ArrowLeft size={16} className="mr-1" /> Previous
            </button>
            
            {/* Skip button - in a real app, you might want to handle this differently */}
            {currentQuestionIndex < test.questions.length - 1 && (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="text-purple-600 hover:text-purple-800"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
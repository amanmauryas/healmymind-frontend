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
    const foundTest = testsData.tests.find(t => t.id === testId);
    
    if (foundTest) {
      setTest(foundTest);
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
    const totalScore = finalAnswers.reduce((sum, answer) => sum + answer.value, 0);
    setScore(totalScore);
    
    const matchingRange = test?.scoring.ranges.find(
      range => totalScore >= range.min && totalScore <= range.max
    ) || null;
    
    setResult(matchingRange);
    setIsCompleted(true);
    
    const testResult = {
      testId: test?.id,
      testName: test?.name,
      score: totalScore,
      severity: matchingRange?.severity,
      description: matchingRange?.description,
      answers: finalAnswers
    };
    
    const existingResults = JSON.parse(sessionStorage.getItem('testResults') || '[]');
    const updatedResults = [...existingResults, testResult];
    sessionStorage.setItem('testResults', JSON.stringify(updatedResults));
  };

  const handleViewResults = () => {
    navigate('/results');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center text-red-400 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Error</h2>
          </div>
          <p className="text-gray-300 mb-6">{error}</p>
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex items-center text-red-400 mb-4">
            <AlertTriangle size={24} className="mr-2" />
            <h2 className="text-xl font-semibold text-white">Test Not Found</h2>
          </div>
          <p className="text-gray-300 mb-6">The requested test could not be found.</p>
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
      <div className="min-h-screen bg-gray-900 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-gray-800 rounded-lg shadow-md p-8">
            <div className="flex items-center text-green-400 mb-6">
              <CheckCircle size={32} className="mr-3" />
              <h1 className="text-2xl font-bold text-white">Test Completed</h1>
            </div>
            
            <h2 className="text-xl font-semibold mb-2 text-white">{test.name}</h2>
            
            <div className="mt-6 mb-6 p-4 bg-gray-700 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Your Score:</span>
                <span className="font-bold text-lg text-white">{score}</span>
              </div>
              
              {result && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Severity Level:</span>
                    <span className="font-semibold text-white">{result.severity}</span>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2 text-white">Interpretation:</h3>
                    <p className="text-gray-300">{result.description}</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-300">
                <strong>Next Steps:</strong> View your comprehensive AI-generated analysis for personalized insights and recommendations.
              </p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => navigate('/tests')}
                className="flex items-center text-gray-400 hover:text-gray-200"
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
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-2 text-white">{test.name}</h1>
          
          <div className="mb-6">
            <div className="h-2 bg-gray-700 rounded-full">
              <div 
                className="h-full bg-purple-600 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-400 mt-1">
              Question {currentQuestionIndex + 1} of {test.questions.length}
            </div>
          </div>
          
          {currentQuestionIndex === 0 && (
            <div className="mb-6 p-4 bg-purple-900/20 rounded-lg">
              <p className="text-gray-300">{test.instructions}</p>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">{currentQuestion.text}</h2>
            
            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-3 rounded-lg border ${
                    answers[currentQuestionIndex].value === option.value
                      ? 'bg-purple-900/30 border-purple-500 text-white'
                      : 'border-gray-600 hover:bg-gray-700 text-gray-300'
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
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              <ArrowLeft size={16} className="mr-1" /> Previous
            </button>
            
            {currentQuestionIndex < test.questions.length - 1 && (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                className="text-purple-400 hover:text-purple-300"
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

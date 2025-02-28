import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, AlertTriangle, ArrowLeft, Download } from 'lucide-react';
import { generateAIAnalysis, TestResult } from '../utils/openai';

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<TestResult[]>([]);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve test results from session storage
    const storedResults = sessionStorage.getItem('testResults');
    
    if (storedResults) {
      try {
        const parsedResults = JSON.parse(storedResults);
        setResults(parsedResults);
        
        // Generate AI analysis
        if (parsedResults.length > 0) {
          setLoading(true);
          generateAIAnalysis(parsedResults)
            .then(analysisResult => {
              setAnalysis(analysisResult);
              setLoading(false);
            })
            .catch(err => {
              console.error('Error generating analysis:', err);
              setError('Failed to generate analysis. Please try again later.');
              setLoading(false);
            });
        } else {
          setLoading(false);
          setError('No test results found.');
        }
      } catch (err) {
        console.error('Error parsing results:', err);
        setError('Failed to load test results.');
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError('No test results found. Please complete a test first.');
    }
  }, []);

  const handleDownloadResults = () => {
    // Create a text file with the results and analysis
    let content = "MENTAL HEALTH SCREENING RESULTS\n\n";
    
    results.forEach(result => {
      content += `TEST: ${result.testName}\n`;
      content += `SCORE: ${result.score}\n`;
      content += `SEVERITY: ${result.severity}\n`;
      content += `INTERPRETATION: ${result.description}\n\n`;
      
      content += "DETAILED RESPONSES:\n";
      result.answers.forEach(answer => {
        content += `- ${answer.questionText}: ${answer.answer} (${answer.value} points)\n`;
      });
      
      content += "\n";
    });
    
    content += "AI ANALYSIS:\n\n";
    content += analysis;
    
    content += "\n\nDISCLAIMER: This report is generated based on screening tools and is not a clinical diagnosis. Please consult with a healthcare professional for proper evaluation and treatment.";
    
    // Create a blob and download link
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mental-health-results.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-bold mb-6">Generating Your Analysis</h1>
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
              <p className="text-gray-600">
                Our AI is analyzing your test results to provide personalized insights...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center text-red-600 mb-6">
              <AlertTriangle size={24} className="mr-2" />
              <h1 className="text-2xl font-bold">Error</h1>
            </div>
            <p className="text-gray-700 mb-6">{error}</p>
            <button
              onClick={() => navigate('/tests')}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Take a Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center text-purple-600 mb-6">
            <FileText size={28} className="mr-3" />
            <h1 className="text-2xl font-bold">Your Mental Health Analysis</h1>
          </div>
          
          {/* Test Results Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Test Results Summary</h2>
            
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">{result.testName}</h3>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div>
                      <span className="text-gray-600">Score:</span>
                      <span className="font-semibold ml-2">{result.score}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Severity:</span>
                      <span className="font-semibold ml-2">{result.severity}</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{result.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* AI Analysis */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">AI-Generated Analysis</h2>
            
            <div className="p-6 bg-purple-50 rounded-lg border border-purple-100">
              <div className="prose max-w-none">
                {analysis.split('\n').map((paragraph, index) => {
                  // Check if the paragraph is a heading
                  if (paragraph.startsWith('# ')) {
                    return <h3 key={index} className="text-lg font-semibold mt-4 mb-2">{paragraph.substring(2)}</h3>;
                  } else if (paragraph.startsWith('## ')) {
                    return <h4 key={index} className="text-md font-semibold mt-3 mb-2">{paragraph.substring(3)}</h4>;
                  } else if (paragraph.startsWith('- ')) {
                    return <li key={index} className="ml-4">{paragraph.substring(2)}</li>;
                  } else if (paragraph.trim() === '') {
                    return <br key={index} />;
                  } else {
                    return <p key={index} className="mb-3">{paragraph}</p>;
                  }
                })}
              </div>
            </div>
          </div>
          
          {/* Disclaimer */}
          <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400">
            <h3 className="font-semibold text-yellow-800 mb-2">Important Disclaimer</h3>
            <p className="text-yellow-800">
              This analysis is based on screening tools and is not a clinical diagnosis. The information provided is for 
              educational purposes only and should not replace professional medical advice, diagnosis, or treatment. 
              Please consult with a qualified healthcare provider regarding any medical concerns.
            </p>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <button
              onClick={() => navigate('/tests')}
              className="flex items-center text-gray-600 hover:text-gray-800 mb-4 sm:mb-0"
            >
              <ArrowLeft size={16} className="mr-1" /> Back to Tests
            </button>
            
            <button
              onClick={handleDownloadResults}
              className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 transition-colors flex items-center"
            >
              <Download size={16} className="mr-2" /> Download Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
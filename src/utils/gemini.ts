import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY'); // Replace with your API key or use environment variables

export interface TestResult {
  testId: string;
  testName: string;
  score: number;
  severity: string;
  description: string;
  answers: Array<{
    questionId: string;
    questionText: string;
    answer: string;
    value: number;
  }>;
}

export async function generateAIAnalysis(results: TestResult[]): Promise<string> {
  try {
    // Create a prompt with the test results
    let prompt = "Based on the following mental health assessment results, provide a comprehensive analysis and recommendations:\n\n";
    
    results.forEach(result => {
      prompt += `Test: ${result.testName}\n`;
      prompt += `Score: ${result.score}\n`;
      prompt += `Severity: ${result.severity}\n`;
      prompt += `Description: ${result.description}\n\n`;
      
      prompt += "Detailed Responses:\n";
      result.answers.forEach(answer => {
        prompt += `- ${answer.questionText}: ${answer.answer} (${answer.value} points)\n`;
      });
      
      prompt += "\n";
    });
    
    prompt += "Please provide:\n";
    prompt += "1. A summary of the overall mental health status\n";
    prompt += "2. Potential connections between different symptoms or conditions\n";
    prompt += "3. Personalized recommendations for next steps\n";
    prompt += "4. Self-care strategies that might be helpful\n";
    prompt += "5. Important disclaimer that this is not a clinical diagnosis\n";

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text || "Unable to generate analysis. Please try again later.";
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return "An error occurred while generating the analysis. Please try again later.";
  }
}

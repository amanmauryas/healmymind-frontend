import OpenAI from 'openai';

// Note: In a production environment, you would use environment variables
// and proper authentication. This is a simplified example.
const openai = new OpenAI({
  apiKey: 'YOUR_OPENAI_API_KEY', // Replace with your actual API key or use environment variables
  dangerouslyAllowBrowser: true // Only for demo purposes
});

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

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a mental health assistant providing analysis of screening test results. You are not a licensed therapist or doctor. Always include disclaimers about seeking professional help and that these are screening tools, not diagnostic instruments."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    return response.choices[0].message.content || "Unable to generate analysis. Please try again later.";
  } catch (error) {
    console.error("Error generating AI analysis:", error);
    return "An error occurred while generating the analysis. Please try again later.";
  }
}
import { GoogleGenerativeAI } from "@google/generative-ai";
import testsData from '../data/tests.json';

const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY'); // Replace with your actual API key or use environment variables

export interface SuggestionAnswers {
  feeling: string;
  concerns: string;
  duration: string;
  symptoms: string;
}

export async function suggestTestWithAI(answers: SuggestionAnswers): Promise<string> {
  try {
    const prompt = `Based on the following user responses, suggest the most appropriate mental health screening test from our available options. Consider the symptoms, duration, and overall pattern.

User's responses:
1. Current feelings: ${answers.feeling}
2. Main concerns: ${answers.concerns}
3. Duration of symptoms: ${answers.duration}
4. Primary symptoms: ${answers.symptoms}

Available tests by category:
${Object.entries(groupTestsByCategory()).map(([category, tests]) => 
  `${category.toUpperCase()}:\n${tests.map(test => `- ${test.name} (${test.id}): ${test.description}`).join('\n')}`
).join('\n\n')}

Please analyze the responses and suggest the most appropriate test ID from: ${testsData.tests.map(test => test.id).join(', ')}. Consider:
1. Symptom patterns and their alignment with specific disorders
2. Duration and severity of symptoms
3. Primary areas of concern
4. Potential comorbidities

Respond only with the most appropriate test ID.`;

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const suggestion = response.text().trim().toLowerCase();
    
    // Validate the suggestion is one of our available tests
    if (suggestion && testsData.tests.some(test => test.id === suggestion)) {
      return suggestion;
    }
    
    // If AI suggestion is invalid, use fallback
    return fallbackSuggestion(answers);
  } catch (error) {
    console.error('Error getting AI test suggestion:', error);
    return fallbackSuggestion(answers);
  }
}

function groupTestsByCategory() {
  const categories: Record<string, typeof testsData.tests> = {};
  
  testsData.tests.forEach(test => {
    if (!categories[test.category]) {
      categories[test.category] = [];
    }
    categories[test.category].push(test);
  });
  
  return categories;
}

function fallbackSuggestion(answers: SuggestionAnswers): string {
  // Initialize scores for each category
  const scores: Record<string, number> = {};
  testsData.tests.forEach(test => {
    scores[test.id] = 0;
  });

  // Keywords associated with each test category
  const keywords = {
    'mood': {
      'depression-phq9': ['sad', 'down', 'depressed', 'tired', 'sleep', 'appetite', 'concentration', 'worthless'],
      'bipolar-mdq': ['mood swings', 'high energy', 'racing thoughts', 'impulsive', 'manic']
    },
    'anxiety': {
      'anxiety-gad7': ['anxious', 'worried', 'nervous', 'restless', 'fear', 'panic'],
      'ocd-ybocs': ['obsessive', 'compulsive', 'repetitive', 'intrusive', 'thoughts', 'rituals']
    },
    'substance': {
      'alcohol-audit': ['alcohol', 'drinking', 'drunk', 'hangover', 'blackout']
    },
    'sleep': {
      'insomnia-isi': ['sleep', 'insomnia', 'tired', 'fatigue', 'nighttime', 'restless']
    },
    'personality': {
      'borderline-msi': ['emotional', 'relationships', 'identity', 'impulsive', 'abandonment', 'mood swings']
    }
  };

  // Check each answer against keywords for each category and test
  Object.values(keywords).forEach((tests) => {
    Object.entries(tests).forEach(([testId, words]) => {
      words.forEach(word => {
        const pattern = new RegExp(word, 'i');
        if (pattern.test(answers.feeling)) scores[testId] += 2;
        if (pattern.test(answers.concerns)) scores[testId] += 2;
        if (pattern.test(answers.symptoms)) scores[testId] += 1;
      });
    });
  });

  // Consider duration for different conditions
  if (answers.duration.includes('months') || answers.duration.includes('years')) {
    scores['depression-phq9'] += 1;
    scores['anxiety-gad7'] += 1;
    scores['borderline-msi'] += 1;
  }

  // Consider time of day for sleep issues
  if (answers.symptoms.toLowerCase().includes('night') || 
      answers.symptoms.toLowerCase().includes('sleep')) {
    scores['insomnia-isi'] += 2;
  }

  // Consider substance use mentions
  if (answers.concerns.toLowerCase().includes('drink') || 
      answers.concerns.toLowerCase().includes('alcohol')) {
    scores['alcohol-audit'] += 3;
  }

  // Return the test with the highest score
  return Object.entries(scores).reduce((a, b) => b[1] > a[1] ? b : a)[0];
}


import OpenAI from 'openai';
import { IssueCategory } from './types';

// Get API key from localStorage (set in ApiConfig component)
const getOpenAIKey = () => localStorage.getItem('openai_api_key') || '';

// Initialize OpenAI client with a function to get the latest API key
const createOpenAIClient = () => {
  return new OpenAI({
    apiKey: getOpenAIKey(),
    dangerouslyAllowBrowser: true // Required for browser usage
  });
};

interface ClassificationResult {
  category: IssueCategory;
  confidence: number;
  summary: string;
}

// Classify email using OpenAI
export async function classifyEmail(
  subject: string,
  message: string
): Promise<ClassificationResult> {
  try {
    // Check if API key is set
    const apiKey = getOpenAIKey();
    if (!apiKey) {
      throw new Error('OpenAI API key not found. Please configure it in Admin settings.');
    }
    
    // Create OpenAI client with the current API key
    const openai = createOpenAIClient();
    
    // Create a combined prompt with the email content
    const prompt = `
You are an AI assistant tasked with classifying customer support emails into categories.
Analyze the following email and classify it into one of these categories: Technical, Billing, Account, Product, Feature Request, Bug Report, General Inquiry, or Other.

Email Subject: ${subject}
Email Body: ${message}

Please provide:
1. The most appropriate category
2. A confidence score from 0 to 1
3. A brief summary of the issue (max 100 characters)

Format your response as JSON:
{
  "category": "category_name",
  "confidence": 0.95,
  "summary": "Brief description of the issue"
}
`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using a faster and more cost-effective model 
      messages: [
        { role: 'system', content: 'You are a customer support email classifier.' },
        { role: 'user', content: prompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.3, // Low temperature for more deterministic results
    });

    // Parse the response
    const rawResponse = completion.choices[0].message.content || '';
    const parsedResponse = JSON.parse(rawResponse);
    
    // Validate the response
    if (!parsedResponse.category || typeof parsedResponse.confidence !== 'number' || !parsedResponse.summary) {
      throw new Error('Invalid response format from OpenAI');
    }

    // Ensure the category is valid
    const validCategories: IssueCategory[] = [
      'Technical', 'Billing', 'Account', 'Product', 
      'Feature Request', 'Bug Report', 'General Inquiry', 'Other'
    ];
    
    const category = validCategories.includes(parsedResponse.category as IssueCategory) 
      ? parsedResponse.category as IssueCategory 
      : 'Other';

    return {
      category: category,
      confidence: parsedResponse.confidence,
      summary: parsedResponse.summary
    };
  } catch (error) {
    console.error('Error classifying email with OpenAI:', error);
    
    // Fallback to a default classification in case of errors
    return {
      category: 'Other',
      confidence: 0.5,
      summary: `Failed to classify: ${subject}`
    };
  }
}

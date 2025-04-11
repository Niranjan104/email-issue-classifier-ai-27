
import OpenAI from 'openai';
import { IssueCategory } from './types';

// Initialize OpenAI client (you'll need to provide your API key)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'YOUR_OPENAI_API_KEY',
});

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
      model: 'gpt-4o', 
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

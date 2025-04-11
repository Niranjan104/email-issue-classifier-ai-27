
// OpenAI API Integration for email classification

import { IssueCategory } from './types';

interface OpenAIClassificationResult {
  category: IssueCategory;
  confidence: number;
  summary: string;
}

// Initialize OpenAI configuration from localStorage or set defaults
const getOpenAIConfig = () => {
  try {
    const storedConfig = localStorage.getItem('openai_config');
    if (storedConfig) {
      return JSON.parse(storedConfig);
    }
  } catch (error) {
    console.error('Error reading OpenAI config:', error);
  }
  
  // Default config
  return {
    apiKey: '',
    model: 'gpt-4o-mini',
  };
};

// Save OpenAI configuration
export const saveOpenAIConfig = (apiKey: string, model: string) => {
  localStorage.setItem('openai_config', JSON.stringify({
    apiKey,
    model,
  }));
};

// Check if OpenAI is configured
export const isOpenAIConfigured = (): boolean => {
  const config = getOpenAIConfig();
  return !!config.apiKey;
};

/**
 * Classify an email using OpenAI API
 */
export const classifyEmailWithOpenAI = async (
  subject: string,
  message: string
): Promise<OpenAIClassificationResult> => {
  const config = getOpenAIConfig();
  
  if (!config.apiKey) {
    throw new Error('OpenAI API key not configured');
  }
  
  try {
    // OpenAI API endpoint
    const endpoint = 'https://api.openai.com/v1/chat/completions';
    
    // Create a structured prompt for the model
    const prompt = `
You are an email classification assistant for a customer support team.
Analyze the following email and categorize it into ONE of these categories:
- Technical (technical issues, errors, bugs)
- Billing (payment issues, refunds, invoices)
- Account (login problems, account settings, access)
- Product (product questions, how-to)
- Feature Request (suggestions for new features)
- Bug Report (reporting specific bugs)
- General Inquiry (general questions)
- Other (doesn't fit any category)

Email Subject: ${subject}

Email Body:
${message}

Respond ONLY in this JSON format:
{
  "category": "CATEGORY_NAME",
  "confidence": CONFIDENCE_SCORE_BETWEEN_0_AND_1,
  "summary": "A BRIEF_SUMMARY_OF_THE_ISSUE"
}
`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.apiKey}`,
      },
      body: JSON.stringify({
        model: config.model,
        messages: [
          {
            role: 'system',
            content: 'You are a customer support email classifier that responds only in JSON format.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 500,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    
    // Extract the response content
    const content = data.choices[0].message.content;
    
    // Parse the JSON response
    try {
      const result = JSON.parse(content);
      
      return {
        category: result.category as IssueCategory,
        confidence: result.confidence,
        summary: result.summary,
      };
    } catch (error) {
      console.error('Error parsing OpenAI response:', error, content);
      throw new Error('Failed to parse the AI response');
    }
  } catch (error) {
    console.error('Error classifying email with OpenAI:', error);
    throw error;
  }
};

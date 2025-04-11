
import { IssueCategory } from './types';
import { classifyEmailWithOpenAI, isOpenAIConfigured } from './openaiService';

interface ClassificationResult {
  category: IssueCategory;
  confidence: number;
  summary: string;
}

// Fallback classification service using keyword matching
async function classifyEmailWithKeywords(
  subject: string,
  message: string
): Promise<ClassificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simple keyword matching for demo purposes
  const text = `${subject} ${message}`.toLowerCase();

  // Define keyword patterns for each category
  const patterns = {
    Technical: ['error', 'bug', 'crash', 'not working', 'broken', 'technical'],
    Billing: ['charge', 'invoice', 'payment', 'bill', 'refund', 'subscription', 'price'],
    Account: ['login', 'password', 'account', 'profile', 'sign in', 'access', 'authentication'],
    Product: ['product', 'feature', 'how to', 'documentation', 'instructions', 'tutorial'],
    'Feature Request': ['suggestion', 'feature request', 'add', 'improve', 'would be nice', 'new feature'],
    'Bug Report': ['found a bug', 'issue with', 'doesn\'t work', 'problem with', 'not functioning'],
    'General Inquiry': ['question', 'inquiry', 'wondering', 'interested in', 'information'],
  };

  // Count keyword matches for each category
  const counts: Record<IssueCategory, number> = {
    Technical: 0,
    Billing: 0,
    Account: 0,
    Product: 0,
    'Feature Request': 0,
    'Bug Report': 0,
    'General Inquiry': 0,
    Other: 0
  };

  // Perform simple keyword matching
  Object.entries(patterns).forEach(([category, keywords]) => {
    keywords.forEach(keyword => {
      if (text.includes(keyword)) {
        counts[category as IssueCategory] += 1;
      }
    });
  });

  // Find category with most matches
  let maxCategory: IssueCategory = 'Other';
  let maxCount = 0;

  Object.entries(counts).forEach(([category, count]) => {
    if (count > maxCount) {
      maxCount = count;
      maxCategory = category as IssueCategory;
    }
  });

  // If no strong matches, use Other
  if (maxCount === 0) {
    maxCategory = 'Other';
  }

  // Generate confidence score (simulated)
  const confidence = maxCount === 0 ? 0.5 : Math.min(0.5 + (maxCount * 0.1), 0.95);

  // Generate a summary
  let summary = '';
  const maxWords = 15;
  const words = message.split(' ');
  if (words.length > maxWords) {
    summary = words.slice(0, maxWords).join(' ') + '...';
  } else {
    summary = message;
  }

  return {
    category: maxCategory,
    confidence,
    summary: `${maxCategory} issue: ${summary}`
  };
}

// JSON parser for custom model input/output
export async function classifyEmailWithCustomModel(
  subject: string, 
  message: string
): Promise<ClassificationResult> {
  try {
    // This is a placeholder for future custom model integration
    // The real implementation would call the custom model API with the email content
    
    // Example of expected JSON input for the model:
    const modelInput = {
      subject: subject,
      content: message,
      requestType: "classification"
    };
    
    console.log("Custom model input:", JSON.stringify(modelInput));
    
    // For now, fall back to keyword matching
    return await classifyEmailWithKeywords(subject, message);
    
    // When the model is implemented, it should return JSON like:
    // {
    //   category: "Technical",
    //   confidence: 0.92,
    //   summary: "User is experiencing a login issue",
    //   additionalInfo: { ... any other data ... }
    // }
  } catch (error) {
    console.error("Error classifying with custom model:", error);
    throw error;
  }
}

// Main classification function with pipeline approach
export async function classifyEmail(
  subject: string,
  message: string
): Promise<ClassificationResult> {
  // Check for a custom model flag in localStorage (can be set in settings)
  const useCustomModel = localStorage.getItem('use_custom_model') === 'true';
  
  try {
    // Priority 1: Use custom model if enabled
    if (useCustomModel) {
      try {
        return await classifyEmailWithCustomModel(subject, message);
      } catch (error) {
        console.warn('Custom model classification failed, trying OpenAI:', error);
      }
    }
    
    // Priority 2: Use OpenAI if configured
    if (isOpenAIConfigured()) {
      try {
        return await classifyEmailWithOpenAI(subject, message);
      } catch (error) {
        console.warn('OpenAI classification failed, falling back to keywords:', error);
      }
    }
    
    // Priority 3: Fallback to keyword matching
    return await classifyEmailWithKeywords(subject, message);
  } catch (error) {
    console.error('All classification methods failed:', error);
    // Return a generic result as last resort
    return {
      category: 'Other',
      confidence: 0.5,
      summary: 'Could not classify this issue automatically. Please review manually.'
    };
  }
}

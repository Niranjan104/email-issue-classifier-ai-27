
import { IssueCategory } from './types';

// This is a mock LLM classification service
// In a real app, this would connect to an actual LLM API like OpenAI, Anthropic, etc.

interface ClassificationResult {
  category: IssueCategory;
  confidence: number;
  summary: string;
}

export async function classifyEmail(
  subject: string,
  message: string
): Promise<ClassificationResult> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Simple keyword matching for demo purposes
  // In reality this would be handled by an actual LLM
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

  // Generate a summary (in a real app, this would be done by the LLM)
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

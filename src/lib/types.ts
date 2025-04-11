
export type IssueCategory = 
  | 'Technical' 
  | 'Billing' 
  | 'Account' 
  | 'Product' 
  | 'Feature Request' 
  | 'Bug Report' 
  | 'General Inquiry'
  | 'Other';

export interface Issue {
  id: string;
  email: string;
  subject: string;
  message: string;
  category?: IssueCategory;
  priority?: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'New' | 'Classified' | 'In Progress' | 'Resolved';
  timestamp: string;
  classification?: {
    category: IssueCategory;
    confidence: number;
    summary: string;
  };
}

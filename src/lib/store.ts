
import { Issue, IssueCategory } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock in-memory data store (in a real app, this would be a database)
let issues: Issue[] = [
  {
    id: 'issue-1',
    email: 'john.doe@example.com',
    subject: 'Cannot login to my account',
    message: 'I have been trying to login to my account for the past hour but keep getting an error message saying "Invalid credentials". I am sure I am using the correct password. Please help!',
    category: 'Account',
    priority: 'High',
    status: 'Classified',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    classification: {
      category: 'Account',
      confidence: 0.92,
      summary: 'User is experiencing login issues possibly related to invalid credentials or account security.'
    }
  },
  {
    id: 'issue-2',
    email: 'jane.smith@example.com',
    subject: 'Billing question',
    message: 'I was charged twice for my last month subscription. Could you please look into this and provide a refund for the duplicate charge? My account number is AC-12345.',
    category: 'Billing',
    priority: 'Medium',
    status: 'In Progress',
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    classification: {
      category: 'Billing',
      confidence: 0.89,
      summary: 'Customer reports duplicate billing charge and requests refund.'
    }
  },
  {
    id: 'issue-3',
    email: 'robert.johnson@example.com',
    subject: 'Feature suggestion',
    message: 'I think it would be great if you could add a dark mode to the application. Many users, including myself, prefer using apps in dark mode, especially at night.',
    category: 'Feature Request',
    priority: 'Low',
    status: 'Classified',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    classification: {
      category: 'Feature Request',
      confidence: 0.95,
      summary: 'User suggests adding dark mode to improve the application experience.'
    }
  }
];

// Add a new issue
export const addIssue = (email: string, subject: string, message: string): Issue => {
  const newIssue: Issue = {
    id: uuidv4(),
    email,
    subject,
    message,
    status: 'New',
    timestamp: new Date().toISOString(),
  };
  
  issues = [newIssue, ...issues];
  return newIssue;
};

// Get all issues
export const getAllIssues = (): Issue[] => {
  return [...issues];
};

// Get issue by ID
export const getIssueById = (id: string): Issue | undefined => {
  return issues.find(issue => issue.id === id);
};

// Update issue
export const updateIssue = (updatedIssue: Issue): Issue => {
  issues = issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue);
  return updatedIssue;
};

// Update issue classification
export const updateIssueClassification = (
  id: string, 
  category: IssueCategory, 
  confidence: number, 
  summary: string
): Issue | undefined => {
  const issue = getIssueById(id);
  if (!issue) return undefined;
  
  const updatedIssue: Issue = {
    ...issue,
    category,
    status: 'Classified',
    classification: {
      category,
      confidence,
      summary
    }
  };
  
  return updateIssue(updatedIssue);
};


import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  orderBy, 
  updateDoc, 
  Timestamp, 
  where 
} from 'firebase/firestore';
import { Issue, IssueCategory } from './types';
import { v4 as uuidv4 } from 'uuid';

// Replace with your own Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Collection references
const ISSUES_COLLECTION = 'issues';

// Convert Firestore data to Issue object
const convertToIssue = (doc: any): Issue => {
  const data = doc.data();
  return {
    id: doc.id,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: data.status,
    category: data.category,
    priority: data.priority,
    timestamp: data.timestamp.toDate().toISOString(),
    classification: data.classification ? {
      category: data.classification.category,
      confidence: data.classification.confidence,
      summary: data.classification.summary
    } : undefined
  };
};

// Convert Issue object to Firestore data
const convertFromIssue = (issue: Issue) => {
  return {
    email: issue.email,
    subject: issue.subject,
    message: issue.message,
    status: issue.status,
    category: issue.category,
    priority: issue.priority,
    timestamp: Timestamp.fromDate(new Date(issue.timestamp)),
    classification: issue.classification ? {
      category: issue.classification.category,
      confidence: issue.classification.confidence,
      summary: issue.classification.summary
    } : null
  };
};

// Add a new issue
export const addIssue = async (email: string, subject: string, message: string): Promise<Issue> => {
  const id = uuidv4();
  const newIssue: Issue = {
    id,
    email,
    subject,
    message,
    status: 'New',
    timestamp: new Date().toISOString(),
  };
  
  await setDoc(doc(db, ISSUES_COLLECTION, id), convertFromIssue(newIssue));
  return newIssue;
};

// Get all issues
export const getAllIssues = async (): Promise<Issue[]> => {
  const issuesQuery = query(collection(db, ISSUES_COLLECTION), orderBy('timestamp', 'desc'));
  const snapshot = await getDocs(issuesQuery);
  return snapshot.docs.map(convertToIssue);
};

// Get issue by ID
export const getIssueById = async (id: string): Promise<Issue | undefined> => {
  const docRef = doc(db, ISSUES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return convertToIssue(docSnap);
  }
  
  return undefined;
};

// Update issue
export const updateIssue = async (updatedIssue: Issue): Promise<Issue> => {
  const docRef = doc(db, ISSUES_COLLECTION, updatedIssue.id);
  await updateDoc(docRef, convertFromIssue(updatedIssue));
  return updatedIssue;
};

// Update issue classification
export const updateIssueClassification = async (
  id: string, 
  category: IssueCategory, 
  confidence: number, 
  summary: string
): Promise<Issue | undefined> => {
  const issue = await getIssueById(id);
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

// Get issues by status
export const getIssuesByStatus = async (status: string): Promise<Issue[]> => {
  const issuesQuery = query(
    collection(db, ISSUES_COLLECTION), 
    where('status', '==', status),
    orderBy('timestamp', 'desc')
  );
  
  const snapshot = await getDocs(issuesQuery);
  return snapshot.docs.map(convertToIssue);
};

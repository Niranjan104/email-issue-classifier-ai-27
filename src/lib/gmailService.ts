
import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { addIssue } from './firebase';

// Gmail API scopes for reading emails
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// Path to credentials file (you'll need to obtain this from Google Cloud Console)
const CREDENTIALS_PATH = 'credentials.json';

// Cache for auth client
let auth: any = null;

// Initialize Gmail API client
async function getGmailClient() {
  if (!auth) {
    auth = await authenticate({
      keyfilePath: CREDENTIALS_PATH,
      scopes: SCOPES,
    });
  }
  
  return google.gmail({ version: 'v1', auth });
}

// Extract email details from a Gmail message
function extractEmailDetails(message: any) {
  const payload = message.payload;
  const headers = payload.headers;
  
  // Get email metadata
  const subject = headers.find((header: any) => header.name === 'Subject')?.value || 'No Subject';
  const from = headers.find((header: any) => header.name === 'From')?.value || '';
  const emailMatch = from.match(/<(.+?)>/) || [, from];
  const email = emailMatch[1];
  
  // Extract message body
  let body = '';
  
  if (payload.parts) {
    // Multipart message
    const textPart = payload.parts.find((part: any) => part.mimeType === 'text/plain');
    if (textPart && textPart.body.data) {
      body = Buffer.from(textPart.body.data, 'base64').toString('utf-8');
    }
  } else if (payload.body && payload.body.data) {
    // Single part message
    body = Buffer.from(payload.body.data, 'base64').toString('utf-8');
  }
  
  return {
    email,
    subject,
    message: body
  };
}

// Function to check for new emails and process them
export async function fetchNewEmails() {
  try {
    const gmail = await getGmailClient();
    
    // Get unread messages from inbox with a specific label (e.g., "support")
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread label:support',
      maxResults: 10
    });
    
    const messages = res.data.messages || [];
    
    // Process each new message
    for (const messageInfo of messages) {
      // Get full message details
      const messageData = await gmail.users.messages.get({
        userId: 'me',
        id: messageInfo.id!
      });
      
      // Extract email information
      const { email, subject, message } = extractEmailDetails(messageData.data);
      
      // Add to database as a new issue
      await addIssue(email, subject, message);
      
      // Mark as read
      await gmail.users.messages.modify({
        userId: 'me',
        id: messageInfo.id!,
        requestBody: {
          removeLabelIds: ['UNREAD']
        }
      });
    }
    
    return messages.length;
  } catch (error) {
    console.error('Error fetching emails:', error);
    throw error;
  }
}

// Function to set up email polling (call this when your app starts)
export function setupEmailPolling(intervalMinutes = 5) {
  // Check for new emails every X minutes
  const intervalMs = intervalMinutes * 60 * 1000;
  
  console.log(`Setting up email polling every ${intervalMinutes} minutes`);
  
  // Run immediately once
  fetchNewEmails().catch(console.error);
  
  // Then schedule regular checks
  return setInterval(() => {
    fetchNewEmails().catch(console.error);
  }, intervalMs);
}


import { googleApiConfig, getGoogleCredentials } from './googleApiConfig';
import { Issue } from './types';

// Constants for API endpoints
const GMAIL_API_BASE_URL = 'https://www.googleapis.com/gmail/v1';
const SCOPE = 'https://www.googleapis.com/auth/gmail.readonly';

// Interface for Gmail message
interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  payload: {
    headers: {
      name: string;
      value: string;
    }[];
    body: {
      data?: string;
    };
    parts?: {
      body: {
        data?: string;
      };
      mimeType: string;
    }[];
  };
}

// Store auth tokens
let authToken: string | null = null;

/**
 * Initialize Google API client and request authentication
 */
export const initializeGmailApi = async (): Promise<boolean> => {
  try {
    const storedToken = localStorage.getItem('gmail_auth_token');
    
    if (storedToken) {
      authToken = storedToken;
      return true;
    }
    
    // We need to redirect to Google auth page
    const credentials = getGoogleCredentials();
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    
    const authUrl = new URL(credentials.web.auth_uri);
    authUrl.searchParams.append('client_id', credentials.web.client_id);
    authUrl.searchParams.append('redirect_uri', redirectUri);
    authUrl.searchParams.append('scope', SCOPE);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    
    // Save current page to return after auth
    localStorage.setItem('auth_redirect_uri', window.location.href);
    
    // Redirect to Google auth
    window.location.href = authUrl.toString();
    return false;
  } catch (error) {
    console.error('Error initializing Gmail API:', error);
    return false;
  }
};

/**
 * Handle the auth callback from Google
 */
export const handleGoogleAuthCallback = async (code: string): Promise<boolean> => {
  try {
    const credentials = getGoogleCredentials();
    const redirectUri = `${window.location.origin}/auth/google/callback`;
    
    const response = await fetch(credentials.web.token_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: credentials.web.client_id,
        client_secret: credentials.web.client_secret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });
    
    const data = await response.json();
    
    if (data.access_token) {
      localStorage.setItem('gmail_auth_token', data.access_token);
      authToken = data.access_token;
      
      // Redirect back to the original page
      const redirectUrl = localStorage.getItem('auth_redirect_uri') || '/admin';
      window.location.href = redirectUrl;
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error handling Google auth callback:', error);
    return false;
  }
};

/**
 * Fetch recent emails from Gmail
 */
export const fetchRecentEmails = async (maxResults: number = 10): Promise<Issue[]> => {
  try {
    if (!authToken) {
      const isInitialized = await initializeGmailApi();
      if (!isInitialized) {
        throw new Error('Gmail API not authorized');
      }
    }
    
    // Fetch message list
    const response = await fetch(`${GMAIL_API_BASE_URL}/users/me/messages?maxResults=${maxResults}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
      },
    });
    
    const data = await response.json();
    
    if (!data.messages || !Array.isArray(data.messages)) {
      return [];
    }
    
    // Fetch details for each message
    const emails: Issue[] = [];
    
    for (const message of data.messages.slice(0, maxResults)) {
      const messageResponse = await fetch(`${GMAIL_API_BASE_URL}/users/me/messages/${message.id}`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      const messageData: GmailMessage = await messageResponse.json();
      
      // Extract email details
      const from = messageData.payload.headers.find(h => h.name.toLowerCase() === 'from')?.value || '';
      const subject = messageData.payload.headers.find(h => h.name.toLowerCase() === 'subject')?.value || 'No Subject';
      const date = messageData.payload.headers.find(h => h.name.toLowerCase() === 'date')?.value || '';
      
      // Extract email address from the "From" header
      const emailMatch = from.match(/<(.+)>/) || [null, from.split(' ')[0]];
      const email = emailMatch[1] || from;
      
      // Extract message body
      let body = '';
      
      if (messageData.payload.body?.data) {
        body = atob(messageData.payload.body.data.replace(/-/g, '+').replace(/_/g, '/'));
      } else if (messageData.payload.parts) {
        const textPart = messageData.payload.parts.find(part => part.mimeType === 'text/plain');
        if (textPart?.body?.data) {
          body = atob(textPart.body.data.replace(/-/g, '+').replace(/_/g, '/'));
        }
      }
      
      // Create issue object with timestamp as string
      const issue: Issue = {
        id: messageData.id,
        email,
        subject,
        message: body || messageData.snippet,
        timestamp: new Date(date).toISOString(), // Convert to ISO string format
        status: 'New',
      };
      
      emails.push(issue);
    }
    
    return emails;
  } catch (error) {
    console.error('Error fetching emails from Gmail:', error);
    return [];
  }
};

/**
 * Check if the user is authenticated with Gmail
 */
export const isGmailAuthenticated = (): boolean => {
  return !!localStorage.getItem('gmail_auth_token');
};

/**
 * Logout from Gmail API
 */
export const logoutGmailApi = (): void => {
  localStorage.removeItem('gmail_auth_token');
  authToken = null;
};

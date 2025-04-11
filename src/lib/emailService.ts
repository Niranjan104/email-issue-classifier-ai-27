
import { Issue } from './types';

// Configuration for email services
interface EmailConfig {
  smtp: {
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'tls' | 'ssl' | 'none';
  };
  receiving: {
    protocol: 'imap' | 'pop3' | 'gmail';
    host: string;
    port: number;
    username: string;
    password: string;
    encryption: 'ssl' | 'tls' | 'none';
    autoFetch: boolean;
    fetchInterval: number; // in minutes
  };
}

// Default configuration
let emailConfig: EmailConfig = {
  smtp: {
    host: 'smtp.example.com',
    port: 587,
    username: 'support@example.com',
    password: '',
    encryption: 'tls'
  },
  receiving: {
    protocol: 'imap',
    host: 'imap.example.com',
    port: 993,
    username: 'support@example.com',
    password: '',
    encryption: 'ssl',
    autoFetch: true,
    fetchInterval: 5
  }
};

// Load saved configuration if available
const loadConfig = () => {
  const savedConfig = localStorage.getItem('email_config');
  if (savedConfig) {
    try {
      emailConfig = JSON.parse(savedConfig);
    } catch (error) {
      console.error('Error loading email configuration:', error);
    }
  }
};

// Save configuration
export const saveEmailConfig = (config: EmailConfig) => {
  localStorage.setItem('email_config', JSON.stringify(config));
  emailConfig = config;
};

// Initialize configuration
loadConfig();

// In a real application, this would connect to an actual SMTP server
export const sendEmail = async (to: string, subject: string, body: string): Promise<boolean> => {
  console.log('Sending email using configuration:', emailConfig.smtp);
  console.log(`To: ${to}, Subject: ${subject}`);
  
  // Simulate sending an email
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email sent successfully');
      resolve(true);
    }, 1000);
  });
};

// In a real application, this would connect to an IMAP/POP3 server
export const fetchEmails = async (limit: number = 10): Promise<Issue[]> => {
  console.log('Fetching emails using configuration:', emailConfig.receiving);
  
  // Simulate fetching emails
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate some mock emails
      const mockEmails: Issue[] = Array.from({ length: limit }).map((_, index) => ({
        id: `email-${Date.now()}-${index}`,
        email: `customer${index}@example.com`,
        subject: `Sample Email ${index + 1}`,
        message: `This is the content of email ${index + 1}. It contains some information that needs to be classified.`,
        status: 'New',
        timestamp: new Date().toISOString()
      }));
      
      console.log(`Fetched ${mockEmails.length} emails`);
      resolve(mockEmails);
    }, 1500);
  });
};

// Test SMTP or IMAP/POP3 connection
export const testConnection = async (type: 'smtp' | 'receiving'): Promise<boolean> => {
  console.log(`Testing ${type} connection using:`, emailConfig[type]);
  
  // Simulate connection test
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`${type} connection test successful`);
      resolve(true);
    }, 2000);
  });
};

// Start automatic email fetching
let fetchInterval: NodeJS.Timeout | null = null;

export const startAutoFetch = (callback: (emails: Issue[]) => void) => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
  }
  
  if (emailConfig.receiving.autoFetch) {
    const intervalMs = emailConfig.receiving.fetchInterval * 60 * 1000;
    
    fetchInterval = setInterval(async () => {
      try {
        const emails = await fetchEmails(5); // Fetch up to 5 emails at a time
        if (emails.length > 0) {
          callback(emails);
        }
      } catch (error) {
        console.error('Error during auto-fetch:', error);
      }
    }, intervalMs);
    
    console.log(`Auto-fetch started with interval: ${emailConfig.receiving.fetchInterval} minutes`);
    return true;
  }
  
  return false;
};

export const stopAutoFetch = () => {
  if (fetchInterval) {
    clearInterval(fetchInterval);
    fetchInterval = null;
    console.log('Auto-fetch stopped');
    return true;
  }
  return false;
};

export const getEmailConfig = (): EmailConfig => {
  return { ...emailConfig };
};

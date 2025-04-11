
import React, { useState, useEffect } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AppSidebar } from '@/components/AppSidebar';
import { useToast } from '@/components/ui/use-toast';
import { startAutoFetch, stopAutoFetch } from '@/lib/emailService';
import { addMultipleIssues } from '@/lib/store';
import { Issue } from '@/lib/types';

const Admin = () => {
  const { toast } = useToast();
  const [isAutoFetchEnabled, setIsAutoFetchEnabled] = useState(false);
  
  // Handle new emails from auto-fetching
  const handleNewEmails = (emails: Issue[]) => {
    if (emails.length > 0) {
      const addedEmails = addMultipleIssues(emails);
      
      if (addedEmails.length > 0) {
        toast({
          title: "New Emails Received",
          description: `${addedEmails.length} new email(s) have been received and added to the system.`,
        });
      }
    }
  };
  
  // Start auto-fetching emails when component mounts
  useEffect(() => {
    const startFetching = async () => {
      const isStarted = startAutoFetch(handleNewEmails);
      setIsAutoFetchEnabled(isStarted);
    };
    
    startFetching();
    
    // Cleanup when component unmounts
    return () => {
      stopAutoFetch();
    };
  }, []);
  
  return (
    <div className="flex h-screen">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto bg-background">
        <AdminDashboard />
      </main>
    </div>
  );
};

export default Admin;

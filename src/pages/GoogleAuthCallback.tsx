
import React, { useEffect, useState } from 'react';
import { handleGoogleAuthCallback } from '@/lib/gmailService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const GoogleAuthCallback = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const processAuth = async () => {
      try {
        // Get the authorization code from URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (!code) {
          setStatus('error');
          setMessage('No authorization code found in the URL.');
          return;
        }

        // Handle the auth callback
        const success = await handleGoogleAuthCallback(code);

        if (success) {
          setStatus('success');
          setMessage('Authentication successful! Redirecting...');
          // Redirect is handled in handleGoogleAuthCallback
        } else {
          setStatus('error');
          setMessage('Failed to authenticate with Google. Please try again.');
        }
      } catch (error) {
        console.error('Error during Google authentication:', error);
        setStatus('error');
        setMessage('An error occurred during authentication. Please try again.');
      }
    };

    processAuth();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Google Authentication</CardTitle>
          <CardDescription>
            {status === 'loading' && 'Completing your authentication with Google...'}
            {status === 'success' && 'Authentication successful!'}
            {status === 'error' && 'Authentication failed'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center p-6">
          {status === 'loading' && (
            <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
          )}
          <p className="text-center mt-4">{message}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAuthCallback;

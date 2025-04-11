
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';

interface ApiKeys {
  openai: string;
  gmail: {
    clientId: string;
    clientSecret: string;
  };
}

export function ApiConfig() {
  const { toast } = useToast();
  const [keys, setKeys] = useState<ApiKeys>({
    openai: localStorage.getItem('openai_api_key') || '',
    gmail: {
      clientId: localStorage.getItem('gmail_client_id') || '',
      clientSecret: localStorage.getItem('gmail_client_secret') || '',
    }
  });

  const handleSaveKeys = () => {
    // Store keys in localStorage (for demo purposes)
    // In a real app, these would be securely stored in environment variables
    // or a secure backend service
    localStorage.setItem('openai_api_key', keys.openai);
    localStorage.setItem('gmail_client_id', keys.gmail.clientId);
    localStorage.setItem('gmail_client_secret', keys.gmail.clientSecret);

    toast({
      title: "API Keys Saved",
      description: "Your API configuration has been successfully saved.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
        <CardDescription>
          Configure your external API keys and services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai">OpenAI API Key</Label>
          <Input
            id="openai"
            type="password"
            placeholder="sk-..."
            value={keys.openai}
            onChange={(e) => setKeys({ ...keys, openai: e.target.value })}
          />
          <p className="text-xs text-muted-foreground">
            Used for email classification with GPT-4. Get your key from the <a href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer" className="underline">OpenAI dashboard</a>.
          </p>
        </div>

        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-2">Gmail API</h3>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="gmail-client-id">Client ID</Label>
            <Input
              id="gmail-client-id"
              placeholder="Your Gmail OAuth Client ID"
              value={keys.gmail.clientId}
              onChange={(e) => setKeys({ 
                ...keys, 
                gmail: { ...keys.gmail, clientId: e.target.value } 
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gmail-client-secret">Client Secret</Label>
            <Input
              id="gmail-client-secret"
              type="password"
              placeholder="Your Gmail OAuth Client Secret"
              value={keys.gmail.clientSecret}
              onChange={(e) => setKeys({ 
                ...keys, 
                gmail: { ...keys.gmail, clientSecret: e.target.value } 
              })}
            />
          </div>
          
          <p className="text-xs text-muted-foreground mt-2">
            Configure these values in the <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" className="underline">Google Cloud Console</a>.
            Enable the Gmail API and create OAuth credentials.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveKeys} className="w-full">
          Save API Configuration
        </Button>
      </CardFooter>
    </Card>
  );
}

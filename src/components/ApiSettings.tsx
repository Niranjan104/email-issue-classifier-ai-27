
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { isOpenAIConfigured, saveOpenAIConfig } from '@/lib/openaiService';
import { useToast } from '@/components/ui/use-toast';

export function ApiSettings() {
  const { toast } = useToast();
  const [openaiApiKey, setOpenaiApiKey] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o-mini');
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  
  // Check if API is already configured on mount
  useEffect(() => {
    const checkConfig = () => {
      const configured = isOpenAIConfigured();
      setIsConfigured(configured);
      
      // Load saved model preference
      const savedConfig = localStorage.getItem('openai_config');
      if (savedConfig) {
        try {
          const config = JSON.parse(savedConfig);
          setSelectedModel(config.model || 'gpt-4o-mini');
          // We don't load the API key for security reasons
        } catch (e) {
          console.error('Error parsing saved OpenAI config:', e);
        }
      }
    };
    
    checkConfig();
  }, []);
  
  const handleSaveOpenAI = () => {
    if (!openaiApiKey) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      saveOpenAIConfig(openaiApiKey, selectedModel);
      setIsConfigured(true);
      setOpenaiApiKey(''); // Clear API key for security
      
      toast({
        title: "API Configuration Saved",
        description: "Your OpenAI API settings have been saved.",
      });
    } catch (error) {
      console.error('Error saving OpenAI configuration:', error);
      toast({
        title: "Configuration Error",
        description: "Failed to save API configuration.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Settings</CardTitle>
        <CardDescription>
          Configure API keys for external services
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="openai-api-key">OpenAI API Key</Label>
          <Input
            id="openai-api-key"
            type="password"
            placeholder={isConfigured ? "API key configured (hidden)" : "Enter your OpenAI API key"}
            value={openaiApiKey}
            onChange={(e) => setOpenaiApiKey(e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="openai-model">Model</Label>
          <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger id="openai-model">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o-mini">GPT-4o Mini (Fastest)</SelectItem>
              <SelectItem value="gpt-4o">GPT-4o (Balanced)</SelectItem>
              <SelectItem value="gpt-4.5-preview">GPT-4.5 Preview (Most Accurate)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveOpenAI}>
          {isConfigured ? "Update API Settings" : "Save API Settings"}
        </Button>
      </CardFooter>
    </Card>
  );
}

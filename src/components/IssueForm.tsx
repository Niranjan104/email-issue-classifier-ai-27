
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { addIssue } from '@/lib/store';
import { useToast } from '@/components/ui/use-toast';

export function IssueForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !subject || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add the issue to our store
      const newIssue = addIssue(email, subject, message);
      
      // Reset form
      setEmail('');
      setSubject('');
      setMessage('');
      
      toast({
        title: "Success",
        description: "Your issue has been submitted. We'll get back to you soon!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit your issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Submit Your Issue</CardTitle>
        <CardDescription>
          Fill out the form below to send your issue to our support team. We'll get back to you as soon as possible.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Your Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Briefly describe your issue"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Please provide details about your issue..."
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
        </CardContent>
        
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Issue"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Issue, IssueCategory } from '@/lib/types';

interface IssueDetailsProps {
  selectedIssue: Issue | null;
  handleClassify: (issue: Issue) => void;
  isClassifying: boolean;
}

export function IssueDetails({ selectedIssue, handleClassify, isClassifying }: IssueDetailsProps) {
  // Helper function to get category badge color
  const getCategoryColor = (category?: IssueCategory) => {
    const colorMap: Record<IssueCategory, string> = {
      'Technical': 'bg-blue-500',
      'Billing': 'bg-green-500',
      'Account': 'bg-yellow-500',
      'Product': 'bg-purple-500',
      'Feature Request': 'bg-indigo-500',
      'Bug Report': 'bg-red-500',
      'General Inquiry': 'bg-gray-500',
      'Other': 'bg-slate-500'
    };
    
    return category ? colorMap[category] : 'bg-slate-500';
  };

  if (!selectedIssue) {
    return (
      <Card className="h-full flex items-center justify-center">
        <CardContent className="text-center py-10">
          <p className="text-muted-foreground">Select an issue to view details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Issue Details</CardTitle>
          {selectedIssue.status === 'New' && (
            <Button 
              onClick={() => handleClassify(selectedIssue)}
              disabled={isClassifying}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {isClassifying ? 'Classifying...' : 'Classify with AI'}
            </Button>
          )}
        </div>
        <CardDescription>
          Submitted on {new Date(selectedIssue.timestamp).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label className="text-sm">From</Label>
          <p className="font-medium">{selectedIssue.email}</p>
        </div>
        
        <div>
          <Label className="text-sm">Subject</Label>
          <p className="font-medium">{selectedIssue.subject}</p>
        </div>
        
        <div>
          <Label className="text-sm">Message</Label>
          <p className="whitespace-pre-wrap rounded bg-muted p-3 text-sm">
            {selectedIssue.message}
          </p>
        </div>
        
        {selectedIssue.classification && (
          <div className="border rounded-lg p-4 bg-muted/50">
            <h4 className="font-medium mb-2">AI Classification Results</h4>
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <Label className="text-xs">Category</Label>
                <p className="font-medium">
                  <Badge 
                    className={`${getCategoryColor(selectedIssue.category)} text-white`}>
                    {selectedIssue.category}
                  </Badge>
                </p>
              </div>
              <div>
                <Label className="text-xs">Confidence</Label>
                <p className="font-medium">
                  {Math.round(selectedIssue.classification.confidence * 100)}%
                </p>
              </div>
            </div>
            <div>
              <Label className="text-xs">Summary</Label>
              <p className="text-sm">{selectedIssue.classification.summary}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

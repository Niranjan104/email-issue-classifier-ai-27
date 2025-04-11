
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Issue, IssueCategory } from '@/lib/types';

interface IssueListProps {
  issues: Issue[];
  selectedIssue: Issue | null;
  setSelectedIssue: (issue: Issue) => void;
  issueType: 'new' | 'classified' | 'inProgress' | 'resolved';
}

export function IssueList({ issues, selectedIssue, setSelectedIssue, issueType }: IssueListProps) {
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

  if (issues.length === 0) {
    return <p className="text-center py-4 text-muted-foreground">No {issueType} issues</p>;
  }

  return (
    <div className="space-y-2">
      {issues.map(issue => (
        <Card 
          key={issue.id} 
          className={`cursor-pointer hover:bg-muted transition-colors ${selectedIssue?.id === issue.id ? 'border-emerald-500' : ''}`}
          onClick={() => setSelectedIssue(issue)}
        >
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{issue.subject}</h4>
                <p className="text-sm text-muted-foreground">{issue.email}</p>
              </div>
              {issueType === 'new' ? (
                <Badge variant="outline">{issue.status}</Badge>
              ) : (
                <Badge 
                  className={`${getCategoryColor(issue.category)} text-white`}>
                  {issue.category || 'Unclassified'}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

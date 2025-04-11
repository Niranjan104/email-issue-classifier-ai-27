
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { getAllIssues, updateIssueClassification } from '@/lib/store';
import { Issue, IssueCategory } from '@/lib/types';
import { classifyEmail } from '@/lib/classificationService';
import { useToast } from '@/components/ui/use-toast';

export function AdminDashboard() {
  const { toast } = useToast();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isClassifying, setIsClassifying] = useState(false);

  // Load issues when component mounts
  useEffect(() => {
    const loadIssues = () => {
      const allIssues = getAllIssues();
      setIssues(allIssues);
    };

    loadIssues();
    // In a real app, we'd set up a polling or websocket connection here
    const interval = setInterval(loadIssues, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClassify = async (issue: Issue) => {
    if (issue.classification) return; // Already classified
    
    setIsClassifying(true);
    setSelectedIssue(issue);
    
    try {
      // Call our classification service
      const result = await classifyEmail(issue.subject, issue.message);
      
      // Update the issue with classification results
      const updatedIssue = updateIssueClassification(
        issue.id, 
        result.category, 
        result.confidence, 
        result.summary
      );
      
      if (updatedIssue) {
        // Refresh issues list
        setIssues(getAllIssues());
        setSelectedIssue(updatedIssue);
        
        toast({
          title: "Issue Classified",
          description: `Classified as "${result.category}" with ${Math.round(result.confidence * 100)}% confidence`,
        });
      }
    } catch (error) {
      toast({
        title: "Classification Failed",
        description: "Failed to classify this issue. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClassifying(false);
    }
  };

  // Filter issues by status
  const newIssues = issues.filter(issue => issue.status === 'New');
  const classifiedIssues = issues.filter(issue => issue.status === 'Classified');
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress');
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved');

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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Issue Classification Dashboard</CardTitle>
          <CardDescription>
            Manage and classify incoming customer support emails
          </CardDescription>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Tabs defaultValue="new">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="new" className="relative">
                New
                {newIssues.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                    {newIssues.length}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="classified">Classified</TabsTrigger>
              <TabsTrigger value="inProgress">In Progress</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
            
            <TabsContent value="new" className="mt-4">
              {newIssues.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No new issues</p>
              ) : (
                <div className="space-y-2">
                  {newIssues.map(issue => (
                    <Card 
                      key={issue.id} 
                      className={`cursor-pointer hover:bg-muted transition-colors ${selectedIssue?.id === issue.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{issue.subject}</h4>
                            <p className="text-sm text-muted-foreground">{issue.email}</p>
                          </div>
                          <Badge variant="outline">{issue.status}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="classified" className="mt-4">
              {classifiedIssues.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No classified issues</p>
              ) : (
                <div className="space-y-2">
                  {classifiedIssues.map(issue => (
                    <Card 
                      key={issue.id} 
                      className={`cursor-pointer hover:bg-muted transition-colors ${selectedIssue?.id === issue.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{issue.subject}</h4>
                            <p className="text-sm text-muted-foreground">{issue.email}</p>
                          </div>
                          <Badge 
                            className={`${getCategoryColor(issue.category)} text-white`}>
                            {issue.category || 'Unclassified'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="inProgress" className="mt-4">
              {inProgressIssues.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No issues in progress</p>
              ) : (
                <div className="space-y-2">
                  {inProgressIssues.map(issue => (
                    <Card 
                      key={issue.id} 
                      className={`cursor-pointer hover:bg-muted transition-colors ${selectedIssue?.id === issue.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{issue.subject}</h4>
                            <p className="text-sm text-muted-foreground">{issue.email}</p>
                          </div>
                          <Badge 
                            className={`${getCategoryColor(issue.category)} text-white`}>
                            {issue.category || 'Unclassified'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="resolved" className="mt-4">
              {resolvedIssues.length === 0 ? (
                <p className="text-center py-4 text-muted-foreground">No resolved issues</p>
              ) : (
                <div className="space-y-2">
                  {resolvedIssues.map(issue => (
                    <Card 
                      key={issue.id} 
                      className={`cursor-pointer hover:bg-muted transition-colors ${selectedIssue?.id === issue.id ? 'border-primary' : ''}`}
                      onClick={() => setSelectedIssue(issue)}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{issue.subject}</h4>
                            <p className="text-sm text-muted-foreground">{issue.email}</p>
                          </div>
                          <Badge 
                            className={`${getCategoryColor(issue.category)} text-white`}>
                            {issue.category || 'Unclassified'}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-2">
          {selectedIssue ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Issue Details</CardTitle>
                  {selectedIssue.status === 'New' && (
                    <Button 
                      onClick={() => handleClassify(selectedIssue)}
                      disabled={isClassifying}
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
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center py-10">
                <p className="text-muted-foreground">Select an issue to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

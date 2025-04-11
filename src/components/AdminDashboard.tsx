
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getAllIssues, updateIssueClassification } from '@/lib/store';
import { Issue } from '@/lib/types';
import { classifyEmail } from '@/lib/classificationService';
import { useToast } from '@/components/ui/use-toast';
import { IssueList } from './dashboard/IssueList';
import { IssueDetails } from './dashboard/IssueDetails';

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
  
  // Auto-classify new issues
  useEffect(() => {
    const autoClassifyNewIssues = async () => {
      const newIssues = issues.filter(issue => issue.status === 'New');
      
      if (newIssues.length > 0) {
        // Process one issue at a time to avoid overwhelming the system
        const issue = newIssues[0];
        await handleClassify(issue, true);
      }
    };
    
    // Run auto-classification when issues change
    autoClassifyNewIssues();
  }, [issues]);

  const handleClassify = async (issue: Issue, isAutomatic = false) => {
    if (issue.classification) return; // Already classified
    
    if (!isAutomatic) {
      setIsClassifying(true);
      setSelectedIssue(issue);
    }
    
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
        if (!isAutomatic) {
          setSelectedIssue(updatedIssue);
        }
        
        if (!isAutomatic) {
          toast({
            title: "Issue Classified",
            description: `Classified as "${result.category}" with ${Math.round(result.confidence * 100)}% confidence`,
          });
        }
      }
    } catch (error) {
      if (!isAutomatic) {
        toast({
          title: "Classification Failed",
          description: "Failed to classify this issue. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      if (!isAutomatic) {
        setIsClassifying(false);
      }
    }
  };

  // Filter issues by status
  const newIssues = issues.filter(issue => issue.status === 'New');
  const classifiedIssues = issues.filter(issue => issue.status === 'Classified');
  const inProgressIssues = issues.filter(issue => issue.status === 'In Progress');
  const resolvedIssues = issues.filter(issue => issue.status === 'Resolved');

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Email Issue Classification Dashboard</CardTitle>
              <CardDescription>
                Manage and classify incoming customer support emails
              </CardDescription>
            </div>
          </div>
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
              <IssueList 
                issues={newIssues} 
                selectedIssue={selectedIssue}
                setSelectedIssue={setSelectedIssue}
                issueType="new"
              />
            </TabsContent>
            
            <TabsContent value="classified" className="mt-4">
              <IssueList 
                issues={classifiedIssues} 
                selectedIssue={selectedIssue}
                setSelectedIssue={setSelectedIssue}
                issueType="classified"
              />
            </TabsContent>
            
            <TabsContent value="inProgress" className="mt-4">
              <IssueList 
                issues={inProgressIssues} 
                selectedIssue={selectedIssue}
                setSelectedIssue={setSelectedIssue}
                issueType="inProgress"
              />
            </TabsContent>
            
            <TabsContent value="resolved" className="mt-4">
              <IssueList 
                issues={resolvedIssues} 
                selectedIssue={selectedIssue}
                setSelectedIssue={setSelectedIssue}
                issueType="resolved"
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="lg:col-span-2">
          <IssueDetails
            selectedIssue={selectedIssue}
            handleClassify={handleClassify}
            isClassifying={isClassifying}
          />
        </div>
      </div>
    </div>
  );
}

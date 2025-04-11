
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

export function DatabaseSettings() {
  const { toast } = useToast();
  
  const handleSaveDatabaseSettings = () => {
    toast({
      title: "Database settings saved",
      description: "Your database settings have been updated."
    });
  };
  
  const handleCreateBackup = () => {
    toast({
      title: "Backup created",
      description: "A new database backup has been created."
    });
  };
  
  const handleRestoreBackup = () => {
    toast({
      title: "Restore initiated",
      description: "Database restore process has started."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="text-emerald-500" />
          <CardTitle>Database Settings</CardTitle>
        </div>
        <CardDescription>
          Manage database maintenance and backups
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted p-4 rounded-md">
          <h3 className="font-medium mb-2">Database Statistics</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Total records:</span>
              <span className="font-medium">1,248</span>
            </div>
            <div className="flex justify-between">
              <span>Database size:</span>
              <span className="font-medium">42.3 MB</span>
            </div>
            <div className="flex justify-between">
              <span>Last backup:</span>
              <span className="font-medium">Today, 03:00 AM</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Backup Schedule</Label>
            <Select defaultValue="daily">
              <SelectTrigger>
                <SelectValue placeholder="Select backup frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Retention Period</Label>
            <Select defaultValue="30">
              <SelectTrigger>
                <SelectValue placeholder="Select retention period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 days</SelectItem>
                <SelectItem value="30">30 days</SelectItem>
                <SelectItem value="90">90 days</SelectItem>
                <SelectItem value="365">1 year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" className="flex-1" onClick={handleCreateBackup}>
            Create Backup Now
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleRestoreBackup}>
            Restore from Backup
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full bg-emerald-500 hover:bg-emerald-600"
          onClick={handleSaveDatabaseSettings}
        >
          Save Database Settings
        </Button>
      </CardFooter>
    </Card>
  );
}

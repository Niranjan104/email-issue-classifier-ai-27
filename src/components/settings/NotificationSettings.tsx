
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { BellRing } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

export function NotificationSettings() {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  
  const handleSaveNotificationSettings = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated."
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellRing className="text-emerald-500" />
          <CardTitle>Notification Settings</CardTitle>
        </div>
        <CardDescription>
          Configure how and when you receive notifications
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via email
            </p>
          </div>
          <Switch
            id="email-notifications"
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="slack-notifications">Slack Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive notifications via Slack
            </p>
          </div>
          <Switch
            id="slack-notifications"
            checked={slackNotifications}
            onCheckedChange={setSlackNotifications}
          />
        </div>
        
        {slackNotifications && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
            <Input
              id="slack-webhook"
              value={slackWebhook}
              onChange={(e) => setSlackWebhook(e.target.value)}
              placeholder="https://hooks.slack.com/services/..."
            />
          </div>
        )}
        
        <div className="border-t pt-4">
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            onClick={handleSaveNotificationSettings}
          >
            Save Notification Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

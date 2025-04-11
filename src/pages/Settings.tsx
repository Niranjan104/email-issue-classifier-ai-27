
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Settings as SettingsIcon, Mail, Database, BellRing } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

const Settings = () => {
  const { toast } = useToast();
  
  // SMTP settings
  const [smtpHost, setSmtpHost] = useState('smtp.example.com');
  const [smtpPort, setSmtpPort] = useState('587');
  const [smtpUsername, setSmtpUsername] = useState('support@example.com');
  const [smtpPassword, setSmtpPassword] = useState('••••••••••••');
  const [smtpEncryption, setSmtpEncryption] = useState('tls');
  
  // Email receiving settings (IMAP/POP3)
  const [receiveProtocol, setReceiveProtocol] = useState('imap');
  const [receiveHost, setReceiveHost] = useState('imap.example.com');
  const [receivePort, setReceivePort] = useState('993');
  const [receiveUsername, setReceiveUsername] = useState('support@example.com');
  const [receivePassword, setReceivePassword] = useState('••••••••••••');
  const [receiveEncryption, setReceiveEncryption] = useState('ssl');
  
  // Mail fetch settings
  const [autoFetch, setAutoFetch] = useState(true);
  const [fetchInterval, setFetchInterval] = useState('5');
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackNotifications, setSlackNotifications] = useState(false);
  const [slackWebhook, setSlackWebhook] = useState('');
  
  const handleSaveEmailSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your email settings have been saved successfully."
    });
  };
  
  const handleTestConnection = () => {
    toast({
      title: "Testing connection",
      description: "Attempting to connect to mail server..."
    });
    
    // Simulate a successful connection after a short delay
    setTimeout(() => {
      toast({
        title: "Connection successful",
        description: "Successfully connected to mail server."
      });
    }, 2000);
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <SettingsIcon className="text-emerald-500" size={24} />
            Settings
          </h1>
          <p className="text-muted-foreground">Configure application settings and email integration</p>
        </div>
      </div>
      
      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="text-emerald-500" />
                <CardTitle>Email Sending (SMTP)</CardTitle>
              </div>
              <CardDescription>
                Configure SMTP settings for sending emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Host</Label>
                  <Input 
                    id="smtp-host" 
                    value={smtpHost} 
                    onChange={(e) => setSmtpHost(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">SMTP Port</Label>
                  <Input 
                    id="smtp-port" 
                    value={smtpPort} 
                    onChange={(e) => setSmtpPort(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-username">Username</Label>
                  <Input 
                    id="smtp-username" 
                    value={smtpUsername} 
                    onChange={(e) => setSmtpUsername(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Password</Label>
                  <Input 
                    id="smtp-password" 
                    type="password" 
                    value={smtpPassword} 
                    onChange={(e) => setSmtpPassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="smtp-encryption">Encryption</Label>
                <Select value={smtpEncryption} onValueChange={setSmtpEncryption}>
                  <SelectTrigger id="smtp-encryption">
                    <SelectValue placeholder="Select encryption method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTestConnection}>
                Test Connection
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleSaveEmailSettings}>
                Save SMTP Settings
              </Button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Receiving (IMAP/POP3)</CardTitle>
              <CardDescription>
                Configure settings for receiving emails
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receive-protocol">Protocol</Label>
                <Select value={receiveProtocol} onValueChange={setReceiveProtocol}>
                  <SelectTrigger id="receive-protocol">
                    <SelectValue placeholder="Select protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="imap">IMAP</SelectItem>
                    <SelectItem value="pop3">POP3</SelectItem>
                    <SelectItem value="gmail">Gmail API</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receive-host">Host</Label>
                  <Input 
                    id="receive-host" 
                    value={receiveHost} 
                    onChange={(e) => setReceiveHost(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receive-port">Port</Label>
                  <Input 
                    id="receive-port" 
                    value={receivePort} 
                    onChange={(e) => setReceivePort(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="receive-username">Username</Label>
                  <Input 
                    id="receive-username" 
                    value={receiveUsername} 
                    onChange={(e) => setReceiveUsername(e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="receive-password">Password</Label>
                  <Input 
                    id="receive-password" 
                    type="password" 
                    value={receivePassword} 
                    onChange={(e) => setReceivePassword(e.target.value)} 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="receive-encryption">Encryption</Label>
                <Select value={receiveEncryption} onValueChange={setReceiveEncryption}>
                  <SelectTrigger id="receive-encryption">
                    <SelectValue placeholder="Select encryption method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssl">SSL</SelectItem>
                    <SelectItem value="tls">TLS</SelectItem>
                    <SelectItem value="none">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 pt-2 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-fetch">Auto-fetch emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically check for new emails
                    </p>
                  </div>
                  <Switch id="auto-fetch" checked={autoFetch} onCheckedChange={setAutoFetch} />
                </div>
                
                {autoFetch && (
                  <div className="space-y-2 pt-2">
                    <Label htmlFor="fetch-interval">Fetch interval (minutes)</Label>
                    <Input 
                      id="fetch-interval" 
                      type="number" 
                      value={fetchInterval} 
                      onChange={(e) => setFetchInterval(e.target.value)}
                      min="1"
                      max="60" 
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleTestConnection}>
                Test Connection
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleSaveEmailSettings}>
                Save Receiving Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
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
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="database" className="space-y-4 pt-4">
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
                <Button variant="outline" className="flex-1">
                  Create Backup Now
                </Button>
                <Button variant="outline" className="flex-1">
                  Restore from Backup
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                Save Database Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

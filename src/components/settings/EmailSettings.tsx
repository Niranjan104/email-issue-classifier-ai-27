
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Mail } from "lucide-react";
import { useToast } from '@/components/ui/use-toast';

export function EmailSettings() {
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
    <>
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
      
      <Card className="mt-4">
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
    </>
  );
}

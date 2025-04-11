
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info } from "lucide-react";

export function EmailConfigGuide() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="text-emerald-500" />
          <CardTitle>Email Configuration Guide</CardTitle>
        </div>
        <CardDescription>
          Instructions for setting up different email providers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="gmail">
          <TabsList className="w-full">
            <TabsTrigger value="gmail">Gmail</TabsTrigger>
            <TabsTrigger value="outlook">Outlook</TabsTrigger>
            <TabsTrigger value="custom">Custom SMTP/IMAP</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gmail" className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Gmail SMTP Settings</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>SMTP Host:</strong> smtp.gmail.com</li>
                <li><strong>SMTP Port:</strong> 587</li>
                <li><strong>Username:</strong> Your full Gmail address</li>
                <li><strong>Password:</strong> Your app password (not your regular Gmail password)</li>
                <li><strong>Encryption:</strong> TLS</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Gmail IMAP Settings</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>IMAP Server:</strong> imap.gmail.com</li>
                <li><strong>IMAP Port:</strong> 993</li>
                <li><strong>Username:</strong> Your full Gmail address</li>
                <li><strong>Password:</strong> Your app password</li>
                <li><strong>Encryption:</strong> SSL</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <h4 className="font-medium text-amber-800">Important Note</h4>
              <p className="text-sm text-amber-700 mt-1">
                For Gmail, you need to create an App Password instead of using your regular password. 
                To do this:
              </p>
              <ol className="list-decimal pl-5 mt-2 text-sm text-amber-700 space-y-1">
                <li>Go to your Google Account settings</li>
                <li>Select Security</li>
                <li>Under "Signing in to Google," select 2-Step Verification</li>
                <li>At the bottom of the page, select App passwords</li>
                <li>Create a new app password for "Mail"</li>
                <li>Use the generated 16-character password in the settings above</li>
              </ol>
            </div>
          </TabsContent>
          
          <TabsContent value="outlook" className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Outlook SMTP Settings</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>SMTP Host:</strong> smtp-mail.outlook.com</li>
                <li><strong>SMTP Port:</strong> 587</li>
                <li><strong>Username:</strong> Your full Outlook email address</li>
                <li><strong>Password:</strong> Your Outlook password</li>
                <li><strong>Encryption:</strong> TLS</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Outlook IMAP Settings</h3>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>IMAP Server:</strong> outlook.office365.com</li>
                <li><strong>IMAP Port:</strong> 993</li>
                <li><strong>Username:</strong> Your full Outlook email address</li>
                <li><strong>Password:</strong> Your Outlook password</li>
                <li><strong>Encryption:</strong> SSL</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-md border border-amber-200">
              <h4 className="font-medium text-amber-800">Important Note</h4>
              <p className="text-sm text-amber-700 mt-1">
                For Outlook, you may need to enable "Allow less secure apps" in your Outlook account settings 
                or set up an app password if you have two-factor authentication enabled.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4 space-y-4">
            <div>
              <h3 className="text-lg font-medium">Finding Your Email Provider Settings</h3>
              <p className="mt-1 text-sm">
                For custom email providers, you'll need to contact your email service provider or 
                check their documentation for the correct SMTP and IMAP/POP3 settings. Common 
                port numbers and encryption types are:
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium">Common SMTP Ports</h4>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  <li><strong>Port 25:</strong> Unencrypted/insecure (not recommended)</li>
                  <li><strong>Port 465:</strong> SSL encryption</li>
                  <li><strong>Port 587:</strong> TLS encryption (recommended)</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium">Common IMAP Ports</h4>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  <li><strong>Port 143:</strong> Unencrypted/insecure (not recommended)</li>
                  <li><strong>Port 993:</strong> SSL/TLS encryption (recommended)</li>
                </ul>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium">Common POP3 Ports</h4>
                <ul className="list-disc pl-5 mt-1 text-sm space-y-1">
                  <li><strong>Port 110:</strong> Unencrypted/insecure (not recommended)</li>
                  <li><strong>Port 995:</strong> SSL/TLS encryption (recommended)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <h4 className="font-medium text-blue-800">Testing Tips</h4>
              <ul className="list-disc pl-5 mt-2 text-sm text-blue-700 space-y-1">
                <li>Always use the "Test Connection" button after entering your settings</li>
                <li>Check with your email provider if secure app access needs to be enabled</li>
                <li>Some corporate email systems may require additional authentication</li>
                <li>If possible, use OAuth authentication for better security</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

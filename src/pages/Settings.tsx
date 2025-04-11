
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings as SettingsIcon } from "lucide-react";
import { ApiSettings } from '@/components/ApiSettings';
import { EmailSettings } from '@/components/settings/EmailSettings';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { DatabaseSettings } from '@/components/settings/DatabaseSettings';
import { EmailConfigGuide } from '@/components/settings/EmailConfigGuide';

const Settings = () => {
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
        <TabsList className="grid w-full max-w-md grid-cols-4">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="database">Database</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        <TabsContent value="email" className="space-y-4 pt-4">
          <EmailSettings />
          <EmailConfigGuide />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <NotificationSettings />
        </TabsContent>
        
        <TabsContent value="database" className="space-y-4 pt-4">
          <DatabaseSettings />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4 pt-4">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;

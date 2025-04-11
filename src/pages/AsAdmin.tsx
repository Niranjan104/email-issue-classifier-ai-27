
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AreaChart, PieChart, BarChart } from "@/components/ui/chart";
import { UserCog, Bell, Shield, Key } from "lucide-react";

const AsAdmin = () => {
  const [isEmailSyncEnabled, setIsEmailSyncEnabled] = useState(true);
  const [isAutoClassifyEnabled, setIsAutoClassifyEnabled] = useState(true);
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <UserCog className="text-emerald-500" size={24} />
            Admin Controls
          </h1>
          <p className="text-muted-foreground">Manage system settings and monitor performance</p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Bell className="mr-2 h-4 w-4" />
          Notifications
        </Button>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Emails</CardTitle>
                <CardDescription>All time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 12%</span> from last month
                </p>
                <div className="h-[80px] mt-4">
                  <AreaChart 
                    data={[10, 15, 8, 12, 18, 16, 20, 25, 23, 28, 35, 40]}
                    categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Classification Accuracy</CardTitle>
                <CardDescription>Last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.3%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500">↑ 2.1%</span> from previous period
                </p>
                <div className="h-[80px] mt-4">
                  <PieChart 
                    data={[94.3, 5.7]}
                    categories={["Accurate", "Inaccurate"]}
                    colors={["#10b981", "#f87171"]}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Email Sources</CardTitle>
                <CardDescription>Current distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-medium">Top source: <span className="text-emerald-500">Gmail</span></div>
                <div className="h-[100px] mt-4">
                  <BarChart 
                    data={[42, 28, 15, 10, 5]}
                    categories={["Gmail", "Outlook", "Yahoo", "Form", "Other"]}
                    colors={["#10b981", "#6366f1", "#8b5cf6", "#ec4899", "#94a3b8"]}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>System Controls</CardTitle>
              <CardDescription>
                Manage email synchronization and AI classification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-sync">Email Synchronization</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync emails from connected accounts
                  </p>
                </div>
                <Switch
                  id="email-sync"
                  checked={isEmailSyncEnabled}
                  onCheckedChange={setIsEmailSyncEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-classify">Automatic Classification</Label>
                  <p className="text-sm text-muted-foreground">
                    Use AI to automatically classify incoming emails
                  </p>
                </div>
                <Switch
                  id="auto-classify"
                  checked={isAutoClassifyEnabled}
                  onCheckedChange={setIsAutoClassifyEnabled}
                />
              </div>
              
              <div className="border-t pt-4">
                <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                  Apply Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="text-emerald-500" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Manage system security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input 
                    id="api-key" 
                    type="password" 
                    value="sk_live_51KjN9QJH5TZN8n2W6gH5TrYn" 
                    readOnly 
                  />
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Regenerate
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between bg-muted p-3 rounded-md">
                  <div>
                    <p className="font-medium">2FA is enabled</p>
                    <p className="text-sm text-muted-foreground">Last verified: 2 days ago</p>
                  </div>
                  <Badge className="bg-emerald-500">Active</Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Login Attempts</Label>
                <div className="bg-muted p-3 rounded-md">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm">Last successful login</p>
                    <p className="text-sm font-medium">Today, 9:42 AM</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">Failed attempts (last 7 days)</p>
                    <p className="text-sm font-medium">0</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
              <CardDescription>
                Configure access levels for different user roles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Administrator</div>
                    <Badge>Full Access</Badge>
                  </div>
                  <div className="p-3 text-sm text-muted-foreground">
                    Can manage all system settings, users, and view all data
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Support Agent</div>
                    <Badge variant="outline">Limited Access</Badge>
                  </div>
                  <div className="p-3 text-sm text-muted-foreground">
                    Can view and respond to assigned emails only
                  </div>
                </div>
                
                <div className="border rounded-md">
                  <div className="flex items-center justify-between p-3 border-b">
                    <div className="font-medium">Viewer</div>
                    <Badge variant="outline">Read Only</Badge>
                  </div>
                  <div className="p-3 text-sm text-muted-foreground">
                    Can view dashboards and reports, but cannot make changes
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AsAdmin;

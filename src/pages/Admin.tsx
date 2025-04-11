
import React, { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { ApiSettings } from '@/components/ApiSettings';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 border-b">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-medium ml-2">Admin Dashboard</span>
          </div>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 md:px-6 py-8">
        <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="settings">API Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="dashboard" className="mt-6">
            <AdminDashboard />
          </TabsContent>
          <TabsContent value="settings" className="mt-6">
            <ApiSettings />
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© 2025 Email Issue Classifier AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;

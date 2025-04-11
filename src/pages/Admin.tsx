
import React, { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { ApiConfig } from '@/components/ApiConfig';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
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
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="config">API Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <AdminDashboard />
          </TabsContent>
          
          <TabsContent value="config">
            <div className="max-w-xl mx-auto">
              <ApiConfig />
            </div>
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

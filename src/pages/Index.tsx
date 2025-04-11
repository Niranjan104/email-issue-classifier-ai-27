
import React from 'react';
import { IssueForm } from '@/components/IssueForm';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 border-b">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <Logo />
          <Link to="/admin">
            <Button variant="outline">Admin Dashboard</Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <img 
            src="/lovable-uploads/854558f8-9faa-44f0-a7dd-5c47c4bc7e49.png" 
            alt="Customer Support" 
            className="mb-6 mx-auto max-w-md rounded-lg shadow-md"
          />
          <h2 className="text-3xl font-bold tracking-tight mb-4">Customer Support</h2>
          <p className="text-xl text-gray-600 mb-8">
            Need help? Submit your issue below and our AI-powered system will route it to the right department.
          </p>
        </div>
        
        <div className="flex justify-center">
          <IssueForm />
        </div>
      </main>
      
      <footer className="bg-white border-t py-6 mt-auto">
        <div className="container mx-auto px-4 md:px-6 text-center text-gray-500">
          <p>© 2025 Email Issue Classifier AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

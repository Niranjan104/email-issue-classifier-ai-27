
import React from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Logo } from '@/components/ui/logo';

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
        <AdminDashboard />
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

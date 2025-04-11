
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppSidebar } from '@/components/AppSidebar';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
          <Link to="/admin" className="text-emerald-500 hover:text-emerald-600 underline">
            Return to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
};

export default NotFound;


import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { 
  UserCog, 
  Users, 
  Settings, 
  LayoutDashboard, 
  Mail, 
  LogOut
} from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin",
      active: isActive("/admin")
    },
    {
      title: "As Admin",
      icon: UserCog,
      path: "/admin/as-admin",
      active: isActive("/admin/as-admin")
    },
    {
      title: "Team Details",
      icon: Users,
      path: "/admin/team",
      active: isActive("/admin/team")
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
      active: isActive("/admin/settings")
    }
  ];
  
  return (
    <Sidebar className="border-r border-border bg-[#121212] text-white">
      <SidebarHeader className="px-6 py-5 flex items-center gap-2">
        <Logo />
        <span className="font-semibold text-lg">Email Classifier</span>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => navigate(item.path)}
                    className={cn(
                      "flex items-center gap-3 text-sm px-3",
                      item.active ? "bg-emerald-500/20 text-emerald-400" : "hover:bg-white/10"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-white/10 px-3 py-4">
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => window.location.href = "mailto:support@emailclassifier.com"}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-white/10 w-full text-left"
          >
            <Mail size={18} />
            <span>Contact Support</span>
          </button>
          <button 
            onClick={() => {
              // Future logout functionality
              navigate("/");
            }}
            className="flex items-center gap-2 text-sm px-3 py-2 rounded-md hover:bg-white/10 w-full text-left text-red-400"
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}


import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'active' | 'offline' | 'away';
}

const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Customer Support Lead',
    email: 'alex.johnson@example.com',
    avatar: '/placeholder.svg',
    status: 'active'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Technical Support',
    email: 'sarah.williams@example.com',
    avatar: '/placeholder.svg',
    status: 'active'
  },
  {
    id: '3',
    name: 'Miguel Rodriguez',
    role: 'Billing Support',
    email: 'miguel.rodriguez@example.com',
    avatar: '/placeholder.svg',
    status: 'offline'
  },
  {
    id: '4',
    name: 'Priya Patel',
    role: 'Product Support',
    email: 'priya.patel@example.com',
    avatar: '/placeholder.svg',
    status: 'away'
  }
];

const TeamDetails = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Team Details</h1>
        <Badge className="bg-emerald-500 hover:bg-emerald-600">{teamMembers.length} Team Members</Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <img src={member.avatar} alt={member.name} />
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={member.status === 'active' ? 'default' : 'outline'}
                  className={
                    member.status === 'active' 
                      ? 'bg-green-500 hover:bg-green-600'
                      : member.status === 'away'
                        ? 'text-yellow-500 border-yellow-500' 
                        : 'text-gray-500 border-gray-500'
                  }
                >
                  {member.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{member.email}</p>
              <div className="flex justify-between mt-4">
                <button className="text-xs text-primary hover:underline">
                  Message
                </button>
                <button className="text-xs text-primary hover:underline">
                  View Profile
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;

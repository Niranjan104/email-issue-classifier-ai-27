
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { PlusCircle, UserPlus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: 'active' | 'offline' | 'away';
  issuesSolved: number;
}

interface Team {
  id: string;
  name: string;
  category: string;
  memberCount: number;
  members: TeamMember[];
}

// Real but empty data to start with - no dummy data
const initialTeams: Team[] = [];

const TeamDetails = () => {
  const { toast } = useToast();
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamCategory, setNewTeamCategory] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('');
  
  // Categories for teams/classification
  const categories = [
    'Technical',
    'Billing',
    'Account',
    'Product',
    'Feature Request',
    'Bug Report',
    'General Inquiry',
    'Other',
    'Customer Service',
    'Sales'
  ];
  
  const handleAddTeam = () => {
    if (!newTeamName || !newTeamCategory) {
      toast({
        title: "Error",
        description: "Team name and category are required",
        variant: "destructive"
      });
      return;
    }
    
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: newTeamName,
      category: newTeamCategory,
      memberCount: 0,
      members: []
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    setNewTeamCategory('');
    
    toast({
      title: "Team Added",
      description: `${newTeamName} team has been created successfully.`
    });
  };
  
  const handleAddMember = () => {
    if (!selectedTeam) {
      toast({
        title: "Error",
        description: "Please select a team first",
        variant: "destructive"
      });
      return;
    }
    
    if (!newMemberName || !newMemberEmail || !newMemberRole) {
      toast({
        title: "Error",
        description: "Name, email and role are required",
        variant: "destructive"
      });
      return;
    }
    
    const newMember: TeamMember = {
      id: `member-${Date.now()}`,
      name: newMemberName,
      email: newMemberEmail,
      role: newMemberRole,
      status: 'active',
      issuesSolved: 0
    };
    
    // Clone and update teams
    const updatedTeams = teams.map(team => {
      if (team.id === selectedTeam.id) {
        return {
          ...team,
          members: [...team.members, newMember],
          memberCount: team.members.length + 1
        };
      }
      return team;
    });
    
    setTeams(updatedTeams);
    
    // Update selected team
    const updatedSelectedTeam = updatedTeams.find(team => team.id === selectedTeam.id);
    if (updatedSelectedTeam) {
      setSelectedTeam(updatedSelectedTeam);
    }
    
    setNewMemberName('');
    setNewMemberEmail('');
    setNewMemberRole('');
    
    toast({
      title: "Team Member Added",
      description: `${newMemberName} has been added to ${selectedTeam.name}.`
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Team Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Team
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team</DialogTitle>
              <DialogDescription>
                Create a new team to handle specific categories of issues.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input 
                  id="team-name" 
                  value={newTeamName} 
                  onChange={(e) => setNewTeamName(e.target.value)} 
                  placeholder="Enter team name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-category">Issue Category</Label>
                <Select 
                  value={newTeamCategory} 
                  onValueChange={setNewTeamCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button 
                className="bg-emerald-500 hover:bg-emerald-600" 
                onClick={handleAddTeam}
              >
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {teams.length === 0 ? (
        <Card className="text-center p-8">
          <CardContent>
            <p className="text-muted-foreground mb-4">No teams have been created yet.</p>
            <p className="text-sm">Create a team to manage specific categories of customer issues.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Teams</CardTitle>
                <CardDescription>Select a team to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {teams.map((team) => (
                    <div 
                      key={team.id}
                      className={`p-3 rounded-md cursor-pointer border transition-colors ${selectedTeam?.id === team.id ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950' : 'border-border hover:bg-muted'}`}
                      onClick={() => setSelectedTeam(team)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">{team.name}</h3>
                          <p className="text-sm text-muted-foreground">Category: {team.category}</p>
                        </div>
                        <Badge>{team.memberCount} member{team.memberCount !== 1 ? 's' : ''}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            {selectedTeam ? (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{selectedTeam.name}</CardTitle>
                    <CardDescription>Category: {selectedTeam.category}</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                        <DialogDescription>
                          Add a new member to {selectedTeam.name} team.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="member-name">Name</Label>
                          <Input 
                            id="member-name" 
                            value={newMemberName} 
                            onChange={(e) => setNewMemberName(e.target.value)} 
                            placeholder="Enter member name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-email">Email</Label>
                          <Input 
                            id="member-email" 
                            type="email"
                            value={newMemberEmail} 
                            onChange={(e) => setNewMemberEmail(e.target.value)} 
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="member-role">Role</Label>
                          <Input 
                            id="member-role" 
                            value={newMemberRole} 
                            onChange={(e) => setNewMemberRole(e.target.value)} 
                            placeholder="Enter role (e.g. Support Agent)"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button 
                          className="bg-emerald-500 hover:bg-emerald-600" 
                          onClick={handleAddMember}
                        >
                          Add Member
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  {selectedTeam.members.length === 0 ? (
                    <div className="text-center p-4">
                      <p className="text-muted-foreground">No team members yet.</p>
                      <p className="text-sm mt-2">Add team members to handle issues in this category.</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Issues Solved</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedTeam.members.map((member) => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>
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
                            </TableCell>
                            <TableCell className="text-right">{member.issuesSolved}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-10">
                  <p className="text-muted-foreground">Select a team to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamDetails;

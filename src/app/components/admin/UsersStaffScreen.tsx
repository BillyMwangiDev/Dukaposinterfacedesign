import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Users, UserPlus, Shield, Clock } from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  status: "active" | "inactive";
  lastLogin: string;
}

const mockStaff: StaffMember[] = [
  {
    id: "1",
    name: "Jane Wanjiru",
    role: "Manager",
    email: "jane@mwangaza.co.ke",
    status: "active",
    lastLogin: "2 hours ago",
  },
  {
    id: "2",
    name: "John Kamau",
    role: "Cashier",
    email: "john@mwangaza.co.ke",
    status: "active",
    lastLogin: "30 minutes ago",
  },
  {
    id: "3",
    name: "Mary Akinyi",
    role: "Stock Keeper",
    email: "mary@mwangaza.co.ke",
    status: "active",
    lastLogin: "1 hour ago",
  },
  {
    id: "4",
    name: "Peter Odhiambo",
    role: "Cashier",
    email: "peter@mwangaza.co.ke",
    status: "inactive",
    lastLogin: "3 days ago",
  },
];

export function UsersStaffScreen() {
  const getRoleBadge = (role: string) => {
    if (role === "Manager") {
      return <Badge className="bg-purple-500">Manager</Badge>;
    } else if (role === "Cashier") {
      return <Badge className="bg-blue-500">Cashier</Badge>;
    }
    return <Badge variant="outline">{role}</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users & Staff Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage team members, roles, and permissions
          </p>
        </div>
        <Button className="bg-[#43B02A] hover:bg-[#3a9824]">
          <UserPlus className="mr-2 size-4" />
          Add Staff Member
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono']">4</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all roles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
            <Clock className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono'] text-emerald-500">
              3
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Currently logged in
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Roles</CardTitle>
            <Shield className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono']">3</div>
            <p className="text-xs text-muted-foreground mt-1">
              Manager, Cashier, Stock Keeper
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Staff Table */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Members</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            View and manage your team
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockStaff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.email}
                  </TableCell>
                  <TableCell>{getRoleBadge(member.role)}</TableCell>
                  <TableCell>
                    {member.status === "active" ? (
                      <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-400 text-gray-400">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {member.lastLogin}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="size-5" />
            Role Permissions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-3">
            <Badge className="bg-purple-500">Manager</Badge>
            <p className="text-sm text-muted-foreground">
              Full access to all features including reports, settings, and user management
            </p>
          </div>
          <div className="flex gap-3">
            <Badge className="bg-blue-500">Cashier</Badge>
            <p className="text-sm text-muted-foreground">
              Can process sales, manage cart, and handle payments
            </p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline">Stock Keeper</Badge>
            <p className="text-sm text-muted-foreground">
              Can manage inventory, add products, and update stock levels
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Switch } from "@/app/components/ui/switch";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Settings, Database, Download, CheckCircle2, Clock, HardDrive } from "lucide-react";

interface Backup {
  id: string;
  date: string;
  time: string;
  size: string;
  status: "completed" | "failed";
}

const mockBackups: Backup[] = [
  {
    id: "1",
    date: "2026-01-31",
    time: "08:00 AM",
    size: "45 MB",
    status: "completed",
  },
  {
    id: "2",
    date: "2026-01-30",
    time: "08:00 AM",
    size: "44 MB",
    status: "completed",
  },
  {
    id: "3",
    date: "2026-01-29",
    time: "08:00 AM",
    size: "43 MB",
    status: "completed",
  },
  {
    id: "4",
    date: "2026-01-28",
    time: "08:00 AM",
    size: "42 MB",
    status: "completed",
  },
];

export function SettingsBackupsScreen() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Settings & Backups</h1>
        <p className="text-muted-foreground mt-1">
          Configure system settings and manage data backups
        </p>
      </div>

      {/* General Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="size-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <p className="text-sm text-muted-foreground">
                Enable dark mode for better visibility in low light
              </p>
            </div>
            <Switch id="dark-mode" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-print">Auto-Print Receipts</Label>
              <p className="text-sm text-muted-foreground">
                Automatically print receipt after each sale
              </p>
            </div>
            <Switch id="auto-print" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="sound">Sound Effects</Label>
              <p className="text-sm text-muted-foreground">
                Play sounds for scan, errors, and success
              </p>
            </div>
            <Switch id="sound" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="low-stock">Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when items are running low
              </p>
            </div>
            <Switch id="low-stock" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Shop Information */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input id="shop-name" defaultValue="Mwangaza Wholesalers" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="kra-pin">KRA PIN</Label>
            <Input
              id="kra-pin"
              defaultValue="P051234567X"
              className="font-['JetBrains_Mono']"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="till-number">M-Pesa Till Number</Label>
            <Input
              id="till-number"
              defaultValue="5112345"
              className="font-['JetBrains_Mono']"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Contact Phone</Label>
            <Input
              id="phone"
              defaultValue="+254 712 345 678"
              className="font-['JetBrains_Mono']"
            />
          </div>

          <Button className="bg-[#43B02A] hover:bg-[#3a9824]">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Backup Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="size-5" />
            Automatic Backups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-backup">Enable Automatic Backups</Label>
              <p className="text-sm text-muted-foreground">
                Daily backups at 8:00 AM
              </p>
            </div>
            <Switch id="auto-backup" defaultChecked />
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="size-5 text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Backup Status: Active</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Last backup: Today at 8:00 AM (45 MB)
                </p>
              </div>
            </div>
          </div>

          <Button size="lg" variant="outline" className="w-full">
            <Download className="mr-2 size-5" />
            Create Manual Backup Now
          </Button>
        </CardContent>
      </Card>

      {/* Backup History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <HardDrive className="size-5" />
                Backup History
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Recent database backups
              </p>
            </div>
            <Badge variant="outline" className="font-['JetBrains_Mono']">
              {mockBackups.length} Backups
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockBackups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-['JetBrains_Mono'] text-sm">
                    {backup.date}
                  </TableCell>
                  <TableCell className="font-['JetBrains_Mono'] text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="size-3 text-muted-foreground" />
                      {backup.time}
                    </div>
                  </TableCell>
                  <TableCell className="font-['JetBrains_Mono']">
                    {backup.size}
                  </TableCell>
                  <TableCell>
                    {backup.status === "completed" ? (
                      <Badge variant="outline" className="border-emerald-500 text-emerald-500">
                        <CheckCircle2 className="size-3 mr-1" />
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="destructive">Failed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Info */}
      <Card>
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version:</span>
              <span className="font-['JetBrains_Mono']">v1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Database Size:</span>
              <span className="font-['JetBrains_Mono']">45 MB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Products:</span>
              <span className="font-['JetBrains_Mono']">15</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Sales (All Time):</span>
              <span className="font-['JetBrains_Mono']">Ksh 2,450,000</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

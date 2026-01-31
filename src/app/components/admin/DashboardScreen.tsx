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
import { DollarSign, TrendingUp, Receipt, Monitor, AlertCircle, Download, Database, Package } from "lucide-react";
import { Product } from "@/app/components/InventoryManagement";

interface DailyStats {
  totalCash: number;
  totalMpesa: number;
  netProfit: number;
  vatCollected: number;
  activeTills: number;
}

interface DashboardScreenProps {
  stats: DailyStats;
  lowStockProducts: Product[];
  onGenerateZReport: () => void;
  onManualBackup: () => void;
}

export function DashboardScreen({
  stats,
  lowStockProducts,
  onGenerateZReport,
  onManualBackup,
}: DashboardScreenProps) {
  const totalToday = stats.totalCash + stats.totalMpesa;

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Daily Health Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time overview of today's operations
        </p>
      </div>

      {/* Top Row - Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Today */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Today</CardTitle>
            <DollarSign className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono']">
              Ksh {totalToday.toLocaleString()}
            </div>
            <div className="mt-2 space-y-1">
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>Cash:</span>
                <span className="font-['JetBrains_Mono']">
                  Ksh {stats.totalCash.toLocaleString()}
                </span>
              </div>
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>M-Pesa:</span>
                <span className="font-['JetBrains_Mono']">
                  Ksh {stats.totalMpesa.toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Profit */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="size-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500 font-['JetBrains_Mono']">
              Ksh {stats.netProfit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              After all deductions
            </p>
          </CardContent>
        </Card>

        {/* VAT Collected */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">VAT Collected</CardTitle>
            <Receipt className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono']">
              Ksh {stats.vatCollected.toLocaleString()}
            </div>
            <div className="mt-2">
              <Badge variant="outline" className="text-xs">
                eTIMS Ready
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Active Tills */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tills</CardTitle>
            <Monitor className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-['JetBrains_Mono']">
              {stats.activeTills}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Computers currently selling
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section - Stock Alerts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="size-5 text-rose-500" />
                Low Stock Alerts
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Items that need immediate reordering
              </p>
            </div>
            <Badge variant="destructive" className="font-['JetBrains_Mono']">
              {lowStockProducts.length} Items
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="size-12 mx-auto mb-3 opacity-20" />
              <p>All items are well stocked!</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Remaining Qty</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span className="font-['JetBrains_Mono'] text-rose-500 font-semibold">
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="destructive">Reorder</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Bottom Section - Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="size-5" />
              Generate Z-Report
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              End-of-day sales summary report
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              className="w-full bg-[#43B02A] hover:bg-[#3a9824]"
              onClick={onGenerateZReport}
            >
              <Download className="mr-2 size-5" />
              Generate Z-Report
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              This will close the current shift and generate a comprehensive sales report
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="size-5" />
              Manual Database Backup
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Secure your data with a manual backup
            </p>
          </CardHeader>
          <CardContent>
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              onClick={onManualBackup}
            >
              <Database className="mr-2 size-5" />
              Backup Now
            </Button>
            <p className="text-xs text-muted-foreground mt-3">
              Last backup: Today at 8:00 AM
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
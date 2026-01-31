import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Button } from "@/app/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Download, Calendar, TrendingUp, DollarSign } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

interface SalesData {
  date: string;
  cash: number;
  mpesa: number;
  total: number;
}

interface TopProduct {
  name: string;
  quantity: number;
  revenue: number;
}

const dailyData: SalesData[] = [
  { date: "Mon", cash: 45000, mpesa: 32000, total: 77000 },
  { date: "Tue", cash: 52000, mpesa: 38000, total: 90000 },
  { date: "Wed", cash: 48000, mpesa: 41000, total: 89000 },
  { date: "Thu", cash: 61000, mpesa: 45000, total: 106000 },
  { date: "Fri", cash: 73000, mpesa: 52000, total: 125000 },
  { date: "Sat", cash: 85000, mpesa: 61000, total: 146000 },
  { date: "Sun", cash: 67000, mpesa: 48000, total: 115000 },
];

const monthlyData: SalesData[] = [
  { date: "Week 1", cash: 280000, mpesa: 195000, total: 475000 },
  { date: "Week 2", cash: 315000, mpesa: 220000, total: 535000 },
  { date: "Week 3", cash: 298000, mpesa: 210000, total: 508000 },
  { date: "Week 4", cash: 340000, mpesa: 245000, total: 585000 },
];

const topProducts: TopProduct[] = [
  { name: "Unga Soko 2kg", quantity: 234, revenue: 42120 },
  { name: "Brookside Milk 500ml", quantity: 189, revenue: 12285 },
  { name: "Coca Cola 500ml", quantity: 456, revenue: 22800 },
  { name: "Blue Band 500g", quantity: 145, revenue: 31900 },
  { name: "Mumias Sugar 1kg", quantity: 112, revenue: 16800 },
];

export function SalesReportsScreen() {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sales Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive sales analytics and trends
          </p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 size-4" />
          Export Report
        </Button>
      </div>

      {/* Tabbed Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="yearly">Yearly</TabsTrigger>
        </TabsList>

        {/* Daily Tab */}
        <TabsContent value="daily" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week Total</CardTitle>
                <DollarSign className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono']">
                  Ksh 748,000
                </div>
                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                  <TrendingUp className="size-3" />
                  +12.5% from last week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Daily</CardTitle>
                <Calendar className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono']">
                  Ksh 106,857
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Based on 7-day average
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Best Day</CardTitle>
                <TrendingUp className="size-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono']">
                  Saturday
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ksh 146,000 in sales
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Daily Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Breakdown</CardTitle>
              <p className="text-sm text-muted-foreground">
                Cash vs M-Pesa payments over the week
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyData}>
                  <defs>
                    <linearGradient id="colorCash" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                    </linearGradient>
                    <linearGradient id="colorMpesa" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#43B02A" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#43B02A" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cash"
                    stackId="1"
                    stroke="#2563EB"
                    fillOpacity={1}
                    fill="url(#colorCash)"
                    name="Cash"
                  />
                  <Area
                    type="monotone"
                    dataKey="mpesa"
                    stackId="1"
                    stroke="#43B02A"
                    fillOpacity={1}
                    fill="url(#colorMpesa)"
                    name="M-Pesa"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
              <p className="text-sm text-muted-foreground">
                Best performing items this week
              </p>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead className="text-right">Quantity Sold</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topProducts.map((product, index) => (
                    <TableRow key={product.name}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">#{index + 1}</Badge>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-['JetBrains_Mono']">
                        {product.quantity}
                      </TableCell>
                      <TableCell className="text-right font-['JetBrains_Mono']">
                        Ksh {product.revenue.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Tab */}
        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales Trend</CardTitle>
              <p className="text-sm text-muted-foreground">
                Weekly breakdown for the current month
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="cash" fill="#2563EB" name="Cash" />
                  <Bar dataKey="mpesa" fill="#43B02A" name="M-Pesa" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Month Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono']">
                  Ksh 2,103,000
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Cash Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#2563EB]">
                  Ksh 1,233,000
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">M-Pesa Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-['JetBrains_Mono'] text-[#43B02A]">
                  Ksh 870,000
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Yearly Tab */}
        <TabsContent value="yearly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Overview</CardTitle>
              <p className="text-sm text-muted-foreground">
                Annual sales performance - Coming Soon
              </p>
            </CardHeader>
            <CardContent className="h-64 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <Calendar className="size-12 mx-auto mb-3 opacity-20" />
                <p>Yearly reports will be available after 12 months of operation</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

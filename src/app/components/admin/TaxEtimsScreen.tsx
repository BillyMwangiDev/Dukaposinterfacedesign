import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import { Download, Calendar as CalendarIcon, FileText, CheckCircle2, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/app/components/ui/utils";
import * as XLSX from "xlsx";

interface TaxRecord {
  invoiceNo: string;
  date: string;
  totalGross: number;
  taxAmount: number;
  buyerPin: string;
  paymentMethod: string;
}

const mockTaxRecords: TaxRecord[] = [
  {
    invoiceNo: "INV-2026-001",
    date: "2026-01-31",
    totalGross: 2500,
    taxAmount: 400,
    buyerPin: "A001234567X",
    paymentMethod: "Cash",
  },
  {
    invoiceNo: "INV-2026-002",
    date: "2026-01-31",
    totalGross: 4800,
    taxAmount: 768,
    buyerPin: "P009876543Y",
    paymentMethod: "M-Pesa",
  },
  {
    invoiceNo: "INV-2026-003",
    date: "2026-01-30",
    totalGross: 1250,
    taxAmount: 200,
    buyerPin: "A001234567X",
    paymentMethod: "Cash",
  },
  {
    invoiceNo: "INV-2026-004",
    date: "2026-01-30",
    totalGross: 3600,
    taxAmount: 576,
    buyerPin: "P012345678Z",
    paymentMethod: "M-Pesa",
  },
  {
    invoiceNo: "INV-2026-005",
    date: "2026-01-29",
    totalGross: 5200,
    taxAmount: 832,
    buyerPin: "A009988776X",
    paymentMethod: "Cash",
  },
];

export function TaxEtimsScreen() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleExportKRA = () => {
    const exportData = mockTaxRecords.map(record => ({
      "Invoice No": record.invoiceNo,
      "Date": record.date,
      "Total Gross (Ksh)": record.totalGross,
      "Tax Amount (Ksh)": record.taxAmount,
      "Buyer PIN": record.buyerPin,
      "Payment Method": record.paymentMethod,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "eTIMS Export");
    
    const dateRange = startDate && endDate
      ? `${format(startDate, "yyyy-MM-dd")}_to_${format(endDate, "yyyy-MM-dd")}`
      : "all";
    
    XLSX.writeFile(wb, `eTIMS_KRA_Export_${dateRange}.xlsx`);
  };

  const totalGross = mockTaxRecords.reduce((sum, r) => sum + r.totalGross, 0);
  const totalTax = mockTaxRecords.reduce((sum, r) => sum + r.taxAmount, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Tax & eTIMS Readiness</h1>
        <p className="text-muted-foreground mt-1">
          Export tax records for Kenya Revenue Authority compliance
        </p>
      </div>

      {/* Info Banner */}
      <Card className="border-[#43B02A] bg-[#43B02A]/5">
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <CheckCircle2 className="size-5 text-[#43B02A] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-[#43B02A] mb-1">
                eTIMS Integration Ready
              </h3>
              <p className="text-sm text-muted-foreground">
                Your sales data is automatically formatted for KRA eTIMS submission. 
                Export the CSV file and upload it directly to the eTIMS portal.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Tool */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="size-5" />
            eTIMS Export Tool
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Select a date range and export your tax records
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Date Range Picker */}
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 size-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              size="lg"
              className="bg-[#43B02A] hover:bg-[#3a9824] w-full md:w-auto"
              onClick={handleExportKRA}
            >
              <Download className="mr-2 size-5" />
              Download KRA CSV
            </Button>
          </div>

          {/* Summary Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total Gross Sales</p>
              <p className="text-2xl font-bold font-['JetBrains_Mono']">
                Ksh {totalGross.toLocaleString()}
              </p>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-1">Total VAT Collected</p>
              <p className="text-2xl font-bold font-['JetBrains_Mono'] text-[#43B02A]">
                Ksh {totalTax.toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Export Preview</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Sample of records that will be exported
              </p>
            </div>
            <Badge variant="outline" className="font-['JetBrains_Mono']">
              {mockTaxRecords.length} Records
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Total Gross</TableHead>
                <TableHead className="text-right">Tax Amount</TableHead>
                <TableHead>Buyer PIN</TableHead>
                <TableHead>Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTaxRecords.map((record) => (
                <TableRow key={record.invoiceNo}>
                  <TableCell className="font-['JetBrains_Mono'] text-sm">
                    {record.invoiceNo}
                  </TableCell>
                  <TableCell className="font-['JetBrains_Mono'] text-sm">
                    {record.date}
                  </TableCell>
                  <TableCell className="text-right font-['JetBrains_Mono']">
                    Ksh {record.totalGross.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-['JetBrains_Mono']">
                    Ksh {record.taxAmount.toLocaleString()}
                  </TableCell>
                  <TableCell className="font-['JetBrains_Mono'] text-xs">
                    {record.buyerPin}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        record.paymentMethod === "M-Pesa"
                          ? "border-[#43B02A] text-[#43B02A]"
                          : "border-[#2563EB] text-[#2563EB]"
                      }
                    >
                      {record.paymentMethod}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* KRA Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="size-5 text-blue-500" />
            KRA eTIMS Submission Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex gap-2">
            <span className="text-muted-foreground">1.</span>
            <p>Download the CSV file for your desired date range</p>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">2.</span>
            <p>Log in to the KRA eTIMS portal at <code className="bg-muted px-1 py-0.5 rounded">etims.kra.go.ke</code></p>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">3.</span>
            <p>Navigate to "Bulk Upload" section</p>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">4.</span>
            <p>Upload the CSV file and submit for processing</p>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">5.</span>
            <p>Wait for KRA confirmation email (usually within 24 hours)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

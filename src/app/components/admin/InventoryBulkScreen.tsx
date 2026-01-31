import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Badge } from "@/app/components/ui/badge";
import { Product } from "@/app/components/InventoryManagement";
import { Upload, Download, Search, FileSpreadsheet, X } from "lucide-react";
import * as XLSX from "xlsx";

interface InventoryBulkScreenProps {
  products: Product[];
  onImport: (products: Product[]) => void;
  onExport: () => void;
}

export function InventoryBulkScreen({
  products,
  onImport,
  onExport,
}: InventoryBulkScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const categories = ["all", ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.barcode.includes(searchQuery);
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleDownloadTemplate = () => {
    const template = [
      {
        Name: "Example Product",
        Barcode: "1234567890123",
        Category: "General",
        Stock: 100,
        "Buying Price": 50,
        "Selling Price": 75,
      },
    ];

    const ws = XLSX.utils.json_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Products");
    XLSX.writeFile(wb, "DukaPOS_Import_Template.xlsx");
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        // Transform imported data to Product format
        const importedProducts: Product[] = jsonData.map((row: any, index) => ({
          id: `import-${Date.now()}-${index}`,
          name: row.Name || row.name,
          barcode: String(row.Barcode || row.barcode),
          category: row.Category || row.category,
          stock: Number(row.Stock || row.stock) || 0,
          buyingPrice: Number(row["Buying Price"] || row.buyingPrice) || 0,
          sellingPrice: Number(row["Selling Price"] || row.sellingPrice) || 0,
        }));

        onImport(importedProducts);
        setIsImportModalOpen(false);
      } catch (error) {
        console.error("Error parsing Excel file:", error);
        alert("Error parsing file. Please check the format.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith(".xlsx")) {
      handleFileUpload(file);
    }
  };

  const handleExportAll = () => {
    const exportData = products.map(p => ({
      Name: p.name,
      Barcode: p.barcode,
      Category: p.category,
      Stock: p.stock,
      "Buying Price": p.buyingPrice,
      "Selling Price": p.sellingPrice,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Inventory");
    XLSX.writeFile(wb, `DukaPOS_Inventory_${new Date().toISOString().split('T')[0]}.xlsx`);
    onExport();
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock <= 10) {
      return <Badge className="bg-orange-500">Low Stock</Badge>;
    }
    return <Badge variant="outline">In Stock</Badge>;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Inventory & Bulk Import</h1>
        <p className="text-muted-foreground mt-1">
          Manage stock levels and import products in bulk
        </p>
      </div>

      {/* Search & Filter Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search by barcode or product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          size="lg"
          className="bg-[#43B02A] hover:bg-[#3a9824]"
          onClick={() => setIsImportModalOpen(true)}
        >
          <Upload className="mr-2 size-5" />
          Import Excel
        </Button>
        <Button size="lg" variant="outline" onClick={handleExportAll}>
          <Download className="mr-2 size-5" />
          Export All
        </Button>
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Inventory</CardTitle>
            <Badge variant="outline" className="font-['JetBrains_Mono']">
              {filteredProducts.length} Products
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Buying Price</TableHead>
                <TableHead className="text-right">Selling Price</TableHead>
                <TableHead className="text-right">Stock Level</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-['JetBrains_Mono'] text-xs">
                    {product.barcode}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-['JetBrains_Mono']">
                    Ksh {product.buyingPrice}
                  </TableCell>
                  <TableCell className="text-right font-['JetBrains_Mono']">
                    Ksh {product.sellingPrice}
                  </TableCell>
                  <TableCell className="text-right font-['JetBrains_Mono'] font-semibold">
                    {product.stock}
                  </TableCell>
                  <TableCell className="text-right">
                    {getStockBadge(product.stock)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Import Modal */}
      <Dialog open={isImportModalOpen} onOpenChange={setIsImportModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileSpreadsheet className="size-5 text-[#43B02A]" />
              Import Products from Excel
            </DialogTitle>
            <DialogDescription>
              Download the template, fill in your product data, and upload the file
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Download Template */}
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Step 1: Download Template</h4>
              <Button variant="outline" onClick={handleDownloadTemplate}>
                <Download className="mr-2 size-4" />
                Download Template.xlsx
              </Button>
            </div>

            {/* Upload Zone */}
            <div className="space-y-2">
              <h4 className="font-medium">Step 2: Upload Your File</h4>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging
                    ? "border-[#43B02A] bg-[#43B02A]/5"
                    : "border-muted-foreground/25"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop your Excel file here, or click to browse
                </p>
                <input
                  type="file"
                  accept=".xlsx"
                  className="hidden"
                  id="file-upload"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  Browse Files
                </Button>
              </div>
            </div>

            {/* Preview Table */}
            <div className="bg-muted p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Expected Columns:</h4>
              <div className="font-['JetBrains_Mono'] text-xs space-y-1">
                <div>• Name, Barcode, Category</div>
                <div>• Stock, Buying Price, Selling Price</div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

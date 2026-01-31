import { useState } from "react";
import { Plus, Upload, Filter, Edit, Trash2 } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Card } from "@/app/components/ui/card";

export interface Product {
  id: string;
  name: string;
  barcode: string;
  category: string;
  stock: number;
  buyingPrice: number;
  sellingPrice: number;
}

interface InventoryManagementProps {
  products: Product[];
  onAddProduct: () => void;
  onImportExcel: () => void;
  onEditProduct: (id: string) => void;
  onDeleteProduct: (id: string) => void;
}

export function InventoryManagement({
  products,
  onAddProduct,
  onImportExcel,
  onEditProduct,
  onDeleteProduct,
}: InventoryManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.barcode.includes(searchQuery);
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesStock = stockFilter === "all" || 
                        (stockFilter === "low" && product.stock < 5) ||
                        (stockFilter === "good" && product.stock >= 5);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Out of Stock</Badge>;
    } else if (stock < 5) {
      return <Badge className="bg-orange-500">Low Stock</Badge>;
    } else if (stock < 10) {
      return <Badge className="bg-yellow-500">Medium</Badge>;
    } else {
      return <Badge className="bg-green-500">In Stock</Badge>;
    }
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-2xl font-bold">Inventory Management</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredProducts.length} of {products.length} products
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={onImportExcel}
          >
            <Upload className="size-4" />
            Import Excel
          </Button>
          <Button
            className="gap-2 bg-[#43B02A] hover:bg-[#43B02A]/90"
            onClick={onAddProduct}
          >
            <Plus className="size-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-4 p-6 border-b">
        <div className="flex-1">
          <Input
            placeholder="Search by name or barcode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Stock Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock Levels</SelectItem>
            <SelectItem value="low">Low Stock Only</SelectItem>
            <SelectItem value="good">Good Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto p-6">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead className="text-right">Buying Price</TableHead>
                <TableHead className="text-right">Selling Price</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => {
                const margin = ((product.sellingPrice - product.buyingPrice) / product.buyingPrice * 100).toFixed(1);
                return (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="font-mono text-sm">{product.barcode}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getStockBadge(product.stock)}
                        <span className="text-sm font-mono">{product.stock}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      KSh {product.buyingPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right font-mono">
                      KSh {product.sellingPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary">{margin}%</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => onEditProduct(product.id)}
                        >
                          <Edit className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 hover:bg-[#E11D48]/10 hover:text-[#E11D48]"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}

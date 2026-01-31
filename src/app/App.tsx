import { useState, useEffect } from "react";
import { Header } from "@/app/components/Header";
import { CartSection, CartItem } from "@/app/components/CartSection";
import { CommandCenter } from "@/app/components/CommandCenter";
import { PaymentModal } from "@/app/components/PaymentModal";
import { InventoryManagement, Product } from "@/app/components/InventoryManagement";
import { AdminDashboard } from "@/app/components/admin/AdminDashboard";
import { Toaster, toast } from "sonner";
import { Button } from "@/app/components/ui/button";
import { ShoppingCart, Package, LayoutDashboard } from "lucide-react";

// Mock Products Database
const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Unga Soko 2kg", barcode: "6001087340015", category: "Flour", stock: 45, buyingPrice: 140, sellingPrice: 180 },
  { id: "2", name: "Brookside Milk 500ml", barcode: "6009705110014", category: "Dairy", stock: 23, buyingPrice: 50, sellingPrice: 65 },
  { id: "3", name: "Mumias Sugar 1kg", barcode: "6001010310016", category: "Sugar", stock: 3, buyingPrice: 120, sellingPrice: 150 },
  { id: "4", name: "Pembe Maize Flour 2kg", barcode: "6001087340022", category: "Flour", stock: 67, buyingPrice: 145, sellingPrice: 185 },
  { id: "5", name: "Fresh Milk 1L", barcode: "6009705110021", category: "Dairy", stock: 12, buyingPrice: 95, sellingPrice: 120 },
  { id: "6", name: "Kabras Sugar 2kg", barcode: "6001010310023", category: "Sugar", stock: 8, buyingPrice: 230, sellingPrice: 280 },
  { id: "7", name: "Blue Band 500g", barcode: "6001087350013", category: "Margarine", stock: 34, buyingPrice: 180, sellingPrice: 220 },
  { id: "8", name: "Royco Mchuzi Mix", barcode: "6001087360012", category: "Spices", stock: 56, buyingPrice: 8, sellingPrice: 15 },
  { id: "9", name: "Omo Washing Powder 2kg", barcode: "6001087370019", category: "Detergent", stock: 0, buyingPrice: 320, sellingPrice: 400 },
  { id: "10", name: "Coca Cola 500ml", barcode: "5449000000996", category: "Beverages", stock: 89, buyingPrice: 35, sellingPrice: 50 },
  { id: "11", name: "Bread Loaf", barcode: "6001010320015", category: "Bakery", stock: 15, buyingPrice: 40, sellingPrice: 55 },
  { id: "12", name: "Rice 1kg", barcode: "6001087380016", category: "Grains", stock: 41, buyingPrice: 120, sellingPrice: 155 },
  { id: "13", name: "Cooking Oil 1L", barcode: "6001087390013", category: "Oils", stock: 2, buyingPrice: 210, sellingPrice: 265 },
  { id: "14", name: "Tea Leaves 250g", barcode: "6001087400019", category: "Beverages", stock: 28, buyingPrice: 75, sellingPrice: 95 },
  { id: "15", name: "Salt 500g", barcode: "6001087410016", category: "Spices", stock: 71, buyingPrice: 25, sellingPrice: 35 },
];

export default function App() {
  const [currentView, setCurrentView] = useState<"checkout" | "inventory" | "admin">("checkout");
  const [darkMode, setDarkMode] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [lastScannedId, setLastScannedId] = useState<string | undefined>();
  const [numpadValue, setNumpadValue] = useState("");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "mpesa">("cash");
  const [isOnline, setIsOnline] = useState(true);
  const [isPrinterConnected, setIsPrinterConnected] = useState(true);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "F2") {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        searchInput?.focus();
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const product = MOCK_PRODUCTS.find(
      p => p.barcode === query || p.name.toLowerCase().includes(query.toLowerCase())
    );

    if (product) {
      if (product.stock === 0) {
        toast.error("Product out of stock!", {
          description: `${product.name} is currently unavailable`,
        });
        return;
      }

      const existingItem = cart.find(item => item.id === product.id);
      
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ));
      } else {
        setCart([...cart, {
          id: product.id,
          name: product.name,
          barcode: product.barcode,
          price: product.sellingPrice,
          quantity: 1,
        }]);
      }

      setLastScannedId(product.id);
      setTimeout(() => setLastScannedId(undefined), 2000);

      toast.success("Item added to cart", {
        description: product.name,
      });
      
      // Clear search input
      const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
      if (searchInput) searchInput.value = "";
    } else {
      toast.error("Product not found", {
        description: "Check barcode or try searching by name",
      });
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleNumpadClick = (value: string) => {
    if (value === "C") {
      setNumpadValue("");
    } else {
      setNumpadValue(prev => prev + value);
    }
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const vat = subtotal * 0.16;
    const total = subtotal + vat;
    return { subtotal, vat, total };
  };

  const { subtotal, vat, total } = calculateTotals();

  const handleCashPayment = () => {
    setPaymentMethod("cash");
    setIsPaymentModalOpen(true);
  };

  const handleMpesaPayment = () => {
    setPaymentMethod("mpesa");
    setIsPaymentModalOpen(true);
  };

  const handleHoldOrder = () => {
    if (cart.length > 0) {
      toast.success("Order held", {
        description: "Order saved for later",
      });
      setCart([]);
    }
  };

  const handleCompleteSale = (method: string, details?: any) => {
    toast.success("Sale completed!", {
      description: `Payment received via ${method.toUpperCase()}`,
    });
    setCart([]);
    setNumpadValue("");
    setIsPaymentModalOpen(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Toaster position="bottom-center" richColors />
      
      <Header
        onSearch={handleSearch}
        isOnline={isOnline}
        isPrinterConnected={isPrinterConnected}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* View Toggle */}
      <div className="border-b bg-card">
        <div className="flex px-6">
          <Button
            variant={currentView === "checkout" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent data-[active=true]:border-[#43B02A]"
            data-active={currentView === "checkout"}
            onClick={() => setCurrentView("checkout")}
          >
            <ShoppingCart className="mr-2 size-4" />
            Point of Sale
          </Button>
          <Button
            variant={currentView === "inventory" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent data-[active=true]:border-[#43B02A]"
            data-active={currentView === "inventory"}
            onClick={() => setCurrentView("inventory")}
          >
            <Package className="mr-2 size-4" />
            Inventory
          </Button>
          <Button
            variant={currentView === "admin" ? "default" : "ghost"}
            className="rounded-none border-b-2 border-transparent data-[active=true]:border-[#43B02A]"
            data-active={currentView === "admin"}
            onClick={() => setCurrentView("admin")}
          >
            <LayoutDashboard className="mr-2 size-4" />
            Admin
          </Button>
        </div>
      </div>

      {/* Main Content */}
      {currentView === "checkout" ? (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Cart (65%) */}
          <div className="flex-[65] border-r flex flex-col">
            <CartSection
              items={cart}
              lastScannedId={lastScannedId}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>

          {/* Right Panel - Command Center (35%) */}
          <div className="flex-[35] p-6 overflow-y-auto">
            <CommandCenter
              subtotal={subtotal}
              vat={vat}
              total={total}
              numpadValue={numpadValue}
              onNumpadClick={handleNumpadClick}
              onCashPayment={handleCashPayment}
              onMpesaPayment={handleMpesaPayment}
              onHoldOrder={handleHoldOrder}
            />
          </div>
        </div>
      ) : currentView === "inventory" ? (
        <div className="flex-1 overflow-hidden">
          <InventoryManagement
            products={MOCK_PRODUCTS}
            onAddProduct={() => toast.info("Add Product", { description: "Feature coming soon" })}
            onImportExcel={() => toast.info("Import Excel", { description: "Feature coming soon" })}
            onEditProduct={(id) => toast.info("Edit Product", { description: `Editing product ${id}` })}
            onDeleteProduct={(id) => toast.error("Delete Product", { description: "Are you sure?" })}
          />
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          <AdminDashboard products={MOCK_PRODUCTS} isOnline={isOnline} />
        </div>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        total={total}
        onCompleteSale={handleCompleteSale}
        defaultTab={paymentMethod}
      />
    </div>
  );
}
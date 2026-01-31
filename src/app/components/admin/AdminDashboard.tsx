import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import { DashboardScreen } from "./DashboardScreen";
import { SalesReportsScreen } from "./SalesReportsScreen";
import { InventoryBulkScreen } from "./InventoryBulkScreen";
import { TaxEtimsScreen } from "./TaxEtimsScreen";
import { UsersStaffScreen } from "./UsersStaffScreen";
import { SettingsBackupsScreen } from "./SettingsBackupsScreen";
import { Product } from "@/app/components/InventoryManagement";
import { toast } from "sonner";

interface AdminDashboardProps {
  products: Product[];
  isOnline: boolean;
}

export function AdminDashboard({ products, isOnline }: AdminDashboardProps) {
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Mock daily stats
  const dailyStats = {
    totalCash: 85000,
    totalMpesa: 61000,
    netProfit: 43800,
    vatCollected: 23360,
    activeTills: 3,
  };

  // Low stock products (stock <= 10)
  const lowStockProducts = products.filter(p => p.stock <= 10 && p.stock > 0);

  const handleGenerateZReport = () => {
    toast.success("Z-Report Generated", {
      description: "End-of-day report has been created and saved",
    });
  };

  const handleManualBackup = () => {
    toast.success("Backup Complete", {
      description: "Database backup created successfully",
    });
  };

  const handleImportProducts = (importedProducts: Product[]) => {
    toast.success("Import Successful", {
      description: `${importedProducts.length} products imported from Excel`,
    });
  };

  const handleExportProducts = () => {
    toast.success("Export Complete", {
      description: "Inventory exported to Excel successfully",
    });
  };

  const renderCurrentSection = () => {
    switch (currentSection) {
      case "dashboard":
        return (
          <DashboardScreen
            stats={dailyStats}
            lowStockProducts={lowStockProducts}
            onGenerateZReport={handleGenerateZReport}
            onManualBackup={handleManualBackup}
          />
        );
      case "sales":
        return <SalesReportsScreen />;
      case "inventory":
        return (
          <InventoryBulkScreen
            products={products}
            onImport={handleImportProducts}
            onExport={handleExportProducts}
          />
        );
      case "tax":
        return <TaxEtimsScreen />;
      case "users":
        return <UsersStaffScreen />;
      case "settings":
        return <SettingsBackupsScreen />;
      default:
        return <DashboardScreen
          stats={dailyStats}
          lowStockProducts={lowStockProducts}
          onGenerateZReport={handleGenerateZReport}
          onManualBackup={handleManualBackup}
        />;
    }
  };

  return (
    <div className="flex h-full bg-background">
      {/* Sidebar */}
      <AdminSidebar
        currentSection={currentSection}
        onSectionChange={setCurrentSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        shopName="Mwangaza Wholesalers"
        isOnline={isOnline}
      />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {renderCurrentSection()}
      </div>
    </div>
  );
}

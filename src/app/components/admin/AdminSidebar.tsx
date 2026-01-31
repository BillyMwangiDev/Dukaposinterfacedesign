import { cn } from "@/app/components/ui/utils";
import {
  Home,
  BarChart3,
  Package,
  Users,
  FileText,
  Settings,
  ChevronLeft,
  Wifi,
  WifiOff,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ScrollArea } from "@/app/components/ui/scroll-area";

interface AdminSidebarProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  shopName: string;
  isOnline: boolean;
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "sales", label: "Sales Reports", icon: BarChart3 },
  { id: "inventory", label: "Inventory / Stock", icon: Package },
  { id: "users", label: "Users & Staff", icon: Users },
  { id: "tax", label: "Tax & eTIMS", icon: FileText },
  { id: "settings", label: "Settings & Backups", icon: Settings },
];

export function AdminSidebar({
  currentSection,
  onSectionChange,
  isCollapsed,
  onToggleCollapse,
  shopName,
  isOnline,
}: AdminSidebarProps) {
  return (
    <div
      className={cn(
        "h-full bg-card border-r flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className="p-4 border-b">
        {!isCollapsed && (
          <div className="mb-3">
            <h2 className="font-semibold text-lg">{shopName}</h2>
            <div className="flex items-center gap-2 mt-1">
              {isOnline ? (
                <>
                  <Wifi className="size-3 text-emerald-500" />
                  <span className="text-xs text-emerald-500 font-medium">
                    ONLINE (Syncing)
                  </span>
                </>
              ) : (
                <>
                  <WifiOff className="size-3 text-rose-500" />
                  <span className="text-xs text-rose-500 font-medium">
                    OFFLINE
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className="w-full justify-center"
        >
          <ChevronLeft
            className={cn(
              "size-4 transition-transform",
              isCollapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Menu Items */}
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isCollapsed && "justify-center px-2",
                  isActive && "bg-[#43B02A] hover:bg-[#3a9824] text-white"
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className={cn("size-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && <span>{item.label}</span>}
              </Button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}

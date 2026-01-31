import { Search, Wifi, Printer, User, Moon, Sun } from "lucide-react";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface HeaderProps {
  onSearch: (query: string) => void;
  isOnline: boolean;
  isPrinterConnected: boolean;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function Header({ 
  onSearch, 
  isOnline, 
  isPrinterConnected, 
  darkMode,
  onToggleDarkMode 
}: HeaderProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch((e.target as HTMLInputElement).value);
    }
  };

  return (
    <header className="h-16 border-b bg-card px-6 flex items-center justify-between gap-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-lg bg-[#43B02A] flex items-center justify-center">
          <span className="text-white font-bold text-xl">D</span>
        </div>
        <span className="font-bold text-xl">DukaPOS</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-xl relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Search product or scan... [F2]"
          className="pl-10 h-10 bg-input-background border-border"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            // Auto-search if it looks like a barcode (numeric and long enough)
            const value = e.target.value;
            if (value.length >= 10 && /^\d+$/.test(value)) {
              onSearch(value);
            }
          }}
        />
      </div>

      {/* Status Indicators */}
      <div className="flex items-center gap-3">
        {/* Connection Status */}
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
            isOnline ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'
          }`}>
            <Wifi className={`size-4 ${isOnline ? 'text-green-600' : 'text-red-600'}`} />
            <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* Printer Status */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md ${
            isPrinterConnected ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-50 dark:bg-gray-800'
          }`}>
            <Printer className={`size-4 ${isPrinterConnected ? 'text-blue-600' : 'text-gray-400'}`} />
          </div>
        </div>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleDarkMode}
          className="rounded-md"
        >
          {darkMode ? <Sun className="size-5" /> : <Moon className="size-5" />}
        </Button>

        {/* User Profile */}
        <Button variant="ghost" size="icon" className="rounded-md">
          <User className="size-5" />
        </Button>
      </div>
    </header>
  );
}
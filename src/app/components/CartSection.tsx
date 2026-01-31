import { Trash2, Plus, Minus, Package } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";

export interface CartItem {
  id: string;
  name: string;
  barcode: string;
  price: number;
  quantity: number;
}

interface CartSectionProps {
  items: CartItem[];
  lastScannedId?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
}

export function CartSection({ items, lastScannedId, onUpdateQuantity, onRemoveItem }: CartSectionProps) {
  if (items.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-4">
          <Package className="size-16 text-muted-foreground" />
        </div>
        <h3 className="text-xl mb-2">Ready to Scan</h3>
        <p className="text-muted-foreground">Scan a barcode or search for a product to begin</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[60px_1fr_140px_120px_120px_60px] gap-4 px-4 py-3 bg-muted/50 border-b text-sm font-medium">
        <div>#</div>
        <div>Item Name</div>
        <div>Qty</div>
        <div className="text-right">Price</div>
        <div className="text-right">Total</div>
        <div></div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto">
        {items.map((item, index) => {
          const isLastScanned = item.id === lastScannedId;
          return (
            <div
              key={item.id}
              className={`grid grid-cols-[60px_1fr_140px_120px_120px_60px] gap-4 px-4 py-4 border-b transition-all ${
                index % 2 === 0 ? 'bg-card' : 'bg-muted/20'
              } ${isLastScanned ? 'ring-2 ring-[#43B02A] ring-inset' : ''}`}
            >
              {/* Index */}
              <div className="flex items-center text-muted-foreground">
                {index + 1}
              </div>

              {/* Item Name */}
              <div className="flex flex-col justify-center">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-muted-foreground">{item.barcode}</div>
              </div>

              {/* Quantity Stepper */}
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="size-8 rounded-md"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                >
                  <Minus className="size-3" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.id, Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-14 h-8 text-center font-mono"
                  min="1"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="size-8 rounded-md"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="size-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="flex items-center justify-end font-mono">
                KSh {item.price.toFixed(2)}
              </div>

              {/* Total */}
              <div className="flex items-center justify-end font-mono font-medium">
                KSh {(item.price * item.quantity).toFixed(2)}
              </div>

              {/* Delete Button */}
              <div className="flex items-center">
                <Button
                  size="icon"
                  variant="ghost"
                  className="size-8 rounded-md hover:bg-[#E11D48]/10 hover:text-[#E11D48]"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

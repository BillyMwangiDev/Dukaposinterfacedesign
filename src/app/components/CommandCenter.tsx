import { Delete, Smartphone, Banknote, Clock } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { Card } from "@/app/components/ui/card";

interface CommandCenterProps {
  subtotal: number;
  vat: number;
  total: number;
  numpadValue: string;
  onNumpadClick: (value: string) => void;
  onCashPayment: () => void;
  onMpesaPayment: () => void;
  onHoldOrder: () => void;
}

export function CommandCenter({
  subtotal,
  vat,
  total,
  numpadValue,
  onNumpadClick,
  onCashPayment,
  onMpesaPayment,
  onHoldOrder,
}: CommandCenterProps) {
  const numpadButtons = [
    '1', '2', '3',
    '4', '5', '6',
    '7', '8', '9',
    '00', '0', 'C'
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Customer Display - Running Total */}
      <Card className="p-6 bg-gradient-to-br from-card to-muted/20">
        <div className="text-sm text-muted-foreground mb-2">Total Payable</div>
        <div className="text-6xl font-bold font-mono tracking-tight">
          KSh {total.toFixed(2)}
        </div>
        
        {/* Breakdown */}
        <div className="mt-4 pt-4 border-t space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-mono">KSh {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">VAT (16%)</span>
            <span className="font-mono">KSh {vat.toFixed(2)}</span>
          </div>
        </div>
      </Card>

      {/* Numpad */}
      <Card className="p-4">
        <div className="text-sm text-muted-foreground mb-2">Quick Amount</div>
        <div className="h-12 bg-input-background rounded-md flex items-center justify-end px-4 mb-3 border">
          <span className="font-mono text-xl">{numpadValue || '0'}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {numpadButtons.map((btn) => (
            <Button
              key={btn}
              variant="outline"
              className="h-12 text-lg font-medium hover:bg-muted"
              onClick={() => onNumpadClick(btn)}
            >
              {btn === 'C' ? <Delete className="size-5" /> : btn}
            </Button>
          ))}
        </div>
      </Card>

      {/* Payment Buttons */}
      <div className="space-y-2 mt-auto">
        <Button
          className="w-full h-14 text-lg bg-[#2563EB] hover:bg-[#2563EB]/90 text-white"
          onClick={onCashPayment}
          disabled={total === 0}
        >
          <Banknote className="mr-2 size-5" />
          CASH
        </Button>
        
        <Button
          className="w-full h-14 text-lg bg-[#43B02A] hover:bg-[#43B02A]/90 text-white"
          onClick={onMpesaPayment}
          disabled={total === 0}
        >
          <Smartphone className="mr-2 size-5" />
          M-PESA
        </Button>
        
        <Button
          variant="outline"
          className="w-full h-12 text-base border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950"
          onClick={onHoldOrder}
          disabled={total === 0}
        >
          <Clock className="mr-2 size-4" />
          HOLD ORDER
        </Button>
      </div>
    </div>
  );
}

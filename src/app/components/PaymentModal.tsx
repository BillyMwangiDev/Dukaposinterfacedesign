import { useState, useEffect } from "react";
import { Loader2, CheckCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/components/ui/tabs";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onCompleteSale: (method: string, details?: any) => void;
  defaultTab?: "cash" | "mpesa";
}

export function PaymentModal({ 
  isOpen, 
  onClose, 
  total, 
  onCompleteSale,
  defaultTab = "cash" 
}: PaymentModalProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [cashTendered, setCashTendered] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [transactionCode, setTransactionCode] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Update active tab when defaultTab changes
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const changeDue = parseFloat(cashTendered || "0") - total;
  const exactAmount = total.toFixed(2);

  const handleCashPayment = () => {
    if (parseFloat(cashTendered) >= total) {
      onCompleteSale("cash", { tendered: cashTendered, change: changeDue });
      resetAndClose();
    }
  };

  const handleMpesaPayment = async () => {
    if (phoneNumber.length >= 10) {
      setIsProcessing(true);
      // Simulate STK Push
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        onCompleteSale("mpesa", { phone: phoneNumber, code: transactionCode });
        resetAndClose();
      }, 1500);
    }
  };

  const resetAndClose = () => {
    setCashTendered("");
    setPhoneNumber("");
    setTransactionCode("");
    setIsProcessing(false);
    setIsSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
          <DialogDescription>
            Total amount: <span className="font-mono font-bold text-foreground text-xl ml-2">KSh {total.toFixed(2)}</span>
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cash">Cash</TabsTrigger>
            <TabsTrigger value="mpesa">M-Pesa</TabsTrigger>
          </TabsList>

          {/* Cash Tab */}
          <TabsContent value="cash" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="cash-tendered">Amount Tendered</Label>
              <Input
                id="cash-tendered"
                type="number"
                placeholder="0.00"
                value={cashTendered}
                onChange={(e) => setCashTendered(e.target.value)}
                className="h-12 text-lg font-mono"
                autoFocus
                step="0.01"
              />
            </div>

            {/* Quick Suggestions */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCashTendered(exactAmount)}
              >
                Exact: KSh {exactAmount}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCashTendered("500")}
              >
                KSh 500
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setCashTendered("1000")}
              >
                KSh 1000
              </Button>
            </div>

            {/* Change Due */}
            {parseFloat(cashTendered || "0") >= total && (
              <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-sm text-green-700 dark:text-green-300">Change Due</div>
                <div className="text-3xl font-bold font-mono text-green-600 dark:text-green-400">
                  KSh {changeDue.toFixed(2)}
                </div>
              </div>
            )}

            <Button
              className="w-full h-12 bg-[#2563EB] hover:bg-[#2563EB]/90 text-white text-lg"
              onClick={handleCashPayment}
              disabled={parseFloat(cashTendered || "0") < total}
            >
              Complete Cash Sale
            </Button>
          </TabsContent>

          {/* M-Pesa Tab */}
          <TabsContent value="mpesa" className="space-y-4 pt-4">
            {!isProcessing && !isSuccess && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Customer Phone Number</Label>
                  <Input
                    id="phone-number"
                    type="tel"
                    placeholder="07XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="h-12 text-lg"
                    autoFocus
                    maxLength={12}
                  />
                  <p className="text-xs text-muted-foreground">
                    An STK push will be sent to this number
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="transaction-code">Transaction Code (Optional)</Label>
                  <Input
                    id="transaction-code"
                    placeholder="RXXXXXXXX"
                    value={transactionCode}
                    onChange={(e) => setTransactionCode(e.target.value.toUpperCase())}
                    className="h-12 text-lg font-mono"
                  />
                  <p className="text-xs text-muted-foreground">
                    For manual verification if customer has already paid
                  </p>
                </div>

                <Button
                  className="w-full h-12 bg-[#43B02A] hover:bg-[#43B02A]/90 text-white text-lg"
                  onClick={handleMpesaPayment}
                  disabled={phoneNumber.length < 10}
                >
                  Send STK Push
                </Button>
              </>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="size-16 animate-spin text-[#43B02A] mb-4" />
                <p className="text-lg font-medium">Waiting for customer confirmation...</p>
                <p className="text-sm text-muted-foreground mt-2">Customer should enter PIN on their phone</p>
              </div>
            )}

            {isSuccess && (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="size-16 text-green-500 mb-4" />
                <p className="text-lg font-medium text-green-600">Payment Successful!</p>
                <p className="text-sm text-muted-foreground mt-2">Processing sale...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
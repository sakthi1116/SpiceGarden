import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { CheckCircle2, CreditCard, IndianRupee, Smartphone, Wallet } from "lucide-react";
import { CUSTOMER_ACTIVE_ORDER_KEY } from "../../tableState";

type OrderRecord = {
  id: string;
  date: string;
  table: number;
  items: number;
  total: number;
  status: "paid" | "pending";
  paymentMethod: string;
};

type PaymentMethod = "UPI" | "Card" | "Cash";

const paymentOptions: { value: PaymentMethod; label: string; icon: typeof Smartphone }[] = [
  { value: "UPI", label: "UPI", icon: Smartphone },
  { value: "Card", label: "Card", icon: CreditCard },
  { value: "Cash", label: "Cash", icon: Wallet },
];

export default function CustomerPayment() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("UPI");
  const [activeOrder, setActiveOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const activeOrderId = localStorage.getItem(CUSTOMER_ACTIVE_ORDER_KEY);
    const savedOrders = localStorage.getItem("admin_orders");

    if (!activeOrderId || !savedOrders) {
      navigate("/customer/cart");
      return;
    }

    const orders = JSON.parse(savedOrders) as OrderRecord[];
    const pendingOrder = orders.find((order) => order.id === activeOrderId);

    if (!pendingOrder) {
      navigate("/customer/cart");
      return;
    }

    setActiveOrder(pendingOrder);
  }, [navigate]);

  const totalAmount = useMemo(() => {
    if (!activeOrder) {
      return 0;
    }
    return activeOrder.total;
  }, [activeOrder]);

  const completePayment = () => {
    if (!activeOrder) {
      return;
    }

    const savedOrders = localStorage.getItem("admin_orders");
    if (!savedOrders) {
      navigate("/customer/cart");
      return;
    }

    const orders = JSON.parse(savedOrders) as OrderRecord[];
    const updatedOrders = orders.map((order) => {
      if (order.id === activeOrder.id) {
        return {
          ...order,
          status: "paid" as const,
          paymentMethod: selectedMethod,
        };
      }

      return order;
    });

    localStorage.setItem("admin_orders", JSON.stringify(updatedOrders));
    localStorage.removeItem(CUSTOMER_ACTIVE_ORDER_KEY);
    window.dispatchEvent(new Event("local-storage-update"));

    alert(`Payment successful via ${selectedMethod}!`);
    navigate("/customer");
  };

  if (!activeOrder) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Options</h2>
        <p className="text-gray-500">Complete payment for your order</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
          <div>Invoice: <span className="font-semibold text-gray-800">{activeOrder.id}</span></div>
          <div>Table: <span className="font-semibold text-gray-800">{activeOrder.table}</span></div>
          <div>Date: <span className="font-semibold text-gray-800">{activeOrder.date}</span></div>
          <div>Items: <span className="font-semibold text-gray-800">{activeOrder.items}</span></div>
        </div>
        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-700">Amount to Pay</span>
          <div className="flex items-center gap-1 text-3xl font-bold text-gray-900">
            <IndianRupee size={24} />
            {totalAmount.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Choose Payment Method</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {paymentOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = selectedMethod === option.value;

            return (
              <button
                key={option.value}
                onClick={() => setSelectedMethod(option.value)}
                className={`border-2 rounded-xl p-4 flex items-center gap-3 transition-all ${
                  isSelected
                    ? "border-amber-500 bg-amber-50"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <Icon size={20} className={isSelected ? "text-amber-600" : "text-gray-500"} />
                <span className={`font-semibold ${isSelected ? "text-amber-700" : "text-gray-700"}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={completePayment}
        className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={20} />
        Pay Now
      </button>
    </div>
  );
}

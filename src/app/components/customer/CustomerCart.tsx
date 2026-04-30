import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Trash2, IndianRupee, Plus, Minus } from "lucide-react";
import {
  CUSTOMER_ACTIVE_ORDER_KEY,
  CUSTOMER_SELECTED_TABLE_KEY,
  getAvailableTables,
  initializeAdminTables,
  markTableOccupied,
  TableRecord,
} from "../../tableState";

const menuItems = [
  { id: 1, name: "Chicken Biryani", price: 250, image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=200&q=80" },
  { id: 2, name: "Butter Chicken", price: 320, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200&q=80" },
  { id: 3, name: "Paneer Tikka Masala", price: 280, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200&q=80" },
  { id: 4, name: "Tandoori Chicken", price: 350, image: "https://images.unsplash.com/photo-1687020835890-b0b8c6a04613?w=200&q=80" },
  { id: 5, name: "Dal Makhani", price: 180, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200&q=80" },
  { id: 6, name: "Mutton Curry", price: 380, image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=200&q=80" },
  { id: 7, name: "Vegetable Pulao", price: 150, image: "https://images.unsplash.com/photo-1647577931985-e0c3e8fb815c?w=200&q=80" },
  { id: 8, name: "Naan Bread", price: 40, image: "https://images.unsplash.com/photo-1655979284091-eea0e93405ee?w=200&q=80" },
  { id: 9, name: "Chicken Tikka", price: 320, image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=200&q=80" },
  { id: 10, name: "Palak Paneer", price: 260, image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=200&q=80" },
  { id: 11, name: "Rogan Josh", price: 420, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&q=80" },
  { id: 12, name: "Masala Dosa", price: 120, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=200&q=80" },
  { id: 13, name: "Samosa", price: 50, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=80" },
  { id: 14, name: "Garlic Naan", price: 60, image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=200&q=80" },
  { id: 15, name: "Raita", price: 80, image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=200&q=80" },
  { id: 16, name: "Ice Cream", price: 100, image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=200&q=80" },
  { id: 17, name: "Chole Bhature", price: 180, image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=200&q=80" },
  { id: 19, name: "Paneer Butter Masala", price: 290, image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&q=80" },
  { id: 20, name: "Jeera Rice", price: 130, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&q=80" },
];

export default function CustomerCart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [availableTables, setAvailableTables] = useState<TableRecord[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | "">("");

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }

    initializeAdminTables();
    const tables = getAvailableTables();
    setAvailableTables(tables);

    const savedTable = localStorage.getItem(CUSTOMER_SELECTED_TABLE_KEY);
    if (savedTable) {
      const savedTableNumber = Number(savedTable);
      if (tables.some((table) => table.number === savedTableNumber)) {
        setSelectedTable(savedTableNumber);
      } else {
        localStorage.removeItem(CUSTOMER_SELECTED_TABLE_KEY);
      }
    }

    const syncTables = () => {
      const nextTables = getAvailableTables();
      setAvailableTables(nextTables);

      setSelectedTable((currentValue) => {
        if (currentValue === "") {
          return currentValue;
        }

        const isStillAvailable = nextTables.some((table) => table.number === currentValue);
        if (isStillAvailable) {
          return currentValue;
        }

        localStorage.removeItem(CUSTOMER_SELECTED_TABLE_KEY);
        return "";
      });
    };

    window.addEventListener("local-storage-update", syncTables);
    window.addEventListener("storage", syncTables);

    return () => {
      window.removeEventListener("local-storage-update", syncTables);
      window.removeEventListener("storage", syncTables);
    };
  }, []);

    const handleTableChange = (tableNumber: number | "") => {
      setSelectedTable(tableNumber);

      if (tableNumber === "") {
        localStorage.removeItem(CUSTOMER_SELECTED_TABLE_KEY);
        return;
      }

      localStorage.setItem(CUSTOMER_SELECTED_TABLE_KEY, String(tableNumber));
    };

  const updateCart = (newCart: { [key: number]: number }) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeItem = (itemId: number) => {
    const newCart = { ...cart };
    delete newCart[itemId];
    updateCart(newCart);
  };

  const updateQuantity = (itemId: number, change: number) => {
    const newCart = { ...cart };
    const newQuantity = (newCart[itemId] || 0) + change;
    if (newQuantity <= 0) {
      delete newCart[itemId];
    } else {
      newCart[itemId] = newQuantity;
    }
    updateCart(newCart);
  };

  const cartItems = Object.entries(cart).map(([id, quantity]) => {
    const item = menuItems.find((item) => item.id === Number(id));
    return item ? { ...item, quantity } : null;
  }).filter(Boolean);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item?.price || 0) * (item?.quantity || 0),
    0
  );
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + tax;

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!selectedTable) {
      alert("Please choose a table before placing your order.");
      return;
    }

    const tableUpdated = markTableOccupied(Number(selectedTable), total);
    if (!tableUpdated) {
      alert("Selected table is no longer available. Please choose another table.");
      setAvailableTables(getAvailableTables());
      setSelectedTable("");
      return;
    }

    const newOrder = {
      id: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split("T")[0],
      table: Number(selectedTable),
      items: cartItems.length,
      total: total,
      status: "pending",
      paymentMethod: "Pending",
    };

    const savedOrders = localStorage.getItem("admin_orders");
    let orders = [];
    if (savedOrders) {
      orders = JSON.parse(savedOrders);
    }
    orders.unshift(newOrder);
    localStorage.setItem("admin_orders", JSON.stringify(orders));
    localStorage.setItem(CUSTOMER_ACTIVE_ORDER_KEY, newOrder.id);
    window.dispatchEvent(new Event("local-storage-update"));

    updateCart({});
    setSelectedTable("");
    localStorage.removeItem(CUSTOMER_SELECTED_TABLE_KEY);
    navigate("/customer/payment");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Your Cart</h2>
        <p className="text-gray-500">Review your items and place order</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <IndianRupee size={48} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h3>
          <p className="text-gray-500">Add items from the menu to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="col-span-2 space-y-4">
            {cartItems.map((item) => item && (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-6"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                  <div className="flex items-center gap-1 text-gray-600">
                    <IndianRupee size={16} />
                    <span>{item.price}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Minus size={16} className="text-gray-600" />
                  </button>
                  <span className="font-semibold text-gray-800 min-w-[30px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Plus size={16} className="text-gray-600" />
                  </button>
                </div>
                <div className="flex items-center gap-1 text-lg font-bold text-gray-800 min-w-[100px] justify-end">
                  <IndianRupee size={18} />
                  {item.price * item.quantity}
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Bill Summary */}
          <div className="col-span-1">
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Bill Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {subtotal.toFixed(2)}
                  </div>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>GST (5%)</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={16} />
                    {tax.toFixed(2)}
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between text-xl font-bold text-gray-800">
                  <span>Total</span>
                  <div className="flex items-center gap-1">
                    <IndianRupee size={20} />
                    {total.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose Table
                </label>
                <select
                  value={selectedTable}
                  onChange={(e) => handleTableChange(e.target.value ? Number(e.target.value) : "")}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  <option value="">Select a table</option>
                  {availableTables.map((table) => (
                    <option key={table.id} value={table.number}>
                      Table {table.number} ({table.capacity} seats)
                    </option>
                  ))}
                </select>
                {availableTables.length === 0 && (
                  <p className="text-xs text-red-600 mt-2">No tables are available right now.</p>
                )}
                {availableTables.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {availableTables.map((table) => (
                      <span
                        key={table.id}
                        className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
                      >
                        Table {table.number}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={placeOrder}
                disabled={availableTables.length === 0}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

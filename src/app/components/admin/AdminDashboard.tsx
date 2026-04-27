import {
  TrendingUp,
  Users,
  Package,
  IndianRupee,
  Utensils,
  AlertCircle,
} from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { id: 1, day: "Mon", revenue: 12500 },
  { id: 2, day: "Tue", revenue: 15800 },
  { id: 3, day: "Wed", revenue: 13200 },
  { id: 4, day: "Thu", revenue: 18900 },
  { id: 5, day: "Fri", revenue: 22400 },
  { id: 6, day: "Sat", revenue: 28600 },
  { id: 7, day: "Sun", revenue: 25300 },
];

const lowStockItems = [
  { name: "Tomatoes", stock: 5, unit: "kg" },
  { name: "Onions", stock: 8, unit: "kg" },
  { name: "Chicken", stock: 12, unit: "kg" },
  { name: "Basmati Rice", stock: 15, unit: "kg" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h2>
        <p className="text-gray-500">Overview of restaurant operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-green-50 rounded-xl">
              <IndianRupee size={24} className="text-green-600" />
            </div>
            <span className="text-green-600 text-sm font-medium">+12.5%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">₹1,36,700</div>
          <div className="text-sm text-gray-500">Total Revenue (Week)</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 rounded-xl">
              <Users size={24} className="text-blue-600" />
            </div>
            <span className="text-blue-600 text-sm font-medium">+8.2%</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">248</div>
          <div className="text-sm text-gray-500">Total Orders (Week)</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-50 rounded-xl">
              <Utensils size={24} className="text-purple-600" />
            </div>
            <span className="text-purple-600 text-sm font-medium">12/20</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">60%</div>
          <div className="text-sm text-gray-500">Table Occupancy</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-orange-50 rounded-xl">
              <Package size={24} className="text-orange-600" />
            </div>
            <span className="text-red-600 text-sm font-medium">Low</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-1">4</div>
          <div className="text-sm text-gray-500">Low Stock Items</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 12 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#f59e0b"
                strokeWidth={3}
                dot={{ fill: "#f59e0b", r: 4 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle size={20} className="text-orange-600" />
            <h3 className="text-lg font-bold text-gray-800">Low Stock Alert</h3>
          </div>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-xl"
              >
                <div>
                  <div className="font-medium text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-500">
                    {item.stock} {item.unit} left
                  </div>
                </div>
                <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-medium">
                  Low
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

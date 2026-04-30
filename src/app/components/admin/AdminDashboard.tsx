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
    <div className="p-4 sm:p-8 w-full max-w-full overflow-x-hidden min-w-0">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">Dashboard</h2>
        <p className="text-sm sm:text-base text-gray-500">Overview of restaurant operations</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 w-full min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden min-w-0">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-green-50 rounded-xl">
              <IndianRupee size={20} className="text-green-600 sm:w-6 sm:h-6" />
            </div>
            <span className="text-green-600 text-xs sm:text-sm font-medium">+12.5%</span>
          </div>
          <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 truncate">₹1,36,700</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">Total Revenue</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-blue-50 rounded-xl">
              <Users size={20} className="text-blue-600 sm:w-6 sm:h-6" />
            </div>
            <span className="text-blue-600 text-xs sm:text-sm font-medium">+8.2%</span>
          </div>
          <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 truncate">248</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">Total Orders</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-purple-50 rounded-xl">
              <Utensils size={20} className="text-purple-600 sm:w-6 sm:h-6" />
            </div>
            <span className="text-purple-600 text-xs sm:text-sm font-medium">12/20</span>
          </div>
          <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 truncate">60%</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">Table Occupancy</div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden">
          <div className="flex items-start justify-between mb-2 sm:mb-4">
            <div className="p-2 sm:p-3 bg-orange-50 rounded-xl">
              <Package size={20} className="text-orange-600 sm:w-6 sm:h-6" />
            </div>
            <span className="text-red-600 text-xs sm:text-sm font-medium">Low</span>
          </div>
          <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 truncate">4</div>
          <div className="text-xs sm:text-sm text-gray-500 truncate">Low Stock Items</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 w-full min-w-0">
        <div className="col-span-1 lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 sm:mb-6">Revenue Trend</h3>
          <div className="w-full h-[250px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" stroke="#6b7280" tick={{ fontSize: 10 }} />
                <YAxis stroke="#6b7280" tick={{ fontSize: 10 }} />
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
        </div>

        <div className="col-span-1 bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4 sm:mb-6">
            <AlertCircle size={20} className="text-orange-600 sm:w-5 sm:h-5 w-4 h-4 flex-shrink-0" />
            <h3 className="text-base sm:text-lg font-bold text-gray-800">Low Stock</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {lowStockItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 sm:p-3 bg-orange-50 rounded-xl"
              >
                <div className="min-w-0 pr-2">
                  <div className="font-medium text-gray-800 text-sm sm:text-base truncate">{item.name}</div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    {item.stock} {item.unit} left
                  </div>
                </div>
                <div className="px-2 py-1 bg-orange-100 text-orange-600 rounded text-xs font-medium whitespace-nowrap">
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

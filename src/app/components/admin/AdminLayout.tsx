import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Truck,
  Utensils,
  Receipt,
  Package,
  LogOut,
} from "lucide-react";

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/admin/suppliers", icon: Truck, label: "Suppliers" },
    { path: "/admin/tables", icon: Utensils, label: "Tables" },
    { path: "/admin/billing", icon: Receipt, label: "Billing" },
    { path: "/admin/ingredients", icon: Package, label: "Ingredients" },
  ];

  const isActive = (path: string) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
        </div>

        <nav className="flex-1 px-3 py-3 md:py-6 flex md:block gap-2 md:gap-0 overflow-x-auto md:overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap ${
                  active
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200 hidden md:block">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

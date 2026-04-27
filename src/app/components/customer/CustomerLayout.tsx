import { Outlet, Link, useLocation } from "react-router";
import type { MouseEventHandler } from "react";
import { UtensilsCrossed, ShoppingCart, LogOut } from "lucide-react";
import { CUSTOMER_SELECTED_TABLE_KEY } from "../../tableState";

export default function CustomerLayout() {
  const location = useLocation();

  const handleCartNavigation: MouseEventHandler<HTMLAnchorElement> = (e) => {
    const selectedTable = localStorage.getItem(CUSTOMER_SELECTED_TABLE_KEY);
    if (!selectedTable) {
      e.preventDefault();
      alert("Please choose a table on the menu page before going to cart.");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center">
                <UtensilsCrossed size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Spice Garden</h1>
                <p className="text-sm text-gray-500">Authentic Indian Cuisine</p>
              </div>
            </div>

            <nav className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0">
              <Link
                to="/customer"
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  location.pathname === "/customer"
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Menu
              </Link>
              <Link
                to="/customer/cart"
                onClick={handleCartNavigation}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  location.pathname === "/customer/cart"
                    ? "bg-amber-50 text-amber-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Link
                to="/"
                className="flex items-center gap-2 px-3 sm:px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg whitespace-nowrap transition-colors"
              >
                <LogOut size={20} />
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

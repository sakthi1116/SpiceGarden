import { useState } from "react";
import { useNavigate } from "react-router";
import { User, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"customer" | "admin" | null>(null);

  const handleLogin = (role: "customer" | "admin") => {
    if (role === "customer") {
      navigate("/customer");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-amber-50 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12 max-w-2xl mx-auto px-2">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-3 leading-tight">
            Restaurant Management System
          </h1>
          <p className="text-sm sm:text-base text-gray-500">Select your role to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-stretch">
          {/* Customer Login */}
          <div
            onClick={() => setSelectedRole("customer")}
            className={`bg-white border-2 rounded-2xl p-5 sm:p-12 cursor-pointer transition-all hover:shadow-xl h-full ${
              selectedRole === "customer"
                ? "border-amber-400 shadow-xl"
                : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <User size={40} className="text-amber-800 sm:w-12 sm:h-12" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Customer</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-xs">
                Browse menu and place orders
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogin("customer");
                }}
                className="w-full sm:w-auto max-w-full px-4 sm:px-8 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-xl hover:shadow-lg transition-shadow font-medium text-sm sm:text-base leading-snug text-center"
              >
                Login as Customer
              </button>
            </div>
          </div>

          {/* Admin Login */}
          <div
            onClick={() => setSelectedRole("admin")}
            className={`bg-white border-2 rounded-2xl p-5 sm:p-12 cursor-pointer transition-all hover:shadow-xl h-full ${
              selectedRole === "admin"
                ? "border-amber-600 shadow-xl"
                : "border-gray-200"
            }`}
          >
            <div className="flex flex-col items-center text-center h-full">
              <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center mb-5 sm:mb-6">
                <ShieldCheck size={40} className="text-amber-900 sm:w-12 sm:h-12" />
              </div>
              <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">Admin</h2>
              <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-xs">
                Manage inventory and operations
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleLogin("admin");
                }}
                className="w-full sm:w-auto max-w-full px-4 sm:px-8 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-shadow font-medium text-sm sm:text-base leading-snug text-center"
              >
                Login as Admin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

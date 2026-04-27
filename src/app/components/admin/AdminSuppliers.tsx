import { useState } from "react";
import { Plus, Phone, Mail, IndianRupee, X } from "lucide-react";

const suppliersData = [
  {
    id: 1,
    name: "Fresh Vegetables Mart",
    contact: "+91 98765 43210",
    email: "freshveggies@email.com",
    category: "Vegetables",
    totalSupply: "₹45,000/month",
  },
  {
    id: 2,
    name: "Meat & Poultry Suppliers",
    contact: "+91 98765 43211",
    email: "meat@email.com",
    category: "Meat",
    totalSupply: "₹82,000/month",
  },
  {
    id: 3,
    name: "Spice Traders Co.",
    contact: "+91 98765 43212",
    email: "spices@email.com",
    category: "Spices",
    totalSupply: "₹25,000/month",
  },
  {
    id: 4,
    name: "Dairy Fresh Products",
    contact: "+91 98765 43213",
    email: "dairy@email.com",
    category: "Dairy",
    totalSupply: "₹38,000/month",
  },
];

export default function AdminSuppliers() {
  const [showAddSupplier, setShowAddSupplier] = useState(false);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Suppliers</h2>
          <p className="text-gray-500">Manage your supplier relationships</p>
        </div>
        <button
          onClick={() => setShowAddSupplier(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all font-medium"
        >
          <Plus size={20} />
          Add Supplier
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {suppliersData.map((supplier) => (
          <div
            key={supplier.id}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {supplier.name}
                </h3>
                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">
                  {supplier.category}
                </span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Phone size={16} />
                <span className="text-sm">{supplier.contact}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Mail size={16} />
                <span className="text-sm">{supplier.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <IndianRupee size={16} />
                <span className="text-sm">{supplier.totalSupply}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                Edit
              </button>
              <button className="flex-1 py-2 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition-all">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Supplier Modal */}
      {showAddSupplier && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add New Supplier</h3>
              <button
                onClick={() => setShowAddSupplier(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Supplier Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500">
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Spices</option>
                  <option>Dairy</option>
                  <option>Grains</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="email@example.com"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddSupplier(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Add Supplier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

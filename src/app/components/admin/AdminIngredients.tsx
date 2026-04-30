import { useState } from "react";
import { Plus, Search, AlertTriangle, X } from "lucide-react";

const ingredientsData = [
  {
    id: 1,
    name: "Tomatoes",
    stock: 25,
    unit: "kg",
    minStock: 20,
    price: 40,
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=200&q=80",
    category: "Vegetables",
  },
  {
    id: 2,
    name: "Onions",
    stock: 15,
    unit: "kg",
    minStock: 20,
    price: 30,
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=200&q=80",
    category: "Vegetables",
  },
  {
    id: 3,
    name: "Chicken",
    stock: 30,
    unit: "kg",
    minStock: 25,
    price: 200,
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80",
    category: "Meat",
  },
  {
    id: 4,
    name: "Basmati Rice",
    stock: 50,
    unit: "kg",
    minStock: 40,
    price: 120,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&q=80",
    category: "Grains",
  },
  {
    id: 6,
    name: "Garlic",
    stock: 12,
    unit: "kg",
    minStock: 10,
    price: 80,
    image: "https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=200&q=80",
    category: "Vegetables",
  },
  {
    id: 7,
    name: "Potatoes",
    stock: 40,
    unit: "kg",
    minStock: 30,
    price: 25,
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&q=80",
    category: "Vegetables",
  },
  {
    id: 8,
    name: "Mixed Vegetables",
    stock: 22,
    unit: "kg",
    minStock: 15,
    price: 60,
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200&q=80",
    category: "Vegetables",
  },
  {
    id: 9,
    name: "Paneer",
    stock: 18,
    unit: "kg",
    minStock: 15,
    price: 180,
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=200&q=80",
    category: "Dairy",
  },
  {
    id: 11,
    name: "Cumin Seeds",
    stock: 5,
    unit: "kg",
    minStock: 3,
    price: 350,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=200&q=80",
    category: "Spices",
  },
  {
    id: 13,
    name: "Yogurt",
    stock: 20,
    unit: "ltr",
    minStock: 15,
    price: 60,
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&q=80",
    category: "Dairy",
  },
  {
    id: 14,
    name: "Cooking Oil",
    stock: 35,
    unit: "ltr",
    minStock: 25,
    price: 150,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&q=80",
    category: "Oils",
  },

];

export default function AdminIngredients() {
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(ingredientsData.map((i) => i.category)))];

  const filteredIngredients = ingredientsData.filter((ingredient) => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = ingredientsData.filter((i) => i.stock < i.minStock);

  return (
    <div className="p-8">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Ingredients</h2>
          <p className="text-gray-500">Manage your inventory stock</p>
        </div>
        <button
          onClick={() => setShowAddIngredient(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all font-medium whitespace-nowrap w-full sm:w-auto"
        >
          <Plus size={20} />
          Add Ingredient
        </button>
      </div>

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <div className="bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle size={24} className="text-orange-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-orange-800 mb-2">
                Low Stock Alert
              </h3>
              <p className="text-sm text-orange-700 mb-3">
                {lowStockItems.length} ingredient(s) running low on stock
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockItems.map((item) => (
                  <span
                    key={item.id}
                    className="px-3 py-1 bg-white rounded-lg text-sm text-orange-800 border border-orange-300"
                  >
                    {item.name} ({item.stock} {item.unit})
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className={`bg-white border-2 rounded-2xl p-6 hover:shadow-lg transition-shadow ${
              ingredient.stock < ingredient.minStock
                ? "border-orange-200 bg-orange-50/30"
                : "border-gray-200"
            }`}
          >
            <div className="aspect-square overflow-hidden rounded-xl mb-4 bg-gray-100">
              <img
                src={ingredient.image}
                alt={ingredient.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="mb-3">
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                {ingredient.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {ingredient.name}
            </h3>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Stock</span>
                <span
                  className={`font-semibold ${
                    ingredient.stock < ingredient.minStock
                      ? "text-orange-600"
                      : "text-amber-700"
                  }`}
                >
                  {ingredient.stock} {ingredient.unit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Min Stock</span>
                <span className="text-gray-800 font-medium">
                  {ingredient.minStock} {ingredient.unit}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Price/unit</span>
                <span className="text-gray-800 font-semibold">
                  ₹{ingredient.price}
                </span>
              </div>
            </div>

            <button className="w-full py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap">
              Update Stock
            </button>
          </div>
        ))}
      </div>

      {/* Add Ingredient Modal */}
      {showAddIngredient && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Add New Ingredient</h3>
              <button
                onClick={() => setShowAddIngredient(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingredient Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Enter ingredient name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                  <option>Vegetables</option>
                  <option>Meat</option>
                  <option>Spices</option>
                  <option>Grains</option>
                  <option>Dairy</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500">
                    <option>kg</option>
                    <option>ltr</option>
                    <option>pcs</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Unit (₹)
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min Stock
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddIngredient(false)}
                  className="flex-1 px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Add Ingredient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

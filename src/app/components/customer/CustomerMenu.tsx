import { useEffect, useState } from "react";
import { Plus, Minus, IndianRupee } from "lucide-react";
import {
  CUSTOMER_SELECTED_TABLE_KEY,
  getAvailableTables,
  initializeAdminTables,
  TableRecord,
} from "../../tableState";

const menuItems = [
  {
    id: 1,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken pieces",
    price: 250,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1599043513900-ed6fe01d3833?w=400&q=80",
  },
  {
    id: 2,
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken",
    price: 320,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",
  },
  {
    id: 3,
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in rich spiced gravy",
    price: 280,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80",
  },
  {
    id: 4,
    name: "Tandoori Chicken",
    description: "Marinated chicken grilled in clay oven",
    price: 350,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1687020835890-b0b8c6a04613?w=400&q=80",
  },
  {
    id: 5,
    name: "Dal Makhani",
    description: "Black lentils cooked in butter and cream",
    price: 180,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",
  },
  {
    id: 6,
    name: "Mutton Curry",
    description: "Slow-cooked mutton in traditional spices",
    price: 380,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=400&q=80",
  },
  {
    id: 7,
    name: "Vegetable Pulao",
    description: "Fragrant rice with mixed vegetables",
    price: 150,
    category: "Rice",
    image: "https://images.unsplash.com/photo-1647577931985-e0c3e8fb815c?w=400&q=80",
  },
  {
    id: 8,
    name: "Naan Bread",
    description: "Fresh baked flatbread from tandoor",
    price: 40,
    category: "Breads",
    image: "https://images.unsplash.com/photo-1655979284091-eea0e93405ee?w=400&q=80",
  },
  {
    id: 9,
    name: "Chicken Tikka",
    description: "Boneless chicken marinated in yogurt and spices",
    price: 320,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400&q=80",
  },
  {
    id: 10,
    name: "Palak Paneer",
    description: "Cottage cheese cubes in creamy spinach gravy",
    price: 260,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&q=80",
  },
  {
    id: 11,
    name: "Rogan Josh",
    description: "Kashmiri lamb curry with aromatic spices",
    price: 420,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80",
  },
  {
    id: 12,
    name: "Masala Dosa",
    description: "Crispy rice crepe filled with spiced potato",
    price: 120,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400&q=80",
  },
  {
    id: 13,
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 50,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",
  },
  {
    id: 14,
    name: "Garlic Naan",
    description: "Tandoor-baked flatbread topped with fresh garlic",
    price: 60,
    category: "Breads",
    image: "https://images.unsplash.com/photo-1566843972142-a7fcb70de55a?w=400&q=80",
  },
  {
    id: 15,
    name: "Raita",
    description: "Cooling yogurt with cucumber and spices",
    price: 80,
    category: "Sides",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400&q=80",
  },
  {
    id: 16,
    name: "Ice Cream",
    description: "Creamy and delicious ice cream",
    price: 100,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80",
  },
  {
    id: 17,
    name: "Chole Bhature",
    description: "Spicy chickpea curry with fluffy fried bread",
    price: 180,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=400&q=80",
  },
  {
    id: 19,
    name: "Paneer Butter Masala",
    description: "Cottage cheese in creamy tomato butter sauce",
    price: 290,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80",
  },
  {
    id: 20,
    name: "Jeera Rice",
    description: "Basmati rice tempered with cumin seeds",
    price: 130,
    category: "Rice",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&q=80",
  },
];

export default function CustomerMenu() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availableTables, setAvailableTables] = useState<TableRecord[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | "">("");

  useEffect(() => {
    initializeAdminTables();

    const syncTables = () => {
      const tables = getAvailableTables();
      setAvailableTables(tables);

      const savedTable = localStorage.getItem(CUSTOMER_SELECTED_TABLE_KEY);
      if (!savedTable) {
        return;
      }

      const savedTableNumber = Number(savedTable);
      const isStillAvailable = tables.some((table) => table.number === savedTableNumber);
      if (isStillAvailable) {
        setSelectedTable(savedTableNumber);
      } else {
        setSelectedTable("");
        localStorage.removeItem(CUSTOMER_SELECTED_TABLE_KEY);
      }
    };

    syncTables();
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

  const categories = ["All", ...Array.from(new Set(menuItems.map((item) => item.category)))];

  const filteredItems = selectedCategory === "All"
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId]--;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const saveCart = () => {
    if (!selectedTable) {
      alert("Please choose a table before continuing to cart.");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Cart saved! Go to Cart page to checkout.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Our Menu</h2>
        <p className="text-gray-500">Browse our delicious selection of authentic Indian dishes</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Choose Table</label>
        <select
          value={selectedTable}
          onChange={(e) => handleTableChange(e.target.value ? Number(e.target.value) : "")}
          className="w-full md:w-80 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
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

      {/* Category Filter */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full font-medium whitespace-nowrap transition-all ${
              selectedCategory === category
                ? "bg-gradient-to-r from-amber-400 to-yellow-500 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 hover:bg-amber-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
          >
            <div className="aspect-video overflow-hidden bg-gray-100">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-6">
              <div className="mb-2">
                <span className="text-xs px-2 py-1 bg-amber-50 text-amber-700 rounded-full">
                  {item.category}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-2xl font-bold text-gray-800">
                  <IndianRupee size={20} />
                  {item.price}
                </div>
                {cart[item.id] ? (
                  <div className="flex items-center gap-3 bg-amber-50 rounded-full px-4 py-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Minus size={16} className="text-amber-700" />
                    </button>
                    <span className="font-semibold text-amber-700 min-w-[20px] text-center">
                      {cart[item.id]}
                    </span>
                    <button
                      onClick={() => addToCart(item.id)}
                      className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-amber-100 transition-colors"
                    >
                      <Plus size={16} className="text-amber-700" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-6 py-2 bg-gradient-to-r from-amber-400 to-yellow-500 text-white rounded-full hover:shadow-lg transition-all font-medium"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Cart Button */}
      {Object.keys(cart).length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:right-8 sm:left-auto">
          <button
            onClick={saveCart}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all font-semibold flex items-center justify-center gap-2"
          >
            Save to Cart ({Object.values(cart).reduce((a, b) => a + b, 0)} items)
          </button>
        </div>
      )}
    </div>
  );
}

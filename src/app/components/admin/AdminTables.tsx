import { useEffect, useState } from "react";
import { Users, Clock } from "lucide-react";
import {
  getAdminTables,
  initializeAdminTables,
  markTableAvailable,
  TableRecord,
} from "../../tableState";

export default function AdminTables() {
  const [tablesData, setTablesData] = useState<TableRecord[]>([]);
  const [selectedTable, setSelectedTable] = useState<number | null>(null);

  useEffect(() => {
    initializeAdminTables();
    setTablesData(getAdminTables());

    const syncTables = () => {
      setTablesData(getAdminTables());
    };

    window.addEventListener("local-storage-update", syncTables);
    window.addEventListener("storage", syncTables);

    return () => {
      window.removeEventListener("local-storage-update", syncTables);
      window.removeEventListener("storage", syncTables);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "occupied":
        return "bg-red-50 border-red-200 text-red-600";
      case "available":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "reserved":
        return "bg-yellow-50 border-yellow-200 text-yellow-700";
      default:
        return "bg-gray-50 border-gray-200 text-gray-600";
    }
  };

  const occupiedCount = tablesData.filter((t) => t.status === "occupied").length;
  const availableCount = tablesData.filter((t) => t.status === "available").length;
  const reservedCount = tablesData.filter((t) => t.status === "reserved").length;

  const handleMarkAvailable = (tableNumber: number) => {
    if (!markTableAvailable(tableNumber)) {
      return;
    }

    setTablesData(getAdminTables());
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Table Management</h2>
        <p className="text-gray-500">Monitor and manage table occupancy</p>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Total Tables</div>
          <div className="text-3xl font-bold text-gray-800">{tablesData.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Occupied</div>
          <div className="text-3xl font-bold text-red-600">{occupiedCount}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Available</div>
          <div className="text-3xl font-bold text-amber-600">{availableCount}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Reserved</div>
          <div className="text-3xl font-bold text-amber-700">{reservedCount}</div>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {tablesData.map((table) => (
          <div
            key={table.id}
            onClick={() => setSelectedTable(table.id)}
            className={`cursor-pointer border-2 rounded-2xl p-6 transition-all ${getStatusColor(
              table.status
            )} hover:shadow-lg ${
              selectedTable === table.id ? "ring-4 ring-blue-500/20" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-sm font-medium uppercase opacity-70">
                  Table
                </div>
                <div className="text-3xl font-bold">{table.number}</div>
              </div>
              <div className="px-2 py-1 bg-white rounded text-xs font-medium capitalize">
                {table.status}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Users size={16} />
                <span>{table.capacity} seats</span>
              </div>
              {table.status === "occupied" && (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock size={16} />
                    <span>{table.time}</span>
                  </div>
                  <div className="pt-2 border-t border-current/20">
                    <div className="text-xs opacity-70">Order Total</div>
                    <div className="text-lg font-bold">{table.orderTotal}</div>
                  </div>
                </>
              )}
              {table.status === "reserved" && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} />
                  <span>Arrives in {table.time}</span>
                </div>
              )}

              <div className="pt-3 border-t border-current/20 flex flex-col gap-2">
                {table.status === "occupied" || table.status === "reserved" ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleMarkAvailable(table.number);
                    }}
                    className="w-full px-4 py-2 rounded-xl bg-white/90 text-gray-800 font-medium hover:bg-white transition-colors whitespace-nowrap"
                  >
                    Mark Free
                  </button>
                ) : (
                  <div className="text-sm font-medium text-green-700 bg-white/70 rounded-xl px-4 py-2 text-center">
                    Available for customers
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

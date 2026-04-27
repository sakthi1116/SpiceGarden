export type TableStatus = "occupied" | "available" | "reserved";

export type TableRecord = {
  id: number;
  number: number;
  capacity: number;
  status: TableStatus;
  orderTotal: string;
  time: string;
};

const TABLES_STORAGE_KEY = "admin_tables";
const MAX_TABLE_CAPACITY = 4;
export const CUSTOMER_SELECTED_TABLE_KEY = "customer_selected_table";
export const CUSTOMER_ACTIVE_ORDER_KEY = "customer_active_order_id";

const defaultTables: TableRecord[] = [
  { id: 1, number: 1, capacity: 4, status: "occupied", orderTotal: "₹1,250", time: "45 min" },
  { id: 2, number: 2, capacity: 2, status: "available", orderTotal: "₹0", time: "-" },
  { id: 3, number: 3, capacity: 4, status: "occupied", orderTotal: "₹2,400", time: "25 min" },
  { id: 4, number: 4, capacity: 4, status: "available", orderTotal: "₹0", time: "-" },
  { id: 5, number: 5, capacity: 4, status: "reserved", orderTotal: "₹0", time: "30 min" },
  { id: 6, number: 6, capacity: 2, status: "occupied", orderTotal: "₹850", time: "15 min" },
  { id: 7, number: 7, capacity: 4, status: "available", orderTotal: "₹0", time: "-" },
  { id: 8, number: 8, capacity: 4, status: "occupied", orderTotal: "₹1,650", time: "60 min" },
  { id: 9, number: 9, capacity: 2, status: "available", orderTotal: "₹0", time: "-" },
  { id: 10, number: 10, capacity: 4, status: "reserved", orderTotal: "₹0", time: "15 min" },
  { id: 11, number: 11, capacity: 4, status: "available", orderTotal: "₹0", time: "-" },
  { id: 12, number: 12, capacity: 4, status: "occupied", orderTotal: "₹1,980", time: "35 min" },
];

const isTableRecord = (value: unknown): value is TableRecord => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const table = value as TableRecord;
  return (
    typeof table.id === "number" &&
    typeof table.number === "number" &&
    typeof table.capacity === "number" &&
    ["occupied", "available", "reserved"].includes(table.status) &&
    typeof table.orderTotal === "string" &&
    typeof table.time === "string"
  );
};

const parseTables = (raw: string | null): TableRecord[] | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.every(isTableRecord)) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
};

const normalizeTableCapacities = (tables: TableRecord[]): TableRecord[] => {
  return tables.map((table) => ({
    ...table,
    capacity: Math.max(1, Math.min(MAX_TABLE_CAPACITY, Math.floor(table.capacity))),
  }));
};

export const initializeAdminTables = (): TableRecord[] => {
  const existing = parseTables(localStorage.getItem(TABLES_STORAGE_KEY));
  if (existing) {
    const normalizedExisting = normalizeTableCapacities(existing);
    if (JSON.stringify(existing) !== JSON.stringify(normalizedExisting)) {
      localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(normalizedExisting));
    }
    return normalizedExisting;
  }

  const normalizedDefaults = normalizeTableCapacities(defaultTables);
  localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(normalizedDefaults));
  return normalizedDefaults;
};

export const getAdminTables = (): TableRecord[] => {
  const parsed = parseTables(localStorage.getItem(TABLES_STORAGE_KEY));
  if (parsed) {
    const normalizedParsed = normalizeTableCapacities(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalizedParsed)) {
      localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(normalizedParsed));
    }
    return normalizedParsed;
  }

  return initializeAdminTables();
};

export const saveAdminTables = (tables: TableRecord[]) => {
  localStorage.setItem(TABLES_STORAGE_KEY, JSON.stringify(tables));
  window.dispatchEvent(new Event("local-storage-update"));
};

export const getAvailableTables = (): TableRecord[] => {
  return getAdminTables().filter((table) => table.status === "available");
};

export const markTableOccupied = (tableNumber: number, orderTotal: number): boolean => {
  let wasUpdated = false;

  const updatedTables = getAdminTables().map((table) => {
    if (table.number === tableNumber) {
      if (table.status !== "available") {
        return table;
      }

      wasUpdated = true;
      return {
        ...table,
        status: "occupied" as const,
        orderTotal: `₹${orderTotal.toFixed(2)}`,
        time: "Just now",
      };
    }

    return table;
  });

  if (wasUpdated) {
    saveAdminTables(updatedTables);
  }

  return wasUpdated;
};
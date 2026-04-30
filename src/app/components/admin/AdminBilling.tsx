import { useState, useEffect } from "react";
import { Search, IndianRupee, Calendar, Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialBillsData = [
  {
    id: "INV-001",
    date: "2026-04-21",
    table: 1,
    items: 5,
    total: 1250,
    status: "paid",
    paymentMethod: "UPI",
  },
  {
    id: "INV-002",
    date: "2026-04-21",
    table: 3,
    items: 8,
    total: 2400,
    status: "pending",
    paymentMethod: "Cash",
  },
  {
    id: "INV-003",
    date: "2026-04-21",
    table: 6,
    items: 3,
    total: 850,
    status: "paid",
    paymentMethod: "Card",
  },
  {
    id: "INV-004",
    date: "2026-04-21",
    table: 8,
    items: 6,
    total: 1650,
    status: "pending",
    paymentMethod: "UPI",
  },
  {
    id: "INV-005",
    date: "2026-04-20",
    table: 5,
    items: 4,
    total: 1120,
    status: "paid",
    paymentMethod: "Cash",
  },
  {
    id: "INV-006",
    date: "2026-04-20",
    table: 12,
    items: 7,
    total: 1980,
    status: "paid",
    paymentMethod: "Card",
  },
];

type BillingRecord = {
  id: string;
  date: string;
  table: number | string;
  items: number;
  total: number;
  status: "paid" | "pending";
  paymentMethod: string;
};

export default function AdminBilling() {
  const [searchQuery, setSearchQuery] = useState("");
  const [billsData, setBillsData] = useState<BillingRecord[]>([]);

  const normalizeTableNumber = (table: BillingRecord["table"]) => {
    if (typeof table === "number") {
      return table;
    }

    const parsed = Number(String(table).replace(/[^0-9]/g, ""));
    return Number.isFinite(parsed) ? parsed : table;
  };

  const formatTableLabel = (table: BillingRecord["table"]) => {
    const normalizedTable = normalizeTableNumber(table);
    return typeof normalizedTable === "number" ? `Table ${normalizedTable}` : String(normalizedTable);
  };

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("admin_orders");
      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders) as BillingRecord[];
          setBillsData(
            parsedOrders.map((order) => ({
              ...order,
              table: normalizeTableNumber(order.table),
              total: typeof order.total === "number" ? order.total : Number(order.total) || 0,
            }))
          );
        } catch {
          setBillsData(initialBillsData);
        }
      } else {
        localStorage.setItem("admin_orders", JSON.stringify(initialBillsData));
        setBillsData(initialBillsData);
      }
    };

    loadOrders();

    window.addEventListener("storage", loadOrders);
    window.addEventListener("local-storage-update", loadOrders);

    return () => {
      window.removeEventListener("storage", loadOrders);
      window.removeEventListener("local-storage-update", loadOrders);
    };
  }, []);

  const totalRevenue = billsData.reduce((sum, bill) => sum + Number(bill.total), 0);
  const paidBills = billsData.filter((b) => b.status === "paid").length;
  const pendingBills = billsData.filter((b) => b.status === "pending").length;

  const filteredBills = billsData.filter((bill) => {
    const search = searchQuery.toLowerCase();
    return (
      bill.id.toLowerCase().includes(search) ||
      formatTableLabel(bill.table).toLowerCase().includes(search) ||
      String(normalizeTableNumber(bill.table)).includes(searchQuery)
    );
  });

  const exportBillsPdf = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Set a standard font that supports the rupee symbol
    doc.setFont("helvetica", "normal");

    // Header
    doc.setFontSize(18);
    doc.text("Spice Garden Billing Report", 14, 18);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 26);

    // Summary section
    doc.setFontSize(11);
    doc.setTextColor(100, 100, 100);
    const summaryStartY = 34;
    doc.text(`Total Revenue: Rs. ${totalRevenue.toLocaleString("en-IN")}`, 14, summaryStartY);
    doc.text(`Total Bills: ${billsData.length}`, 14, summaryStartY + 6);
    doc.text(`Paid: ${paidBills} | Pending: ${pendingBills}`, 14, summaryStartY + 12);
    doc.setTextColor(0, 0, 0);

    // Table with bills
    autoTable(doc, {
      startY: summaryStartY + 20,
      head: [["Invoice ID", "Date", "Table", "Items", "Total", "Payment", "Status"]],
      body: billsData.map((bill) => [
        bill.id,
        bill.date,
        formatTableLabel(bill.table),
        String(bill.items),
        `Rs. ${Number(bill.total).toLocaleString("en-IN")}`,
        bill.paymentMethod,
        bill.status,
      ]),
      styles: {
        fontSize: 9,
        cellPadding: 4,
        halign: "left",
      },
      headStyles: {
        fillColor: [245, 158, 11],
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [50, 50, 50],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      columnStyles: {
        4: { halign: "right" },
      },
      margin: { left: 14, right: 14 },
    });

    // Footer with totals
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.setFontSize(10);
    doc.setFont(undefined, "bold");
    doc.text(`Grand Total: Rs. ${totalRevenue.toLocaleString("en-IN")}`, pageWidth - 14, finalY, { align: "right" });

    doc.save(`spice-garden-billing-report-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  return (
    <div className="p-4 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Billing</h2>
          <p className="text-gray-500">Manage invoices and payments</p>
        </div>
        <button
          type="button"
          onClick={exportBillsPdf}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-white rounded-xl hover:shadow-lg transition-all font-medium whitespace-nowrap w-full sm:w-auto"
        >
          <Download size={20} />
          Export Bills
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
          <div className="flex items-center gap-1 text-3xl font-bold text-gray-800">
            <IndianRupee size={24} />
            {totalRevenue.toLocaleString()}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Total Bills</div>
          <div className="text-3xl font-bold text-gray-800">{billsData.length}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Paid Bills</div>
          <div className="text-3xl font-bold text-amber-600">{paidBills}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="text-sm text-gray-500 mb-2">Pending Bills</div>
          <div className="text-3xl font-bold text-orange-600">{pendingBills}</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by invoice ID or table number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Bills Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Invoice ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Table
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Items
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Payment
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBills.map((bill) => (
              <tr key={bill.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className="font-medium text-gray-800">{bill.id}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar size={16} />
                    <span className="text-sm">{bill.date}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-800">{formatTableLabel(bill.table)}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">{bill.items} items</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 font-semibold text-gray-800">
                    <IndianRupee size={16} />
                    {bill.total.toLocaleString()}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-600">{bill.paymentMethod}</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      bill.status === "paid"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-orange-50 text-orange-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 rounded-lg transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Navbars from "../components/Navbars";
import ConfirmationPopup from "../components/ConfirmationPopup";

// Import icons
import addIcon from "../assets/icons/add.png";
import generateIcon from "../assets/icons/generate.png";
import useGetDashboard from "../api/getDashboard";
import usePostDashboard from "../api/postDashboard";
import usePatchDashboard from "../api/patchDashboard";
import useDeleteDashboard from "../api/deleteDashboard";

// Define types for our inventory item
interface InventoryItem {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  department: string;
}

interface ProcurementOrder {
  id: string;
  orderId: string;
  supplier: string;
  items: number;
  totalValue: number;
  status: "Pending" | "In Transit" | "Delivered";
  date: string;
}

const Dashboard: React.FC = () => {
  // State for stats data

  // State for procurement orders (simplified for dashboard)
  const [procurementOrders, setProcurementOrders] = useState<
    ProcurementOrder[]
  >([]);

  // State for popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // State for form data
  const [newItem, setNewItem] = useState({
    itemCode: "",
    itemName: "",
    category: "",
    department: "",
    status: "",
    quantity: "",
  });

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);

  // Popup functions
  const openAddPopup = () => setShowAddPopup(true);
  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewItem({
      itemCode: "",
      itemName: "",
      category: "",
      department: "",
      status: "",
      quantity: "",
    });
  };

  const openUpdatePopup = (item: InventoryItem) => {
    setEditingItem(item);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setEditingItem(null);
  };

  const openDeletePopup = (item: InventoryItem) => {
    setDeletingItem(item);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setDeletingItem(null);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage("");
  };

  // Form handlers

  const { patchCurrentInventory, loadingForPatchCurrentInventory } =
    usePatchDashboard();

  const usePostCurrentInventoryFunc = async (newItem: InventoryItem) => {
    const response = await postCurrentInventory(newItem);

    if (!response.success) {
      alert(response.message);
      return;
    }

    console.log(response.message);
  };

  const usePatchCurrentInventoryFunc = async (newItem: InventoryItem) => {
    const response = await patchCurrentInventory(newItem);

    if (!response.success) {
      alert(response.message);
      return;
    }

    console.log(response.message);
  };

  const { deleteCurrentInventory, loadingForDeleteCurrentInventory } =
    useDeleteDashboard();

  const useDeleteCurrentInventoryFunc = async (newItem: InventoryItem) => {
    const response = await deleteCurrentInventory(newItem);

    if (!response.success) {
      alert(response.message);
      return;
    }

    console.log(response.message);
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !newItem.itemCode ||
      !newItem.itemName ||
      !newItem.category ||
      !newItem.department ||
      !newItem.status ||
      !newItem.quantity
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newInventoryItem: InventoryItem = {
      id: inventoryItems.length + 1,
      itemCode: newItem.itemCode,
      itemName: newItem.itemName,
      category: newItem.category,
      quantity: parseInt(newItem.quantity),
      status: newItem.status as "in-stock" | "low-stock" | "out-of-stock",
      department: newItem.department,
    };

    setInventoryItems([...inventoryItems, newInventoryItem]);
    closeAddPopup();
    usePostCurrentInventoryFunc(newInventoryItem);
    setSuccessMessage("Item Successfully Added");
    setShowSuccessPopup(true);
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingItem) return;

    const updatedItems = inventoryItems.map((item) =>
      item.itemCode === editingItem.itemCode ? { ...editingItem } : item
    );

    usePatchCurrentInventoryFunc(editingItem);
    setInventoryItems(updatedItems);
    closeUpdatePopup();
    setSuccessMessage("Item Successfully Updated");
    setShowSuccessPopup(true);
  };

  const handleDeleteItem = () => {
    if (!deletingItem) return;

    const filteredItems = inventoryItems.filter(
      (item) => item.itemCode !== deletingItem.itemCode
    );

    useDeleteCurrentInventoryFunc(deletingItem);

    setInventoryItems(filteredItems);
    closeDeletePopup();
    setSuccessMessage("Item Successfully Deleted");
    setShowSuccessPopup(true);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "In Stock":
      case "in-stock":
        return "bg-green-100 text-green-800";
      case "low-stock":
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800";
      case "Out Of Stock":
      case "out-of-stock":
        return "bg-red-100 text-red-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "In Transit":
        return "bg-orange-100 text-orange-600";
      case "Pending":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "in-stock":
        return "In Stock";
      case "low-stock":
        return "Low Stock";
      case "out-of-stock":
        return "Out of Stock";
      default:
        return status;
    }
  };

  const {
    getCurrentInventory,
    loadingForGetCurrentInventory,
    getRecentProcurement,
    getDashboardSummary,
  } = useGetDashboard();
  const { postCurrentInventory } = usePostDashboard();

  type DashboardSummary = {
    title: string;
    value: number;
    change: string;
    type: "positive" | "negative" | "attention";
  };

  const [stats, setStats] = useState<DashboardSummary[]>([]);

  useEffect(() => {
    const useGetDashboardSummaryFunc = async () => {
      const response = await getDashboardSummary();
      console.log(response);
      if (!response.data) {
        alert(response.message);
        return;
      }

      setStats(response.data);
    };
    useGetDashboardSummaryFunc();
  }, []);
  // State for inventory items with CRUD functionality
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  useEffect(() => {
    const useGetCurrentInventoryFunc = async () => {
      const response = await getCurrentInventory();
      console.log(response);
      if (!response.data) {
        alert(response.message);
        return;
      }

      setInventoryItems(response.data);
    };
    useGetCurrentInventoryFunc();
  }, []);

  useEffect(() => {
    const useGetRecentProcurement = async () => {
      const response = await getRecentProcurement();
      console.log(response);
      if (!response.data) {
        alert(response.message);
        return;
      }

      setProcurementOrders(response.data);
      console.log(response.data);
    };
    useGetRecentProcurement();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />

      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <div className="h-1.5 bg-[#82A33D] w-full"></div>
              <div className="p-5">
                <h3 className="text-xs font-medium text-gray-600 uppercase tracking-wider mb-2">
                  {stat.title}
                </h3>
                <div className="text-2xl font-bold text-gray-800 mb-2">
                  {stat.title === "Total Value"
                    ? `P ${stat.value}`
                    : stat.value}
                </div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    stat.type === "positive"
                      ? "bg-green-100 text-green-800"
                      : stat.type === "attention"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
          <button
            onClick={openAddPopup}
            className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
              <img src={addIcon} alt="Add" className="w-3 h-3 object-contain" />
            </div>
            Add New Item
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
              <img
                src={generateIcon}
                alt="Report"
                className="w-3 h-3 object-contain"
              />
            </div>
            Generate Report
          </button>
        </div>

        {/* Current Inventory Section */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Current Inventory
            </h2>
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors w-64"
            />
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Item Code
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Item Name
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Quantity
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Department
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item, key) => (
                  <tr key={key} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-b border-gray-100">
                      {item.itemCode}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {item.itemName}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {item.category}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          item.status
                        )}`}
                      >
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {item.department}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <div className="flex gap-2">
                        <button
                          onClick={() => openUpdatePopup(item)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                          <img
                            src="/src/assets/icons/edit.png"
                            alt="Edit"
                            className="w-4 h-4"
                          />
                        </button>
                        <button
                          onClick={() => openDeletePopup(item)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                          <img
                            src="/src/assets/icons/delete.png"
                            alt="Delete"
                            className="w-4 h-4"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Inventory Consumption Trends
            </h3>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">
                CHART VISUALIZATION
              </span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">
              Department Usage Analysis
            </h3>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 font-semibold">
                CHART VISUALIZATION
              </span>
            </div>
          </div>
        </div>

        {/* Recent Procurement Activities */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Recent Procurement Activities
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Supplier
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Items
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Total Value
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {procurementOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 border-b border-gray-100">
                      {order.orderId}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {order.supplier}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {order.items}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      ₱
                      {order.totalValue.toLocaleString("en-PH", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Popup */}
        {showAddPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <img
                      src="/src/assets/icons/add.png"
                      alt="Add"
                      className="w-6 h-6 invert"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">Add New Item</h2>
                </div>
                <button
                  onClick={closeAddPopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleAddItem} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Item Code"
                      value={newItem.itemCode}
                      onChange={(e) =>
                        setNewItem({ ...newItem, itemCode: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={newItem.itemName}
                      onChange={(e) =>
                        setNewItem({ ...newItem, itemName: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                  />
                </div>

                <div className="mb-4">
                  <select
                    value={newItem.department}
                    onChange={(e) =>
                      setNewItem({ ...newItem, department: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="">Select department</option>
                    <option value="housekeeping">Housekeeping</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="f&b">F&B</option>
                    <option value="front-desk">Front Desk</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <select
                      value={newItem.status}
                      onChange={(e) =>
                        setNewItem({ ...newItem, status: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    >
                      <option value="">Select status</option>
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={newItem.quantity}
                      onChange={(e) =>
                        setNewItem({ ...newItem, quantity: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeAddPopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors cursor-pointer"
                  >
                    ADD
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Item Popup */}
        {showUpdatePopup && editingItem && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <img
                      src="/src/assets/icons/edit.png"
                      alt="Edit"
                      className="w-6 h-6"
                    />
                  </div>
                  <h2 className="text-xl font-semibold">Update Item</h2>
                </div>
                <button
                  onClick={closeUpdatePopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleUpdateItem} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      disabled
                      value={editingItem.itemCode}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          itemCode: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editingItem.itemName}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          itemName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                  />
                </div>

                <div className="mb-4">
                  <select
                    value={editingItem.department}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        department: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="housekeeping">Housekeeping</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="f&b">F&B</option>
                    <option value="front-desk">Front Desk</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <select
                      value={editingItem.status}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          status: e.target.value as any,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    >
                      <option value="in-stock">In Stock</option>
                      <option value="low-stock">Low Stock</option>
                      <option value="out-of-stock">Out of Stock</option>
                    </select>
                  </div>
                  <div>
                    <input
                      type="number"
                      value={editingItem.quantity}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          quantity: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeUpdatePopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors cursor-pointer"
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Popup */}
        <ConfirmationPopup
          isOpen={showSuccessPopup}
          onClose={closeSuccessPopup}
          title="Success"
          message={successMessage}
          type="success"
          showCancelButton={false}
          showConfirmButton={false}
        />

        {/* Delete Confirmation Popup */}
        <ConfirmationPopup
          isOpen={showDeletePopup && !!deletingItem}
          onClose={closeDeletePopup}
          onConfirm={handleDeleteItem}
          title="Delete Confirmation"
          message={`Are you sure you want to delete ${deletingItem?.itemName}? This action cannot be undone.`}
          type="delete"
          confirmText="DELETE"
          cancelText="CANCEL"
        />
      </main>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import ConfirmationPopup from '../components/ConfirmationPopup';

interface ProcurementOrder {
  id: string;
  orderId: string;
  supplier: string;
  items: number;
  totalValue: number;
  status: 'Pending' | 'In Transit' | 'Delivered';
  date: string;
}

const Procurement: React.FC = () => {
  // State for procurement orders
  const [orders, setOrders] = useState<ProcurementOrder[]>([
    { id: '1', orderId: '544125', supplier: 'ABC Supplies Co.', items: 15, totalValue: 45000, status: 'Delivered', date: '2025-09-10' },
    { id: '2', orderId: '544126', supplier: 'Hotel Essentials Ltd.', items: 8, totalValue: 28500, status: 'In Transit', date: '2025-09-11' },
    { id: '3', orderId: '544127', supplier: 'Quality Linens Inc.', items: 20, totalValue: 67800, status: 'Pending', date: '2025-09-12' }
  ]);

  // State for popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // State for form data
  const [newOrder, setNewOrder] = useState({
    orderDate: new Date().toISOString().split('T')[0],
    supplier: '',
    itemCount: '',
    totalValue: '',
    status: ''
  });

  // State for editing and deleting
  const [editingOrder, setEditingOrder] = useState<ProcurementOrder | null>(null);
  const [deletingOrder, setDeletingOrder] = useState<ProcurementOrder | null>(null);

  // Popup functions
  const openAddPopup = () => setShowAddPopup(true);
  
  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewOrder({
      orderDate: new Date().toISOString().split('T')[0],
      supplier: '',
      itemCount: '',
      totalValue: '',
      status: ''
    });
  };

  const openUpdatePopup = (order: ProcurementOrder) => {
    setEditingOrder(order);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setEditingOrder(null);
  };

  const openDeletePopup = (order: ProcurementOrder) => {
    setDeletingOrder(order);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setDeletingOrder(null);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
  };

  // Form handlers
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newOrder.supplier || !newOrder.itemCount || !newOrder.totalValue || !newOrder.status) {
      alert('Please fill in all required fields');
      return;
    }

    const newProcurementOrder: ProcurementOrder = {
      id: (orders.length + 1).toString(),
      orderId: generateOrderId(),
      supplier: newOrder.supplier,
      items: parseInt(newOrder.itemCount),
      totalValue: parseFloat(newOrder.totalValue),
      status: newOrder.status as 'Pending' | 'In Transit' | 'Delivered',
      date: newOrder.orderDate
    };

    setOrders([newProcurementOrder, ...orders]);
    closeAddPopup();
    setSuccessMessage('Order Successfully Added');
    setShowSuccessPopup(true);
  };

  const handleUpdateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingOrder) return;

    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id ? editingOrder : order
    );

    setOrders(updatedOrders);
    closeUpdatePopup();
    setSuccessMessage('Order Successfully Updated');
    setShowSuccessPopup(true);
  };

  const handleDeleteOrder = () => {
    if (!deletingOrder) return;

    const filteredOrders = orders.filter(
      order => order.id !== deletingOrder.id
    );

    setOrders(filteredOrders);
    closeDeletePopup();
    setSuccessMessage('Order Successfully Deleted');
    setShowSuccessPopup(true);
  };

  // Generate order ID
  const generateOrderId = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-orange-100 text-orange-600';
      case 'Pending': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        {/* Action Buttons */}
        <div className="flex justify-end mb-6">
          <button 
            onClick={openAddPopup}
            className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
              <img 
                src="/src/assets/icons/add.png" 
                alt="Add" 
                className="w-3 h-3 object-contain"
              />
            </div>
            Add New Order
          </button>
        </div>

        {/* Procurement Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recent Procurement Activities</h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors w-64"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors cursor-pointer">
                <option>Sort by: Default</option>
                <option>Order ID</option>
                <option>Supplier</option>
                <option>Items</option>
                <option>Total Value</option>
                <option>Status</option>
                <option>Date</option>
              </select>
            </div>
          </div>

          {/* Procurement Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Order ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Supplier</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Items</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Total Value</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-b border-gray-100">{order.orderId}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{order.supplier}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{order.items}</td>
                    <td className="px-4 py-3 border-b border-gray-100">₱{order.totalValue.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">{order.date}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openUpdatePopup(order)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                          <img 
                            src="/src/assets/icons/edit.png" 
                            alt="Edit" 
                            className="w-4 h-4"
                          />
                        </button>
                        <button 
                          onClick={() => openDeletePopup(order)}
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

        {/* Add Order Popup */}
        {showAddPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/add.png" alt="Add" className="w-6 h-6 invert" />
                  </div>
                  <h2 className="text-xl font-semibold">Add New Order</h2>
                </div>
                <button 
                  onClick={closeAddPopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddOrder} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value="AUTO-GENERATED"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      value={newOrder.orderDate}
                      onChange={(e) => setNewOrder({...newOrder, orderDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Supplier <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newOrder.supplier}
                    onChange={(e) => setNewOrder({...newOrder, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select Supplier</option>
                    <option value="ABC Supplies Co.">ABC Supplies Co.</option>
                    <option value="Hotel Essentials Ltd.">Hotel Essentials Ltd.</option>
                    <option value="Quality Linens Inc.">Quality Linens Inc.</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Items <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter quantity"
                      value={newOrder.itemCount}
                      onChange={(e) => setNewOrder({...newOrder, itemCount: e.target.value})}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Value <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₱</span>
                      <input
                        type="number"
                        placeholder="0.00"
                        value={newOrder.totalValue}
                        onChange={(e) => setNewOrder({...newOrder, totalValue: e.target.value})}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({...newOrder, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    required
                  >
                    <option value="" disabled>Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeAddPopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-semibold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors cursor-pointer font-semibold"
                  >
                    SAVE ORDER
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Order Popup */}
        {showUpdatePopup && editingOrder && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/edit.png" alt="Edit" className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Update Order</h2>
                </div>
                <button 
                  onClick={closeUpdatePopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateOrder} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order ID
                    </label>
                    <input
                      type="text"
                      value={editingOrder.orderId}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={editingOrder.date}
                      onChange={(e) => setEditingOrder({...editingOrder, date: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Supplier
                  </label>
                  <select
                    value={editingOrder.supplier}
                    onChange={(e) => setEditingOrder({...editingOrder, supplier: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="ABC Supplies Co.">ABC Supplies Co.</option>
                    <option value="Hotel Essentials Ltd.">Hotel Essentials Ltd.</option>
                    <option value="Quality Linens Inc.">Quality Linens Inc.</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Items
                    </label>
                    <input
                      type="number"
                      value={editingOrder.items}
                      onChange={(e) => setEditingOrder({...editingOrder, items: parseInt(e.target.value)})}
                      min="1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Value
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold">₱</span>
                      <input
                        type="number"
                        value={editingOrder.totalValue}
                        onChange={(e) => setEditingOrder({...editingOrder, totalValue: parseFloat(e.target.value)})}
                        min="0"
                        step="0.01"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingOrder.status}
                    onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Transit">In Transit</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeUpdatePopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-semibold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors cursor-pointer font-semibold"
                  >
                    UPDATE ORDER
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Reusable Confirmation Popups */}
        <ConfirmationPopup
          isOpen={showDeletePopup}
          onClose={closeDeletePopup}
          onConfirm={handleDeleteOrder}
          title="Delete Order"
          message={`Are you sure you want to delete order ${deletingOrder?.orderId} from ${deletingOrder?.supplier}? This action cannot be undone.`}
          type="delete"
          confirmText="DELETE"
        />

        <ConfirmationPopup
          isOpen={showSuccessPopup}
          onClose={closeSuccessPopup}
          title="Success"
          message={successMessage}
          type="success"
          showCancelButton={false}
          showConfirmButton={false}
        />
      </main>
    </div>
  );
};

export default Procurement;
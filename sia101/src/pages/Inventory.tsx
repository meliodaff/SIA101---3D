import React, { useState } from 'react';
import Navbars from '../components/Navbars';

// Define types for our inventory item
interface InventoryItem {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  department: string;
}

const Inventory: React.FC = () => {
  // State for inventory items
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([
    { id: 1, itemCode: '1231', itemName: 'Bath Towels', category: 'Housekeeping', quantity: 450, status: 'in-stock', department: 'Housekeeping' },
    { id: 2, itemCode: '1231', itemName: 'Wine Glasses', category: 'F&B', quantity: 80, status: 'low-stock', department: 'Restaurant' },
    { id: 3, itemCode: '1231', itemName: 'Light Bulbs', category: 'Maintenance', quantity: 0, status: 'out-of-stock', department: 'Maintenance' },
    { id: 4, itemCode: '1231', itemName: 'Soap', category: 'Guest Amenities', quantity: 1200, status: 'in-stock', department: 'Housekeeping' },
    { id: 5, itemCode: '1231', itemName: 'Key Cards', category: 'Front Desk', quantity: 85, status: 'low-stock', department: 'Front Desk' }
  ]);

  // State for popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  // State for form data
  const [newItem, setNewItem] = useState({
    itemCode: '',
    itemName: '',
    category: '',
    department: '',
    status: '',
    quantity: ''
  });

  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<InventoryItem | null>(null);

  // Popup functions
  const openAddPopup = () => setShowAddPopup(true);
  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewItem({ itemCode: '', itemName: '', category: '', department: '', status: '', quantity: '' });
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

  // Form handlers
  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newItem.itemCode || !newItem.itemName || !newItem.category || !newItem.department || !newItem.status || !newItem.quantity) {
      alert('Please fill in all fields');
      return;
    }

    const newInventoryItem: InventoryItem = {
      id: inventoryItems.length + 1,
      itemCode: newItem.itemCode,
      itemName: newItem.itemName,
      category: newItem.category,
      quantity: parseInt(newItem.quantity),
      status: newItem.status as 'in-stock' | 'low-stock' | 'out-of-stock',
      department: newItem.department
    };

    setInventoryItems([...inventoryItems, newInventoryItem]);
    closeAddPopup();
    alert('Item added successfully!');
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingItem) return;

    const updatedItems = inventoryItems.map(item =>
      item.id === editingItem.id ? { ...editingItem } : item
    );

    setInventoryItems(updatedItems);
    closeUpdatePopup();
    alert('Item updated successfully!');
  };

  const handleDeleteItem = () => {
    if (!deletingItem) return;

    const filteredItems = inventoryItems.filter(item => item.id !== deletingItem.id);
    setInventoryItems(filteredItems);
    closeDeletePopup();
    alert('Item deleted successfully!');
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-20 p-6">
        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mb-6">
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
            Add New Item
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
            <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
              <img 
                src="/src/assets/icons/generate.png" 
                alt="Report" 
                className="w-3 h-3 object-contain"
              />
            </div>
            Generate Report
          </button>
        </div>

        {/* Inventory Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#82A33D]">Current Inventory</h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search..." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors">
                <option>Sort by: Default</option>
                <option>Item Code</option>
                <option>Item Name</option>
                <option>Category</option>
                <option>Quantity</option>
                <option>Status</option>
                <option>Department</option>
              </select>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Item Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Item Name</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Category</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-b border-gray-100">{item.itemCode}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{item.itemName}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{item.category}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{item.quantity}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(item.status)}`}>
                        {getStatusText(item.status)}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">{item.department}</td>
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

        {/* Add Item Popup */}
        {showAddPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/add.png" alt="Add" className="w-6 h-6 invert" />
                  </div>
                  <h2 className="text-xl font-semibold">Add New Item</h2>
                </div>
                <button onClick={closeAddPopup} className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors">
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
                      onChange={(e) => setNewItem({...newItem, itemCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Item Name"
                      value={newItem.itemName}
                      onChange={(e) => setNewItem({...newItem, itemName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Category"
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                  />
                </div>
                
                <div className="mb-4">
                  <select
                    value={newItem.department}
                    onChange={(e) => setNewItem({...newItem, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
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
                      onChange={(e) => setNewItem({...newItem, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
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
                      onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeAddPopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors"
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
                    <img src="/src/assets/icons/edit.png" alt="Edit" className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Update Item</h2>
                </div>
                <button onClick={closeUpdatePopup} className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors">
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateItem} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <input
                      type="text"
                      value={editingItem.itemCode}
                      onChange={(e) => setEditingItem({...editingItem, itemCode: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      value={editingItem.itemName}
                      onChange={(e) => setEditingItem({...editingItem, itemName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({...editingItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                  />
                </div>
                
                <div className="mb-4">
                  <select
                    value={editingItem.department}
                    onChange={(e) => setEditingItem({...editingItem, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
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
                      onChange={(e) => setEditingItem({...editingItem, status: e.target.value as any})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
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
                      onChange={(e) => setEditingItem({...editingItem, quantity: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={closeUpdatePopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg hover:bg-[#6d8930] transition-colors"
                  >
                    UPDATE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Popup */}
        {showDeletePopup && deletingItem && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/delete.png" alt="Delete" className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Delete Confirmation</h2>
                </div>
                <button onClick={closeDeletePopup} className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors">
                  ×
                </button>
              </div>
              
              <div className="p-6">
                <p className="text-center text-gray-600 mb-6">
                  Are you sure you want to delete this entry?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={closeDeletePopup}
                    className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    CANCEL
                  </button>
                  <button
                    onClick={handleDeleteItem}
                    className="flex-1 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    CONFIRM
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventory;
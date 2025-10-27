import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import ConfirmationPopup from '../components/ConfirmationPopup';

// Define types for requisition
interface Requisition {
  id: string;
  requestId: string;
  requestedBy: string;
  item: string;
  quantity: number;
  department: string;
  dateRequested: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
}

const Requisitions: React.FC = () => {
  // State for requisitions
  const [requisitions, setRequisitions] = useState<Requisition[]>([
    {
      id: '1',
      requestId: 'REQ-00123',
      requestedBy: 'Maria Dela Cruz',
      item: 'Bath Towels',
      quantity: 450,
      department: 'Housekeeping',
      dateRequested: '2025-09-10',
      status: 'Pending'
    },
    {
      id: '2',
      requestId: 'REQ-00124',
      requestedBy: 'John Santos',
      item: 'Key Cards',
      quantity: 80,
      department: 'Front Desk',
      dateRequested: '2025-09-11',
      status: 'Approved'
    },
    {
      id: '3',
      requestId: 'REQ-00125',
      requestedBy: 'Chef Mateo',
      item: 'Wine Glasses',
      quantity: 0,
      department: 'Restaurant',
      dateRequested: '2025-09-12',
      status: 'Rejected'
    },
    {
      id: '4',
      requestId: 'REQ-00126',
      requestedBy: 'Alex Cruz',
      item: 'Soap',
      quantity: 1200,
      department: 'Guest Amenities',
      dateRequested: '2025-09-13',
      status: 'Completed'
    }
  ]);

  // State for popups
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // State for form data
  const [newRequest, setNewRequest] = useState({
    requestedBy: '',
    item: '',
    quantity: '',
    department: '',
    dateRequested: new Date().toISOString().split('T')[0],
    status: 'Pending' as 'Pending' | 'Approved' | 'Rejected' | 'Completed'
  });

  // State for editing and deleting
  const [editingRequisition, setEditingRequisition] = useState<Requisition | null>(null);
  const [deletingRequisition, setDeletingRequisition] = useState<Requisition | null>(null);

  // Request counter
  const [requestCounter, setRequestCounter] = useState(127);

  // Popup functions
  const openAddPopup = () => {
    setShowAddPopup(true);
    setNewRequest(prev => ({
      ...prev,
      dateRequested: new Date().toISOString().split('T')[0]
    }));
  };

  const closeAddPopup = () => {
    setShowAddPopup(false);
    setNewRequest({
      requestedBy: '',
      item: '',
      quantity: '',
      department: '',
      dateRequested: new Date().toISOString().split('T')[0],
      status: 'Pending'
    });
  };

  const openUpdatePopup = (requisition: Requisition) => {
    setEditingRequisition(requisition);
    setShowUpdatePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setEditingRequisition(null);
  };

  const openDeletePopup = (requisition: Requisition) => {
    setDeletingRequisition(requisition);
    setShowDeletePopup(true);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
    setDeletingRequisition(null);
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
    setSuccessMessage('');
  };

  // Form handlers
  const handleAddRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newRequest.requestedBy || !newRequest.item || !newRequest.quantity || !newRequest.department) {
      alert('Please fill in all required fields.');
      return;
    }

    const newRequisition: Requisition = {
      id: (requisitions.length + 1).toString(),
      requestId: `REQ-${String(requestCounter).padStart(5, '0')}`,
      requestedBy: newRequest.requestedBy,
      item: newRequest.item,
      quantity: parseInt(newRequest.quantity),
      department: newRequest.department,
      dateRequested: newRequest.dateRequested,
      status: newRequest.status
    };

    setRequisitions([newRequisition, ...requisitions]);
    setRequestCounter(prev => prev + 1);
    closeAddPopup();
    setSuccessMessage('Request Successfully Added');
    setShowSuccessPopup(true);
  };

  const handleUpdateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingRequisition) return;

    const updatedRequisitions = requisitions.map(req =>
      req.id === editingRequisition.id ? editingRequisition : req
    );

    setRequisitions(updatedRequisitions);
    closeUpdatePopup();
    setSuccessMessage('Request Successfully Updated');
    setShowSuccessPopup(true);
  };

  const handleDeleteRequest = () => {
    if (!deletingRequisition) return;

    const filteredRequisitions = requisitions.filter(
      req => req.id !== deletingRequisition.id
    );

    setRequisitions(filteredRequisitions);
    closeDeletePopup();
    setSuccessMessage('Request Successfully Deleted');
    setShowSuccessPopup(true);
  };

  // Status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-600';
      case 'Approved': return 'bg-green-100 text-green-600';
      case 'Rejected': return 'bg-red-100 text-red-600';
      case 'Completed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
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
            Add New Request
          </button>
        </div>

        {/* Requisitions Section */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Requisitions</h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Search...." 
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors w-64"
              />
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] transition-colors cursor-pointer">
                <option>Sort by: Default</option>
                <option>Requisition ID</option>
                <option>Department</option>
                <option>Items</option>
                <option>Status</option>
                <option>Date Requested</option>
                <option>Priority</option>
              </select>
            </div>
          </div>

          {/* Requisitions Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Request ID</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Requested By</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Item</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Quantity</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date Requested</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requisitions.map((requisition) => (
                  <tr key={requisition.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.requestId}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.requestedBy}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.item}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.quantity.toLocaleString()}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.department}</td>
                    <td className="px-4 py-3 border-b border-gray-100">{requisition.dateRequested}</td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(requisition.status)}`}>
                        {requisition.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 border-b border-gray-100">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => openUpdatePopup(requisition)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                        >
                          <img 
                            src="/src/assets/icons/edit.png" 
                            alt="Edit" 
                            className="w-4 h-4"
                          />
                        </button>
                        <button 
                          onClick={() => openDeletePopup(requisition)}
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

        {/* Add New Request Popup */}
        {showAddPopup && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/requisitions.png" alt="Add Request" className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Add New Request</h2>
                </div>
                <button 
                  onClick={closeAddPopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleAddRequest} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Request ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={`REQ-${String(requestCounter).padStart(5, '0')}`}
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
                      value={newRequest.dateRequested}
                      onChange={(e) => setNewRequest({...newRequest, dateRequested: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requested By <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={newRequest.requestedBy}
                    onChange={(e) => setNewRequest({...newRequest, requestedBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Item <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Item"
                      value={newRequest.item}
                      onChange={(e) => setNewRequest({...newRequest, item: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="0"
                      value={newRequest.quantity}
                      onChange={(e) => setNewRequest({...newRequest, quantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Guest Amenities">Guest Amenities</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Kitchen">Kitchen</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newRequest.status}
                    onChange={(e) => setNewRequest({...newRequest, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
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
                    ADD REQUEST
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Update Requisition Popup */}
        {showUpdatePopup && editingRequisition && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
              <div className="flex justify-between items-center p-6 border-b border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <img src="/src/assets/icons/edit.png" alt="Edit" className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold">Update Request</h2>
                </div>
                <button 
                  onClick={closeUpdatePopup}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleUpdateRequest} className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Request ID
                    </label>
                    <input
                      type="text"
                      value={editingRequisition.requestId}
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
                      value={editingRequisition.dateRequested}
                      onChange={(e) => setEditingRequisition({...editingRequisition, dateRequested: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Requested By
                  </label>
                  <input
                    type="text"
                    value={editingRequisition.requestedBy}
                    onChange={(e) => setEditingRequisition({...editingRequisition, requestedBy: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Item
                    </label>
                    <input
                      type="text"
                      value={editingRequisition.item}
                      onChange={(e) => setEditingRequisition({...editingRequisition, item: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={editingRequisition.quantity}
                      onChange={(e) => setEditingRequisition({...editingRequisition, quantity: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D]"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department
                  </label>
                  <select
                    value={editingRequisition.department}
                    onChange={(e) => setEditingRequisition({...editingRequisition, department: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Front Desk">Front Desk</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Guest Amenities">Guest Amenities</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Kitchen">Kitchen</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={editingRequisition.status}
                    onChange={(e) => setEditingRequisition({...editingRequisition, status: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#82A33D] cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Completed">Completed</option>
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
                    UPDATE
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
          onConfirm={handleDeleteRequest}
          title="Delete Request"
          message={`Are you sure you want to delete the request ${deletingRequisition?.requestId} for ${deletingRequisition?.item}? This action cannot be undone.`}
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

export default Requisitions;
import React, { useState } from 'react';
import Navbars from '../components/Navbars';
import ConfirmationPopup from '../components/ConfirmationPopup';

interface Department {
  id: string;
  name: string;
  manager: string;
  itemsAssigned: number;
  totalUsage: string;
  monthlyConsumption: number;
  requests: number;
}

interface DepartmentItem {
  code: string;
  name: string;
  category: string;
  quantity: number;
  status: string;
}

interface MaintenanceRequest {
  id: string;
  department: string;
  itemService: string;
  requestedBy: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
}

// Define types for requisition (same as in Requisitions page)
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

const Departments: React.FC = () => {
  // State for departments
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: 'DEPT001',
      name: 'Housekeeping',
      manager: 'Maria Santos',
      itemsAssigned: 248,
      totalUsage: '35%',
      monthlyConsumption: 45680,
      requests: 5
    },
    {
      id: 'DEPT002',
      name: 'Maintenance',
      manager: 'Juan Dela Cruz',
      itemsAssigned: 156,
      totalUsage: '18%',
      monthlyConsumption: 28450,
      requests: 3
    },
    {
      id: 'DEPT003',
      name: 'Laundry Services',
      manager: 'Ana Reyes',
      itemsAssigned: 67,
      totalUsage: '6%',
      monthlyConsumption: 18560,
      requests: 2
    },
    {
      id: 'DEPT004',
      name: 'Food & Beverages',
      manager: 'Robert Lim',
      itemsAssigned: 412,
      totalUsage: '28%',
      monthlyConsumption: 78920,
      requests: 8
    },
    {
      id: 'DEPT005',
      name: 'Security',
      manager: 'Carlos Gomez',
      itemsAssigned: 45,
      totalUsage: '5%',
      monthlyConsumption: 9970,
      requests: 1
    },
    {
      id: 'DEPT006',
      name: 'Front Desk',
      manager: 'Lisa Tan',
      itemsAssigned: 89,
      totalUsage: '8%',
      monthlyConsumption: 12340,
      requests: 4
    }
  ]);

  // State for department items
  const [departmentItems, setDepartmentItems] = useState<Record<string, DepartmentItem[]>>({
    'Housekeeping': [
      { code: '1231', name: 'Bath Towels', category: 'Housekeeping', quantity: 450, status: 'In Stock' },
      { code: '1232', name: 'Bed Linens', category: 'Housekeeping', quantity: 320, status: 'In Stock' },
      { code: '1233', name: 'Cleaning Supplies', category: 'Housekeeping', quantity: 45, status: 'Low Stock' },
      { code: '1234', name: 'Toiletries', category: 'Guest Amenities', quantity: 1200, status: 'In Stock' },
      { code: '1235', name: 'Vacuum Cleaners', category: 'Equipment', quantity: 12, status: 'In Stock' }
    ],
    'Maintenance': [
      { code: '2001', name: 'Light Bulbs', category: 'Maintenance', quantity: 0, status: 'Out of Stock' },
      { code: '2002', name: 'Tools', category: 'Maintenance', quantity: 85, status: 'In Stock' }
    ],
    'Laundry Services': [
      { code: '3001', name: 'Detergent', category: 'Laundry', quantity: 45, status: 'Low Stock' },
      { code: '3002', name: 'Fabric Softener', category: 'Laundry', quantity: 32, status: 'In Stock' }
    ],
    'Food & Beverages': [
      { code: '4001', name: 'Wine Glasses', category: 'F&B', quantity: 80, status: 'Low Stock' },
      { code: '4002', name: 'Dinnerware', category: 'F&B', quantity: 250, status: 'In Stock' }
    ],
    'Security': [
      { code: '5001', name: 'Security Cameras', category: 'Security', quantity: 15, status: 'In Stock' }
    ],
    'Front Desk': [
      { code: '6001', name: 'Key Cards', category: 'Front Desk', quantity: 85, status: 'Low Stock' },
      { code: '6002', name: 'Registration Forms', category: 'Front Desk', quantity: 500, status: 'In Stock' }
    ]
  });

  // State for maintenance requests
  const [maintenanceRequests] = useState<MaintenanceRequest[]>([
    {
      id: '#00000',
      department: 'Housekeeping',
      itemService: 'Floor Cleaning Machine Repair',
      requestedBy: 'Name',
      date: '2025-09-10',
      status: 'pending'
    },
    {
      id: '#00000',
      department: 'Maintenance',
      itemService: 'AC Unit Service - Room 305',
      requestedBy: 'Name',
      date: '2025-09-11',
      status: 'approved'
    },
    {
      id: '#00000',
      department: 'F&B',
      itemService: 'Kitchen Equipment Check',
      requestedBy: 'Name',
      date: '2025-09-12',
      status: 'rejected'
    },
    {
      id: '#00000',
      department: 'Housekeeping',
      itemService: 'Linen Replacement - 5th Floor',
      requestedBy: 'Name',
      date: '2025-09-13',
      status: 'completed'
    },
    {
      id: '#00000',
      department: 'Maintenance',
      itemService: 'Elevator Maintenance Check',
      requestedBy: 'Name',
      date: '2025-09-13',
      status: 'completed'
    }
  ]);

  // State for requisitions (same as in Requisitions page)
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
  const [showAddDepartment, setShowAddDepartment] = useState(false);
  const [showViewDepartment, setShowViewDepartment] = useState(false);
  const [showViewRequests, setShowViewRequests] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [showUpdateItem, setShowUpdateItem] = useState(false);
  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showUpdateRequisition, setShowUpdateRequisition] = useState(false);
  const [showDeleteRequisition, setShowDeleteRequisition] = useState(false);
  const [showEditDepartment, setShowEditDepartment] = useState(false);

  // State for confirmation popups
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');
  const [deleteCallback, setDeleteCallback] = useState<() => void>(() => {});

  // State for forms
  const [departmentForm, setDepartmentForm] = useState({
    deptId: '',
    deptName: '',
    managerName: '',
    categories: ''
  });

  const [editDepartmentForm, setEditDepartmentForm] = useState({ // Add this block
  id: '',
  name: '',
  manager: '',
  itemsAssigned: 0,
  totalUsage: '',
  monthlyConsumption: 0,
  requests: 0,
  categories: ''
});

  const [itemForm, setItemForm] = useState({
    itemCode: '',
    itemName: '',
    category: '',
    status: '',
    quantity: ''
  });

  const [updateItemForm, setUpdateItemForm] = useState({
    itemCode: '',
    itemName: '',
    category: '',
    status: '',
    quantity: ''
  });

  const [updateRequisitionForm, setUpdateRequisitionForm] = useState({
    requestedBy: '',
    item: '',
    quantity: '',
    department: '',
    dateRequested: '',
    status: ''
  });

  // State for current selections
  const [currentDepartment, setCurrentDepartment] = useState<string>('');
  const [currentEditingIndex, setCurrentEditingIndex] = useState<number>(-1);
  const [currentDeletingIndex, setCurrentDeletingIndex] = useState<number>(-1);
  const [editingRequisition, setEditingRequisition] = useState<Requisition | null>(null);
  const [deletingRequisition, setDeletingRequisition] = useState<Requisition | null>(null);

  // Filter states
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [searchTerm, setSearchTerm] = useState('');

  // Open popup functions
  const openAddDepartmentPopup = () => setShowAddDepartment(true);
  const openViewDepartmentPopup = (deptName: string) => {
    setCurrentDepartment(deptName);
    setShowViewDepartment(true);
  };
  const openViewRequestsPopup = (deptName: string) => {
    setCurrentDepartment(deptName);
    setShowViewRequests(true);
  };
  const openAddItemPopup = () => setShowAddItem(true);
  const openUpdateItemPopup = (index: number) => {
    setCurrentEditingIndex(index);
    const item = departmentItems[currentDepartment][index];
    setUpdateItemForm({
      itemCode: item.code,
      itemName: item.name,
      category: item.category,
      status: item.status,
      quantity: item.quantity.toString()
    });
    setShowUpdateItem(true);
  };
  const openDeleteItemPopup = (index: number) => {
    setCurrentDeletingIndex(index);
    const item = departmentItems[currentDepartment][index];
    setDeleteMessage(`Are you sure you want to delete ${item.name}?`);
    setDeleteCallback(() => deleteDepartmentItem);
    setShowDeletePopup(true);
  };
  const openUpdateRequisitionPopup = (requisition: Requisition) => {
    setEditingRequisition(requisition);
    setUpdateRequisitionForm({
      requestedBy: requisition.requestedBy,
      item: requisition.item,
      quantity: requisition.quantity.toString(),
      department: requisition.department,
      dateRequested: requisition.dateRequested,
      status: requisition.status
    });
    setShowUpdateRequisition(true);
  };
  const openDeleteRequisitionPopup = (requisition: Requisition) => {
    setDeletingRequisition(requisition);
    setDeleteMessage(`Are you sure you want to delete request ${requisition.requestId}?`);
    setDeleteCallback(() => deleteRequisition);
    setShowDeletePopup(true);
  };
  const openEditDepartmentPopup = (dept: Department) => {
  setEditDepartmentForm({
    id: dept.id,
    name: dept.name,
    manager: dept.manager,
    itemsAssigned: dept.itemsAssigned,
    totalUsage: dept.totalUsage,
    monthlyConsumption: dept.monthlyConsumption,
    requests: dept.requests,
    categories: ''
  });
  setShowEditDepartment(true);
};

  // Close popup functions
  const closeAllPopups = () => {
    setShowAddDepartment(false);
    setShowViewDepartment(false);
    setShowViewRequests(false);
    setShowAddItem(false);
    setShowUpdateItem(false);
    setShowDeleteItem(false);
    setShowUpdateRequisition(false);
    setShowDeleteRequisition(false);
    setShowEditDepartment(false);
    resetForms();
  };

  // Reset forms
  const resetForms = () => {
    setDepartmentForm({ deptId: '', deptName: '', managerName: '', categories: '' });
    setItemForm({ itemCode: '', itemName: '', category: '', status: '', quantity: '' });
    setUpdateItemForm({ itemCode: '', itemName: '', category: '', status: '', quantity: '' });
    setUpdateRequisitionForm({ requestedBy: '', item: '', quantity: '', department: '', dateRequested: '', status: '' });
    setCurrentEditingIndex(-1);
    setCurrentDeletingIndex(-1);
    setEditingRequisition(null);
    setDeletingRequisition(null);
  };

 // Handle form changes
  const handleDepartmentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDepartmentForm({ ...departmentForm, [e.target.name]: e.target.value });
  };

  const handleItemFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setItemForm({ ...itemForm, [e.target.name]: e.target.value });
  };

  const handleUpdateItemFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateItemForm({ ...updateItemForm, [e.target.name]: e.target.value });
  };

  const handleUpdateRequisitionFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUpdateRequisitionForm({ ...updateRequisitionForm, [e.target.name]: e.target.value });
  };

  // Add this function with your other handlers
  const editDepartment = () => {
    if (!editDepartmentForm.name || !editDepartmentForm.manager || !editDepartmentForm.categories) {
      return;
    }

    const updatedDepartments = departments.map(dept =>
      dept.id === editDepartmentForm.id ? { ...editDepartmentForm } : dept
    );

    setDepartments(updatedDepartments);
    closeAllPopups();
    setSuccessMessage('Department Successfully Updated');
    setShowSuccessPopup(true);
  };

  // Add this with your other form change handlers
  const handleEditDepartmentFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditDepartmentForm(prev => ({
      ...prev,
      [name]: name === 'monthlyConsumption' || name === 'itemsAssigned' || name === 'requests' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  // Add new department
  const addDepartment = () => {
    if (!departmentForm.deptName || !departmentForm.managerName || !departmentForm.categories) {
      alert('Please fill in all required fields');
      return;
    }

    const newDepartment: Department = {
      id: `DEPT${String(departments.length + 1).padStart(3, '0')}`, // Auto-generate ID
      name: departmentForm.deptName,
      manager: departmentForm.managerName,
      itemsAssigned: 0,
      totalUsage: '0%',
      monthlyConsumption: 0,
      requests: 0
    };

    setDepartments([...departments, newDepartment]);
    setDepartmentItems({ ...departmentItems, [departmentForm.deptName]: [] });
    closeAllPopups();
    setSuccessMessage('Department Successfully Added');
    setShowSuccessPopup(true);
  };

  // Add item to department
  const addItemToDepartment = () => {
    if (!itemForm.itemCode || !itemForm.itemName || !itemForm.category || !itemForm.status || !itemForm.quantity) {
      alert('Please fill in all fields');
      return;
    }

    const newItem: DepartmentItem = {
      code: itemForm.itemCode,
      name: itemForm.itemName,
      category: itemForm.category,
      quantity: parseInt(itemForm.quantity),
      status: itemForm.status
    };

    const updatedItems = [...(departmentItems[currentDepartment] || []), newItem];
    setDepartmentItems({ ...departmentItems, [currentDepartment]: updatedItems });

    // Update department stats
    const updatedDepartments = departments.map(dept => 
      dept.name === currentDepartment 
        ? { ...dept, itemsAssigned: updatedItems.length }
        : dept
    );
    setDepartments(updatedDepartments);

    closeAllPopups();
    setSuccessMessage('Item Successfully Added to Department');
    setShowSuccessPopup(true);
  };

  // Update department item
  const updateDepartmentItem = () => {
    if (currentEditingIndex === -1) return;

    if (!updateItemForm.itemCode || !updateItemForm.itemName || !updateItemForm.category || !updateItemForm.status || !updateItemForm.quantity) {
      alert('Please fill in all fields');
      return;
    }

    const updatedItem: DepartmentItem = {
      code: updateItemForm.itemCode,
      name: updateItemForm.itemName,
      category: updateItemForm.category,
      quantity: parseInt(updateItemForm.quantity),
      status: updateItemForm.status
    };

    const updatedItems = [...departmentItems[currentDepartment]];
    updatedItems[currentEditingIndex] = updatedItem;
    setDepartmentItems({ ...departmentItems, [currentDepartment]: updatedItems });

    closeAllPopups();
    setSuccessMessage('Item Successfully Updated');
    setShowSuccessPopup(true);
  };

  // Delete department item
  const deleteDepartmentItem = () => {
    if (currentDeletingIndex === -1) return;

    const updatedItems = departmentItems[currentDepartment].filter((_, index) => index !== currentDeletingIndex);
    setDepartmentItems({ ...departmentItems, [currentDepartment]: updatedItems });

    // Update department stats
    const updatedDepartments = departments.map(dept => 
      dept.name === currentDepartment 
        ? { ...dept, itemsAssigned: updatedItems.length }
        : dept
    );
    setDepartments(updatedDepartments);

    closeAllPopups();
    setShowDeletePopup(false);
    setSuccessMessage('Item Successfully Deleted');
    setShowSuccessPopup(true);
  };

  // Update requisition
  const updateRequisition = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editingRequisition) return;

    const updatedRequisition: Requisition = {
      ...editingRequisition,
      requestedBy: updateRequisitionForm.requestedBy,
      item: updateRequisitionForm.item,
      quantity: parseInt(updateRequisitionForm.quantity),
      department: updateRequisitionForm.department,
      dateRequested: updateRequisitionForm.dateRequested,
      status: updateRequisitionForm.status as 'Pending' | 'Approved' | 'Rejected' | 'Completed'
    };

    const updatedRequisitions = requisitions.map(req =>
      req.id === editingRequisition.id ? updatedRequisition : req
    );

    setRequisitions(updatedRequisitions);
    closeAllPopups();
    setSuccessMessage('Request Successfully Updated');
    setShowSuccessPopup(true);
  };

  // Delete requisition
  const deleteRequisition = () => {
    if (!deletingRequisition) return;

    const filteredRequisitions = requisitions.filter(
      req => req.id !== deletingRequisition.id
    );

    setRequisitions(filteredRequisitions);
    closeAllPopups();
    setShowDeletePopup(false);
    setSuccessMessage('Request Successfully Deleted');
    setShowSuccessPopup(true);
  };

  // Get status badge class for items
  const getStatusClass = (status: string) => {
    if (status.includes('In Stock')) return 'bg-green-100 text-green-800';
    if (status.includes('Low Stock')) return 'bg-yellow-100 text-yellow-800';
    if (status.includes('Out of Stock')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  // Get status badge class for requisitions
  const getRequisitionStatusClass = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-orange-100 text-orange-600';
      case 'Approved': return 'bg-green-100 text-green-600';
      case 'Rejected': return 'bg-red-100 text-red-600';
      case 'Completed': return 'bg-blue-100 text-blue-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  // Get maintenance status class
  const getMaintenanceStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filter maintenance requests
  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesDepartment = departmentFilter === 'All Departments' || request.department === departmentFilter;
    const matchesSearch = request.itemService.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  // Filter requisitions by current department
  const filteredRequisitions = requisitions.filter(req => 
    req.department === currentDepartment
  );

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-20 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-[#82A33D]">Department Management</h1>
              <button 
                onClick={openAddDepartmentPopup}
                className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] border border-[#889D65] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
                  <img 
                    src="/src/assets/icons/add.png" 
                    alt="Add" 
                    className="w-3 h-3 object-contain"
                  />
                </div>
                Add Department
              </button>
            </div>
          </div>

          {/* Departments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300">
                {/* Department Header */}
                <div className="bg-[#889D65] p-5">
                  <h2 className="text-lg font-bold text-white mb-1">{dept.name}</h2>
                  <p className="text-white text-sm opacity-95">
                    Manager: <span className="font-semibold">{dept.manager}</span>
                  </p>
                </div>

                {/* Department Stats */}
                <div className="p-5 flex gap-2">
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">{dept.itemsAssigned}</div>
                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Items Assigned</div>
                  </div>
                  <div className="flex-1 bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800 mb-1">{dept.totalUsage}</div>
                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">Total Usage</div>
                  </div>
                </div>

                {/* Consumption Section */}
                <div className="px-5 pb-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-semibold text-gray-800">Monthly Consumption</h3>
                    <div className="text-lg font-bold text-gray-700">
                    ₱{dept.monthlyConsumption.toLocaleString()}
                    </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                    className="bg-[#82A33D] h-2 rounded-full transition-all duration-300"
                    style={{ width: dept.totalUsage }}
                    ></div>
                </div>
                </div>

                {/* Department Actions */}
                <div className="px-5 pb-5 flex gap-2">
                  <button 
                    onClick={() => openViewDepartmentPopup(dept.name)}
                    className="flex-1 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-xs font-semibold uppercase tracking-wide hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 cursor-pointer"
                  >
                    View Items
                  </button>
                    <button 
                    onClick={() => openViewRequestsPopup(dept.name)}
                    className="flex-1 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-xs font-semibold uppercase tracking-wide hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 cursor-pointer"
                  >
                    Requests ({dept.requests})
                  </button>
                  <button 
                    onClick={() => openEditDepartmentPopup(dept)} // Updated this line
                    className="flex-1 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 text-xs font-semibold uppercase tracking-wide hover:bg-gray-600 hover:text-white hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Maintenance Request Tracking Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#82A33D]">Maintenance Request Tracking</h2>
              <div className="flex gap-4 items-center">
                <input 
                  type="text" 
                  placeholder="Search Request..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
                <select 
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                >
                  <option>All Departments</option>
                  <option>Housekeeping</option>
                  <option>Maintenance</option>
                  <option>F&B</option>
                  <option>Laundry Services</option>
                  <option>Security</option>
                  <option>Front Desk</option>
                </select>
              </div>
            </div>

            {/* Maintenance Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Request ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item/Service</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Requested By</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm text-gray-800">{request.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{request.department}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{request.itemService}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{request.requestedBy}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{request.date}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getMaintenanceStatusClass(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="px-3 py-1 bg-[#82A33D] text-white text-sm rounded-lg hover:bg-[#6d8930] transition-colors cursor-pointer">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Department Popup */}
      {showAddDepartment && (
        <PopupModal
          title="Add New Department"
          icon="add"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={addDepartment}
                className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg font-semibold hover:bg-[#6d8930] transition-colors cursor-pointer"
              >
                ADD
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="w-1/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="deptId"
                  value={`DEPT${String(departments.length + 1).padStart(3, '0')}`}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div className="w-2/3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Department Name <span className="text-red-500">*</span>
                </label>
                <select
                  name="deptName"
                  value={departmentForm.deptName}
                  onChange={(e) => setDepartmentForm({...departmentForm, deptName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Food & Beverages">Food & Beverages</option>
                  <option value="Front Desk">Front Desk</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Manager Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="managerName"
                value={departmentForm.managerName}
                onChange={handleDepartmentFormChange}
                placeholder="Enter manager name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Categories <span className="text-red-500">*</span>
              </label>
              <select
                name="categories"
                value={departmentForm.categories}
                onChange={(e) => setDepartmentForm({...departmentForm, categories: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                required
              >
                <option value="">Select Category</option>
                <option value="Operations">Operations</option>
                <option value="Guest Services">Guest Services</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Housekeeping">Housekeeping</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Security">Security</option>
                <option value="Administrative">Administrative</option>
                <option value="Support Services">Support Services</option>
              </select>
            </div>
          </div>
        </PopupModal>
      )}

      {/* View Department Items Popup */}
      {showViewDepartment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl mx-4 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <button 
                  onClick={closeAllPopups}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#889D65] transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button 
                  onClick={openAddItemPopup}
                  className="flex items-center gap-2 px-4 py-2 border border-[#889D65] text-gray-800 rounded-lg hover:bg-[#889D65] hover:text-white transition-colors cursor-pointer"
                >
                  <div className="w-4 h-4 bg-[#889D65] rounded-full flex items-center justify-center">
                    <img 
                      src="/src/assets/icons/add.png" 
                      alt="Add" 
                      className="w-2 h-2 object-contain"
                    />
                  </div>
                  Add New Item
                </button>
              </div>

              <div className="flex justify-between items-start mt-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentDepartment}</h2>
                  <p className="text-gray-600">
                    Manager: <span className="text-[#889D65] font-semibold">
                      {departments.find(d => d.name === currentDepartment)?.manager}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Search Item here" 
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                  />
                  <div className="text-sm text-gray-700">
                    <strong>Total Items: </strong>
                    <span className="text-[#889D65] font-semibold">
                      {departmentItems[currentDepartment]?.length || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Code</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {departmentItems[currentDepartment]?.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-sm font-semibold text-gray-800">{item.code}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openUpdateItemPopup(index)}
                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <img 
                              src="/src/assets/icons/edit.png" 
                              alt="Edit" 
                              className="w-4 h-4 object-contain"
                            />
                          </button>
                          <button 
                            onClick={() => openDeleteItemPopup(index)}
                            className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors cursor-pointer"
                          >
                            <img 
                              src="/src/assets/icons/delete.png" 
                              alt="Delete" 
                              className="w-4 h-4 object-contain"
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
        </div>
      )}

      {/* View Requests Popup */}
      {showViewRequests && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-6xl mx-4 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <button 
                  onClick={closeAllPopups}
                  className="flex items-center gap-2 text-gray-600 hover:text-[#889D65] transition-colors cursor-pointer"
                >
                  ← Back
                </button>
                <button 
                  className="flex items-center gap-2 px-4 py-2 border border-[#889D65] text-gray-800 rounded-lg hover:bg-[#889D65] hover:text-white transition-colors cursor-pointer"
                >
                  <div className="w-4 h-4 bg-[#889D65] rounded-full flex items-center justify-center">
                    <img 
                      src="/src/assets/icons/add.png" 
                      alt="Add" 
                      className="w-2 h-2 object-contain"
                    />
                  </div>
                  Add New Request
                </button>
              </div>

              <div className="flex justify-between items-start mt-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-1">{currentDepartment} - Requests</h2>
                  <p className="text-gray-600">
                    Manager: <span className="text-[#889D65] font-semibold">
                      {departments.find(d => d.name === currentDepartment)?.manager}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    placeholder="Search Request..." 
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                  />
                  <div className="text-sm text-gray-700">
                    <strong>Total Requests: </strong>
                    <span className="text-[#889D65] font-semibold">
                      {filteredRequisitions.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Request ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Requested By</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Item</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Date Requested</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Status</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 border-b border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequisitions.map((requisition) => (
                    <tr key={requisition.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 border-b border-gray-100">{requisition.requestId}</td>
                      <td className="px-4 py-3 border-b border-gray-100">{requisition.requestedBy}</td>
                      <td className="px-4 py-3 border-b border-gray-100">{requisition.item}</td>
                      <td className="px-4 py-3 border-b border-gray-100">{requisition.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 border-b border-gray-100">{requisition.dateRequested}</td>
                      <td className="px-4 py-3 border-b border-gray-100">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRequisitionStatusClass(requisition.status)}`}>
                          {requisition.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b border-gray-100">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openUpdateRequisitionPopup(requisition)}
                            className="p-1 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                          >
                            <img 
                              src="/src/assets/icons/edit.png" 
                              alt="Edit" 
                              className="w-4 h-4"
                            />
                          </button>
                          <button 
                            onClick={() => openDeleteRequisitionPopup(requisition)}
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
        </div>
      )}

      {/* Add Item Popup */}
      {showAddItem && (
        <PopupModal
          title="Add New Item"
          icon="add"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={addItemToDepartment}
                className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg font-semibold hover:bg-[#6d8930] transition-colors cursor-pointer"
              >
                ADD
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="itemCode"
                  value={itemForm.itemCode}
                  onChange={handleItemFormChange}
                  placeholder="Item Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="itemName"
                  value={itemForm.itemName}
                  onChange={handleItemFormChange}
                  placeholder="Item Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                name="category"
                value={itemForm.category}
                onChange={handleItemFormChange}
                placeholder="Category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <select
                  name="status"
                  value={itemForm.status}
                  onChange={handleItemFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                >
                  <option value="">Select status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="quantity"
                  value={itemForm.quantity}
                  onChange={handleItemFormChange}
                  placeholder="Quantity"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </PopupModal>
      )}

      {/* Update Item Popup */}
      {showUpdateItem && (
        <PopupModal
          title="Update Item"
          icon="edit"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={updateDepartmentItem}
                className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg font-semibold hover:bg-[#6d8930] transition-colors cursor-pointer"
              >
                UPDATE
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  name="itemCode"
                  value={updateItemForm.itemCode}
                  onChange={handleUpdateItemFormChange}
                  placeholder="Item Code"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="itemName"
                  value={updateItemForm.itemName}
                  onChange={handleUpdateItemFormChange}
                  placeholder="Item Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <input
                type="text"
                name="category"
                value={updateItemForm.category}
                onChange={handleUpdateItemFormChange}
                placeholder="Category"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <select
                  name="status"
                  value={updateItemForm.status}
                  onChange={handleUpdateItemFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                >
                  <option value="">Select status</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  name="quantity"
                  value={updateItemForm.quantity}
                  onChange={handleUpdateItemFormChange}
                  placeholder="Quantity"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </PopupModal>
      )}

      {/* Delete Confirmation Popup */}
      {showDeleteItem && (
        <PopupModal
          title="Delete Confirmation"
          icon="delete"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={deleteDepartmentItem}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors cursor-pointer"
              >
                CONFIRM
              </button>
            </>
          }
        >
          <div className="text-center py-4">
            <p className="text-gray-700">Are you sure you want to delete this entry?</p>
          </div>
        </PopupModal>
      )}

      {/* Update Requisition Popup */}
      {showUpdateRequisition && editingRequisition && (
        <PopupModal
          title="Update Request"
          icon="edit"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={updateRequisition}
                className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg font-semibold hover:bg-[#6d8930] transition-colors cursor-pointer"
              >
                UPDATE
              </button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Request ID</label>
                <input
                  type="text"
                  value={editingRequisition.requestId}
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date Requested</label>
                <input
                  type="date"
                  name="dateRequested"
                  value={updateRequisitionForm.dateRequested}
                  onChange={handleUpdateRequisitionFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Requested By</label>
              <input
                type="text"
                name="requestedBy"
                value={updateRequisitionForm.requestedBy}
                onChange={handleUpdateRequisitionFormChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Item</label>
                <input
                  type="text"
                  name="item"
                  value={updateRequisitionForm.item}
                  onChange={handleUpdateRequisitionFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updateRequisitionForm.quantity}
                  onChange={handleUpdateRequisitionFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Department</label>
                <select
                  name="department"
                  value={updateRequisitionForm.department}
                  onChange={handleUpdateRequisitionFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                >
                  <option value="Housekeeping">Housekeeping</option>
                  <option value="Front Desk">Front Desk</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Guest Amenities">Guest Amenities</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select
                  name="status"
                  value={updateRequisitionForm.status}
                  onChange={handleUpdateRequisitionFormChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </PopupModal>
      )}

      {/* Delete Requisition Popup */}
      {showDeleteRequisition && deletingRequisition && (
        <PopupModal
          title="Delete Confirmation"
          icon="delete"
          onClose={closeAllPopups}
          actions={
            <>
              <button
                onClick={closeAllPopups}
                className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={deleteRequisition}
                className="flex-1 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors cursor-pointer"
              >
                CONFIRM
              </button>
            </>
          }
        >
          <div className="text-center py-4">
            <p className="text-gray-700">
              Are you sure you want to delete request <strong>{deletingRequisition.requestId}</strong>?
            </p>
          </div>
        </PopupModal>
      )}

      {/* Edit Department Popup */}
      {showEditDepartment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <img src="/src/assets/icons/edit.png" alt="Edit" className="w-5 h-5 object-contain" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Edit Department</h2>
                </div>
                <button 
                  onClick={closeAllPopups}
                  className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg flex items-center justify-center hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-1/3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Department ID</label>
                    <input
                      type="text"
                      value={editDepartmentForm.id}
                      disabled
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                    />
                  </div>
                  <div className="w-2/3">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department Name <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="name"
                      value={editDepartmentForm.name}
                      onChange={(e) => setEditDepartmentForm({...editDepartmentForm, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                      required
                    >
                      <option value="">Select Department</option>
                      <option value="Housekeeping">Housekeeping</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Laundry Services">Laundry Services</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="Security">Security</option>
                      <option value="Front Desk">Front Desk</option>
                      <option value="Guest Services">Guest Services</option>
                      <option value="Kitchen">Kitchen</option>
                      <option value="Restaurant">Restaurant</option>
                      <option value="Banquet">Banquet</option>
                      <option value="Engineering">Engineering</option>
                      <option value="IT Department">IT Department</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Sales & Marketing">Sales & Marketing</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Manager Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="manager"
                    value={editDepartmentForm.manager}
                    onChange={handleEditDepartmentFormChange}
                    placeholder="Enter manager name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categories <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="categories"
                    value={editDepartmentForm.categories}
                    onChange={(e) => setEditDepartmentForm({...editDepartmentForm, categories: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent cursor-pointer"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Operations">Operations</option>
                    <option value="Guest Services">Guest Services</option>
                    <option value="Food & Beverage">Food & Beverage</option>
                    <option value="Housekeeping">Housekeeping</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Security">Security</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Support Services">Support Services</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={closeAllPopups}
                  className="flex-1 py-3 border border-[#82A33D] text-[#82A33D] rounded-lg font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  onClick={editDepartment}
                  className="flex-1 py-3 bg-[#82A33D] text-white rounded-lg font-semibold hover:bg-[#6d8930] transition-colors cursor-pointer"
                >
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Success"
        message={successMessage}
        type="success"
        showCancelButton={false}
        showConfirmButton={false}
      />

      {/* Delete Confirmation Popup */}
      <ConfirmationPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={deleteCallback}
        title="Delete Confirmation"
        message={deleteMessage}
        type="delete"
        confirmText="DELETE"
        cancelText="CANCEL"
        showConfirmButton={true}
        showCancelButton={true}
      />
    </div>
  );
};

// Reusable Popup Modal Component
interface PopupModalProps {
  title: string;
  icon: string;
  onClose: () => void;
  actions: React.ReactNode;
  children: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({ title, icon, onClose, actions, children }) => {
  const getIcon = () => {
    switch (icon) {
      case 'add': return '/src/assets/icons/add.png';
      case 'edit': return '/src/assets/icons/edit.png';
      case 'delete': return '/src/assets/icons/delete.png';
      default: return '/src/assets/icons/add.png';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-md mx-4 shadow-xl">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <img src={getIcon()} alt={title} className="w-5 h-5 object-contain invert" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 border border-[#82A33D] text-[#82A33D] rounded-lg flex items-center justify-center hover:bg-[#82A33D] hover:text-white transition-colors cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {children}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            {actions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
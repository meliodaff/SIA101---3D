import React, { useState } from 'react';
import Navbars from '../components/Navbars';

// Define types for supplier and product
interface Supplier {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  payables: number;
  products: number;
  portalStatus: 'active' | 'inactive';
  currency: string;
  paymentMethod: string;
  taxes: string;
  courier: string;
  contactDepartment?: string;
  otherContactName?: string;
  otherContactEmail?: string;
  otherContactPhone?: string;
}

interface Product {
  id: number;
  itemCode: string;
  itemName: string;
  category: string;
  quantity: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  department: string;
}

const Suppliers: React.FC = () => {
  // State for suppliers
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    {
      id: 1,
      companyName: "Lei Corp",
      contactPerson: "Lei Hall",
      email: "leihall@gmail.com",
      phone: "+63927-156-1328",
      address: "Mezzanine Floor, Jb Crystal Building, Quirino Hwy, Quezon City",
      payables: 1000.00,
      products: 12,
      portalStatus: "active",
      currency: "PHP",
      paymentMethod: "Gcash",
      taxes: "Yes",
      courier: "JNT",
      contactDepartment: "Sales Marketing",
      otherContactName: "Jared Gonzales",
      otherContactEmail: "jaredgonzales@gmail.com",
      otherContactPhone: "+63927-156-1328"
    },
    {
      id: 2,
      companyName: "Tech Solutions Inc",
      contactPerson: "John Smith",
      email: "john.smith@techsolutions.com",
      phone: "+63912-345-6789",
      address: "Unit 205, Business Center, Makati City",
      payables: 2500.50,
      products: 8,
      portalStatus: "active",
      currency: "PHP",
      paymentMethod: "Bank Transfer",
      taxes: "Yes",
      courier: "LBC"
    },
    {
      id: 3,
      companyName: "Global Supplies Co",
      contactPerson: "Maria Garcia",
      email: "maria.garcia@globalsupplies.com",
      phone: "+63998-765-4321",
      address: "Building A, Industrial Complex, Quezon City",
      payables: 0.00,
      products: 25,
      portalStatus: "inactive",
      currency: "USD",
      paymentMethod: "Credit Card",
      taxes: "No",
      courier: "Ninja Van"
    }
  ]);

  // Sample products data for supplier details
  const [products] = useState<Product[]>([
    { id: 1, itemCode: '1231', itemName: 'Bath Towels', category: 'Housekeeping', quantity: 450, status: 'in-stock', department: 'Housekeeping' },
    { id: 2, itemCode: '1231', itemName: 'Wine Glasses', category: 'F&B', quantity: 80, status: 'low-stock', department: 'Restaurant' },
    { id: 3, itemCode: '1231', itemName: 'Light Bulbs', category: 'Maintenance', quantity: 0, status: 'out-of-stock', department: 'Maintenance' },
    { id: 4, itemCode: '1231', itemName: 'Soap', category: 'Guest Amenities', quantity: 1200, status: 'in-stock', department: 'Housekeeping' },
    { id: 5, itemCode: '1231', itemName: 'Key Cards', category: 'Front Desk', quantity: 85, status: 'low-stock', department: 'Front Desk' }
  ]);

  // State for filtered suppliers
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([...suppliers]);
  
  // State for modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  
  // State for current supplier
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  
  // State for active tab
  const [activeTab, setActiveTab] = useState<'general' | 'products'>('general');
  
  // State for search
  const [searchTerm, setSearchTerm] = useState('');

  // State for form data
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    companyAddress: '',
    contactDepartment: '',
    contactEmail: '',
    contactPhone: '',
    otherContactName: '',
    otherContactEmail: '',
    otherContactPhone: '',
    currency: '',
    paymentMethod: '',
    courier: '',
    postalStatus: 'active' as 'active' | 'inactive'
  });

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredSuppliers([...suppliers]);
    } else {
      const filtered = suppliers.filter(supplier =>
        supplier.companyName.toLowerCase().includes(term) ||
        supplier.contactPerson.toLowerCase().includes(term) ||
        supplier.email.toLowerCase().includes(term) ||
        supplier.phone.includes(term)
      );
      setFilteredSuppliers(filtered);
    }
  };

  // Open add modal
  const openAddModal = () => {
    setShowAddModal(true);
    setFormData({
      companyName: '',
      contactName: '',
      companyAddress: '',
      contactDepartment: '',
      contactEmail: '',
      contactPhone: '',
      otherContactName: '',
      otherContactEmail: '',
      otherContactPhone: '',
      currency: '',
      paymentMethod: '',
      courier: '',
      postalStatus: 'active'
    });
  };

  // Close add modal
  const closeAddModal = () => {
    setShowAddModal(false);
  };

  // Open supplier details
  const openSupplierDetails = (supplier: Supplier) => {
    setCurrentSupplier(supplier);
    setShowDetailsModal(true);
    setActiveTab('general');
  };

  // Close supplier details
  const closeSupplierDetails = () => {
    setShowDetailsModal(false);
    setCurrentSupplier(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newSupplier: Supplier = {
      id: Date.now(),
      companyName: formData.companyName,
      contactPerson: formData.contactName,
      email: formData.contactEmail,
      phone: formData.contactPhone,
      address: formData.companyAddress,
      payables: 0,
      products: 0,
      portalStatus: formData.postalStatus,
      currency: formData.currency,
      paymentMethod: formData.paymentMethod,
      taxes: "Yes",
      courier: formData.courier,
      contactDepartment: formData.contactDepartment,
      otherContactName: formData.otherContactName,
      otherContactEmail: formData.otherContactEmail,
      otherContactPhone: formData.otherContactPhone
    };

    const updatedSuppliers = [newSupplier, ...suppliers];
    setSuppliers(updatedSuppliers);
    setFilteredSuppliers(updatedSuppliers);
    closeAddModal();
    alert('Supplier added successfully!');
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get status badge class for suppliers
  const getStatusBadgeClass = (status: string) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Get status badge class for products
  const getProductStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-green-100 text-green-800';
      case 'low-stock': return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getProductStatusText = (status: string) => {
    switch (status) {
      case 'in-stock': return 'In Stock';
      case 'low-stock': return 'Low Stock';
      case 'out-of-stock': return 'Out of Stock';
      default: return status;
    }
  };

  // Switch tabs in supplier details
  const switchTab = (tab: 'general' | 'products') => {
    setActiveTab(tab);
  };

  // Edit supplier
  const openEditSupplier = () => {
    if (!currentSupplier) return;
    
    setShowDetailsModal(false);
    setFormData({
      companyName: currentSupplier.companyName,
      contactName: currentSupplier.contactPerson,
      companyAddress: currentSupplier.address,
      contactDepartment: currentSupplier.contactDepartment || '',
      contactEmail: currentSupplier.email,
      contactPhone: currentSupplier.phone,
      otherContactName: currentSupplier.otherContactName || '',
      otherContactEmail: currentSupplier.otherContactEmail || '',
      otherContactPhone: currentSupplier.otherContactPhone || '',
      currency: currentSupplier.currency,
      paymentMethod: currentSupplier.paymentMethod,
      courier: currentSupplier.courier,
      postalStatus: currentSupplier.portalStatus
    });
    setShowAddModal(true);
  };

  // Update supplier
  const handleUpdateSupplier = () => {
    if (!currentSupplier) return;
    
    const updatedSupplier: Supplier = {
      ...currentSupplier,
      companyName: formData.companyName,
      contactPerson: formData.contactName,
      address: formData.companyAddress,
      contactDepartment: formData.contactDepartment,
      email: formData.contactEmail,
      phone: formData.contactPhone,
      otherContactName: formData.otherContactName,
      otherContactEmail: formData.otherContactEmail,
      otherContactPhone: formData.otherContactPhone,
      currency: formData.currency,
      paymentMethod: formData.paymentMethod,
      courier: formData.courier,
      portalStatus: formData.postalStatus
    };

    const updatedSuppliers = suppliers.map(s => s.id === currentSupplier.id ? updatedSupplier : s);
    setSuppliers(updatedSuppliers);
    setFilteredSuppliers(updatedSuppliers);
    setCurrentSupplier(updatedSupplier);
    closeAddModal();
    setShowDetailsModal(true);
    alert('Supplier updated successfully!');
  };

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-16 p-8">
        {/* Section Header */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <h2 className="text-2xl font-bold text-gray-800">Suppliers</h2>
              <div className="w-96">
                <input 
                  type="text" 
                  placeholder="Search Supplier here" 
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full px-4 py-2 border border-[#8bc34a] rounded-lg focus:outline-none focus:border-[#689f38] focus:ring-2 focus:ring-[#8bc34a] focus:ring-opacity-10 transition-colors"
                />
              </div>
            </div>
            <button 
              onClick={openAddModal}
              className="flex items-center gap-2 px-4 py-3 bg-white text-[#889D65] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="w-5 h-5 bg-[#889D65] rounded-full flex items-center justify-center">
                <img 
                  src="/src/assets/icons/add.png" 
                  alt="Add" 
                  className="w-3 h-3 object-contain"
                />
              </div>
              Add New Supplier
            </button>
          </div>
        </div>

        {/* Suppliers List */}
        <div className="space-y-4">
          {filteredSuppliers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <p className="text-gray-500 text-lg">No suppliers found.</p>
            </div>
          ) : (
            filteredSuppliers.map((supplier) => (
              <div key={supplier.id} className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
                {/* Top Row */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center gap-6">
                    <div className="flex items-center gap-4 min-w-56">
                      <div className="w-12 h-12 bg-gray-100 text-gray-600 rounded-lg flex items-center justify-center font-semibold text-lg">
                        {supplier.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{supplier.companyName}</h3>
                        <p className="text-gray-600 text-sm">{supplier.contactPerson}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-8 flex-1">
                      <div className="min-w-48">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Contacts</div>
                        <div className="flex items-center gap-3 text-sm">
                          <a href={`mailto:${supplier.email}`} className="text-gray-600 hover:text-[#8bc34a] transition-colors">
                            {supplier.email}
                          </a>
                          <span className="text-gray-300">|</span>
                          <span className="text-gray-800 font-medium">{supplier.phone}</span>
                        </div>
                      </div>
                      <span className="text-gray-300">|</span>
                      <div className="min-w-32">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Payables</div>
                        <div className="text-gray-800 font-semibold text-lg">
                          ₱{supplier.payables.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => openSupplierDetails(supplier)}
                      className="w-9 h-9 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer text-xl"
                    >
                      ⋯
                    </button>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="p-4">
                  <div className="bg-[#CFD098] rounded-lg p-4">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-2 flex-1 max-w-md">
                        <span className="text-lg">📍</span>
                        <p className="text-gray-800 text-sm truncate">{supplier.address}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📦</span>
                        <p className="text-[#889D65] font-medium text-sm">{supplier.products} Product(s)</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">PORTAL STATUS:</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(supplier.portalStatus)}`}>
                          {getStatusText(supplier.portalStatus)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Supplier Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-4xl mx-4 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 relative">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); closeAddModal(); }}
                  className="absolute left-6 top-6 text-gray-600 hover:text-[#889D65] transition-colors text-sm font-medium"
                >
                  ← Back to supplier list
                </a>
                <div className="flex flex-col items-center pt-8">
                  <div className="w-20 h-20 bg-[#889D65] rounded-full flex items-center justify-center relative mb-4">
                    <span className="text-white text-2xl font-bold">S</span>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#889D65] rounded-full border-2 border-white flex items-center justify-center text-white text-sm font-bold">
                      +
                    </div>
                  </div>
                  <div className="h-0.5 bg-[#889D65] w-20 mb-4"></div>
                </div>
              </div>

              {/* Modal Form */}
              <form onSubmit={currentSupplier ? handleUpdateSupplier : handleSubmit} className="flex-1 overflow-y-auto p-6">
                {/* Company Name Section */}
                <div className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] focus:ring-2 focus:ring-[#889D65] focus:ring-opacity-10 transition-colors"
                      required
                    />
                  </div>
                </div>
                
                {/* Contact Persons Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Persons</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Department
                      </label>
                      <input
                        type="text"
                        name="contactDepartment"
                        value={formData.contactDepartment}
                        onChange={handleInputChange}
                        placeholder="Department"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Billing Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Enter billing address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        placeholder="email@company.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        placeholder="+63 XXX-XXX-XXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Other Contact Person Section */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Other Contact Person</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        name="otherContactName"
                        value={formData.otherContactName}
                        onChange={handleInputChange}
                        placeholder="Full name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="otherContactEmail"
                        value={formData.otherContactEmail}
                        onChange={handleInputChange}
                        placeholder="email@company.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        name="otherContactPhone"
                        value={formData.otherContactPhone}
                        onChange={handleInputChange}
                        placeholder="+63 XXX-XXX-XXXX"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Purchasing Info Section */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Purchasing Info</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Currency <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="currency"
                        value={formData.currency}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors cursor-pointer"
                        required
                      >
                        <option value="">Select currency</option>
                        <option value="PHP">PHP (Philippine Peso)</option>
                        <option value="USD">USD (US Dollar)</option>
                        <option value="EUR">EUR (Euro)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Payment Method <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors cursor-pointer"
                        required
                      >
                        <option value="">Select method</option>
                        <option value="bank-transfer">Bank Transfer</option>
                        <option value="credit-card">Credit Card</option>
                        <option value="check">Check</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Courier</label>
                      <select
                        name="courier"
                        value={formData.courier}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors cursor-pointer"
                      >
                        <option value="">Select courier</option>
                        <option value="lbc">LBC</option>
                        <option value="jnt">J&T Express</option>
                        <option value="ninja-van">Ninja Van</option>
                        <option value="2go">2Go</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Postal Status <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="postalStatus"
                        value={formData.postalStatus}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#889D65] transition-colors cursor-pointer"
                        required
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={closeAddModal}
                    className="flex-1 py-3 border-2 border-[#889D65] text-[#889D65] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer font-semibold"
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-[#889D65] text-white rounded-lg hover:bg-[#768a54] transition-colors cursor-pointer font-semibold"
                  >
                    {currentSupplier ? 'UPDATE' : 'ADD'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Supplier Details Modal */}
        {showDetailsModal && currentSupplier && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl w-full max-w-6xl mx-4 shadow-xl max-h-[90vh] overflow-hidden flex flex-col">
              {/* Supplier Details Header */}
              <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex justify-between items-start mb-4 relative">
                  <a 
                    href="#" 
                    onClick={(e) => { e.preventDefault(); closeSupplierDetails(); }}
                    className="absolute left-0 top-0 text-gray-600 hover:text-[#889D65] transition-colors text-sm font-medium"
                  >
                    ← Back to supplier list
                  </a>
                  
                  <div className="flex items-center gap-6 w-full pt-8">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#889D65] to-[#CFD098] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {currentSupplier.companyName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-800 mb-2">{currentSupplier.companyName}</h1>
                      <div className="text-lg text-[#889D65] font-semibold">
                        Payables: <strong>₱{currentSupplier.payables.toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>
                      </div>
                    </div>
                    <button 
                      onClick={openEditSupplier}
                      className="px-4 py-2 border border-[#889D65] text-gray-800 rounded-lg hover:bg-[#889D65] hover:text-white transition-colors cursor-pointer font-medium"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex bg-[#FBF0E4] rounded-xl p-1 mt-4 w-fit">
                  <button
                    onClick={() => switchTab('general')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'general' 
                        ? 'bg-[#889D65] text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-[#f5e6d8]'
                    }`}
                  >
                    General Information
                  </button>
                  <button
                    onClick={() => switchTab('products')}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === 'products' 
                        ? 'bg-[#889D65] text-white shadow-sm' 
                        : 'text-gray-600 hover:bg-[#f5e6d8]'
                    }`}
                  >
                    Products
                  </button>
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'general' ? (
                  <div className="p-6 flex gap-6">
                    {/* Left Content */}
                    <div className="flex-1 space-y-6">
                      {/* Company Info Card */}
                      <div className="bg-[#FBF0E4] border border-[#E8D9C8] rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{currentSupplier.companyName}</h3>
                        <div className="space-y-3">
                          <div className="flex">
                            <span className="text-sm font-semibold text-gray-600 w-40">Billing Address</span>
                            <span className="text-gray-800 flex-1">{currentSupplier.address}</span>
                          </div>
                        </div>
                      </div>

                      {/* Purchasing Info Card */}
                      <div className="bg-transparent rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Purchasing Info</h3>
                        <div className="space-y-3">
                          <div className="flex border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide w-40">CURRENCY</span>
                            <span className="text-gray-800 font-medium flex-1">{currentSupplier.currency}</span>
                          </div>
                          <div className="flex border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide w-40">PAYMENT METHOD</span>
                            <span className="text-gray-800 font-medium flex-1">{currentSupplier.paymentMethod}</span>
                          </div>
                          <div className="flex border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide w-40">PRICE INCLUDE TAXES</span>
                            <span className="text-gray-800 font-medium flex-1">{currentSupplier.taxes}</span>
                          </div>
                        </div>
                      </div>

                      {/* Other Details Card */}
                      <div className="bg-transparent rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Other Details</h3>
                        <div className="space-y-3">
                          <div className="flex border-b border-gray-100 pb-3">
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide w-40">COURIER</span>
                            <span className="text-gray-800 font-medium flex-1">{currentSupplier.courier}</span>
                          </div>
                          <div className="flex">
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide w-40">PORTAL STATUS</span>
                            <span className="text-gray-800 font-medium flex-1">
                              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadgeClass(currentSupplier.portalStatus)}`}>
                                {getStatusText(currentSupplier.portalStatus)}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 space-y-6">
                      {/* Primary Contact Card */}
                      <div className="bg-[#FBF0E4] border border-[#E8D9C8] rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#889D65] to-[#CFD098] rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-lg">
                              {currentSupplier.contactPerson.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{currentSupplier.contactPerson}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-gray-600">Manager</span>
                              <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">Primary</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">DEPARTMENT</span>
                            <span className="text-gray-800 text-sm">{currentSupplier.contactDepartment || 'Sales Marketing'}</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">EMAIL</span>
                            <span className="text-gray-800 text-sm">{currentSupplier.email}</span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">PHONE</span>
                            <span className="text-gray-800 text-sm">{currentSupplier.phone}</span>
                          </div>
                        </div>
                        <button className="w-full mt-4 py-2 border border-[#889D65] text-gray-800 rounded-lg hover:bg-[#889D65] hover:text-white transition-colors cursor-pointer font-medium">
                          Send Email
                        </button>
                      </div>

                                            {/* Other Contact Card */}
                      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h4 className="font-semibold text-gray-800 mb-4">Other Contact Person</h4>
                        <div className="space-y-3">
                          <div>
                            <strong className="text-gray-800 block mb-1">
                              {currentSupplier.otherContactName || 'Jared Gonzales'}
                            </strong>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">EMAIL</span>
                            <span className="text-gray-800 text-sm">
                              {currentSupplier.otherContactEmail || 'jaredgonzales@gmail.com'}
                            </span>
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide block mb-1">PHONE</span>
                            <span className="text-gray-800 text-sm">
                              {currentSupplier.otherContactPhone || '+63927-156-1328'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Products Tab Content */
                  <div className="p-6">
                    {/* Products Header */}
                    <div className="mb-6">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            Total Products: <span className="text-green-600">5</span>
                          </h3>
                        </div>
                        <div className="w-full">
                          <input 
                            type="text" 
                            placeholder="Search Products here" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#8bc34a] focus:ring-2 focus:ring-[#8bc34a] focus:ring-opacity-10 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Item Code</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Item Name</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Category</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Quantity</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Department</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {products.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 text-sm text-gray-800">{product.itemCode}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{product.itemName}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{product.category}</td>
                              <td className="px-6 py-4 text-sm text-gray-800">{product.quantity}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getProductStatusBadgeClass(product.status)}`}>
                                  {getProductStatusText(product.status)}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800">{product.department}</td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                                    <img 
                                      src="/src/assets/icons/edit.png" 
                                      alt="Edit" 
                                      className="w-4 h-4 object-contain"
                                    />
                                  </button>
                                  <button className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
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
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Suppliers;
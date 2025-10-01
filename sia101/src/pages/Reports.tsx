import React, { useState } from 'react';
import Navbars from '../components/Navbars';

interface ReportTab {
  id: string;
  name: string;
  icon: string;
  active: boolean;
}

const Reports: React.FC = () => {
  // State for report tabs
  const [tabs, setTabs] = useState<ReportTab[]>([
    { id: 'inventory', name: 'Inventory', icon: '/src/assets/icons/inventory.png', active: true },
    { id: 'procurement', name: 'Procurement', icon: '/src/assets/icons/procurement.png', active: false },
    { id: 'department', name: 'Department', icon: '/src/assets/icons/departments.png', active: false },
    { id: 'semantic', name: 'Semantic Reports', icon: '/src/assets/icons/reports.png', active: false }
  ]);

  // State for filters
  const [filters, setFilters] = useState({
    startDate: '2025-09-14',
    endDate: '2025-09-14',
    department: 'All Departments',
    supplier: 'All Supplier',
    category: 'All Categories'
  });

  // Stats data
  const stats = [
    { value: 'P485,670', label: 'Total Inventory Value' },
    { value: '3,456', label: 'Total Items in Stock' },
    { value: '92.5%', label: 'Stock Accountancy Rate' },
    { value: '18', label: 'Low Stock Alert' }
  ];

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    setTabs(tabs.map(tab => ({
      ...tab,
      active: tab.id === tabId
    })));
  };

  // Handle filter changes
  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      startDate: '2025-09-14',
      endDate: '2025-09-14',
      department: 'All Departments',
      supplier: 'All Supplier',
      category: 'All Categories'
    });
  };

  // Generate report
  const generateReport = () => {
    alert('Generating report...');
  };

  // Schedule report
  const scheduleReport = () => {
    alert('Scheduling report...');
  };

  // Export PDF
  const exportPDF = () => {
    alert('Exporting PDF...');
  };

  // Print report
  const printReport = () => {
    alert('Printing report...');
  };

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-16">
        <div className="p-8">
          <div className="max-w-[1200px] mx-auto">
            {/* Filters Section */}
            <div className="bg-white rounded-[15px] p-[30px] shadow-[0_4px_15px_rgba(0,0,0,0.1)] mb-[30px]">
              <div className="mb-[25px]">
                <h1 className="text-[32px] font-bold text-[#82A33D] mb-[25px]">Reports</h1>
              </div>

              {/* Report Tabs */}
            <div className="grid grid-cols-4 gap-[15px] mb-[30px]">
            {tabs.map((tab) => (
                <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`p-[20px_15px] rounded-[12px] transition-all duration-300 flex flex-col items-center gap-[10px] cursor-pointer ${
                    tab.active
                    ? 'bg-gradient-to-br from-[#82A33D] to-[#CFD098] shadow-lg transform -translate-y-[2px]'
                    : 'bg-transparent border border-[#82A33D] hover:shadow-md'
                }`}
                >
                <div className={`w-6 h-6 flex items-center justify-center ${
                    tab.active ? 'filter brightness-0 invert' : ''
                }`}>
                    <img 
                    src={tab.icon} 
                    alt={tab.name}
                    className="w-full h-full object-contain"
                    />
                </div>
                <span className={`font-semibold text-[14px] transition-colors ${
                    tab.active ? 'text-white' : 'text-[#82A33D]'
                }`}>
                    {tab.name}
                </span>
                </button>
            ))}
            </div>

              {/* Filter Group */}
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[40px] mb-[25px]">
                {/* Date Range Filter */}
                <div className="date-range-filter">
                  <label className="block text-[#2c3e50] font-bold mb-[15px] text-[16px]">
                    DATE RANGE
                  </label>
                  <div className="date-inputs flex items-center gap-[15px]">
                    <div className="date-input flex-1 relative">
                      <input
                        type="date"
                        value={filters.startDate}
                        onChange={(e) => handleFilterChange('startDate', e.target.value)}
                        className="w-full px-[15px] py-[12px] border border-[#777] rounded-[8px] bg-transparent text-[#777] text-[14px] cursor-pointer focus:outline-none focus:border-[#82A33D] focus:bg-white"
                      />
                    </div>
                    <span className="date-to text-[#666] font-semibold text-[14px] whitespace-nowrap">to</span>
                    <div className="date-input flex-1 relative">
                      <input
                        type="date"
                        value={filters.endDate}
                        onChange={(e) => handleFilterChange('endDate', e.target.value)}
                        className="w-full px-[15px] py-[12px] border border-[#777] rounded-[8px] bg-transparent text-[#777] text-[14px] cursor-pointer focus:outline-none focus:border-[#82A33D] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Dropdown Filters */}
                <div className="dropdown-filters grid grid-cols-3 gap-[20px]">
                  <div className="dropdown-filter">
                    <label className="block text-[#555] font-bold mb-[17px] text-[14px]">
                      DEPARTMENT
                    </label>
                    <select
                      value={filters.department}
                      onChange={(e) => handleFilterChange('department', e.target.value)}
                      className="w-full px-[15px] py-[12px] border border-[#777] rounded-[8px] bg-white text-[#2c3e50] text-[14px] cursor-pointer focus:outline-none focus:border-[#82A33D]"
                    >
                      <option>All Departments</option>
                      <option>Housekeeping</option>
                      <option>Maintenance</option>
                      <option>F&B</option>
                    </select>
                  </div>

                  <div className="dropdown-filter">
                    <label className="block text-[#555] font-bold mb-[17px] text-[14px]">
                      SUPPLIER
                    </label>
                    <select
                      value={filters.supplier}
                      onChange={(e) => handleFilterChange('supplier', e.target.value)}
                      className="w-full px-[15px] py-[12px] border border-[#777] rounded-[8px] bg-white text-[#2c3e50] text-[14px] cursor-pointer focus:outline-none focus:border-[#82A33D]"
                    >
                      <option>All Supplier</option>
                      <option>ABC Supplies Co.</option>
                      <option>Hotel Essentials Ltd.</option>
                    </select>
                  </div>

                  <div className="dropdown-filter">
                    <label className="block text-[#555] font-bold mb-[17px] text-[14px]">
                      CATEGORY
                    </label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange('category', e.target.value)}
                      className="w-full px-[15px] py-[12px] border border-[#777] rounded-[8px] bg-white text-[#2c3e50] text-[14px] cursor-pointer focus:outline-none focus:border-[#82A33D]"
                    >
                      <option>All Categories</option>
                      <option>Housekeeping</option>
                      <option>Maintenance</option>
                      <option>F&B</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="filter-actions flex gap-[15px] justify-start pt-[25px] border-t-2 border-[#f0f0f0]">
                <button
                  onClick={generateReport}
                  className="action-btn generate px-[30px] py-[12px] bg-[#82A33D] text-white rounded-[8px] font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[#6d8930] hover:border-[#6d8930]"
                >
                  Generate Report
                </button>
                <button
                  onClick={resetFilters}
                  className="action-btn reset px-[30px] py-[12px] border border-[#777] text-[#555] rounded-[8px] font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[#f8f9fa]"
                >
                  Reset Filters
                </button>
                <button
                  onClick={scheduleReport}
                  className="action-btn schedule px-[30px] py-[12px] border border-[#777] text-[#555] rounded-[8px] font-semibold text-[14px] cursor-pointer transition-all duration-300 hover:bg-[#f8f9fa]"
                >
                  Schedule Report
                </button>
              </div>
            </div>

            {/* Report Summary Container */}
            <div className="bg-white rounded-[15px] p-[30px] shadow-[0_4px_15px_rgba(0,0,0,0.1)]">
              {/* Header Row */}
              <div className="report-header flex justify-between items-center mb-[30px] pb-[20px] border-b-2 border-[#f0f0f0]">
                <h2 className="report-title text-[24px] font-bold text-[#82A33D]">
                  Inventory Report - September 2025
                </h2>
                <div className="report-actions flex gap-[15px]">
                  <button
                    onClick={exportPDF}
                    className="export-btn px-[20px] py-[10px] border border-[#82A33D] rounded-[8px] bg-transparent text-[#82A33D] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#f8f9fa]"
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={printReport}
                    className="print-btn px-[20px] py-[10px] border border-[#82A33D] rounded-[8px] bg-transparent text-[#82A33D] font-semibold cursor-pointer transition-all duration-300 hover:bg-[#f8f9fa]"
                  >
                    Print
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="stats-cards grid grid-cols-4 gap-[20px] mb-[30px]">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="stat-card bg-gradient-to-b from-[#798b5a] via-[#96aa75] to-[#CFD098] rounded-[12px] p-[25px_20px] text-white shadow-[0_4px_15px_rgba(130,163,61,0.3)] text-left"
                  >
                    <div className="stat-value text-[28px] font-bold mb-[8px]">{stat.value}</div>
                    <div className="stat-label text-[14px] font-medium opacity-90">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Chart Section */}
              <div className="chart-section bg-[#f8f9fa] rounded-[12px] p-[25px]">
                <h3 className="chart-title text-[18px] font-semibold text-[#2c3e50] mb-[20px]">
                  Inventory Movement Trends
                </h3>
                <div className="chart-placeholder bg-white rounded-[8px] p-[60px_20px] text-center text-[#95a5a6] border-2 border-dashed border-[#e0e0e0]">
                  <p>Chart visualization area</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
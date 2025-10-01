import React, { useState } from 'react';
import Navbars from '../components/Navbars';

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'procurement' | 'room'>('inventory');
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [category, setCategory] = useState('All Categories');

  // Sample data for metrics
  const metrics = [
    {
      title: 'Stock Turnover Rate',
      value: '8.5x',
      percentage: '+12%',
      progress: 75,
      color: 'green'
    },
    {
      title: 'Wastage Rate',
      value: '2.1%',
      percentage: '+12%',
      progress: 30,
      color: 'orange'
    },
    {
      title: 'Inventory Turnover',
      value: 'P164K',
      percentage: '+12%',
      progress: 85,
      color: 'green'
    }
  ];

  // Sample data for top moving items
  const topMovingItems = [
    { name: 'Bath Towels', value: '2,450 units' },
    { name: 'Toiletries Kit', value: '1,880 units' },
    { name: 'Bed Linens', value: '1,250 units' },
    { name: 'Mini Bar Items', value: '985 units' }
  ];

  // Sample data for critical stocks
  const criticalStocks = [
    { name: 'Cleaning Supplies', status: 'low' as const },
    { name: 'Paper Products', status: 'medium' as const },
    { name: 'Guest Amenities', status: 'good' as const },
    { name: 'Maintenance Tools', status: 'good' as const }
  ];

  // Sample data for wastage analysis
  const wastageAnalysis = [
    { name: 'Food Items', cost: '₱12,450' },
    { name: 'Damaged Linens', cost: '₱8,200' },
    { name: 'Expired Products', cost: '₱5,670' }
  ];

  const getStatusColor = (status: 'low' | 'medium' | 'good') => {
    switch (status) {
      case 'low':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'good':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'green':
        return 'bg-[#82A33D]';
      case 'orange':
        return 'bg-orange-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF0E4]">
      <Navbars />
      
      {/* Main Content */}
      <main className="ml-64 pt-16 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Analytics Header */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-bold text-[#82A33D] mb-5">Analytics Dashboard</h1>
            
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 mb-4">
              <button
                onClick={() => setActiveTab('inventory')}
                className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'inventory'
                    ? 'text-[#82A33D] border-[#82A33D]'
                    : 'text-gray-500 border-transparent hover:text-[#82A33D]'
                }`}
              >
                Inventory Analytics
              </button>
              <button
                onClick={() => setActiveTab('procurement')}
                className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'procurement'
                    ? 'text-[#82A33D] border-[#82A33D]'
                    : 'text-gray-500 border-transparent hover:text-[#82A33D]'
                }`}
              >
                Procurement Analytics
              </button>
              <button
                onClick={() => setActiveTab('room')}
                className={`px-5 py-3 font-semibold text-sm border-b-2 transition-colors ${
                  activeTab === 'room'
                    ? 'text-[#82A33D] border-[#82A33D]'
                    : 'text-gray-500 border-transparent hover:text-[#82A33D]'
                }`}
              >
                Room/Department Analytics
              </button>
            </div>
          </div>

          {/* Filters Section */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent min-w-[150px]"
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
              
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#82A33D] focus:border-transparent min-w-[150px]"
              >
                <option>All Categories</option>
                <option>Housekeeping</option>
                <option>F&B</option>
                <option>Maintenance</option>
                <option>Guest Amenities</option>
              </select>
              
              <button className="px-5 py-2 bg-[#82A33D] text-white rounded-lg font-semibold text-sm hover:bg-[#6d8930] transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div className="h-1.5 bg-[#82A33D]"></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      {metric.title}
                    </h3>
                    <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-sm font-bold">
                      {metric.percentage}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-4">
                    {metric.value}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className={`h-2 rounded-full ${getProgressColor(metric.color)}`}
                      style={{ width: `${metric.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
            <div className="mb-5">
              <h3 className="text-lg font-semibold text-gray-800">
                Inventory Usage Trends - Last 30 days
              </h3>
            </div>
            <div className="h-80 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center">
              <div className="text-lg font-semibold text-gray-600 mb-8">
                Interactive Usage Trends Chart
              </div>
              <div className="w-11/12 h-3/4 flex flex-col">
                <div className="flex flex-1">
                  {/* Y-axis */}
                  <div className="w-10 flex flex-col justify-between text-xs text-gray-500 mr-3">
                    <span>100%</span>
                    <span>75%</span>
                    <span>50%</span>
                    <span>25%</span>
                    <span>0%</span>
                  </div>
                  
                  {/* Chart Area */}
                  <div className="flex-1 relative">
                    {/* Grid Lines */}
                    <div className="absolute inset-0 flex flex-col justify-between">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="border-t border-gray-200 w-full"></div>
                      ))}
                    </div>
                    
                    {/* Line Chart */}
                    <div className="absolute inset-0">
                      {/* Data Points */}
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '10%', bottom: '20%' }}></div>
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '25%', bottom: '45%' }}></div>
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '40%', bottom: '60%' }}></div>
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '55%', bottom: '30%' }}></div>
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '70%', bottom: '75%' }}></div>
                      <div className="absolute w-2 h-2 bg-[#82A33D] rounded-full" style={{ left: '85%', bottom: '50%' }}></div>
                      
                      {/* Line Path */}
                      <div 
                        className="absolute inset-0 opacity-30 bg-[#82A33D]"
                        style={{
                          clipPath: `polygon(
                            10% 80%, 
                            25% 55%, 
                            40% 40%, 
                            55% 70%, 
                            70% 25%, 
                            85% 50%, 
                            85% 100%, 
                            10% 100%
                          )`
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* X-axis */}
                <div className="flex justify-between text-xs text-gray-500 mt-3">
                  <span>Day 1</span>
                  <span>Day 5</span>
                  <span>Day 10</span>
                  <span>Day 15</span>
                  <span>Day 20</span>
                  <span>Day 25</span>
                  <span>Day 30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Analytics Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Top Moving Items Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-300 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-800">Top Moving Items</h3>
              </div>
              <div className="p-5">
                {topMovingItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 ${
                      index < topMovingItems.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-600 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Critical Stocks Level Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-300 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-800">Critical Stocks Level</h3>
              </div>
              <div className="p-5">
                {criticalStocks.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 ${
                      index < criticalStocks.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(item.status)}`}
                    >
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Wastage Analysis Card */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-white border-b border-gray-300 px-5 py-4">
                <h3 className="text-base font-semibold text-gray-800">Wastage Analysis</h3>
              </div>
              <div className="p-5">
                {wastageAnalysis.map((item, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center py-3 ${
                      index < wastageAnalysis.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <span className="text-sm font-medium text-gray-800">{item.name}</span>
                    <span className="text-sm text-gray-800 font-semibold">{item.cost}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 mt-3 border-t border-gray-200">
                  <span className="text-sm font-medium text-gray-800">Total This Month</span>
                  <span className="text-base text-[#82A33D] font-bold">₱26,320</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
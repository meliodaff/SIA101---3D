import { Link, useLocation } from 'react-router-dom';

// Import all icons
import logoIcon from '../assets/icons/logo.png';
import logoutIcon from '../assets/icons/logout.png';
import dashboardIcon from '../assets/icons/dashboard.png';
import inventoryIcon from '../assets/icons/inventory.png';
import procurementIcon from '../assets/icons/procurement.png';
import requisitionsIcon from '../assets/icons/requisitions.png';
import suppliersIcon from '../assets/icons/suppliers.png';
import analyticsIcon from '../assets/icons/analytics.png';
import departmentsIcon from '../assets/icons/departments.png';
import reportsIcon from '../assets/icons/reports.png';

const Navbars = () => {
  const location = useLocation();
  
  const menuItems = [
    { name: 'Dashboard', icon: dashboardIcon, path: '/dashboard' },
    { name: 'Inventory', icon: inventoryIcon, path: '/inventory' },
    { name: 'Procurement', icon: procurementIcon, path: '/procurement' },
    { name: 'Requisitions', icon: requisitionsIcon, path: '/requisitions' },
    { name: 'Suppliers', icon: suppliersIcon, path: '/suppliers' },
    { name: 'Analytics', icon: analyticsIcon, path: '/analytics' },
    { name: 'Departments', icon: departmentsIcon, path: '/departments' },
    { name: 'Reports', icon: reportsIcon, path: '/reports' }
  ];

  return (
    <>
      {/* Header */}
     <header className="bg-white py-3 px-5 flex justify-between items-center shadow-md fixed top-0 left-0 w-full z-50 h-16">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#8bc34a] rounded-full flex items-center justify-center overflow-hidden">
            <img 
              src={logoIcon} 
              alt="Balay Ginhawa Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-[#82A33D] text-xl font-['Great_Vibes'] leading-none tracking-wide">Balay</h1>
            <p className="text-[#CFD098] text-xl font-['Great_Vibes'] leading-none tracking-wide -mt-2">ginhawa</p>
          </div>  
        </div>
        
        <div className="flex items-center gap-11">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 bg-[#889D65] rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <div className="flex flex-col items-end">
              <span className="text-gray-800 text-sm font-semibold">Sassa</span>
              <span className="text-[#889D65] text-xs font-medium">Admin</span>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-[#889D65] text-white border-none rounded-lg cursor-pointer text-sm font-medium transition-all duration-300 hover:bg-[#7a8d5a] hover:transform hover:-translate-y-0.5 flex-row-reverse">
            <span>Logout</span>
            <div className="w-4 h-4 flex items-center justify-center text-sm">
              <img 
                src={logoutIcon} 
                alt="Logout" 
                className="w-full h-full object-contain"
              />
            </div>
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <nav className="bg-white w-64 h-full py-5 border-r border-[#E5E5E5] fixed left-0 top-16 z-40">
        <div className="text-center px-5 pb-5 mb-1">
          <h3 className="text-[#889D65] font-bold text-3xl tracking-wide mb-1">INVENTORY</h3>
          {/* Line under INVENTORY text */}
          <div className="h-0.5 bg-[#E5E5E5] mt-3 mx-0"></div>
        </div>
        
        <div className="space-y-1 px-5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`group flex items-center h-14 px-5 mx-0 rounded-xl text-gray-800 bg-[#F8F8F8] transition-all duration-300 font-medium font-['Segoe_UI'] ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#889D65] to-[#CFD098] text-white' 
                    : 'hover:bg-gradient-to-r hover:from-[#889D65] hover:to-[#CFD098] hover:text-white hover:pl-6'
                }`}
              >
                <div className="w-5 h-5 mr-3 flex items-center justify-center transition-all duration-300">
                  <img 
                    src={item.icon} 
                    alt={item.name}
                    className={`w-full h-full object-contain transition-all duration-300 ${
                      isActive ? 'invert' : 'group-hover:invert'
                    }`}
                  />
                </div>
                <span className={`transition-all duration-300 ${
                  isActive ? 'text-white' : 'group-hover:transform group-hover:translate-x-1'
                }`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbars;
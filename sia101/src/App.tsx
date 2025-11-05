import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inventory from "./pages/Inventory";
import Procurement from "./pages/Procurement";
import Dashboard from "./pages/Dashboard";
import Requisitions from "./pages/Requisitions";
import Suppliers from "./pages/Suppliers";
import Analytics from "./pages/Analytics";
import Departments from "./pages/Departments";
import Reports from "./pages/Reports";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Routes>
          {/* Set Dashboard as the default route */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/requisitions" element={<Requisitions />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

import { FaChartPie, FaUsers, FaClipboardList } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white flex flex-col p-5">
      <h2 className="text-2xl font-bold mb-8">RFP AI</h2>

      <nav className="space-y-3">
        
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all text-lg
             ${isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-800"}`
          }
        >
          <FaChartPie className="text-xl" />
          <span>Dashboard</span>
        </NavLink>

        
        <NavLink
          to="/analysis"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition-all text-lg
             ${isActive ? "bg-gray-700 shadow-lg" : "hover:bg-gray-800"}`
          }
        >
          <FaClipboardList className="text-xl" />
          <span>Analysis</span>
        </NavLink>

       
        
      </nav>
    </div>
  );
};
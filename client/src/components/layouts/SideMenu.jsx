import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu }) => {
    const { user, clearUser } = useContext(UserContext);
    
    const navigate = useNavigate();
    
    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        
        navigate(route);
    };
    
    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };
    
    return (
        <div className="w-72 h-screen bg-white/90 backdrop-blur-lg border-r border-emerald-100/60 p-6 sticky top-0 z-20 shadow-xl relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-50/50 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-50/50 to-transparent rounded-full blur-xl"></div>
            
            {/* Header Section */}
            <div className="relative flex flex-col items-center justify-center gap-4 mt-6 mb-10 pb-8 border-b border-emerald-100/80">
                <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-emerald-100/60">
                        <span className="text-white font-bold text-xl tracking-wide">
                            {user?.fullName?.charAt(0) || "U"}
                        </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
                </div>
                <div className="text-center">
                    <h5 className="text-slate-800 font-semibold text-lg tracking-wide">
                        {user?.fullName || "User"}
                    </h5>
                    <p className="text-emerald-600 text-sm mt-1 font-medium">Welcome back</p>
                </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="space-y-2">
                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        className={`group w-full flex items-center gap-4 text-[15px] transition-all duration-300 py-4 px-5 rounded-xl relative overflow-hidden ${
                            activeMenu === item.label 
                                ? "text-white bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 transform scale-[1.02]" 
                                : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/80 hover:transform hover:scale-[1.01]"
                        }`}
                        onClick={() => handleClick(item.path)}
                    >
                        {/* Active indicator */}
                        {activeMenu === item.label && (
                            <div className="absolute left-0 top-0 w-1 h-full bg-emerald-300 rounded-r-full"></div>
                        )}
                        
                        <item.icon className={`text-xl flex-shrink-0 transition-transform duration-300 ${
                            activeMenu === item.label ? "transform scale-110" : "group-hover:transform group-hover:scale-110"
                        }`} />
                        <span className="font-medium">{item.label}</span>
                        
                        {/* Hover background effect */}
                        {activeMenu !== item.label && (
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        )}
                    </button>
                ))}
            </nav>
            
            {/* Logout Button */}
            <div className="absolute bottom-8 left-6 right-6">
                <button
                    className="group w-full flex items-center gap-4 text-[15px] py-4 px-5 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 border border-red-200/60 hover:border-red-300"
                    onClick={() => handleLogout()}
                >
                    <span className="text-xl group-hover:transform group-hover:scale-110 transition-transform duration-300">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default SideMenu;
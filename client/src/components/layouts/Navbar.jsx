import React, { useState } from 'react';
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { FiDollarSign } from "react-icons/fi";
import SideMenu from './SideMenu';

const Navbar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return (
        <div className="flex items-center justify-between bg-white/80 backdrop-blur-md border-b border-slate-200/50 py-4 px-7 sticky top-0 z-30 shadow-sm">
            {/* Left Section */}
            <div className="flex items-center gap-6">
                <button
                    className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                    onClick={() => {
                        setOpenSideMenu(!openSideMenu);
                    }}
                >
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />
                    )}
                </button>

                {/* Logo and Title */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                        <FiDollarSign className="text-white text-xl" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                            Budget Tracker
                        </h2>
                        <p className="text-xs text-slate-500 -mt-1">Financial Management</p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-4">
                {/* Current Page Indicator */}
                <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-xl border border-emerald-200">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-emerald-700">{activeMenu}</span>
                </div>

                {/* Notification Bell (Optional) */}
                <div className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200">
                    <span className="text-slate-600 text-lg">🔔</span>
                </div>
            </div>

            {/* Mobile Side Menu */}
            {openSideMenu && (
                <div className="fixed top-[73px] left-0 bg-white/95 backdrop-blur-md shadow-2xl z-40 lg:hidden">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}
        </div>
    )
}

export default Navbar;
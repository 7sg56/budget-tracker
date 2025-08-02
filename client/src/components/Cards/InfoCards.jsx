import React from "react";

const InfoCards = ({ icon, label, value, color, gradient}) => {
    return (
        <div className="group relative overflow-hidden bg-gradient-to-br from-white to-slate-50/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl shadow-slate-200/30 border border-white/60 hover:shadow-2xl hover:shadow-slate-200/40 transition-all duration-300 transform hover:scale-[1.02]">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-slate-100/50 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            
            <div className="relative flex items-center gap-6">
                <div className={`relative w-16 h-16 flex items-center justify-center text-[28px] text-white ${gradient || color} rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}>
                    <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    <div className="relative z-10">{icon}</div>
                </div>
                
                <div className="flex flex-col">
                    <h6 className="text-sm font-medium text-slate-500 mb-1.5 tracking-wide uppercase">{label}</h6>
                    <span className="text-2xl font-bold text-slate-800 tracking-tight">₹{value}</span>
                </div>
            </div>
        </div>
    );
};

export default InfoCards;
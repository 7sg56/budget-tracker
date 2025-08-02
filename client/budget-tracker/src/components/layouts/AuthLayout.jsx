import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Login_Img from '../../assets/images/login.jpg';

// Global state to track previous width
let previousWidth = "md:w-[50vw]";

const AuthLayout = ({ children, leftWidth = "md:w-[50vw]" }) => {
    const location = useLocation();
    const [currentWidth, setCurrentWidth] = useState(previousWidth);
    
    useEffect(() => {
        // Start with previous width, then transition to new width
        if (previousWidth !== leftWidth) {
            const timer = setTimeout(() => {
                setCurrentWidth(leftWidth);
                previousWidth = leftWidth; // Update global state
            }, 100);
            
            return () => clearTimeout(timer);
        } else {
            setCurrentWidth(leftWidth);
        }
    }, [leftWidth, location.pathname]);
    
    const rightWidth = currentWidth === "md:w-[70vw]" ? "md:w-[30vw]" : "md:w-[50vw]";
    
    return (
        <div className='flex h-screen'>
            <div className={`w-full ${currentWidth} px-8 lg:px-12 py-8 flex flex-col bg-green-50 transition-all duration-700 ease-in-out`}>
                <h2 className="text-2xl font-bold text-emerald-800 mb-8">Budget Tracker</h2>
                {children}
            </div>

            <div className={`hidden md:block ${rightWidth} bg-gray-200 transition-all duration-700 ease-in-out`}>
                <img src={Login_Img} className="w-full h-full object-cover" />
            </div>
        </div>
    )
}

export default AuthLayout;
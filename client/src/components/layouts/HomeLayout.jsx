import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import SideMenu from './SideMenu.jsx';
import Navbar from './Navbar.jsx';

const HomeLayout = ({ children, activeMenu}) => {
    const {user} = useContext(UserContext);
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-100/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-100/30 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-200/20 to-transparent rounded-full blur-2xl"></div>
            
            {/* Floating money icons */}
            <div className="absolute top-20 right-20 text-4xl opacity-10 animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}>💰</div>
            <div className="absolute top-40 right-40 text-3xl opacity-10 animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}>💳</div>
            <div className="absolute bottom-32 right-32 text-3xl opacity-10 animate-bounce" style={{animationDelay: '2s', animationDuration: '3.5s'}}>💸</div>
            <div className="absolute top-32 left-32 text-2xl opacity-10 animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}>💵</div>
            
            <Navbar activeMenu={activeMenu} />
            
            {user && (
                <div className="flex relative z-10">
                    <div className="max-[1080px]:hidden">
                        <SideMenu activeMenu={activeMenu} />
                    </div>
                    <div className="flex-1 p-6 overflow-hidden">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HomeLayout;
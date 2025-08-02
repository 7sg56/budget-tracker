import React, {useState} from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';


export default function Input({value, onChange, placeholder, label, type}){
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {  
        setShowPassword(!showPassword);
    };

    return(
        <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            
            <div className="input-box">
                <input
                    type={type === 'password' && !showPassword ? 'password' : 'text'}
                    placeholder={placeholder}
                    className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
                    value={value}
                    onChange={onChange}
                />

                {type === 'password' && (
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="flex-shrink-0 focus:outline-none"
                    >
                        {showPassword ? (
                            <FaRegEyeSlash
                                size={20}
                                className="text-primary hover:text-emerald-700 cursor-pointer transition-colors"
                            />
                        ) : (
                            <FaRegEye
                                size={20}
                                className="text-gray-400 hover:text-primary cursor-pointer transition-colors"
                            />
                        )}
                    </button>
                )}
            </div>
        </div>
    )
}
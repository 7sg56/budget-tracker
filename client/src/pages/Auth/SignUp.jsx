import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';

export default function SignUp() {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { updateUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if(!fullname) {
            setError('Full name cannot be empty');
            return;        
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }
        if(!password) {
            setError('Password cannot be empty');
            return;
        }

        setError('');

        // SignUp Api Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName: fullname,
                email,
                password
            });
            const { token, user } = response.data;

            if(token) {
                localStorage.setItem('token', token);
                updateUser(user);  // This stores user data in React Context
                navigate("/home");
            }
        } catch (err) {
            if (err.response && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }

    
    
    return(
        <AuthLayout leftWidth="md:w-[70vw]">
            <div className="flex flex-col justify-center h-full">
                <div className="w-full max-w-4xl">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-black">Create Account</h3>
                        <p className="text-sm text-slate-600 mt-2">
                            Join us today and start managing your budget effectively
                        </p>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Input 
                                    value={fullname} 
                                    onChange={(e) => setFullName(e.target.value)} 
                                    label="Full Name" 
                                    type="text" 
                                    placeholder="John Doe" 
                                />
                            </div>
                            <div className="flex-1">
                                <Input 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)} 
                                    label="Email" 
                                    type="email" 
                                    placeholder="sample@gmail.com" 
                                />
                            </div>
                        </div>
                        <Input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            label="Password" 
                            type="password" 
                            placeholder="********" 
                        />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                    
                    <button 
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg mt-6 hover:bg-emerald-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-opacity-50 font-medium"
                    >
                        Create Account
                    </button>
                    
                    <p className="text-center text-sm text-slate-600 mt-4">
                        Already have an account? 
                        <Link to="/login" className="text-primary hover:text-emerald-700 ml-1 font-medium">
                            Login
                        </Link>
                    </p>
                </form>
                </div>
            </div>
        </AuthLayout>
    )   
}
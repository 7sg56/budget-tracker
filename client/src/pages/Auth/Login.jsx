import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/inputs';
import { validateEmail } from '../../utils/helper.js'
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {updateUser} = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        if(!password) {
            setError('Password cannot be empty');
            return;
        }

        setError('');

        // Login API Call
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password
            });
            const {token, user} = response.data;

            if(token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate("/home");
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('An unexpected error occurred. Please try again later.');
            }
        }
    }
    
    return(
        <AuthLayout leftWidth="md:w-[50vw]">
            <div className="flex flex-col justify-center h-full">
                <div className="w-11/12 max-w-lg">
                    <div className="mb-8">
                        <h3 className="text-2xl font-semibold text-black">Welcome Back</h3>
                        <p className="text-sm text-slate-600 mt-2">
                            Please enter your credentials to log in
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                    <Input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        label="Email" 
                        type="email" 
                        placeholder="sample@gmail.com" 
                    />
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
                        Login
                    </button>
                    
                    <p className="text-center text-sm text-slate-600 mt-4">
                        Don't have an account? 
                        <Link to="/signup" className="text-primary hover:text-emerald-700 ml-1 font-medium">
                            Sign up
                        </Link>
                    </p>
                </form>
                </div>
            </div>
        </AuthLayout>
    )   
}
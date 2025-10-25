import React, { useState } from 'react';
import { Utensils, Lock, Mail, LogIn, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- CONFIGURATION ---
// This is the fix: It now uses your Vercel Environment Variable
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000/api';
const LOGIN_ENDPOINT = `${API_BASE_URL}/staff/login`;


export default function ChefLoginPage({ onLoginSuccess }) { 
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); 
        setError('');

        try {
            const response = await fetch(LOGIN_ENDPOINT, { // Use the correct endpoint
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem('chefToken', data.token);
                    onLoginSuccess(data.token);
                } else {
                    setError('Login successful, but token not found.');
                    setLoading(false);
                }
            } else {
                setError(data.message || 'Login failed. Invalid credentials.');
                setLoading(false);
            }

        } catch (err) {
            console.error("Network or Fetch Error:", err);
            setError('Network connection failed. Server might be down or URL incorrect.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover bg-center" 
             style={{ backgroundImage: `url(https://placehold.co/1920x1080/0d121c/EFEFEF/png?text=CANTEEN+BACKGROUND)` }}>
            
            <div className="absolute inset-0 bg-black opacity-60"></div>
            
            <div className="relative p-8 bg-gray-800 bg-opacity-90 rounded-xl shadow-2xl w-full max-w-sm text-center border-t-4 border-indigo-500">
                
                <Utensils className="w-12 h-12 mx-auto mb-4 text-indigo-400" />
                
                <h1 className="text-3xl font-bold text-white mb-1">JJ College Canteen</h1>
                <h2 className="text-xl text-indigo-400 font-semibold mb-6 border-b border-gray-700 pb-2">Kitchen Staff Login</h2>
                
                {error && (
                    <p className="p-2 mb-4 text-sm font-medium text-red-100 bg-red-600 rounded">
                        {error}
                    </p>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            placeholder="Staff Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full pl-10 pr-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-200 shadow-md disabled:bg-indigo-400"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-5 h-5 mr-3 animate-spin" />
                                Authenticating...
                            </>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5 mr-2" />
                                Access Kitchen
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-4 text-sm">
                    <Link to="/student-login" className="text-gray-400 hover:text-indigo-400 transition duration-200">
                        Switch to Student Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
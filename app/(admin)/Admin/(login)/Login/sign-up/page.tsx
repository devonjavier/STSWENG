'use client'
import React, { useState } from 'react';

// for taking input
export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (password !== confirmPassword) {
            setLoading(false);
            setError('Passwords do not match');
            return;
        }

        // registration back-end
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white pb-8">
            <div className="flex justify-center mb-6">
                <div className="w-full md:w-64 h-auto md:h-48 overflow-hidden rounded-full">
                    <img src="/IndigoStudios.png" alt="Logo" className="object-cover object-center w-full h-full" />
                </div>
            </div>
            <div className="bg-white p-6 md:p-12 rounded-lg shadow-lg w-full max-w-lg">
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="text-black">
                        <label htmlFor="username" className="block text-xl font-medium">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ borderRadius: '15px' }}/>
                    </div>

                    <div className="relative text-black">
                        <label htmlFor="password" className="block text-xl font-medium">Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ borderRadius: '15px' }}/>
                    </div>

                    <div className="relative text-black mb-6">
                        <label htmlFor="confirmPassword" className="block text-xl font-medium">Confirm Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            className="w-full px-4 py-2 border border-gray-300 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ borderRadius: '15px' }}/>
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ marginTop: '27px', marginRight: '-5px' }}>
                            <img
                                src={showPassword ? "/eye_bare.png" : "/eye_slash.png"}
                                alt={showPassword ? 'Hide password' : 'Show password'}
                                className="h-11 w-11 text-gray-700"/>
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 md:py-5 bg-cusBlue text-white rounded-lg hover:bg-purple-700 transition duration-300"
                        style={{ borderRadius: '50px' }}>
                        Sign Up
                    </button>
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            </div>
        </div>
    );
}

"use client";

// components/SignIn.js
import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../app/firebase/config';
import { signInWithPopup, getRedirectResult, signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setError('');
        try {
            // Firebase Email/Password Authentication
            const res = await signInWithEmailAndPassword(auth, email, password);
            console.log('Successfully signed in with credentials', { res });
            console.log({ res });
            router.push('/')
        } catch (err: any) {
            setError('Failed to sign in. Check your credentials.');
            console.error(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            console.log('Google sign-in success:', result.user);
            router.push('/')
        } catch (error: any) {
            console.error('Google sign-in error:', error.message);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">Sign in</h2>
                <p className="text-gray-600 mb-6">
                    or{' '}
                    <button
                        onClick={() => router.push('/sign-up')}
                        className="text-blue-500 underline"
                    >
                        create an account
                    </button>
                </p>

                {/* Email Input */}
                <div className="mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label className="ml-2 text-gray-700">Remember me</label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign in
                </button>

                {/* Google Sign-in */}
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center mt-4 border border-gray-300 rounded py-2 hover:bg-gray-100"
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    Sign in with Google
                </button>

                {/* Forgotten Password Link */}
                <p className="mt-4 text-center">
                    <a href="#" className="text-blue-500">Forgotten your password?</a>
                </p>
            </form>
        </div>
    );
}

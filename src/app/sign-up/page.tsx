'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../app/firebase/config';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    const handleSignUp = async () => {
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            console.log({ res });
            sessionStorage.setItem('user', true);
            setEmail('');
            setPassword('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSignUp();
                }}
            >
                <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
                <p className="text-gray-600 mb-6">
                    or <a href="./sign-in" className="text-blue-500">sign in to your account</a>
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
                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;

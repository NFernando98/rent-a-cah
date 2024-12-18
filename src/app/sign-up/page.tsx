'use client';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from '../../app/firebase/config';
import { sendSignInLinkToEmail, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);

    // Action Code Settings for Email Link Verification
    const actionCodeSettings = {
        url: 'http://localhost:3000/sign-up', // This should goto the page where you add your card and address
        handleCodeInApp: true,
    };

    // Handle Sign-Up with Email/Password
    const handleEmailSignUp = async () => {
        try {
            await createUserWithEmailAndPassword(email, password);
            console.log('Signed up with email/password');

            // Send passwordless email verification link
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            window.localStorage.setItem('emailForSignIn', email); // Save email locally to avoid
            setMessage('Verification link sent to your email. Please check your inbox.');

            // Redirect to verification page
            router.push('/');
        } catch (e: any) {
            console.error('Sign-up error:', e.message);
            setMessage('Failed to send verification link. Please try again.');
        }
    };

    // Handle Sign-Up with Google
    const handleGoogleSignUp = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            console.log('Signed up with Google:', res.user);
        } catch (e: any) {
            console.error('Google sign-up error:', e.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            <h1 className="text-3xl font-bold mb-8 text-gray-900">Welcome to Cahs</h1>
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <button
                    onClick={handleGoogleSignUp}
                    className="w-full flex items-center justify-center border border-gray-300 rounded py-2 mb-4 hover:bg-gray-100"
                >
                    <img
                        src="https://developers.google.com/identity/images/g-logo.png"
                        alt="Google Logo"
                        className="w-5 h-5 mr-2"
                    />
                    <span className="text-gray-700">Continue with Google</span>
                </button>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={handleEmailSignUp}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>

                {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}

                <div className="text-center mt-6">
                    <span className="text-gray-600">Already have an account?</span>{' '}
                    <a href="./sign-in" className="text-blue-500 hover:underline">
                        Log in
                    </a>
                </div>

                <p className="text-xs text-gray-500 mt-6 text-center">
                    By signing up, you agree to Cahs's{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        terms of service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-500 hover:underline">
                        privacy policy
                    </a>.
                </p>
            </div>
        </div>
    );
};

export default SignUp;

'use client';
import { useEffect, useState } from 'react';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { auth } from '../../app/firebase/config';
import { useRouter } from 'next/navigation';

const VerifyEmail = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('Verifying...');
    const router = useRouter();

    useEffect(() => {
        const verifySignIn = async () => {
            const authInstance = getAuth();
            if (isSignInWithEmailLink(authInstance, window.location.href)) {
                let emailForSignIn = window.localStorage.getItem('emailForSignIn');
                if (!emailForSignIn) {
                    // User opened link on a different device or cleared storage
                    emailForSignIn = prompt('Please provide your email for confirmation');
                }

                try {
                    await signInWithEmailLink(authInstance, emailForSignIn || '', window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                    setStatus('Sign-in successful! Redirecting...');
                    router.push('/'); // Redirect to homepage or dashboard
                } catch (error: any) {
                    console.error('Error completing sign-in:', error.message);
                    setStatus('Error verifying email. Please try again.');
                }
            }
        };

        verifySignIn();
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <p className="text-lg text-gray-700">{status}</p>
        </div>
    );
};

export default VerifyEmail;

import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Navbar() {

    const [user] = useAuthState(auth);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await signOut(auth); // Logs the user out
            console.log('User signed out');
            router.push('/sign-in'); // Redirect to sign-in page
        } catch (error: any) {
            console.error('Error signing out:', error.message);
        }
    };

    return (
        <header className="bg-black text-white py-4">
            <div className="container mx-auto flex items-center justify-between px-4">
                <h1 className="text-lg font-bold">Rent a Cah</h1>
                {user ? (
                    <>
                        <h1>{user.email}</h1>
                        <button
                            className="bg-yellow-500 text-black px-4 py-2 rounded"
                            onClick={handleLogout}
                        >
                            Log out
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-yellow-500 text-black px-4 py-2 rounded"
                        onClick={() => router.push('/sign-up')}
                    >
                        Log in
                    </button>
                )}
            </div>
        </header>
    );
}
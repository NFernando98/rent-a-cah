'use client';
import React from 'react';
import FilterBar from '@/components/FilterBar';
import CarList from '@/components/CarList';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../app/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function Home() {
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
    <main className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto flex items-center justify-between px-4">
          <h1 className="text-lg font-bold">Rent a Cah</h1>
          <h1>{user?.email}</h1>
          <button
            className="bg-yellow-500 text-black px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Log out
          </button>
        </div>
      </header>

      {/* Filters Section */}
      <FilterBar />

      {/* Car List Section */}
      <section className="container mx-auto mt-6 px-4">
        <CarList />
      </section>
    </main>
  );
}

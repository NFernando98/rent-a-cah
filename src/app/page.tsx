'use client';

import React from 'react';
import SearchBar from '@/components/SearchBar';
import Navbar from '@/components/Navbar';

export default function home() {
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <Navbar />

      {/*Search Bar Section */}
      <SearchBar />
    </main>
  );
};


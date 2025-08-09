'use client';

import { useState } from 'react';
import SearchForm from '../components/SearchForm';
import { Store } from '../types';

export default function Home() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string, searchType: 'city' | 'keyword') => {
    setLoading(true);
    try {
      // TODO: Implement actual API call to search stores
      const response = await fetch(`/api/stores?${searchType}=${query}`);
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error searching stores:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        E-commerce Store Finder
      </h1>
      <SearchForm onSearch={handleSearch} />
      
      {loading ? (
        <div className="text-center mt-8">Loading stores...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {stores.map((store) => (
            <div key={store.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{store.name}</h2>
              <p className="text-gray-600">{store.city}</p>
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Visit Store
              </a>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
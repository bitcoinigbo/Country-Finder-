import React, { useState, useEffect, useMemo } from 'react';
import type { Country } from './types';
import { fetchAllCountries } from './services/countryService';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import CountryModal from './components/CountryModal';

const App: React.FC = () => {
  const [allCountries, setAllCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchAllCountries();
        const sortedData = data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setAllCountries(sortedData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  // Effect to lock body scroll when modal is open
  useEffect(() => {
    if (selectedCountry) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedCountry]);


  const filteredCountries = useMemo(() => {
    if (!searchTerm) {
      return allCountries;
    }
    return allCountries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allCountries, searchTerm]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Country Finder</h1>
          <p className="text-lg text-gray-400">Explore the world, one country at a time.</p>
        </header>

        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        
        {!isLoading && !error && (
          <CountryList 
            countries={filteredCountries} 
            searchTerm={searchTerm} 
            onCountrySelect={setSelectedCountry} 
          />
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by the REST Countries API & Gemini</p>
      </footer>
      {selectedCountry && (
        <CountryModal 
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
        />
      )}
    </div>
  );
};

export default App;
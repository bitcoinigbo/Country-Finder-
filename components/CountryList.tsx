
import React from 'react';
import type { Country } from '../types.ts';
import CountryCard from './CountryCard.tsx';

interface CountryListProps {
  countries: Country[];
  searchTerm: string;
  onCountrySelect: (country: Country) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, searchTerm, onCountrySelect }) => {
  if (countries.length === 0 && searchTerm) {
    return (
        <div className="text-center py-10">
            <h2 className="text-2xl font-semibold text-white">No countries found</h2>
            <p className="text-gray-400 mt-2">Try adjusting your search.</p>
        </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {countries.map(country => (
        <CountryCard key={country.cca3} country={country} onSelect={onCountrySelect} />
      ))}
    </div>
  );
};

export default CountryList;
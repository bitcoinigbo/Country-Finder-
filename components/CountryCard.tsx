
import React from 'react';
import type { Country, Currency } from '../types.ts';

interface CountryCardProps {
  country: Country;
  onSelect: (country: Country) => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <p className="text-sm text-gray-300">
    <span className="font-semibold text-gray-100">{label}:</span> {value}
  </p>
);

const CountryCard: React.FC<CountryCardProps> = ({ country, onSelect }) => {
  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
  const currencies = country.currencies ? Object.values(country.currencies).map((c: Currency) => c.name).join(', ') : 'N/A';

  return (
    <button 
        onClick={() => onSelect(country)}
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out h-full flex flex-col w-full text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
        aria-label={`View details for ${country.name.common}`}
    >
        <img 
            src={country.flags.svg} 
            alt={country.flags.alt || `Flag of ${country.name.common}`} 
            className="w-full h-40 object-cover" 
            loading="lazy"
        />

        <div className="p-5 flex flex-col flex-grow">
            <h2 className="text-xl font-bold text-white mb-3">{country.name.common}</h2>
            <div className="space-y-2 flex-grow text-left">
              <DetailItem label="Capital" value={country.capital?.[0] || 'N/A'} />
              <DetailItem label="Population" value={country.population.toLocaleString()} />
              <DetailItem label="Region" value={country.region || 'N/A'} />
              <DetailItem label="Languages" value={languages} />
              <DetailItem label="Currency" value={currencies} />
            </div>
        </div>
    </button>
  );
};

export default CountryCard;
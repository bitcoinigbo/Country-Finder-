import React, { useEffect } from 'react';
import type { Country, Currency } from '../types';
import CountryDetails from './CountryDetails';

interface CountryModalProps {
    country: Country;
    onClose: () => void;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <p className="text-base text-gray-300">
    <span className="font-semibold text-gray-100">{label}:</span> {value}
  </p>
);

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';
    const currencies = country.currencies ? Object.values(country.currencies).map((c: Currency) => `${c.name} (${c.symbol})`).join(', ') : 'N/A';

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50 p-4 transition-opacity duration-300 animate-fade-in"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`modal-title-${country.cca3}`}
        >
            <div
                className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col transition-transform duration-300 animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <header className="relative p-5 border-b border-gray-700 flex-shrink-0">
                    <h2 id={`modal-title-${country.cca3}`} className="text-3xl font-bold text-white text-center">{country.name.common}</h2>
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </header>

                <div className="overflow-y-auto">
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                        <img
                            src={country.flags.svg}
                            alt={country.flags.alt || `Flag of ${country.name.common}`}
                            className="w-full rounded-md shadow-md object-cover"
                        />
                        <div className="space-y-3">
                            <DetailItem label="Official Name" value={country.name.official} />
                            <DetailItem label="Capital" value={country.capital?.[0] || 'N/A'} />
                            <DetailItem label="Population" value={country.population.toLocaleString()} />
                            <DetailItem label="Region" value={`${country.region} (${country.subregion || 'N/A'})`} />
                            <DetailItem label="Languages" value={languages} />
                            <DetailItem label="Currency" value={currencies} />
                        </div>
                    </div>
                    <hr className="border-gray-700 mx-6" />
                    <CountryDetails country={country} />
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes scale-in {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                .animate-scale-in { animation: scale-in 0.3s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default CountryModal;

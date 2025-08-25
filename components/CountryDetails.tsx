import React, { useState, useEffect } from 'react';
import type { Country, TouristInfo } from '../types';
import { fetchTouristInfo } from '../services/geminiService';

interface CountryDetailsProps {
  country: Country;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="mb-6">
        <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
        </h3>
        <div className="text-gray-300 space-y-2 text-sm">{children}</div>
    </div>
);

const SkeletonLoader: React.FC = () => (
    <div className="animate-pulse space-y-6 p-5">
        <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded w-1/4"></div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-4/6"></div>
        </div>
        <div className="space-y-3">
            <div className="h-4 bg-gray-600 rounded w-1/3"></div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-5/6"></div>
        </div>
    </div>
);

const CountryDetails: React.FC<CountryDetailsProps> = ({ country }) => {
    const [touristInfo, setTouristInfo] = useState<TouristInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getInfo = async () => {
            if (touristInfo) return; // Don't refetch if we already have the data
            setIsLoading(true);
            setError(null);
            try {
                const data = await fetchTouristInfo(country);
                setTouristInfo(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred while fetching details.');
                }
            } finally {
                setIsLoading(false);
            }
        };
        getInfo();
    }, [country, touristInfo]);

    if (isLoading) {
        return <SkeletonLoader />;
    }

    if (error) {
        return <div className="p-5 text-center text-red-400">{error}</div>;
    }

    if (!touristInfo) {
        return null;
    }

    return (
        <div className="p-5 bg-gray-700/50 rounded-b-lg">
            <DetailSection title="Best Time to Visit" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}>
                <p>{touristInfo.bestTimeToVisit}</p>
            </DetailSection>

            <DetailSection title="Top Attractions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}>
                <ul className="list-disc list-inside space-y-1">
                    {touristInfo.attractions.map(item => (
                        <li key={item.name}><strong>{item.name}:</strong> {item.description}</li>
                    ))}
                </ul>
            </DetailSection>

            <DetailSection title="Must-Try Cuisine" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.343a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 14.95a1 1 0 001.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zM1.05 5.05a1 1 0 001.414-1.414l.707.707a1 1 0 00-1.414 1.414l-.707-.707z" /><path d="M10 4a6 6 0 100 12 6 6 0 000-12zM10 14a4 4 0 110-8 4 4 0 010 8z" /></svg>}>
                 <ul className="list-disc list-inside space-y-1">
                    {touristInfo.cuisine.map(item => (
                        <li key={item.name}><strong>{item.name}:</strong> {item.description}</li>
                    ))}
                </ul>
            </DetailSection>

             <DetailSection title="Cultural Etiquette" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>}>
                 <ul className="list-disc list-inside space-y-1">
                    {touristInfo.culturalEtiquette.map((tip, index) => (
                        <li key={index}>{tip}</li>
                    ))}
                </ul>
            </DetailSection>

             <DetailSection title="Common Phrases" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" /></svg>}>
                <ul className="space-y-1">
                    {touristInfo.commonPhrases.map(item => (
                        <li key={item.phrase}><strong>{item.phrase}:</strong> "{item.translation}"</li>
                    ))}
                </ul>
            </DetailSection>
        </div>
    );
};

export default CountryDetails;

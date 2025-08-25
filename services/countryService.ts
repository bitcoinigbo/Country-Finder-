
import type { Country } from '../types.ts';

const API_BASE_URL = 'https://restcountries.com/v3.1';
const ALL_COUNTRIES_FIELDS = 'name,flags,capital,population,region,subregion,languages,currencies,cca3';


export const fetchAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/all?fields=${ALL_COUNTRIES_FIELDS}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch countries: ${response.status} ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw new Error('Could not connect to the country database. Please check your internet connection.');
  }
};

export const searchCountryByName = async (name: string): Promise<Country[]> => {
  if (!name) return [];
  try {
    const response = await fetch(`${API_BASE_URL}/name/${name}`);
    if (response.status === 404) {
      return []; // Return empty array if country not found
    }
    if (!response.ok) {
      throw new Error(`Failed to search for country: ${response.status} ${response.statusText}`);
    }
    const data: Country[] = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching for country "${name}":`, error);
    throw new Error('There was an issue with the search. Please try again.');
  }
};
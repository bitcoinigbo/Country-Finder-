export interface Currency {
  name: string;
  symbol: string;
}

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  capital: string[];
  population: number;
  region: string;
  subregion: string;
  languages: { [key: string]: string };
  currencies: { [key: string]: Currency };
  cca3: string; // Using cca3 as a unique key
}

export interface TouristInfo {
  attractions: { name: string; description: string; }[];
  bestTimeToVisit: string;
  cuisine: { name: string; description: string; }[];
  culturalEtiquette: string[];
  commonPhrases: { phrase: string; translation: string; }[];
}

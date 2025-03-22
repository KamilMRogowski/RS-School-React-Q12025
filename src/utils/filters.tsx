import { Country } from "./interfaces";

export const filterCountriesByRegion = (
  countries: Country[],
  selectedRegion: string
) => {
  if (selectedRegion === "all") return countries;
  return countries.filter((country) => country.region === selectedRegion);
};

export const filterCountriesByName = (
  countries: Country[],
  searchTerm: string
) => {
  if (searchTerm === "") return countries;
  return countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

export const sortCountries = (
  countries: Country[],
  sortOrder: "populationAsc" | "populationDesc" | "nameAsc" | "nameDesc"
): Country[] => {
  return [...countries].sort((a, b) => {
    switch (sortOrder) {
      case "populationAsc":
        return a.population - b.population;
      case "populationDesc":
        return b.population - a.population;
      case "nameAsc":
        return a.name.common.localeCompare(b.name.common);
      case "nameDesc":
        return b.name.common.localeCompare(a.name.common);
      default:
        return 0;
    }
  });
};

export const toggleVisitedCountry = (country: Country): boolean => {
  const countryFromLocalStorage = localStorage.getItem(country.name.common);
  if (countryFromLocalStorage) {
    localStorage.removeItem(country.name.common);
    return false;
  } else {
    localStorage.setItem(country.name.common, JSON.stringify(country));
    return true;
  }
};

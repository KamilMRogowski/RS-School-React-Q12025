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

export const sortCountriesByName = (
  countries: Country[],
  sortOrder: "asc" | "desc" | "none"
) => {
  if (sortOrder === "none") return countries;
  return countries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase();
    const nameB = b.name.common.toLowerCase();
    return sortOrder === "asc"
      ? nameA.localeCompare(nameB)
      : nameB.localeCompare(nameA);
  });
};

export const sortCountriesByPopulation = (
  countries: Country[],
  sortOrder: "asc" | "desc" | "none"
) => {
  if (sortOrder === "none") return countries;

  return countries.sort((a, b) => {
    const populationA = a.population;
    const populationB = b.population;
    return sortOrder === "asc"
      ? populationA - populationB
      : populationB - populationA;
  });
};

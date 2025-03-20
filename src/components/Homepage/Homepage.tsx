import { useState } from "react";
import { useEffect } from "react";
import { Country } from "../../utils/interfaces";
import CountryCard from "../CountryCard/CountryCard";
import styles from "./Homepage.module.scss";
import {
  filterCountriesByRegion,
  filterCountriesByName,
  sortCountriesByName,
  sortCountriesByPopulation,
} from "../../utils/filters";

export default function Homepage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrderByName, setSortOrderByName] = useState<
    "asc" | "desc" | "none"
  >("none");
  const [sortOrderByPopulation, setSortOrderByPopulation] = useState<
    "asc" | "desc" | "none"
  >("none");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
      });
  }, []);

  const regions = [
    ...new Set(countries.map((country) => country.region)),
  ].sort();

  useEffect(() => {
    let filtered = [...countries];

    if (selectedRegion !== "all") {
      filtered = filterCountriesByRegion(filtered, selectedRegion);
    }

    if (searchQuery) {
      filtered = filterCountriesByName(filtered, searchQuery);
    }

    if (sortOrderByName !== "none") {
      filtered = sortCountriesByName(filtered, sortOrderByName);
    }

    if (sortOrderByPopulation !== "none") {
      filtered = sortCountriesByPopulation(filtered, sortOrderByPopulation);
    }

    setFilteredCountries(filtered);
  }, [
    countries,
    selectedRegion,
    searchQuery,
    sortOrderByName,
    sortOrderByPopulation,
  ]);

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrderByName(e.target.value as "asc" | "desc" | "none");
  };

  const handleSortByPopulationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSortOrderByPopulation(e.target.value as "asc" | "desc" | "none");
  };

  const handleClearFilters = () => {
    setSelectedRegion("all");
    setSearchQuery("");
    setSortOrderByName("none");
    setSortOrderByPopulation("none");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>React Performance Task</h1>
      <div className={styles.filters}>
        <div className={styles.filterWrapper}>
          <label className={styles.filterLabel} htmlFor="search">
            Search by name
          </label>
          <input
            id="search"
            type="text"
            placeholder="Search for a country"
            onChange={handleSearch}
            value={searchQuery}
          />
        </div>
        <div className={styles.filterWrapper}>
          <label className={styles.filterLabel} htmlFor="region">
            Filter by region
          </label>
          <select
            id="region"
            className={styles.select}
            value={selectedRegion}
            onChange={handleRegionChange}
          >
            <option value="all">All</option>
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.filterWrapper}>
          <label className={styles.filterLabel} htmlFor="sort">
            Sort by name
          </label>
          <select
            id="sortByName"
            value={sortOrderByName}
            onChange={handleSortByNameChange}
          >
            <option value="none">None</option>
            <option value="asc">Name (ascending)</option>
            <option value="desc">Name (descending)</option>
          </select>
        </div>
        <div className={styles.filterWrapper}>
          <label className={styles.filterLabel} htmlFor="sort">
            Sort by population
          </label>
          <select
            id="sortByPopulation"
            value={sortOrderByPopulation}
            onChange={handleSortByPopulationChange}
          >
            <option value="none">None</option>
            <option value="asc">Population (ascending)</option>
            <option value="desc">Population (descending)</option>
          </select>
        </div>
        <button
          className={styles.clearFiltersButton}
          onClick={handleClearFilters}
        >
          Clear filters
        </button>
      </div>
      {filteredCountries.length === 0 ? (
        <p className={styles.noResults}>No results found</p>
      ) : (
        <div className={styles.countriesGrid}>
          {filteredCountries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

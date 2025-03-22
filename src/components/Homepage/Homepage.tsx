import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Country, SortOrder } from "../../utils/interfaces";
import styles from "./Homepage.module.scss";
import CountriesList from "../CountriesList/CountriesList";
import {
  filterCountriesByRegion,
  filterCountriesByName,
  sortCountries,
} from "../../utils/filters";

export default function Homepage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const regions = useMemo(() => {
    return [...new Set(countries.map((country) => country.region))].sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    let filtered = [...countries];

    if (selectedRegion !== "all") {
      filtered = filterCountriesByRegion(filtered, selectedRegion);
    }

    if (searchQuery) {
      filtered = filterCountriesByName(filtered, searchQuery);
    }

    if (sortOrder !== "none") {
      filtered = sortCountries(filtered, sortOrder);
    }

    return filtered;
  }, [countries, selectedRegion, searchQuery, sortOrder]);

  const handleRegionChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedRegion(e.target.value);
    },
    []
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSortOrder(e.target.value as SortOrder);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSelectedRegion("all");
    setSearchQuery("");
    setSortOrder("none");
  }, []);

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
          <select id="sortByName" value={sortOrder} onChange={handleSortChange}>
            <option value="none">None</option>
            <option value="nameAsc">Name (ascending)</option>
            <option value="nameDesc">Name (descending)</option>
            <option value="populationAsc">Population (ascending)</option>
            <option value="populationDesc">Population (descending)</option>
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
        <CountriesList countries={filteredCountries} />
      )}
    </div>
  );
}

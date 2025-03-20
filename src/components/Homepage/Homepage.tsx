import { useCallback, useMemo, useState } from "react";
import { useEffect } from "react";
import { Country } from "../../utils/interfaces";
import CountryCard from "../CountryCard/CountryCard";
import styles from "./Homepage.module.scss";

export default function Homepage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedRegion, setSelectedRegion] = useState("all");

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));  
  }, []);

  const regions = useMemo(() => {
    return [...new Set(countries.map((country) => country.region))].sort();
  }, [countries]);

  const filteredCountries = useMemo(() => {
    if (selectedRegion === "all") return countries;
    return countries.filter(country => country.region === selectedRegion);
  }, [countries, selectedRegion]);

  const handleRegionChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => setSelectedRegion(e.target.value), []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Countries of the World</h1>
      <select 
        className={styles.select}
        value={selectedRegion}
        onChange={handleRegionChange}
      >
        <option value="all">All</option>
        {regions.map((region) => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
      <div className={styles.countriesGrid}>
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}

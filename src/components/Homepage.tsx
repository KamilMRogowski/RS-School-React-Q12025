import { useState } from "react";
import { useEffect } from "react";
import { Country } from "../utils/interfaces";
import CountryCard from "./CountryCard";
import styles from "./Homepage.module.scss";

export default function Homepage() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Countries of the World</h1>
      <div className={styles.countriesGrid}>
        {countries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </div>
  );
}

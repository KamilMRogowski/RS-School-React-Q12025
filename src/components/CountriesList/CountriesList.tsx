import { Country } from "../../utils/interfaces";
import CountryCard from "../CountryCard/CountryCard";
import styles from "./CountriesList.module.scss";

export default function CountriesList({ countries }: { countries: Country[] }) {
  return (
    <div className={styles.countriesList}>
      {countries.map((country) => (
        <CountryCard key={country.name.common} country={country} />
      ))}
    </div>
  );
}

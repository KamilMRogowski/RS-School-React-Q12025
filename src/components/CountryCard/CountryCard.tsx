import { Country } from "../../utils/interfaces";
import styles from "./CountryCard.module.scss";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <div className={styles.card}>
      <img
        src={country.flags.png}
        alt={country.name.common}
        className={styles.flag}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>{country.name.common}</h2>
        <div className={styles.infoContainer}>
          <p className={styles.info}>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p className={styles.info}>
            <strong>Capital:</strong> {country.capital}
          </p>
          <p className={styles.info}>
            <strong>Region:</strong> {country.region}
          </p>
        </div>
      </div>
    </div>
  );
}

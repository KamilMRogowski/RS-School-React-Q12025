import { Country } from "../../utils/interfaces";
import styles from "./CountryCard.module.scss";
import { toggleVisitedCountry } from "../../utils/filters";
import { memo, useState } from "react";

function CountryCard({ country }: { country: Country }) {
  const [isVisited, setIsVisited] = useState(toggleVisitedCountry(country));

  const handleCardClick = (country: Country) => {
    toggleVisitedCountry(country);
    setIsVisited(!isVisited);
  };

  return (
    <div
      className={`${styles.card} ${isVisited ? styles.isVisited : ""}`}
      onClick={() => handleCardClick(country)}
    >
      {isVisited && <div className={styles.visitedBadge}>Visited</div>}
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

export default memo(CountryCard);

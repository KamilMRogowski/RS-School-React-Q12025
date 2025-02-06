import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';
import PokemonCard from './PokemonCard';
import Loader from './Loader';

type ResultsProps = {
  results: PokemonApiResponse;
  loading: boolean;
  errorMessage: string;
};

export default function Results({
  results,
  loading,
  errorMessage,
}: ResultsProps) {
  return (
    <div className="results-container">
      <div className="loader">{loading && <Loader />}</div>
      {!errorMessage && !loading && <PokemonCard results={results} />}
      {errorMessage && (
        <div>
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
}

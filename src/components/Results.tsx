import { PokemonApiResponse } from '../utils/interfaces/pokemonApiResponse';
import PokemonCard from './PokemonCard';
import Loader from './Loader';
import PokemonList from './PokemonList';

type ResultsProps = {
  results: PokemonApiResponse;
  isLoading: boolean;
  errorMessage: string;
};

export default function Results({
  results,
  isLoading,
  errorMessage,
}: ResultsProps) {
  return (
    <div className="results-container">
      <div className="loader">{isLoading && <Loader />}</div>
      {!errorMessage && !isLoading && <PokemonCard results={results} />}
      {!errorMessage && 'results' in results && (
        <PokemonList results={results} />
      )}

      {errorMessage && (
        <div>
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
}

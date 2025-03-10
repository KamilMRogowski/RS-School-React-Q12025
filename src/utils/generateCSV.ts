import { Pokemon } from '../utils/interfaces/pokemonApiResponse';

export default function generateCSV(pokemonArray: Pokemon[]) {
  if (pokemonArray.length > 0) {
    const formattedArray = pokemonArray.map((pokemon) => {
      return {
        order: pokemon.order,
        name: pokemon.name,
        base_experience: pokemon.base_experience,
        height: pokemon.height,
        weight: pokemon.weight,
      };
    });

    const csvArray = [];
    const headers = Object.keys(formattedArray[0]);
    csvArray.push(headers);
    formattedArray.forEach((pokemon) => {
      csvArray.push(Object.values(pokemon));
    });

    let csvFileContent = '';
    csvArray.forEach((row) => {
      csvFileContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvFileContent], {
      type: 'text/csv;charset=utf-8',
    });
    const blobURL = URL.createObjectURL(blob);
    return blobURL;
  }
}

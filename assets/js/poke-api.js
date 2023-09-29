const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other["official-artwork"].front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 16) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((getPokemonDetail) => getPokemonDetail);
};

pokeApi.filterPokemonAbout = (pokemon) => {
  const fileterdFlavorTextEntries = pokemon.flavor_text_entries.filter(
    (flavorFilter) => flavorFilter.language.name === "en"
  );

  const flavorTextEntry =
    fileterdFlavorTextEntries.length > 0 ? fileterdFlavorTextEntries[0] : {};

  const flavorText = flavorTextEntry.flavor_text;
  return flavorText;
};

pokeApi.getPokemonAbout = (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => pokeApi.filterPokemonAbout(jsonBody))
    .then((filtered) => filtered);
};

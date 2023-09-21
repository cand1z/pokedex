const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");

const maxRecord = 1010;
const limit = 16;
let offset = 0;

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `
          <li class="pokemon ${pokemon.type}">
            <div class='cardHeader'>
              <span class="name">${pokemon.name}</span>
              <span class="number">#${pokemon.number}</span>
            </div>

            <div class="detail">
              
              <ol class="types">
                ${pokemon.types
                  .map(
                    (type) => `<li class="type ${pokemon.type}">${type}</li>`
                  )
                  .join("")}
              </ol>

              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
                  pokemon.number
                }.png"
                alt="${pokemon.name}"
              />
            </div>
          </li>`
      )
      .join("");
  });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener("click", () => {
  offset += limit;

  const qtdRecordNextPage = offset + limit;

  if (qtdRecordNextPage >= maxRecord) {
    const newLimit = qtdRecordNextPage - maxRecord;
    loadPokemonItems(offset, newLimit);

    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

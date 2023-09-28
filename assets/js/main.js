const pokemonList = document.getElementById("pokemonList");

const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");

const maxRecord = 10010;
const limit = 10;
let offset = 0;

let isLoadingPokemons = false;

function loadPokemonItems(offset, limit) {
  showLoading();
  isLoadingPokemons = true;
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    pokemonList.innerHTML += pokemons
      .map(
        (pokemon) => `
          <li 
          class="pokemon bg-${pokemon.type}" 
          onclick="openModal(
            '${pokemon.type}', '${pokemon.types}', '${pokemon.name}', '${
          pokemon.photo
        }')">
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
                src="${pokemon.photo}"
                alt="${pokemon.name}"
              />
            </div>
          </li>`
      )
      .join("");
  });
  hideLoading();
  isLoadingPokemons = false;
}

loadPokemonItems(offset, limit);

function openModal(type, types, name, photo) {
  modal.innerHTML = `
        <div class="modal-content bg-${type}">
        <header id="headerTitle">
          <img
            src="https://user-images.githubusercontent.com/29473781/180619084-a56960ab-7efa-4e34-9d33-4e3e581d62ff.png"
            class="pokedexTitle"
          />
          <span class="close" onclick="closeModal()">&times;</span>
        </header>
        <section class="modal-contents bg-white">
          <img
            class="modal-pokemon"
            src="${photo}"
            alt="${name}"
          />
          <div class="pokemon-info">
            <ol class="types">
              <li class="name">
                <h1>${name}</h1>
              </li>
              <div class="flex-center">
              ${types
                .split(",")
                .map(
                  (typeSlot) =>
                    `<li class="pokemon-type ${type}">${typeSlot}</li>`
                )
                .join("")}
              </div>
            </ol>
            <p class="pokemon-about">
              There is a plant seed on its back right from the day this
              Pokémon is born. The seed slowly grows larger.
            </p>
          </div>
        </section>
      </div>`;
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

window.addEventListener("wheel", () => {
  if (
    window.innerHeight + window.scrollY + 300 > document.body.scrollHeight &&
    !isLoadingPokemons
  ) {
    offset += limit;
    loadPokemonItems(offset, limit);
  }
});

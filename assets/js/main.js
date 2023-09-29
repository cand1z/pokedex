const pokemonList = document.getElementById("pokemonList");

const span = document.getElementsByClassName("close")[0];
const modal = document.getElementById("myModal");
const modalUpside = document.getElementsByClassName("modal-contents")[0];

const maxRecord = 10010;
const limit = 10;
let offset = 0;

let isLoadingPokemons = false;

function loadPokemonItems(offset, limit) {
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
        }', '${pokemon.number}')">
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
  isLoadingPokemons = false;
}

loadPokemonItems(offset, limit);

function openModal(type, types, name, photo) {
  modalUpside.innerHTML = `
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
          </div>
          `;

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

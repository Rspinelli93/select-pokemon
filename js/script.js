
/* Cuando selecciones un Pokémon y hagas clic en el 
botón "Obtener Información", se tendrá que mostrar 
la información en pantalla del Pokémon, incluyendo su nombre, 
imagen, tipo, altura y peso.*/

const apiPkm = "https://pokeapi.co/api/v2/pokemon";
const resultado = document.querySelector('.container');

const pokeFetch = (nombrePK) => {
  fetch(apiPkm)
    .then((response1) => {
      if (!response1.ok) {
        throw new Error('La API no está disponible.');
      }
      return response1.json();
    })
    .then((data) => {
      const pokemon = data.results.find(
        (poke) => poke.name.toLowerCase() === nombrePK.toLowerCase()
      );

      return fetch(pokemon.url)
        .then((response2) => {
          if (!response2.ok) {
            throw new Error('No se pudo obtener información del Pokémon.');
          }
          return response2.json();
        })

        .then((datapk) => {
          const altura = datapk.height / 10;
          const peso = datapk.weight / 10;

          let pokemonDiv = document.getElementById('pokemon-info');
          
          if (!pokemonDiv) {
            pokemonDiv = document.createElement('div');
            pokemonDiv.id = 'pokemon-info';
            resultado.appendChild(pokemonDiv);
          }

          pokemonDiv.innerHTML = `
            <h3>Nombre: ${datapk.name}</h3>
            <img src='${datapk.sprites.front_default}' alt='${datapk.name}'>
            <h4>Tipo: ${datapk.types.map((type) => type.type.name).join(', ')}</h4>
            <h4>Peso: ${peso} Kg</h4>
            <h4>Altura: ${altura} Mts</h4>
          `;
        });
    })
    .catch((error) => {

      let errorDiv = document.getElementById('pokemon-info');
      if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'pokemon-info';
        resultado.appendChild(errorDiv);
      }
      errorDiv.innerHTML = `Error: ${error.message}</p>`;
    });
};

document.getElementById('get-pokemon').addEventListener('click', () => {
  const pokemon = document.getElementById('pokemon-select').value;
  pokeFetch(pokemon);
});
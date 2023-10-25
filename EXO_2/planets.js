async function init() {
  const ul = document.querySelector("#list");
  const planets = await getPlanetsData();
  createListItems(ul, planets);
}

async function getPlanetsData(type = "planets", page = 1) {
  try {
    const response = await fetch(`https://swapi.dev/api/${type}/?page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new error(error);
  }
}

function createListItems(ul, planets) {
  planets.forEach(planet => {
    const item = document.createElement('li');
    item.classList.add("flex", "justify-between", "cursor-pointer", "p-2");

    const name = document.createElement('span');
    const terrain = document.createElement('span');
    name.textContent = planet.name;
    terrain.textContent = planet.terrain;

    item.appendChild(name);
    item.appendChild(terrain);
    ul.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', init);
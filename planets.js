const ul = document.querySelector("#list");
const infoTitle = document.querySelector("#info-title");
const listLoader = document.querySelector("#list-loader");
const planetDetailsWrapper = document.querySelector(".wrapper");
const select = document.querySelector("select");
const searchBar = document.querySelector("#search");
// stats
const nameEl = document.querySelector("#planet-name");
const populationEl = document.querySelector("#population");
const diameterEl = document.querySelector("#diameter");
const temperatureEl = document.querySelector("#temperature");
const gravityEl = document.querySelector("#gravity");
const terrainEl = document.querySelector("#terrain");
// pagination
const currentPageEl = document.querySelector("#current-page");
const nextPageBtn = document.querySelector("#next-page");
const prevPageBtn = document.querySelector("#back-page");

async function init() {
  const planets = await getPlanetsData();
  createListItems(planets);

  searchBar.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const listItemNode = [...ul.childNodes];
    const convertToArr = Array.from(listItemNode);

    convertToArr.map((listItem) => {
      const planetItemName = listItem.firstChild.textContent.toLowerCase();

      if (!planetItemName.includes(keyword)) {
        listItem.classList.add("hidden");
      } else {
        listItem.classList.remove("hidden");
      }
    });
  });

  select.addEventListener("change", (e) => {
    const selectChoice = e.target.value;
    const listItemNode = [...ul.childNodes];
    const convertToArr = Array.from(listItemNode);

    convertToArr.forEach((listItem) => {
      const planetPopulation = listItem.value;
      switch (selectChoice) {
        case "1":
          planetPopulation >= 0 && planetPopulation <= 100000
            ? listItem.classList.remove("hidden")
            : listItem.classList.add("hidden");
          break;
        case "2":
          planetPopulation >= 100000 && planetPopulation <= 100000000
            ? listItem.classList.remove("hidden")
            : listItem.classList.add("hidden");
          break;
        case "3":
          planetPopulation > 100000000
            ? listItem.classList.remove("hidden")
            : listItem.classList.add("hidden");
          break;
        default:
          listItem.classList.remove("hidden");
          break;
      }
    });
  });
}

nextPageBtn.addEventListener("click", async () => {
  const currentPage = Number(currentPageEl.textContent);
  if (currentPage >= 6) {
    nextPageBtn.classList.add("bg-grey-300");
    return;
  } else {
    const nextPage = Number(currentPageEl.textContent) + 1;
    const planets = await getPlanetsData("planets", nextPage);
    createListItems(planets);
  }
});
prevPageBtn.addEventListener("click", async () => {
  const currentPage = Number(currentPageEl.textContent);
  if (currentPage <= 1) {
    return;
  } else {
    const prevPage = Number(currentPageEl.textContent) - 1;
    const planets = await getPlanetsData("planets", prevPage);
    createListItems(planets);
  }
});

async function getPlanetsData(type = "planets", page = 1) {
  infoTitle.classList.remove("hidden");
  listLoader.classList.remove("hidden");
  planetDetailsWrapper.classList.add("hidden");
  ul.classList.add("hidden");
  changeStateOfPagination(page);

  try {
    const response = await fetch(`https://swapi.dev/api/${type}/?page=${page}`);
    response.ok ? ul.classList.remove("hidden") : null;
    if (response.ok) {
      ul.classList.remove("hidden");
      listLoader.classList.add("hidden");
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new error(error);
  }
}

function changeStateOfPagination(page) {
  currentPageEl.textContent = page;
  select.value = "";
  searchBar.value = "";
  if (page <= 1) {
    prevPageBtn.classList.remove("bg-cyan-500");
    prevPageBtn.classList.add("bg-gray-300", "cursor-default");
  } else if (page >= 6) {
    nextPageBtn.classList.add("bg-gray-300", "cursor-default");
    nextPageBtn.classList.remove("bg-cyan-500");
  } else {
    prevPageBtn.classList.add("bg-cyan-500");
    prevPageBtn.classList.remove("bg-gray-300", "cursor-default");
    nextPageBtn.classList.add("bg-cyan-500");
    nextPageBtn.classList.remove("bg-gray-300", "cursor-default");
  }
}

function filterPlanets(planets) {
  const lessToMorePopulation = planets.sort(function (a, b) {
    if (a !== "unknown" && b !== "unknown") {
      return Number(b.population) - Number(a.population);
    }
  });
  return lessToMorePopulation;
}

function createListItems(planets) {
  const filteredPlanets = filterPlanets(planets);
  ul.hasChildNodes ? (ul.innerHTML = null) : null;
  filteredPlanets.forEach((planet) => {
    const item = document.createElement("li");
    item.classList.add(
      "list__item",
      "flex",
      "justify-between",
      "cursor-pointer",
      "p-2",
      "border-b-2",
      "hover:text-cyan-500",
      "transition-all",
      "duration-300"
    );
    item.addEventListener("click", () => addPlanetDetails(planet, item));

    const name = document.createElement("span");
    const terrain = document.createElement("span");
    name.textContent = planet.name;
    terrain.textContent = planet.terrain;
    listLoader.classList.add("hidden");
    item.value = planet.population;
    item.appendChild(name);
    item.appendChild(terrain);
    ul.appendChild(item);
    item.classList.remove("text-cyan-500");
  });
}

function addPlanetDetails(planet, item) {
  // remove selected item color
  const listItemNode = [...ul.childNodes];
  const convertToArr = Array.from(listItemNode);
  convertToArr.map((item) => item.classList.remove("text-cyan-500"));

  // add text color to the selected item
  item.classList.add("text-cyan-500");

  // add data to details panel
  infoTitle.classList.add("hidden");
  planetDetailsWrapper.classList.remove("hidden");
  nameEl.textContent = planet.name;
  populationEl.textContent = planet.population;
  diameterEl.textContent = planet.diameter;
  temperatureEl.textContent = planet.climate;
  gravityEl.textContent = planet.gravity;
  terrainEl.textContent = planet.terrain;
}

document.addEventListener("DOMContentLoaded", init);

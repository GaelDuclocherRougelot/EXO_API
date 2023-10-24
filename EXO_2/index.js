const persons = document.querySelector(".persons");
const vehiclesElement = document.querySelector(".vehicles");
const timeToNextMission = document.querySelector(".timeToNext");
const planetElement = document.querySelector(".planets");

async function getHomeData(type) {
  try {
    const response = await fetch(`https://swapi.dev/api/${type}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new error(error);
  }
}

async function setHomeData() {
  const peoples = await getHomeData("people");
  const vehicles = await getHomeData("vehicles");
  const planets = await getHomeData("planets");

  persons.textContent = peoples.count;
  vehiclesElement.textContent = vehicles.count;
  planetElement.textContent = planets.count;
  timeToNextMission.textContent = new Date().toLocaleDateString("fr");
}

document.addEventListener("DOMContentLoaded", () => {
  setHomeData();
});

const persons = document.querySelector('.persons');
const vehiclesElement = document.querySelector('.vehicles');
const timeToNext = document.querySelector('.timeToNext');
const planetElement = document.querySelector('.planets');

async function getAllPeoples() {
  try {
    const peopleResponse = await fetch("https://swapi.dev/api/people/")
    const people = await peopleResponse.json();
    return people;
  } catch (error) {
    throw new error(error);
  }
}

async function getAllVehicles() {
  const vehiclesResponse = await fetch("https://swapi.dev/api/vehicles/")
  const vehicles = await vehiclesResponse.json();
  return vehicles;
}

async function getAllPlanets() {
  const planetsResponse = await fetch("https://swapi.dev/api/planets/")
  const planets = await planetsResponse.json();
  return planets;
}

async function getUpcomingMisson() {
  const 
}

async function setHomeData() {
  const peoples = await getAllPeoples();
  const vehicles = await getAllVehicles();
  const planets = await getAllPlanets();

  persons.textContent = peoples.count;
  vehiclesElement.textContent = vehicles.count;
  planetElement.textContent = planets.count;
}

document.addEventListener('DOMContentLoaded', () => {
  setHomeData();
})
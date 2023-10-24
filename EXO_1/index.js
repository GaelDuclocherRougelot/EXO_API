function init() {
  const img = document.querySelector("img");
  const select = document.querySelector("select");
  const form = document.querySelector("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    getDogImg(select.value, img);
  });

  getAllBreeds(select);
  getDogImg("", img);
}

async function getAllBreeds(select) {
  try {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const breeds = await response.json();
    const breedsNames = Object.keys(breeds.message);
    createSelectOptions(breedsNames, select);
  } catch (error) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}

function createSelectOptions(breedsArr, select) {
  breedsArr.forEach((breed) => {
    let element = document.createElement("option");
    element.value = breed;
    element.textContent = breed;
    select.appendChild(element);
  });
}

async function getDogImg(breed = "", img) {
  try {
    const url =
      breed === ""
        ? "https://dog.ceo/api/breeds/image/random"
        : `https://dog.ceo/api/breed/${breed}/images/random`;
    const response = await fetch(url);
    const dogImg = await response.json();
    img.src = dogImg.message;
  } catch (error) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}

document.addEventListener("DOMContentLoaded", init);

const createForm = document.querySelector("#create-form");
const openCreateModalBtn = document.querySelector("#open-create");
const closeCreateModalBtn = document.querySelector("#quit-create-modal");
const articles = document.querySelector("#articles");

function init() {
  // events
  openCreateModalBtn.addEventListener("click", () => {
    openCreateModalBtn.classList.add("hidden");
    articles.classList.add("hidden");
    createForm.classList.remove("hidden");
  })
  closeCreateModalBtn.addEventListener("click", () => {
    createForm.classList.add("hidden");
    articles.classList.remove("hidden");
    openCreateModalBtn.classList.remove("hidden");
  })
  // forms
  createForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const image = document.querySelector("#image").value;
    const description = document.querySelector("#description").value;
    createArticleCard({title, image, description});

    createForm.classList.add("hidden");
    articles.classList.remove("hidden");
  });
}

function createArticleCard(article) {
  const articleCard = document.createElement("div");
  const articleTitle = document.createElement("h2");
  const articleImg = document.createElement("img");
  const articleDescription = document.createElement("p");
}

document.addEventListener("DOMContentLoaded", init);

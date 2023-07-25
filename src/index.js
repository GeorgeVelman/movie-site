import "./index.html";
import "./style/style.scss";

const API_KEY = "34d96e8f-50e4-4fe0-a59e-405eddbaa0f4";
const API_URL_POPULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

const formElem = document.querySelector("form");
const searchElem = document.querySelector(".header__search");
const loupeElem = document.querySelector(".header__loupe-btn");

const getMovies = async (url) => {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  showMovies(responseData.films);
};

getMovies(API_URL_POPULAR);

function checkRatingOnPercent(rate) {
  return rate.slice(-1) === "%" ? Number(rate.slice(0, -1)) / 10 : rate;
}

function getClassByRating(rate) {
  const score = checkRatingOnPercent(rate);

  if (score >= 7) {
    return "green";
  } else if (score >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesElem = document.querySelector(".movies");

  document.querySelector(".movies").innerHTML = "";

  data.forEach((movie) => {
    const movieElem = document.createElement("div");
    movieElem.classList.add("movie");

    movieElem.innerHTML = `
        <div class="movie__inner">
          <div class="movie__cover movie__cover_darkned">
            <img
              class="movie__cover-img"
              src="${movie.posterUrlPreview}"
              alt="${movie.nameRu}"
            />
          </div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">
            ${movie.genres
              .filter((obj, i) => i < 3)
              .map((obj) => ` ${obj.genre}`)}
          </div>
          ${
            Number(movie.rating.slice(0, -1))
              ? `<div
                  class="movie__grade movie__grade_${getClassByRating(
                    movie.rating
                  )}">
                  ${checkRatingOnPercent(movie.rating)}
                </div>`
              : ""
          }
        </div>
        
    `;
    movieElem.addEventListener("click", () => openModal(movie.filmId));
    moviesElem.append(movieElem);
  });
}

(formElem || loupeElem).addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${searchElem.value}`;
  if (searchElem.value) {
    getMovies(apiSearchUrl);
    searchElem.value = "";
  }
});

const modalELem = document.querySelector(".modal");

async function openModal(id) {
  const response = await fetch(API_URL_MOVIE_DETAILS + id, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const responseData = await response.json();

  modalELem.classList.add("modal_show");
  document.body.classList.add("stop-scrolling");

  modalELem.innerHTML = `
  <div class="modal__window">
    <img class="modal__movie-img" src="${
      responseData.posterUrlPreview
    }" alt="" />
    <h2>
      <span class="modal__movie-title">${responseData.nameRu}</span>
      <span class="modal__movie-year">${responseData.year}</span>
    </h2>
    <ul class="modal__movie-info">
      <div class="modal__loader"></div>
      <li class="modal__movie-category">Жанр: ${responseData.genres.map(
        (el) => `<span>${el.genre}</span>`
      )}</li>
      ${
        responseData.filmLength
          ? `<li class="modal__movie-runtime">
          Время - ${responseData.filmLength} минут
        </li>`
          : ""
      }
      <li>Сайт: <a class="modal__movie-link" href="${responseData.webUrl}">${
    responseData.webUrl
  }</a></li>
      <li class="modal__movie-description">Описание - ${
        responseData.description
      }</li>

    </ul>
    <button class="modal__btn-close">Закрыть</button>
    </div>
  </div>
`;

  const btnClose = document.querySelector(".modal__btn-close");
  btnClose.addEventListener("click", () => closeModal());
}

function closeModal() {
  modalELem.classList.remove("modal_show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target === modalELem) closeModal();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

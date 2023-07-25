// const modalELem = document.querySelector(".modal");

async function openModal(id, apiUrl) {
  const response = await fetch(apiUrl + id, {
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

// window.addEventListener("click", (e) => {
//   if (e.target === modalELem) closeModal();
// });

// window.addEventListener("keydown", (e) => {
//   if (e.key === "Escape") closeModal();
// });

export { openModal, closeModal };

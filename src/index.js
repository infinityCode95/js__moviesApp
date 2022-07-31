import './index.html';
import './style.scss';

import {API_KEY, API_URL_TOP, API_URL_SEARCH} from './modules/apiData';

async function getMovies(url) {
   const response = await fetch(url, {
      headers: {
         "Content-Type": "application/json",
         "X-API-KEY": API_KEY,
      }
   });

   const responseData = await response.json();
   showMovies(responseData);
};

getMovies(API_URL_TOP);


function changeClassByRating(rating) {
   if (rating >= 8) {
      return 'green'
   } else if (rating >= 6) {
      return 'gold'
   } else {
      return 'red'
   }
}

function showMovies(data) {
   const movies = document.querySelector('#movies');

   movies.innerHTML = "";

   data.films.forEach(item => {
      const movie = document.createElement('div');
      movie.classList.add('movie__item', 'col-3');
      movie.innerHTML =  `
         <div class="movie__img-wrapper">
            <img src="${item.posterUrlPreview}" class="img-fluid movie__item-img" alt="${item.nameRu}">
            <div class="movie__img-bg"></div>
         </div>
         <div class="movie__item-body">
            <h5 class="movie__item-title">${item.nameRu}</h5>
            <p class="movie__item-category">
               ${item.genres.map(genre => ` ${genre.genre} `)}
            </p>
            <p class="movie__item-rating ${changeClassByRating(item.rating)}">${item.rating != 'null' ? item.rating : '🤷‍♂️'}</p>
         </div>
      `;

      movies.appendChild(movie);
   });
}


const form = document.querySelector('.movies__header-form');
const input = document.querySelector('.movies__header-input');

form.addEventListener('submit', (e) => {
   e.preventDefault();

   const apiSearchUrl = `${API_URL_SEARCH}${input.value}`;

   if (input.value) {
      getMovies(apiSearchUrl);
      input.value = "";
   }
});
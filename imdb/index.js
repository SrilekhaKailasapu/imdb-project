const API_KEY = '12cf06fb';

const searchInput = document.getElementById('searchInput');
const mainContent = document.getElementById('mainContent');

let favorites = [];

searchInput.addEventListener('input', debounce(searchMovies, 300));

async function searchMovies() {
  const query = searchInput.value;
  if (query === '') {
    mainContent.innerHTML = ''; 
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.Response === 'True') {
      displayMovies(data.Search); 
    } else {
      mainContent.innerHTML = '<p>No results found.</p>';
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }

}

function debounce(func, delay) {
  let timer;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, arguments);
    }, delay);
  };
}

function displayMovies(movies) {
  mainContent.innerHTML = ''; 
  movies.forEach(movie => {
    const movieElem = createMovieElement(movie);
    mainContent.appendChild(movieElem); 
  });
}

function createMovieElement(movie) {
  const movieElem = document.createElement('div');
  movieElem.classList.add('movie'); 
  const isFavorite = favorites.includes(movie.imdbID);
  
  
  movieElem.innerHTML = `
    <a href="movie.html?imdbID=${movie.imdbID}">
      <img src="${movie.Poster}" alt="${movie.Title}">
    </a>
    <div class="movieText">
      <h2 class="white">${movie.Title}</h2>
      <p class="white">${movie.Year}</p>
      <button class="fav-btn ${isFavorite ? 'favorite' : ''}" data-imdbID="${movie.imdbID}">
        ${isFavorite ? 'In Favorites' : 'Add to Favorites'}
      </button>
    </div>
  `;

  const favButton = movieElem.querySelector('.fav-btn');
  if (!isFavorite) {
    favButton.addEventListener('click', () => addToFavorites(movie));
    favButton.style.backgroundColor = 'rgb(245, 197, 24)'; 
    favButton.style.color = 'black';
  } else {
    favButton.addEventListener('click', () => removeFromFavorites(movie));
    favButton.style.backgroundColor = 'green'; 
  }

  return movieElem;
}

window.addEventListener('load', () => {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
    updateMovieButtons(); 
  }

  searchMovies();
});


function addToFavorites(movie) {
  const imdbID = movie.imdbID;
  const isAlreadyInFavorites = favorites.some(item => item.imdbID === imdbID);

  if (!isAlreadyInFavorites) {
    favorites.push(movie);
    updateMovieButtons();
    saveFavoritesToLocalStorage();
  }
}


function removeFromFavorites(movie) {
  const imdbID = movie.imdbID;
  favorites = favorites.filter(item => item.imdbID !== imdbID);
  updateMovieButtons();
  saveFavoritesToLocalStorage();
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateMovieButtons() {
  const favButtons = document.querySelectorAll('.fav-btn');
  favButtons.forEach(button => {
    const imdbID = button.getAttribute('data-imdbID');
    const isFavorite = favorites.some(item => item.imdbID === imdbID);

    if (!isFavorite) {
      button.style.backgroundColor = 'rgb(245, 197, 24)';
      button.textContent = 'Add to Favorites';
      button.style.color = 'black';
    } else {
      button.style.backgroundColor = 'green'; 
      button.textContent = 'In Favorites';
    }
  });
}

searchMovies();
const favoritesListContainer = document.getElementById('favoritesList');

let favorites = [];

document.addEventListener('DOMContentLoaded', () => {

  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    
    favorites = JSON.parse(storedFavorites);
   
    updateFavoritesList();
  }
});


function updateFavoritesList() {
 
  favoritesListContainer.innerHTML = '';
  
 
  favorites.forEach(movie => {
    const listItem = document.createElement('div');
    listItem.classList.add('favorite-movie');
    listItem.innerHTML = `
      <div class="movie-poster">
        <a href="movie.html?imdbID=${movie.imdbID}">
          <img class="poster" src="${movie.Poster}" alt="${movie.Title}">
        </a>
      </div>
      <div class="movie-details">
        <h2 class="yellow">${movie.Title}</h2><br>
        <p class="white"><strong>Year:</strong> ${movie.Year}</p><br>
        <button class="remove-btn red" data-imdbID="${movie.imdbID}">Delete
        </button>
      </div>
    `;
    

    const removeButton = listItem.querySelector('.remove-btn');
    removeButton.addEventListener('click', () => removeFromFavorites(movie));

    favoritesListContainer.appendChild(listItem);
  });
}

function removeFromFavorites(movie) {
  const imdbID = movie.imdbID;
  
  
  favorites = favorites.filter(item => item.imdbID !== imdbID);
  
  saveFavoritesToLocalStorage();
  
  
  const listItemToRemove = favoritesListContainer.querySelector(`[data-imdbID="${imdbID}"]`).closest('.favorite-movie');
  if (listItemToRemove) {
    listItemToRemove.remove();
  }
}

function saveFavoritesToLocalStorage() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

window.addEventListener('message', function (event) {
  if (event.data === 'updateFavorites') {
    
    updateFavoritesList();
  }
});

updateFavoritesList();
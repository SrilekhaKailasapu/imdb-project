const API_KEY = '12cf06fb';


const movieDetailsContainer = document.getElementById('movieDetailsPage');// Get the container element for displaying movie details

async function fetchMovieDetails(imdbID) {
  try {
    
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
    const data = await response.json(); 

   
    if (data.Response === 'True') {
      displayMovieDetails(data); 
    } else {
      movieDetailsContainer.innerHTML = '<p>Movie details not available.</p>'; //If response indicates failure, display an error message
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayMovieDetails(movie) {

  movieDetailsContainer.innerHTML = `
    <div class="movie-box">
      <div class="movie-poster">
        <img src="${movie.Poster}" alt="${movie.Title}">
      </div>
      <div class="movie-details">
        <h2 class="yellow">${movie.Title}</h2><br>
        <p class="white"><strong>Year:</strong> ${movie.Year}</p><br>
        <p class="white"><strong>Released:</strong> ${movie.Released} &nbsp &nbsp <strong>Runtime:</strong> ${movie.Runtime}</p><br>
        <p class="white"><strong>IMDB:</strong> ${movie.imdbRating}</p><br>
        <p class="white"><strong>Genre:</strong> ${movie.Genre}</p><br>
        <p class="white"><strong>Writer:</strong> ${movie.Writer}</p><br>
        <p class="white"><strong>Actors:</strong> ${movie.Actors}</p><br>
        <p class="white"><strong>Director:</strong> ${movie.Director}</p><br>
        <p class="white"><strong>Plot:</strong> ${movie.Plot}</p>
      </div>
    </div>
  `;
}

const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

if (imdbID) {
  
  fetchMovieDetails(imdbID);
} else {
 
  movieDetailsContainer.innerHTML = '<p>Invalid movie details.</p>';
}
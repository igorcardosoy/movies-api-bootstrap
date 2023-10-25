const allButtonsElementes = document.getElementsByClassName('page-button')
const main = document.querySelector('main')

function doPage(movie) {
  let movieTitle = movie.title == null ? movie.name : movie.title
  let movieVoteAvg = movie.vote_average
  let movieVoteCount = movie.vote_count
  let moviebBackdrop = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
  let moviePoster = 'https://image.tmdb.org/t/p/original' + movie.poster_path
  let movieGenres = movie.genres
  let movieOverview = movie.overview
  let moviePopularity = movie.popularity
  let movieReleaseDate = movie.release_date == null ? movie.first_air_date : movie.release_date
  let movieStatus = movie.status

  main.innerHTML += 
  `
  <section id="main-movie">

    <section id="movie-info" class="flex-display">
      <h2>hehe</h2>
    </section>
  </section>
  `

}

function request(url) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  fetch(url, options)
    .then(movie => movie.json())
    .then(movie => doPage(movie)) //doPage(movie))
    .catch(err => console.error(err))

}

function waitMovies() {
  return document.getElementsByClassName('page-button').length == 0 ? true : false
}

function buttonEvents() {
  console.log(allButtonsElementes)

  for (let index = 0; index < allButtonsElementes.length; index++) {
    allButtonsElementes[index].addEventListener('click', () => {
      let id = allButtonsElementes[index].id
      main.querySelector('#main-cards').style.display = 'none';
      request('https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR?')
    })
  }
}

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms))
}

const buttons = async () => {
  while (waitMovies()) {
    let waiting = await delay(100)
  }

  buttonEvents()
}









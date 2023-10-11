let template = document.getElementById('template')
let idCount = 0

const popularButton = document.querySelector('#popularity-movies')
const topRatedButton = document.querySelector('#top-rated-movies')
const upcomingButton = document.querySelector('#upcoming-movies')

popularButton.addEventListener('click', () => {
  reset()
  request('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=')
  document.querySelector('#main-title').textContent = 'Filmes populares'
})

topRatedButton.addEventListener('click', () => {
  reset()
  request('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=')
  document.querySelector('#main-title').textContent = 'Filmes mais bem avaliados'
})

upcomingButton.addEventListener('click', () => {
  reset()
  request('https://api.themoviedb.org/3/trending/all/week?language=pt-BR')
  document.querySelector('#main-title').textContent = 'Muitas coisas'
})

async function request(url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=') {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  const data = await fetch(url, options)
  const result = await data.json();
  const resultFinal = await result.results;

  if (resultFinal == null) {
    for (let index = 1; index < 20; index++) {
      errorComplete(index)
    }
  } else {
    resultFinal.forEach(movie => {

      if (movie.title == null) {
        title(movie.name)
      } else {
        title(movie.title)
      }

      template.querySelector('.movie-img').setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.poster_path)
      template.querySelector('.movie-backdrop').setAttribute('src', 'https://image.tmdb.org/t/p/original' + movie.backdrop_path)
      template.querySelector('.vote-avg').textContent = 'Nota média: ' + movie.vote_average
      template.querySelector('.vote-count').textContent = 'Quantidade de avaliações: ' + movie.vote_count
      template.querySelector('.popularity').textContent = movie.popularity
      template.querySelector('.release-date').textContent = movie.release_date
      template.querySelector('.movie-overview').textContent = movie.overview

      removeAtributesOfTemplate();
      addAtributesOfTemplate();

      document.querySelector('#cards').innerHTML += template.innerHTML

      idCount++;
    });
  }
}

function reset() {
  idCount = 0;
  document.querySelector('#cards').innerHTML = ''
}

function title(movieTitle) {
  template.querySelector('.movie-title').textContent = movieTitle
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' poster.')
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' imagem.')
  template.querySelector('.modal-title').textContent = movieTitle
}

request()
document.getElementById('template').remove()

function addAtributesOfTemplate() {
  template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + idCount)
  template.querySelector('.modal').setAttribute('id', 'modal-id-' + idCount)
  template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + idCount)
}

function removeAtributesOfTemplate() {
  template.querySelector('.modal-title').removeAttribute('id')
  template.querySelector('.modal').removeAttribute('id')
  template.querySelector('.card-type').removeAttribute('data-bs-target')
}

function errorComplete(index) {
  template.querySelector('.movie-title').textContent = 'Titulo mt foda';
  template.querySelector('.modal-title').removeAttribute('id')
  template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + index)
  template.querySelector('.modal-title').textContent = 'Titulo mt foda'

  template.querySelector('.modal').removeAttribute('id')
  template.querySelector('.modal').setAttribute('id', 'modal-id-' + index)

  template.querySelector('.card-type').removeAttribute('data-bs-target')
  template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + index)
  document.querySelector('#cards').innerHTML += template.innerHTML
}
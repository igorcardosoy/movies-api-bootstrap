let template = document.getElementById('card-template')
let idCount = 0
let formatedDate

const popularButton = document.querySelector('#popularity-movies')
const topRatedButton = document.querySelector('#top-rated-movies')
const upcomingButton = document.querySelector('#upcoming-movies')

popularButton.addEventListener('click', () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes populares'
  request('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1')
})

topRatedButton.addEventListener('click', () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes mais bem avaliados'
  request('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1')
})

upcomingButton.addEventListener('click', () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes que ainda vão lançar'
  request('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=primary_release_date.desc')
  request('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=2&sort_by=primary_release_date.desc')
  
})

async function request(url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1') {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  const data = await fetch(url, options)
  const result = await data.json();
  const finalResult = await result.results;

  if (finalResult == null) {
    for (let index = 1; index < 20; index++) {
      errorComplete(index)
    }
  } else {

    finalResult.forEach(movie => {

      if (movie.poster_path != null) {
        if (movie.title == null) {
          formatedDate = new Date(movie.first_air_date);
          title(movie.name)
        } else {
          formatedDate = new Date(movie.release_date);
          title(movie.title)
        }

        if (movie.backdrop_path != null) {
          template.querySelector('.movie-backdrop').src = 'https://image.tmdb.org/t/p/original' + movie.backdrop_path
        } else {
          template.querySelector('.movie-backdrop').src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
        }

        if (movie.vote_average != 0) {
          template.querySelector('.vote-section').style.display = 'block'
          template.querySelector('.vote-avg').textContent = 'Nota média: ' + movie.vote_average.toFixed(1)
          template.querySelector('.vote-count').textContent = 'Quantidade de avaliações: ' + movie.vote_count
        } else {
          template.querySelector('.vote-section').style.display = 'none'
        }

        if (movie.overview != '') {
          template.querySelector('.overview-section').style.display = 'block'
          template.querySelector('.movie-overview').textContent = movie.overview
        } else {
          template.querySelector('.overview-section').style.display = 'none'
        }

        template.querySelector('.movie-img').src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
        template.querySelector('.popularity').textContent = movie.popularity
        template.querySelector('.release-date').textContent = formatedDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        template.querySelector('.page-button').removeAttribute('id')
        template.querySelector('.page-button').setAttribute('id', movie.id)

        AtributesAtt()

        document.querySelector('#cards').innerHTML += template.innerHTML

        idCount++;
      }
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
template.remove()

function AtributesAtt() {
  template.querySelector('.modal-title').removeAttribute('id')
  template.querySelector('.modal').removeAttribute('id')
  template.querySelector('.card-type').removeAttribute('data-bs-target')

  template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + idCount)
  template.querySelector('.modal').setAttribute('id', 'modal-id-' + idCount)
  template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + idCount)
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
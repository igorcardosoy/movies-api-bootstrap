let template = document.getElementById('card-template')
let idCount = 0
let formatedDate

const logoButton = document.querySelector('.popularity-movies')
const popularButton = document.querySelector('#popularity-movies')
const topRatedButton = document.querySelector('#top-rated-movies')
const upcomingButton = document.querySelector('#upcoming-movies')

logoButton.addEventListener('click', async () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes populares'
  await requestList('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1')
  await buttons()
})

popularButton.addEventListener('click', async () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes populares'
  await requestList('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1')
  await buttons()
})

topRatedButton.addEventListener('click', async () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes mais bem avaliados'
  await requestList('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1')
  await buttons()
})

upcomingButton.addEventListener('click', async () => {
  reset()
  document.querySelector('#main-title').textContent = 'Filmes que ainda vão lançar'
  await requestList('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=primary_release_date.desc')
  await requestList('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=2&sort_by=primary_release_date.desc')
  await buttons()
})

async function requestList(url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1') {
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

        if (movie.overview != '') {
          template.querySelector('.overview-section').style.display = 'block'
          template.querySelector('.movie-overview').textContent = movie.overview
        } else {
          template.querySelector('.overview-section').style.display = 'none'
        }

        template.querySelector('.movie-img').src = 'https://image.tmdb.org/t/p/original' + movie.poster_path
        template.querySelector('.release-date').textContent = formatedDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })

        template.querySelector('.page-button').removeAttribute('id')
        template.querySelector('.page-button').setAttribute('id', movie.id)

        template.querySelector('.modal-title').removeAttribute('id')
        template.querySelector('.modal').removeAttribute('id')
        template.querySelector('.card-type').removeAttribute('data-bs-target')

        template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + idCount)
        template.querySelector('.modal').setAttribute('id', 'modal-id-' + idCount)
        template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + idCount)

        document.querySelector('#cards').innerHTML += template.innerHTML

        idCount++;
      }
    });
  }
}

function reset() {
  idCount = 0;
  if (document.querySelector('#main-movie') != null) {
    document.querySelector('#main-movie').remove()
  }
  document.querySelector('#main-cards').style.display = ''
  document.querySelector('#cards').innerHTML = ''
}

function title(movieTitle) {
  template.querySelector('.movie-title').textContent = movieTitle
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' poster.')
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' imagem.')
  template.querySelector('.modal-title').textContent = movieTitle
}

requestList()
document.getElementById('card-template').remove()


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
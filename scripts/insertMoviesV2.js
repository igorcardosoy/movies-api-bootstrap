let template = document.getElementById('card-template')
let idCount = 0
let formatedDate

const mainTitle = document.querySelector('#main-title')
const buttonPop = document.querySelector('#popularity-movies')
const buttonTop = document.querySelector('#top-rated-movies')
const buttonUp = document.querySelector('#upcoming-movies')

buttonPop.addEventListener('click', () => {
  mainTitle.textContent = 'Filmes populares'
  document.querySelector('.top_rated').style.display = 'none'
  document.querySelector('.release').style.display = 'none'
  document.querySelector('.popular').style.display = 'flex'
})

buttonTop.addEventListener('click', () => {
  mainTitle.textContent = 'Filmes mais bem avaliados'
  document.querySelector('.popular').style.display = 'none'
  document.querySelector('.release').style.display = 'none'
  document.querySelector('.top_rated').style.display = 'flex'
})

buttonUp.addEventListener('click', () => {
  mainTitle.textContent = 'Filmes que ainda vão lançar'
  document.querySelector('.top_rated').style.display = 'none'
  document.querySelector('.popular').style.display = 'none'
  document.querySelector('.release').style.display = 'flex'
})

async function requestList(url = 'https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', type) {
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

  if (finalResult != null) {

    if (document.querySelector('.' + type) == null) {
      let article = document.createElement('article')
      article.classList.add(type, 'flex-display', 'cards')

      document.querySelector('#cards').innerHTML += article.outerHTML
    }


    finalResult.forEach(movie => {

      let template = document.createElement('article')


      template.innerHTML =
        `
          <div id="card">
            <div class="card-type" data-bs-toggle="modal" data-bs-target="#modal-id-">
              <p class="movie-title"></p>
              <img class="movie-img" src="https://placehold.co/170x270" alt="AAA">
              <div class="modal fade" id="modal-id-" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <img class="movie-backdrop" src="https://placehold.co/170x270" alt="">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="ModalLabel"></h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="my-modal-background">
                        <section class="popularity-section">
                          <h2 class="popularity-title">Popularidade</h2>
                          <p class="popularity"></p>
                        </section>
                        <section class="vote-section">
                          <h2 class="vote-avg-title">Avaliação</h2>
                          <p class="vote-avg">Média: </p>
                          <p class="vote-count"></p>
                        </section>
                        <section class="release-section">
                          <h2 class="release-date-title">Data de lançamento</h2>
                          <p class="release-date"></p>
                        </section>
                        <section class="overview-section">
                          <h2 class="movie-overview-title">Sinopse</h2>
                          <p class="movie-overview"></p>
                        </section>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <a name="page-button" id="page-button" class="btn btn-dark page-button" href="#" role="button">Ver
                        pagina completa</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `

      if (movie.poster_path != null) {
        if (movie.title == null) {
          formatedDate = new Date(movie.first_air_date);
          title(template, movie.name)
        } else {
          formatedDate = new Date(movie.release_date);
          title(template, movie.title)
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

        template.querySelector('.modal-title').removeAttribute('id')
        template.querySelector('.modal').removeAttribute('id')
        template.querySelector('.card-type').removeAttribute('data-bs-target')

        template.querySelector('.modal-title').setAttribute('id', 'modalTitleId' + idCount)
        template.querySelector('.modal').setAttribute('id', 'modal-id-' + idCount)
        template.querySelector('.card-type').setAttribute('data-bs-target', '#modal-id-' + idCount)

        document.querySelector('.' + type).innerHTML += template.innerHTML

        idCount++;
      }
    });
  }
}

function title(template, movieTitle) {
  template.querySelector('.movie-title').textContent = movieTitle
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' poster.')
  template.querySelector('.movie-img').setAttribute('alt', movieTitle + ' imagem.')
  template.querySelector('.modal-title').textContent = movieTitle
}

async function cardsCreat() {
  document.querySelector('#main-title').textContent = 'Filmes populares'
  await requestList('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', 'popular')
  await requestList('https://api.themoviedb.org/3/movie/top_rated?language=pt-BR&page=1', 'top_rated')
  await requestList('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=primary_release_date.desc', 'release')
  await requestList('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=2&sort_by=primary_release_date.desc', 'release')
  
  await buttons()

  document.querySelector('.top_rated').style.display = 'none'
  document.querySelector('.release').style.display = 'none'
  document.querySelector('.popular').style.display = 'flex'
}

cardsCreat()

document.getElementById('card-template').remove()



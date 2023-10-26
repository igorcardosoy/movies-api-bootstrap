const allButtonsElementes = document.getElementsByClassName('page-button')
const main = document.querySelector('main')

let carouselDiv = document.createElement('div')

function doPage(movie, id) {

  let moviebBackdrop = 'https://image.tmdb.org/t/p/original'
  moviebBackdrop += movie.backdrop_path == null ? movie.poster_path : movie.backdrop_path

  formatedDate = new Date(movie.release_date == null ? movie.first_air_date : movie.release_date);

  let genresSection = document.createElement('section')

  movie.genres.forEach(genres => {
    let p = document.createElement('p')
    p.textContent = '- ' + genres.name
    genresSection.appendChild(p)
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/' + id + '/similar?language=pt-BR&page=1', options)
    .then(list => list.json())
    .then(list => {
      list = list.results

      let isFirst = true
      let carouselItem
      
      list.forEach(movie => {

        let moviePoster = 'https://image.tmdb.org/t/p/original'
        moviePoster += (movie.poster_path == null ? movie.backdrop_path : movie.poster_path)


        if (movie.poster_path != null && movie.backdrop_path != null) {
          if (isFirst) {
            carouselItem =
              `
          <div id="${movie.id}" class="carousel-movie carousel-item active" data-bs-interval="2500">
            <section id="cards" class="flex-display cards">
              <div id="card-template">
                <div class="card-type">
                  <p class="movie-title">${movie.title}</p>
                  <img class="movie-img" src="${moviePoster}" alt="${movie.title}">
                </div>
              </div>
            </section>
          </div>
        `
            isFirst = false
          } else {
            carouselItem +=
              `
          <div id="${movie.id}" class="carousel-movie carousel-item" data-bs-interval="2500">
            <section id="cards" class="flex-display cards">
              <div id="card-template">
                <div class="card-type">
                  <p class="movie-title">${movie.title}</p>
                  <img class="movie-img" src="${moviePoster}" alt="${movie.title}">
                </div>
              </div>
            </section>
          </div>
        `
          }
        }
      })

      carouselDiv.innerHTML = carouselItem

      if (movie.poster_path != null) {

        main.innerHTML +=
          `
        <section id="main-movie" class="flex-display">
        <section id="movie-info" class="flex-display" style="background-image: url('${moviebBackdrop}');">
          <section id="background-info">
            <div class="nav-info">
            
              <div class="infos">
    
                <h1 class="info-title">${movie.title == null ? movie.name : movie.title}</h1>
    
                <article class="info-type">
                  <h2>Gêneros</h2>
                  ${genresSection.innerHTML == null ? 'Não encontrado' : genresSection.innerHTML}
                </article>
        
                <article class="info-type">
                  <h2>Popularidade do Filme</h2>
                  <p>Popularidade média: ${movie.popularity == null ? 'Não encontrada' : movie.popularity.toFixed(0)}</p>
        
                </article>
        
                <article class="info-type">
                  <h2>Avaliação</h2>
                  <p>Nota média: ${movie.vote_average == null ? 'Não encontrada' : movie.vote_average.toFixed(1)}</p>
                  <p>Quantidade de avaliação: ${movie.vote_count == null ? 'Não encontrada' : movie.vote_count}</p>
                </article>
        
                <article class="info-type">
                  <h2>Sinopse</h2>
                  <p>
                    ${movie.overview == '' ? 'Não encontrada' : movie.overview}
                  </p>
                </article>
        
                <article class="info-type">
                  <p>Data de lançamento: ${formatedDate.toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</p>
                  <p>Status do filme: ${movie.status == 'Released' ? 'Lançado' : 'Não lançado'}</p>
                </article>
              </div>

              <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${carouselDiv.innerHTML != 'undefined' ? carouselDiv.innerHTML : ''}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true" style="filter: invert(0);></span>
                  <span class="visually-hidden"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true" style="filter: invert(0);></span>
                  <span class="visually-hidden"></span>
                </button>
              </div>
            </div>
          </section>
        </section>
      </section>
      `

      let movies =  main.getElementsByClassName('carousel-movie')

      for (let index = 0; index < movies.length; index++) {
        movies[index].addEventListener('click', () => {
          let id = movies[index].id
          main.querySelector('#main-movie').remove()
          request('https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR?', id)
        })
      }

      }
    })
    .catch(err => console.error(err))
}

function request(url, id) {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGQ5ZGFjYzAwNjA5NmM0YzcwYWM0NGViNmUxM2VmNSIsInN1YiI6IjY1MWYzY2Q1OTY3Y2M3MzQyN2YzZjM4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ImorXfIr9sQNG0vBOP5slVmaT52N8kKl1zmfh5CnOUg'
    }
  };

  fetch(url, options)
    .then(movie => movie.json())
    .then(movie => doPage(movie, id)) //doPage(movie))
    .catch(err => console.error(err))

}

function waitMovies() {
  return document.getElementsByClassName('page-button').length == 0 ? true : false
}

function buttonEvents() {

  for (let index = 0; index < allButtonsElementes.length; index++) {
    allButtonsElementes[index].addEventListener('click', () => {
      let id = allButtonsElementes[index].id
      main.querySelector('#main-cards').style.display = 'none';
      request('https://api.themoviedb.org/3/movie/' + id + '?language=pt-BR?', id)
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

buttons()









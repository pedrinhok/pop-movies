class themoviedb {

  constructor(key){
    this.key = key
  }

  discover(params){
    return this.request("discover/movie", params)
  }

  query(params){
    const auth = `api_key=${this.key}`
    if(!params)
      return auth
    params = Object.keys(params)
      .map((key, value) => `${key}=${value}`)
      .join("&")
    return `${auth}&${params}`
  }

  request(page, params){
    params = this.query(params)
    return `https://api.themoviedb.org/3/${page}?${params}`
  }

}

const $dom = {
  content: document.querySelector(".app-content"),
  card: document.querySelector(".card")
}

function addCard(movie){
  const card = document.createElement("div")
  card.className = "card"
  card.textContent = movie.title
  $dom.content.appendChild(card)
}

function compareMovies(a, b){
  var comparison = 0
  a = a.popularity
  b = b.popularity
  if(a > b)
    comparison = 1
  else if(a < b)
    comparison = -1
  return comparison * -1
}

async function initialize(){
  const movies = await loadMovies()
  for(var movie of movies)
    addCard(movie)
  console.log("SUCCESS")
}

async function loadMovies(){
  const request = api.discover({
    primary_release_year: 2017,
  })
  const response = await fetch(request)
  const data = await response.json()
  const movies = data.results.sort(compareMovies)
  return movies
}

const api = new themoviedb("6ae0120d7a6efd7469273fca61a134df")
initialize()

if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js")
      // .then(registration => {
      //   console.log("service worker: registrated")
      // })
      // .catch(error => {
      //   console.log("service worker: registration failed: ", error)
      // })
  })
}

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

export default new themoviedb("6ae0120d7a6efd7469273fca61a134df")

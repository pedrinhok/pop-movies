import axios from "axios"

class themoviedb {

  auth(params){
    params.api_key = "6ae0120d7a6efd7469273fca61a134df"
  }

  discover(params = {}){
    this.auth(params)
    return axios.get("https://api.themoviedb.org/3/discover/movie", {
      params
    })
  }

}

export default new themoviedb()

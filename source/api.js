import axios from "axios"

class themoviedb {

  popular() {
    return axios.get("https://api.themoviedb.org/3/movie/popular", { params: { "api_key": "6ae0120d7a6efd7469273fca61a134df" } })
  }

}

export default new themoviedb()

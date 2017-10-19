import React from "react"

import api from "./api"
import Card from "./card"

class Content extends React.Component {

  constructor(props) {
    super(props)
    // state store movies
    this.state = {
      movies: []
    }
  }

  async componentWillMount() {
    const request = api.discover({
      primary_release_year: 2017,
    })
    const response = await fetch(request)
    const data = await response.json()
    const movies = data.results
    this.setState({ movies })
  }

  cards() {
    return this.state.movies
      .map((movie, key) => (
        <Card key={key} movie={movie} />
      ))
  }

  render() {
    return (
      <div className="app-content">
        {this.cards()}
      </div>
    )
  }

}

export default Content

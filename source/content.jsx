import React from "react"
import axios from "axios"

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

  componentWillMount() {
    api.popular().then(response => {
      this.setState({
        movies: response.data.results
      })
    })
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

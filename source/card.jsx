import React from "react"

export default props => (
  <div className="card">
    <div className="card-title">
      {props.movie.title}
    </div>
    <div className="card-overview">
      {props.movie.overview}
    </div>
  </div>
)

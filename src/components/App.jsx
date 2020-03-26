import React from "react";
import moviesData from "../moviesData";
import MovieItem from "./MovieItem";



class App extends React.Component {
  constructor() {
    super()

    this.state = {
      movies: moviesData,
      moviesWillWatch: []
    }
  }

  removeMovie = (movie) => {
    const updateMovies = this.state.movies.filter(function(item) {
      return item.id !== movie.id;
    });
    this.setState({
      movies: updateMovies
    });
  }

  addMovieToWillWatch = movie => {
    console.log(1);
    const updateWillWatch = [...this.state.moviesWillWatch];
    updateWillWatch.push(movie);
    this.setState({
      moviesWillWatch: updateWillWatch
    });
  };

  removeMovieFromWillWatch = (movie) => {
    const updateWillWatch = this.state.moviesWillWatch.filter(function(item) {
      return item.id !== movie.id;
    });
    this.setState({
      moviesWillWatch: updateWillWatch
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <div className="row">
              {this.state.movies.map((movie) => {
                return (
                  <div className="col-6 mb-4" key={movie.id}>
                    <MovieItem  
                    movie={movie} 
                    removeMovie={this.removeMovie}
                    addMovieToWillWatch={this.addMovieToWillWatch}
                    removeMovieFromWillWatch={this.removeMovieFromWillWatch} />
                  </div>
                  );
                })}
            </div>
          </div>
          <div className="col-3">
              <p>Will watch: {this.state.moviesWillWatch.length}</p>
          </div>
        </div>
      </div>
      
    )
  }
}

// function App() {
//   return <div>{moviesData[0].title}</div>;
// }

export default App;

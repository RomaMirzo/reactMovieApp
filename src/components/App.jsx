import React from "react";
// import { moviesData } from "../moviesData";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../utils/api";
import MovieTabs from "../components/MovieTabs";
import Pagination from "../components/Pagination";
// UI = fn(state, props)

// App = new React.Component()

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      moviesWillWatch: [],
      sort_by: "popularity.desc",
      currentPage: 1,
      totalPages: 0
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    return (prevState.sort_by !== this.state.sort_by ||
      prevState.currentPage !== this.state.currentPage
      ? this.getMovies() : false);
  }

  getMovies = () => {
    fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY_3}&sort_by=${
        this.state.sort_by
      }&page=${this.state.currentPage}`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({
          movies: data.results,
          // isLoading: false,
          totalPages: data.total_pages
        });
      });
  };

  deleteMovie = movie => {
    const updateMovies = this.state.movies.filter(item => item.id !== movie.id);
    this.setState({
      movies: updateMovies
    });
  };

  addMovieToWillWatch = movie => {
    const updateMoviesWillWatch = [...this.state.moviesWillWatch];
    updateMoviesWillWatch.push(movie);

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  deleteMovieFromWillWatch = movie => {
    const updateMoviesWillWatch = this.state.moviesWillWatch.filter(
      item => item.id !== movie.id
    );

    this.setState({
      moviesWillWatch: updateMoviesWillWatch
    });
  };

  updateSortBy = value => {
    this.setState({
      sort_by: value,
      currentPage: 1
    });
  };

  changeCurrentPage = value => {
    if (value > 0) {
      this.setState({
        currentPage: value,
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="container-fluid p-0">
        <div className="navbar navbar-dark bg-dark">
          <div className="container-fluid justify-content-md-center">
            <div className="navbar-brand">
              <strong>What 2 Watch</strong>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row mt-4">
            <div className="col-md-9">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <MovieTabs
                    sort_by={this.state.sort_by}
                    updateSortBy={this.updateSortBy}
                  />
                </div>
              </div>
              <div className="row">
                {this.state.movies.map(movie => {
                  return (
                    <div className="col-md-6 col-lg-4 mb-4" key={movie.id}>
                      <MovieItem
                        data={movie}
                        deleteMovie={this.deleteMovie}
                        addMovieToWillWatch={this.addMovieToWillWatch}
                        deleteMovieFromWillWatch={this.deleteMovieFromWillWatch}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="row justify-content-center">
                <Pagination
                  currentPage={this.state.currentPage}
                  totalPages={this.state.totalPages}
                  changeCurrentPage={this.changeCurrentPage}
                />
              </div>
            </div>
            <div className="col-md-3">
              <h4 className="text-center border border-dark rounded p-1">Will Watch: {this.state.moviesWillWatch.length} movies</h4>
              <ul className="list-group">
                {this.state.moviesWillWatch.map(movie => (
                  <li key={movie.id} className="list-group-item">
                    <div className="d-flex justify-content-between">
                      <p>{movie.title}</p>
                      <p>{movie.vote_average}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

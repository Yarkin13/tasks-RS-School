import Movie from './movie-class';

export default class MovieFactory {
  constructor(movie, targetNode) {
    this.movie = movie;
    this.targetNode = targetNode;
  }

  create() {
    const newMovie = new Movie(this.movie);
    this.targetNode.insertAdjacentHTML('beforeend', newMovie.getTemplate());
  }
}

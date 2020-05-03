export class Movie {
  constructor(movie) {
    this.movie = movie;
  }

  getTemplate() {
    const {
      title, poster, year, rating, id,
    } = this.movie;
    return (
      `<div class="swiper-slide">
      <a class="card-title" href=" https://www.imdb.com/title/${id}">${title}</a>
      <div class="card-poster" style="background-image: url(${poster});"></div>
      <div class="card-year">${year}</div>
      <div class="card-star">${rating}</div>
    </div>`
    );
  }
}

export class MovieFactory {
  constructor(movie, targetNode) {
    this.movie = movie;
    this.targetNode = targetNode;
  }

  create() {
    const newMovie = new Movie(this.movie);
    this.targetNode.insertAdjacentHTML('afterbegin', newMovie.getTemplate());
  }
}

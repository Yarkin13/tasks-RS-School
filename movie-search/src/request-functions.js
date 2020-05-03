export async function getMovieInfo(page, search) {
  const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=2e0bd215`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function createMoviesInfo(data) {
  const arrayPosters = [];
  data.Search.forEach((element) => {
    arrayPosters.push(element.Poster);
  });
  const arrayTitle = [];
  data.Search.forEach((element) => {
    arrayTitle.push(element.Title);
  });
  const arrayYear = [];
  data.Search.forEach((element) => {
    arrayYear.push(element.Year);
  });
  const arrayId = [];
  data.Search.forEach((element) => {
    arrayId.push(element.imdbID);
  });
  const arrayMoviesInfo = [];
  for (let i = 0; arrayYear.length > i; i += 1) {
    const movie = new Object();
    movie.poster = arrayPosters[i] === 'N/A' ? './assets/notFound.png' : arrayPosters[i];
    movie.title = arrayTitle[i];
    movie.year = arrayYear[i];
    movie.id = arrayId[i];
    arrayMoviesInfo.push(movie);
  }
  return arrayMoviesInfo;
}

export async function addRating(arrayMoviesInfo) {
  for (let i = 0; arrayMoviesInfo.length > i; i += 1) {
    const url = `https://www.omdbapi.com/?i=${arrayMoviesInfo[i].id}&apikey=2e0bd215`;
    const res = await fetch(url);
    const data = await res.json();
    arrayMoviesInfo[i].rating = data.imdbRating;
  }
  return arrayMoviesInfo;
}

export async function getTranslate(str) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

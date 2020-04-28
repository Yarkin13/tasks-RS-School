export async function getMovieInfo(page, search) {
  const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=2e0bd215`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export function getMovieRate(idArray) {
  const rate = document.querySelectorAll('.card-star');
  let i = 0;
  console.log(idArray);
  rate.forEach(el => {
    let url = `https://www.omdbapi.com/?i=${idArray[i]}&apikey=9b67fc54`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        el.innerText = data.imdbRating;
      });
    i += 1;
  })

}

export function drawPosters(data) {
  const postersArray = [];
  for (let i = 0; i < data.Search.length; i += 1) {
    postersArray[i] = data.Search[i].Poster;
  }
  let j = 0;
  document.querySelectorAll('.card-poster').forEach((el) => {
    el.style = `background-image: url(${postersArray[j]})`;
    j++;
  });
}

export function drawTitle(data) {
  const titleArray = [];
  for (let i = 0; i < data.Search.length; i += 1) {
    titleArray[i] = data.Search[i].Title;
  }
  let j = 0;
  document.querySelectorAll('a').forEach((el) => {
    el.innerText = titleArray[j];
    j++;
  });
}

export function drawYear(data) {
  const yearArray = [];
  for (let i = 0; i < data.Search.length; i += 1) {
    yearArray[i] = data.Search[i].Year;
  }
  let j = 0;
  document.querySelectorAll('.card-year').forEach((el) => {
    el.innerText = yearArray[j];
    j++;
  });
}

export function getImdbID(data) {
  const idArray = [];
  for(let i = 0; i < data.Search.length; i+= 1) {
    idArray[i] = data.Search[i].imdbID;
  }
  return idArray
}

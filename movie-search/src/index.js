
async function getMovieTitle(page) {
  const url = `https://www.omdbapi.com/?s=dream&page=${page}&apikey=9b67fc54`;
 
  const res = await fetch(url);
  const data = await res.json();
 
  console.log(data);
 
  return data
 }

 async function getMovieArray(page, search) {
  const url = `https://www.omdbapi.com/?s=${search}&page=${page}&apikey=9b67fc54`;
 
  const res = await fetch(url);
  const data = await res.json();
 
  console.log(data);
 
  return data
 }


 document.querySelector('button').addEventListener('click', (event) => {
  event.preventDefault();
  const text = document.querySelector('input').value;
  getMovieArray(1, text)
 })
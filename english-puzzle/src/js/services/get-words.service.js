export async function getWords(page = 0, group = 0) {
  const state = JSON.parse(localStorage.getItem('state'));
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const res = await fetch(url);
  const data = await res.json();

  const arrayWords = await data.map(el => ({
    word: el.word,
    example: el.textExample.split(' '),
    translate: el.textExampleTranslate,
    audioSrc: el.audioExample,
  }));


  const exampleFiltered = arrayWords.map(element => element.example.map(el => el.replace(/<b>/gm, '').replace(/<\/b>/gm, '')));
  arrayWords.forEach((el, index) => {
    el.example = exampleFiltered[index];
  });

  state.words = arrayWords;
  localStorage.setItem('state', JSON.stringify(state));
  return arrayWords;
}

export async function getWords(page = 0, group = 0) {
  const state = JSON.parse(localStorage.getItem('state'));
  const url = `https://afternoon-falls-25894.herokuapp.com/words?page=${page}&group=${group}`;
  const res = await fetch(url);
  const data = await res.json();

  const arrayWords = await data.map(el => ({
    word: el.word,
    example: el.textExample.split(' '),
    randomSequenceExample: el.textExample.split(' ').sort(() => Math.random() - 0.5),
    endPuzzles: el.textExample.split(' ').length,
  }));


  let exampleFiltered = arrayWords.map((element, index) => {
    return element.example.map(el => {
      return el.replace(/<b>/gm, '').replace(/<\/b>/gm,'')
    })
  });
  let randomSequenceExampleFiltered = arrayWords.map((element, index) => {
    return element.randomSequenceExample.map(el => {
      return el.replace(/<b>/gm, '').replace(/<\/b>/gm,'')
    })
  });
  arrayWords.forEach((el, index)=> {
    el.example = exampleFiltered[index]
  })
  arrayWords.forEach((el, index)=> {
    el.randomSequenceExample = randomSequenceExampleFiltered[index]
  })
  state.currentExample = 1;
  localStorage.setItem('state', JSON.stringify(state));
  console.log(arrayWords)
  return arrayWords;
}

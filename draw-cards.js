const indexCategory = cards[0].indexOf(sessionStorage.getItem('category'));
let i = 0;

document.getElementById('container-cards').querySelectorAll('img').forEach((el) => {
  el.src = cards[indexCategory + 1][i].image;
  i += 1;
});
i = 0;
document.getElementById('container-cards').querySelectorAll('p').forEach((el) => {
  el.innerText = cards[indexCategory + 1][i].word;
  i += 1;
});

export async function getTranslateSearch(str) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getTranslateCity(str, targetLang) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=${targetLang}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

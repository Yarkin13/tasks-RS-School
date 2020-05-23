export async function getTranslate(str) {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T172619Z.dceb063c3b5389b5.f6342d8e2926316e43c9556febb44f345b597d81&text=${str}&lang=ru-en`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

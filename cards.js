const cards = [
  ['Action (set A)', 'Action (set B)', 'Action (set C)', 'Adjective', 'Animal (set A)', 'Animal (set B)', 'Clothes', 'Emotions'],
  [
    {
      word: 'cry',
      translation: 'плакать',
      image: 'img/Action (set A)/cry.jpg',
      audioSrc: 'audio/Action (set A)/cry.mp3',
    },
    {
      word: 'dance',
      translation: 'танцевать',
      image: 'img/Action (set A)/dance.jpg',
      audioSrc: 'audio/Action (set A)/dance.mp3',
    },
    {
      word: 'dive',
      translation: 'нырять',
      image: 'img/Action (set A)/dive.jpg',
      audioSrc: 'audio/Action (set A)/dive.mp3',
    },
    {
      word: 'draw',
      translation: 'рисовать',
      image: 'img/Action (set A)/draw.jpg',
      audioSrc: 'audio/Action (set A)/draw.mp3',
    },
    {
      word: 'fish',
      translation: 'ловить рыбу',
      image: 'img/Action (set A)/fish.jpg',
      audioSrc: 'audio/Action (set A)/fish.mp3',
    },
    {
      word: 'fly',
      translation: 'летать',
      image: 'img/Action (set A)/fly.jpg',
      audioSrc: 'audio/Action (set A)/fly.mp3',
    },
    {
      word: 'hug',
      translation: 'обнимать',
      image: 'img/Action (set A)/hug.jpg',
      audioSrc: 'audio/Action (set A)/hug.mp3',
    },
    {
      word: 'jump',
      translation: 'прыгать',
      image: 'img/Action (set A)/jump.jpg',
      audioSrc: 'audio/Action (set A)/jump.mp3',
    },
  ],
  [
    {
      word: 'open',
      translation: 'открывать',
      image: 'img/Action (set B)/open.jpg',
      audioSrc: 'audio/Action (set B)/open.mp3',
    },
    {
      word: 'play',
      translation: 'играть',
      image: 'img/Action (set B)/play.jpg',
      audioSrc: 'audio/Action (set B)/play.mp3',
    },
    {
      word: 'point',
      translation: 'указывать',
      image: 'img/Action (set B)/point.jpg',
      audioSrc: 'audio/Action (set B)/point.mp3',
    },
    {
      word: 'ride',
      translation: 'ездить',
      image: 'img/Action (set B)/ride.jpg',
      audioSrc: 'audio/Action (set B)/ride.mp3',
    },
    {
      word: 'run',
      translation: 'бегать',
      image: 'img/Action (set B)/run.jpg',
      audioSrc: 'audio/Action (set B)/run.mp3',
    },
    {
      word: 'sing',
      translation: 'петь',
      image: 'img/Action (set B)/sing.jpg',
      audioSrc: 'audio/Action (set B)/sing.mp3',
    },
    {
      word: 'skip',
      translation: 'пропускать, прыгать',
      image: 'img/Action (set B)/skip.jpg',
      audioSrc: 'audio/Action (set B)/skip.mp3',
    },
    {
      word: 'swim',
      translation: 'плавать',
      image: 'img/Action (set B)/swim.jpg',
      audioSrc: 'audio/Action (set B)/swim.mp3',
    },
  ],
  [
    {
      word: 'argue',
      translation: 'спорить',
      image: 'img/Action (set C)/argue.jpg',
      audioSrc: 'audio/Action (set C)/argue.mp3',
    },
    {
      word: 'build',
      translation: 'строить',
      image: 'img/Action (set C)/build.jpg',
      audioSrc: 'audio/Action (set C)/build.mp3',
    },
    {
      word: 'carry',
      translation: 'нести',
      image: 'img/Action (set C)/carry.jpg',
      audioSrc: 'audio/Action (set C)/carry.mp3',
    },
    {
      word: 'catch',
      translation: 'ловить',
      image: 'img/Action (set C)/catch.jpg',
      audioSrc: 'audio/Action (set C)/catch.mp3',
    },
    {
      word: 'drive',
      translation: 'водить машину',
      image: 'img/Action (set C)/drive.jpg',
      audioSrc: 'audio/Action (set C)/drive.mp3',
    },
    {
      word: 'drop',
      translation: 'падать',
      image: 'img/Action (set C)/drop.jpg',
      audioSrc: 'audio/Action (set C)/drop.mp3',
    },
    {
      word: 'pull',
      translation: 'тянуть',
      image: 'img/Action (set C)/pull.jpg',
      audioSrc: 'audio/Action (set C)/pull.mp3',
    },
    {
      word: 'push',
      translation: 'толкать',
      image: 'img/Action (set C)/push.jpg',
      audioSrc: 'audio/Action (set C)/push.mp3',
    },
  ],
  [
    {
      word: 'big',
      translation: 'большой',
      image: 'img/Adjective/big.jpg',
      audioSrc: 'audio/Adjective/big.mp3',
    },
    {
      word: 'small',
      translation: 'маленький',
      image: 'img/Adjective/small.jpg',
      audioSrc: 'audio/Adjective/small.mp3',
    },
    {
      word: 'fast',
      translation: 'быстрый',
      image: 'img/Adjective/fast.jpg',
      audioSrc: 'audio/Adjective/fast.mp3',
    },
    {
      word: 'slow',
      translation: 'медленный',
      image: 'img/Adjective/slow.jpg',
      audioSrc: 'audio/Adjective/slow.mp3',
    },
    {
      word: 'friendly',
      translation: 'дружелюбный',
      image: 'img/Adjective/friendly.jpg',
      audioSrc: 'audio/Adjective/friendly.mp3',
    },
    {
      word: 'unfriendly',
      translation: 'недружелюбный',
      image: 'img/Adjective/unfriendly.jpg',
      audioSrc: 'audio/Adjective/unfriendly.mp3',
    },
    {
      word: 'young',
      translation: 'молодой',
      image: 'img/Adjective/young.jpg',
      audioSrc: 'audio/Adjective/young.mp3',
    },
    {
      word: 'old',
      translation: 'старый',
      image: 'img/Adjective/old.jpg',
      audioSrc: 'audio/Adjective/old.mp3',
    },
  ],
  [
    {
      word: 'cat',
      translation: 'кот',
      image: 'img/Animal (set A)/cat.jpg',
      audioSrc: 'audio/Animal (set A)/cat.mp3',
    },
    {
      word: 'chick',
      translation: 'цыплёнок',
      image: 'img/Animal (set A)/chick.jpg',
      audioSrc: 'audio/Animal (set A)/chick.mp3',
    },
    {
      word: 'chicken',
      translation: 'курица',
      image: 'img/Animal (set A)/chicken.jpg',
      audioSrc: 'audio/Animal (set A)/chicken.mp3',
    },
    {
      word: 'dog',
      translation: 'собака',
      image: 'img/Animal (set A)/dog.jpg',
      audioSrc: 'audio/Animal (set A)/dog.mp3',
    },
    {
      word: 'horse',
      translation: 'лошадь',
      image: 'img/Animal (set A)/horse.jpg',
      audioSrc: 'audio/Animal (set A)/horse.mp3',
    },
    {
      word: 'pig',
      translation: 'свинья',
      image: 'img/Animal (set A)/pig.jpg',
      audioSrc: 'audio/Animal (set A)/pig.mp3',
    },
    {
      word: 'rabbit',
      translation: 'кролик',
      image: 'img/Animal (set A)/rabbit.jpg',
      audioSrc: 'audio/Animal (set A)/rabbit.mp3',
    },
    {
      word: 'sheep',
      translation: 'овца',
      image: 'img/Animal (set A)/sheep.jpg',
      audioSrc: 'audio/Animal (set A)/sheep.mp3',
    },
  ],
  [
    {
      word: 'bird',
      translation: 'птица',
      image: 'img/Animal (set B)/bird.jpg',
      audioSrc: 'audio/Animal (set B)/bird.mp3',
    },
    {
      word: 'fish',
      translation: 'рыба',
      image: 'img/Animal (set B)/fish1.jpg',
      audioSrc: 'audio/Animal (set B)/fish.mp3',
    },
    {
      word: 'frog',
      translation: 'жаба',
      image: 'img/Animal (set B)/frog.jpg',
      audioSrc: 'audio/Animal (set B)/frog.mp3',
    },
    {
      word: 'giraffe',
      translation: 'жирафа',
      image: 'img/Animal (set B)/giraffe.jpg',
      audioSrc: 'audio/Animal (set B)/giraffe.mp3',
    },
    {
      word: 'lion',
      translation: 'лев',
      image: 'img/Animal (set B)/lion.jpg',
      audioSrc: 'audio/Animal (set B)/lion.mp3',
    },
    {
      word: 'mouse',
      translation: 'мышь',
      image: 'img/Animal (set B)/mouse.jpg',
      audioSrc: 'audio/Animal (set B)/mouse.mp3',
    },
    {
      word: 'turtle',
      translation: 'черепаха',
      image: 'img/Animal (set B)/turtle.jpg',
      audioSrc: 'audio/Animal (set B)/turtle.mp3',
    },
    {
      word: 'dolphin',
      translation: 'дельфин',
      image: 'img/Animal (set B)/dolphin.jpg',
      audioSrc: 'audio/Animal (set B)/dolphin.mp3',
    },
  ],
  [
    {
      word: 'skirt',
      translation: 'юбка',
      image: 'img/Clothes/skirt.jpg',
      audioSrc: 'audio/Clothes/skirt.mp3',
    },
    {
      word: 'pants',
      translation: 'брюки',
      image: 'img/Clothes/pants.jpg',
      audioSrc: 'audio/Clothes/pants.mp3',
    },
    {
      word: 'blouse',
      translation: 'блузка',
      image: 'img/Clothes/blouse.jpg',
      audioSrc: 'audio/Clothes/blouse.mp3',
    },
    {
      word: 'dress',
      translation: 'платье',
      image: 'img/Clothes/dress.jpg',
      audioSrc: 'audio/Clothes/dress.mp3',
    },
    {
      word: 'boots',
      translation: 'ботинки',
      image: 'img/Clothes/boot.jpg',
      audioSrc: 'audio/Clothes/boot.mp3',
    },
    {
      word: 'shirt',
      translation: 'рубашка',
      image: 'img/Clothes/shirt.jpg',
      audioSrc: 'audio/Clothes/shirt.mp3',
    },
    {
      word: 'coat',
      translation: 'пальто',
      image: 'img/Clothes/coat.jpg',
      audioSrc: 'audio/Clothes/coat.mp3',
    },
    {
      word: 'shoes',
      translation: 'туфли',
      image: 'img/Clothes/shoe.jpg',
      audioSrc: 'audio/Clothes/shoe.mp3',
    },
  ],
  [
    {
      word: 'sad',
      translation: 'грустный',
      image: 'img/Emotion/sad.jpg',
      audioSrc: 'audio/Emotion/sad.mp3',
    },
    {
      word: 'angry',
      translation: 'сердитый',
      image: 'img/Emotion/angry.jpg',
      audioSrc: 'audio/Emotion/angry.mp3',
    },
    {
      word: 'happy',
      translation: 'счастливый',
      image: 'img/Emotion/happy.jpg',
      audioSrc: 'audio/Emotion/happy.mp3',
    },
    {
      word: 'tired',
      translation: 'уставший',
      image: 'img/Emotion/tired.jpg',
      audioSrc: 'audio/Emotion/tired.mp3',
    },
    {
      word: 'surprised',
      translation: 'удивлённый',
      image: 'img/Emotion/surprised.jpg',
      audioSrc: 'audio/Emotion/surprised.mp3',
    },
    {
      word: 'scared',
      translation: 'испуганный',
      image: 'img/Emotion/scared.jpg',
      audioSrc: 'audio/Emotion/scared.mp3',
    },
    {
      word: 'smile',
      translation: 'улыбка',
      image: 'img/Emotion/smile.jpg',
      audioSrc: 'audio/Emotion/smile.mp3',
    },
    {
      word: 'laugh',
      translation: 'смех',
      image: 'img/Emotion/laugh.jpg',
      audioSrc: 'audio/Emotion/laugh.mp3',
    },
  ],
];

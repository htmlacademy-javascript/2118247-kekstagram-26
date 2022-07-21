import {randomNumber, stringLengthValidation} from './helper.js';

const maleNames = ['Александр', 'Максим', 'Михаил', 'Марк', 'Иван', 'Артем', 'Лев', 'Дмитрий', 'Матвей', 'Даниил'];
const femaleNames = ['София', 'Анна', 'Мария', 'Алиса', 'Ева', 'Виктория', 'Полина', 'Варвара', 'Александра', 'Анастасия'];
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function generatePosts() {
  const posts = [];

  for (let i = 1; i <= 25; i++) {
    const post = {
      id: i,
      url: `photos/${  i  }.jpg`,
      description: 'Геленджик 2022',
      likes: randomNumber(15, 200),
      comments: generateComments()
    };

    posts.push(post);
  }

  return posts;
}

function generateComments()
{
  const maxCommentLen = 100;

  const comments = [];
  for (let i = 0; i <= randomNumber(0,10); i++) {

    let id = 0;
    let isIdExists = false;
    do {
      id = randomNumber(1,1000);
      for (let j = 0; j < comments.length; j++) {
        isIdExists = comments[j].id === id;
      }

    } while (isIdExists);

    const message = messages[randomNumber(0,5)];

    const comment = {
      id: id,
      avatar: `img/avatar-${  [randomNumber(1,6)]  }.svg`,
      message: stringLengthValidation(message, maxCommentLen)
        ? message
        : '',
      name: randomNumber(0, 1)
        ? maleNames[randomNumber(0, 10)]
        : femaleNames[randomNumber(0, 10)]
    };

    comments.push(comment);
  }

  return comments;
}

export {generatePosts};

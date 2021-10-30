import _ from 'lodash';

import starIcon from '../assets/images/star.svg';

const messageBox = document.querySelector('.message-box');

export const hideMessageBox = () => {
  setTimeout(() => {
    messageBox.innerHTML = '';
    messageBox.style.display = 'none';
  }, 5000);
};

export const showMessageBox = (message, type) => {
  if (message && type) {
    if (_.isString(message) && _.isString(type)) {
      messageBox.innerHTML = message;
      messageBox.style.display = 'block';

      if (type === 'success') {
        messageBox.classList.remove('error-message');
        messageBox.classList.add('success-message');
      } else if (type === 'error') {
        messageBox.classList.remove('success-message');
        messageBox.classList.add('error-message');
      }
      hideMessageBox();
    }
  }
};

export const toggleEementVisibility = (elem1, elem2, message = null, messageType = null) => {
  setTimeout(() => {
    elem1.classList.remove('show');
    elem2.classList.remove('hide');
    showMessageBox(message, messageType);
  }, 300);
};

export const renderScores = (scores) => {
  const scoreBoard = document.querySelector('.score-board');
  const winnerPara = document.querySelector('.winner-name');
  const refreshButton = document.querySelector('.refresh-button');
  const text = refreshButton.childNodes[1];
  const spinner = refreshButton.childNodes[3].childNodes[1];

  scores.forEach((object) => {
    const maxScore = Math.max(...scores.map((object) => object.score));
    const convertedScore = parseInt(object.score, 10);

    if (convertedScore === maxScore) {
      winnerPara.innerHTML = object.user;
    }

    scoreBoard.innerHTML += `
      <div class="flex items-center justify-center p-2 m-4 rounded-lg bg-white md:mx-10 lg:mx-20">
        <div class="w-1/2 text-sm md:text-xl font-alfa color-dark">${object.user.toUpperCase()}</div>
        <div class="w-auto score flex items-center justify-center space-x-2 text-center rounded-full px-3">
          <p class="text-sm md:text-lg font-alfa color-dark">${object.score}</p>
          <img src="${starIcon}" alt="star icon" class="w-5">
        </div>
      </div>`;
  });

  toggleEementVisibility(spinner, text);
};

export const resetInputFields = (args) => {
  args.forEach((element) => {
    element.value = '';
  });
};

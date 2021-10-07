import _ from 'lodash';

const messageBox = document.querySelector('.message-box');

export const renderScores = (scores) => {
  const scoreBoard = document.querySelector('.score-board');
  const winnerPara = document.querySelector('.winner-name');
  let winner;

  scores.forEach((object) => {
    // max = Math.max(object.score);
    winner = object.user;
    scoreBoard.innerHTML += `
    <div class="flex items-center justify-center p-2 m-4 rounded-lg bg-white md:mx-32">
      <div class="w-1/2 text-sm md:text-xl font-bold">${object.user.toUpperCase()}</div>
      <div class="w-20 score flex items-center justify-center space-x-2 text-center rounded-full">
        <p class="text-sm md:text-lg font-bold">${object.score}</p>
        <img src="./assets/star.svg" alt="star icon" class="w-5">
      </div>
    </div>`;
  });

  winnerPara.innerHTML = `${winner}`;
};

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

export const resetInputFields = (args) => {
  args.forEach((element) => {
    element.value = '';
  });
};
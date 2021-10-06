import _ from 'lodash';

const messageBox = document.querySelector('.message-box');

export const renderScores = (scores) => {
  const scoreBoard = document.querySelector('.score-board');
  scores.forEach((score) => {
    scoreBoard.innerHTML += `<div class="p-5 score">${score.user} : ${score.score}</div>`;
  });
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
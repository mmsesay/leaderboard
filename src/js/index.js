import _ from 'lodash';
import '../styles/style.css';
import { fetcher } from './fetcher.js';

window.onload = () => {
  const submitButton = document.querySelector('.submit-button');
  const nameField = document.querySelector('.name-field');
  const scoreField = document.querySelector('.score-field');
  const refreshButton = document.querySelector('.refresh-button');
  const scoreBoard = document.querySelector('.score-board');

  const resetInputFields = (args) => {
    args.forEach((element) => {
      element.value = '';
    });
  };

  submitButton.addEventListener('click', (e) => {
    e.preventDefault();

    if (nameField.value && scoreField.value !== '') {
      const newScore = parseInt(scoreField.value, 10);

      if (_.isString(nameField.value) && _.isInteger(newScore)) {
        fetcher.createGameScore(nameField.value, scoreField.value);
        resetInputFields([nameField, scoreField]);
      } else {
        fetcher.showMessageBox('Your name must be a string and you score field must be a number', 'error');
      }
    } else {
      fetcher.showMessageBox('Your name and your score are required', 'error');
    }
  });

  refreshButton.addEventListener('click', (e) => {
    e.preventDefault();
    scoreBoard.innerHTML = '';
    fetcher.getGameScores();
  });
};

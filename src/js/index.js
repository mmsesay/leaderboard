import _ from 'lodash';
import '../styles/style.css';
import { fetcher } from './fetcher.js';
import { toggleEementVisibility, resetInputFields } from './renderer.js';

window.onload = () => {
  const submitButton = document.querySelector('.submit-button');
  const nameField = document.querySelector('.name-field');
  const scoreField = document.querySelector('.score-field');
  const refreshButton = document.querySelector('.refresh-button');
  const scoreBoard = document.querySelector('.score-board');

  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const text = submitButton.childNodes[1];
    const spinner = submitButton.childNodes[3].childNodes[1];

    text.classList.add('hide');
    spinner.classList.add('show');

    if (nameField.value && scoreField.value !== '') {
      const newScore = parseInt(scoreField.value, 10);

      if (_.isString(nameField.value) && _.isInteger(newScore)) {
        fetcher.createGameScore(nameField.value, scoreField.value);
        toggleEementVisibility(spinner, text);
        resetInputFields([nameField, scoreField]);
      } else {
        toggleEementVisibility(spinner, text, 'Your name must be a string and you score field must be a number', 'error');
      }
    } else {
      toggleEementVisibility(spinner, text, 'Your name and your score are required', 'error');
    }
  });

  refreshButton.addEventListener('click', (e) => {
    e.preventDefault();

    const text = refreshButton.childNodes[1];
    const spinner = refreshButton.childNodes[3].childNodes[1];

    text.classList.add('hide');
    spinner.classList.add('show');

    scoreBoard.innerHTML = '';
    fetcher.getGameScores();
  });
};

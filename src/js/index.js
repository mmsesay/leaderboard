import '../styles/style.css';
import { fetcher } from './fetcher.js';

const submitButton = document.querySelector('.submit-button');
const nameField = document.querySelector('.name-field');
const scoreField = document.querySelector('.score-field');
// const refreshButton = document.querySelector('.refresh-button');

const resetInputFields = (args) => {
  args.forEach((element) => {
    element.value = '';
  });
};

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetcher.createGameScore(nameField.value, scoreField.value);
  resetInputFields([nameField, scoreField]);
});

import '../styles/style.css';
import { fetcher } from './fetcher.js';

const submitButton = document.querySelector('.submit-button');
const nameField = document.querySelector('.name-field');
const scoreField = document.querySelector('.score-field');
// const refreshButton = document.querySelector('.refresh-button');

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetcher.createGameScore(nameField.value, scoreField.value);
});

import axios from 'axios';
import { renderScores, showMessageBox } from './renderer.js';

class Fetcher {
  constructor() {
    this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.gameId = JSON.parse(localStorage.getItem('gameId') || null);
    this.createGame('Space Shooter');
  }

  createGame = async (gameName) => {
    if (this.gameId === null) {
      await axios.post(`${this.baseURL}games/`, {
        name: gameName,
      })
        .then((response) => {
          const { result } = response.data;
          this.gameId = result.slice(14, 34);
          localStorage.setItem('gameId', JSON.stringify(this.gameId));
        })
        .catch((error) => {
          throw new Error(error);
        });
    }
    return this.gameId;
  }

  createGameScore = async (objectName, objectScore) => {
    await axios.post(`${this.baseURL}games/${this.gameId}/scores/`, {
      user: objectName,
      score: objectScore,
    })
      .then((response) => {
        const { result } = response.data;
        showMessageBox(result, 'success');
      }).catch((error) => {
        throw new Error(error);
      });
  }

  getGameScores = async () => {
    await axios.get(`${this.baseURL}games/${this.gameId}/scores/`)
      .then((response) => {
        const { result } = response.data;
        renderScores(result);
      }).catch((error) => {
        throw new Error(error);
      });
  }
}

export const fetcher = new Fetcher();

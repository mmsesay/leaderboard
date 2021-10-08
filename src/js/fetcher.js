import axios from 'axios';
import { renderScores, showMessageBox } from './renderer.js';

class Fetcher {
  constructor() {
    this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
    this.gameId = JSON.parse(localStorage.getItem('gameId') || null);
    this.createGame('Space Shooter');
    this.isResponseCompleted = false;
  }

  createGame = async (gameName) => {
    if (this.gameId === null) {
      await axios.post(`${this.baseURL}`, {
        name: gameName,
      })
        .then((response) => {
          const { result } = response.data;
          this.gameId = result.slice(14, 34);
          localStorage.setItem('gameId', JSON.stringify(this.gameId));
        })
        .catch((error) => {
          this.isResponseCompleted = false;
          throw new Error(error);
        });
    }
    return this.gameId;
  }

  createGameScore = async (objectName, objectScore) => {
    await axios.post(`${this.baseURL}${this.gameId}/scores/`, {
      user: objectName,
      score: objectScore,
    })
      .then((response) => {
        const { result } = response.data;
        showMessageBox(result, 'success');
        this.isResponseCompleted = true;
      }).catch((error) => {
        this.isResponseCompleted = false;
        throw new Error(error);
      });
  }

  getGameScores = async () => {
    await axios.get(`${this.baseURL}${this.gameId}/scores/`)
      .then((response) => {
        const { result } = response.data;
        renderScores(result);
        this.isResponseCompleted = true;
      }).catch((error) => {
        this.isResponseCompleted = false;
        throw new Error(error);
      });
  }

  getCurrentStatus = () => this.isResponseCompleted;
}

export const fetcher = new Fetcher();

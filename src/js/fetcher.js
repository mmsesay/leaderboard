import axios from 'axios';

class Fetcher {
  constructor() {
    this.baseURL = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    this.messageBox = document.querySelector('.message-text');
    this.scoreBoard = document.querySelector('.score-board');
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
        this.showAndHideMessageBox(result);
      }).catch((error) => {
        throw new Error(error);
      });
  }

  getGameScores = async () => {
    await axios.get(`${this.baseURL}games/${this.gameId}/scores/`)
      .then((response) => {
        const { result } = response.data;
        this.renderScores(result);
      }).catch((error) => {
        throw new Error(error);
      });
  }

  showAndHideMessageBox = (message) => {
    this.messageBox.innerHTML = message;
    this.messageBox.style.display = 'block';
    setTimeout(() => {
      this.messageBox.innerHTML = '';
      this.messageBox.style.display = 'none';
    }, 5000);
  };

  renderScores = (scores) => {
    scores.forEach((score) => {
      this.scoreBoard.innerHTML += `<div class="p-5 score">${score.user} : ${score.score}</div>`;
    });
  }
}

export const fetcher = new Fetcher();

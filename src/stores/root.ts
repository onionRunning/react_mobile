import GameStore from './game'

class Root {
  game: GameStore
  constructor() {
    this.game = new GameStore()
  }
}

export default new Root()

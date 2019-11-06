import Common from './common'

class Root {
  common: Common
  constructor() {
    this.common = new Common()
  }
}

export default new Root()

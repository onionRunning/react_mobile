import Common from './common'
import User from './user'

class Root {
  common: Common
  user: User
  constructor() {
    this.common = new Common()
    this.user = new User()
  }
}

export default new Root()

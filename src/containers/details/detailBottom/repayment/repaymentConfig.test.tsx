import * as Config from './config'

describe('Config', () => {
  it('getDomlist', () => {
    expect(Config.getDomlist(1)).not.toBeUndefined()
  })
})

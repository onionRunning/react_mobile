import * as Config from './config'

describe('idInfo/config', () => {
  it('test botImgArr', () => {
    const id = {
      picture_of_address_front: 'front picture',
      picture_of_address_back: 'back picture'
    }
    expect(Config.botImgArr(id)[0].src).toEqual('front picture')
  })
})

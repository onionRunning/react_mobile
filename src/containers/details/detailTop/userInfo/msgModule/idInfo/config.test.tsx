import * as Config from './config'

describe('idInfo/config', () => {
  it('test botImgArr', () => {
    const id = {
      user_id_card_front_img: 'front picture', // 身份证正面照
      user_id_card_back_img: 'back picture', // 身份证反面照
      user_id_card_hold_img: 'hold picture' // 手持证件照
    }
    expect(Config.botImgArr(id)[0].src).toEqual('front picture')
  })
})

import InfoWrapper from './index'
import UserInfo from '../../detailTop/userInfo'

describe('InfoWrapper', () => {
  it('InfoWrapper', () => {
    InfoWrapper('User info')(UserInfo)
  })
})

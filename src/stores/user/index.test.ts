import User from './index'
import Message from 'components/message'

jest.mock('api')

jest.mock('components/message')
Message.error = jest.fn()

describe('User', () => {
  let instance: User
  beforeEach(() => {
    instance = new User()
  })

  it('getUserListData', async () => {
    await instance
      .getUserListData({
        page: 1,
        per_page: 10
      })
      .then()
    expect(instance.userList).toEqual([])
  })
})

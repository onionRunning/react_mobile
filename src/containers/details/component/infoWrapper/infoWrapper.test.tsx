import InfoWrapper from './index'

describe('Auth', () => {
  const props = {
    headTitle: ''
  }
  it('InfoWrapper', () => {
    const func = InfoWrapper()('')
    const component = new func(props)
    expect(component.render()).not.toBeUndefined()
  })
})

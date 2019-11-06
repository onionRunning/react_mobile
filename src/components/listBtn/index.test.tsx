import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ListBtn from './index'
describe('ListBtn', () => {
  const btnClick = jest.fn()
  const props = {
    btnClick,
    data: [{ stateName: 'test' }, { stateName: 'test2' }]
  }
  let component: ShallowWrapper<ListBtn>, instance: ListBtn
  beforeEach(() => {
    component = shallow(<ListBtn {...props} />)
    instance = component.instance() as ListBtn
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('componentDidMount', () => {
    instance.componentDidMount()
    expect(instance.state.tabsActive).toBe('test')
  })

  it('changeAppType', () => {
    const item = { stateName: 'test' }
    instance.changeAppType(item)()
    expect(instance.state.tabsActive).toBe('test')
    expect(btnClick).toBeCalledWith({ stateName: 'test' })
  })
})

describe('ListBtn no data', () => {
  const props = {
    data: undefined,
    btnClick: jest.fn()
  }
  let component: ShallowWrapper<ListBtn>, instance: ListBtn
  beforeEach(() => {
    component = shallow(<ListBtn {...props} />)
    instance = component.instance() as ListBtn
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    instance.componentDidMount()
    expect(instance.state.tabsActive).toBe('')
  })
})

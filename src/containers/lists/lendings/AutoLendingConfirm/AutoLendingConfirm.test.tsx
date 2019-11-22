import React from 'react'
import { shallow } from 'enzyme'
import { AutoLendingConfirm } from './index'

describe('AutoLendingConfirm', () => {
  const props = {
    modalClose: jest.fn(),
    lendings: {
      checkAutoStatus: jest.fn(),
      UpdateAutoStatus: jest.fn()
    }
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<AutoLendingConfirm {...props} />).dive()
    instance = component.instance()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('renderContent', () => {
    instance.state.switchMsg = []
    instance.renderContent()
    expect(component.find('p').length).toBeGreaterThan(0)

    instance.state.switchMsg = [{ id: '111' }]
    expect(instance.renderContent().length).toBeGreaterThan(0)
  })
  it('handleSubmit', () => {
    const switchAutoLoan = jest.spyOn(instance, 'switchAutoLoan')
    instance.handleSubmit()
    expect(props.modalClose).toBeCalled()
    expect(switchAutoLoan).toBeCalled()
  })
  it('handleSwitch', () => {
    instance.state.switchMsg = [
      {
        id: '111',
        checked: true,
        value: 'on'
      }
    ]
    expect.assertions(1)
    const item = { id: '111' }
    instance.handleSwitch(item)
    expect(instance.state.switchMsg[0].id).toEqual('111')
  })
  it('toggleValue', () => {
    const value = 'on'
    expect(instance.toggleValue(value)).toEqual('off')

    const value1 = 'off'
    expect(instance.toggleValue(value1)).toEqual('on')
  })
  it('initAutoLoan', () => {
    instance.initAutoLoan()
    expect(props.lendings.checkAutoStatus).toBeCalled()
  })
  it('initAutoLoanMsg', () => {
    const res = []
    instance.initAutoLoanMsg(res)
    expect(instance.state.switchMsg.length).toBe(0)
    const res1 = {
      success: false,
      data: []
    }
    expect(instance.initAutoLoanMsg(res1)).toBeUndefined()
  })
  it('switchAutoLoan', () => {
    instance.switchAutoLoan()
    expect(props.lendings.UpdateAutoStatus).toBeCalled()
  })
})

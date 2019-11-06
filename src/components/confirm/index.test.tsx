import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import Confirm from './index'
describe('Confirm', () => {
  jest.useFakeTimers()
  const onCancel = jest.fn()
  const props = {
    onCancel,
    autoClose: true,
    show: true,
    title: 'Exit',
    text: 'Whether to quit the current account？',
    closeTime: 2000,
    cancelText: 'No',
    okText: 'Yes',
    showSelect: jest.fn(),
    onOk: jest.fn()
  }
  let component: ShallowWrapper<Confirm>, instance: Confirm
  beforeEach(() => {
    component = shallow(<Confirm {...props} />)
    instance = component.instance() as Confirm
    onCancel.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('shouldComponentUpdate', () => {
    expect(instance.shouldComponentUpdate(props))
    jest.runAllTimers()
    expect(onCancel).toBeCalled()
  })

  it('handleCloseModal', () => {
    const mockProps = {
      autoClose: true,
      show: false,
      title: 'Exit',
      text: 'Whether to quit the current account？',
      closeTime: 2000,
      cancelText: 'No',
      okText: 'Yes',
      showSelect: jest.fn(),
      onOk: jest.fn(),
      onCancel: jest.fn()
    }
    instance.handleCloseModal(mockProps)
    jest.runAllTimers()
    expect(instance.timer).toBe(undefined)
  })
})

describe('Confirm show false', () => {
  jest.useFakeTimers()
  const onCancel = jest.fn()
  const props = {
    onCancel,
    autoClose: true,
    show: false
  }
  let component: ShallowWrapper<Confirm>
  beforeEach(() => {
    component = shallow(<Confirm {...props} />)
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

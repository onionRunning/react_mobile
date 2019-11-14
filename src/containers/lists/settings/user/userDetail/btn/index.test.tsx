import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Btn } from './index'
import { BtnItem } from '../config'

describe('Btn', () => {
  const btnData: BtnItem[] = [
    { type: 'primary', label: 'OK', key: 'edit', id: 'ok-btn' },
    { type: 'gray', label: 'Cancel', key: 'return', id: 'cancel-btn' }
  ]
  const mockProps = {
    btnData,
    clickProps: jest.fn()
  }

  let component: ShallowWrapper<Btn>, instance: Btn

  beforeEach(() => {
    component = shallow(<Btn {...mockProps} />)
    instance = component.instance() as Btn
  })

  it('render', () => {
    expect(component.find('div').length).toBe(1)
  })

  it('handleOnClick', () => {
    instance.handleOnClick('edit')()
    expect(mockProps.clickProps).toBeCalled()
  })
})

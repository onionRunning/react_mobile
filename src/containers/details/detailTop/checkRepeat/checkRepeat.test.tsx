import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { CheckRepeat } from './index'

describe('test checkRepeat', () => {
  let component: ShallowWrapper<CheckRepeat>
  let instance: any
  const mockRoute = mockRouteProps({
    type: 'orders',
    order_no: '111',
    a: '' // ???? what`s wrong ????
  })
  const dispatch = jest.fn()
  const mockProps = {
    dispatch,
    common: {
      changeLoading: jest.fn()
    },
    checkRepeat: {
      getCheckLists: jest.fn(),
      retryChecklists: jest.fn(),
      lists: [
        {
          order_no: '111',
          result_value: 'rereret'
        }
      ]
    },
    ...mockRoute
  }
  beforeEach(() => {
    component = shallow(<CheckRepeat {...mockProps} />).dive()
    instance = component.instance() as CheckRepeat
  })

  it('test render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('test componentDidMount', () => {
    instance.getCheckLists = jest.fn()
    instance.componentDidMount()
    expect(instance.getCheckLists).toBeCalled()
  })
  it('componentWillUnmount', () => {
    instance.componentWillUnmount()
    expect(mockProps.common.changeLoading).toBeCalledWith(false)
  })
  it('test getCheckLists', () => {
    instance.getCheckLists()
    expect(mockProps.checkRepeat.getCheckLists).toBeCalled()
  })

  // it('test getRepeatListSuccess', () => {
  //   const data = {
  //     CheckAndOther: ['111']
  //   }
  //   instance.getRepeatListSuccess(data)
  //   expect(instance.state['checkLists']).toEqual(['111'])
  // })

  it('test newClick', () => {
    instance.newClick()
    expect(mockProps.checkRepeat.retryChecklists).toBeCalled()
  })
})

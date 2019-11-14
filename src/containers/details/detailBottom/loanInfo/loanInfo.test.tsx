import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'

import { LoanInfo } from './index'

describe('LoanInfo', () => {
  const mockRoute = mockRouteProps({
    order_no: '1111',
    showType: 'test',
    type: 'my_order'
  })
  const props = {
    ...mockRoute,
    dispatch: jest.fn(),
    currentList: ''
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<LoanInfo {...props} />)
    instance = component.instance()
  })
  it('componentDidMount', () => {
    const getLoanInfo = jest.spyOn(instance, 'getLoanInfo')
    instance.componentDidMount()
    expect(getLoanInfo).toBeCalled()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('getLoanInfo', () => {
    instance.getLoanInfo()
    expect(props.dispatch).toBeCalled()
  })
  it('handleSuccess', () => {
    const data: any = []
    instance.handleSuccess(data)
    expect(instance.state.data.length).toBe(0)
  })
  it('handleTableChange', () => {
    const sorter = {
      order: 'desc',
      field: '',
      columnKey: ''
    }
    let _: any
    instance.handleTableChange(_, _, sorter)
    expect(instance.state.data.length).toBe(0)
  })
})

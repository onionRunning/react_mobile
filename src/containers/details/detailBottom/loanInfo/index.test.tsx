import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { LoanInfo } from './index'

describe('LoanInfo', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'order_list'
    }
  )
  const details: any = {
    getLoanInfoList: jest.fn()
  }
  const common: any = {
    composeLoading: jest.fn()
  }
  const mockProps = {
    ...mockRoute,
    details,
    common
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<LoanInfo {...mockProps} />).dive()
    instance = component.instance()
    instance.setState({
      request: {
        order_no: '',
        sort_order: '',
        sort_value: ''
      },
      loanInfoList: []
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBe(0)
  })

  it('handleLoading', () => {
    instance.handleLoading()
    expect(mockProps.common.composeLoading).toBeCalledWith(instance.getLoanInfo)
  })

  it('getLoanInfo', () => {
    instance.getLoanInfo()
    expect(mockProps.details.getLoanInfoList).toBeCalledWith({
      order_no: 'P2g201911150020',
      sort_order: '',
      sort_value: ''
    })
  })

  it('handleTableChange', () => {
    const sorter = {
      order: 'descend',
      field: '',
      columnKey: ''
    }
    let _: any
    instance.handleTableChange(_, _, sorter)
    expect(instance.state.request.sort_order).toBe('desc')
  })

  it('transformSort', () => {
    expect(instance.transformSort('')).toBe('')
    expect(instance.transformSort('descend')).toBe('desc')
    expect(instance.transformSort('ascend')).toBe('asc')
  })
})

import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { MyOrders } from './index'
import { mockRouteProps } from 'test/mock'

describe('MyOrders', () => {
  window.open = jest.fn()
  const mockRoute = mockRouteProps({})
  const mockDispatch = jest.fn()
  const mockProps = {
    dispatch: mockDispatch,
    ...mockRoute,
    data: [],
    status: true,
    total: 1,
    productOption: []
  }
  const orderListItem = {
    order_no: 'test',
    created_at: 'test',
    application_finish_time: 'test',
    customer_full_name: 'test',
    id_type: 'test',
    id_num: 'test',
    application_status: 'test',
    product_name: 'test',
    customer_id: 1,
    exception_reason: 'test',
    mobile_id: 1
  }
  let component: ShallowWrapper<MyOrders>, instance: MyOrders

  beforeEach(() => {
    global.sessionStorage.setItem('userId', '1')
    global.sessionStorage.setItem('username', 'admin')
    component = shallow(<MyOrders {...mockProps} />)
    instance = component.instance() as MyOrders
    mockProps.dispatch.mockClear()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderOperating', () => {
    expect(instance.renderOperating(orderListItem, {}, 1)).not.toBe(undefined)
  })

  it('handleChangeSelect', () => {
    instance.handleChangeSelect({
      label: 'MQuickRupee',
      value: 'MQuickRupee'
    })
    expect(sessionStorage.getItem('productName')).toBe('MQuickRupee')
  })

  it('tableChange', () => {
    instance.tableChange({ current: 2, pageSize: 10 })
    expect(instance.state.request.page).toBe(2)
  })

  it('handleToDetail', () => {
    const orderListItem = {
      order_no: 'test',
      created_at: 'test',
      application_finish_time: 'test',
      customer_full_name: 'test',
      id_type: 'test',
      id_num: 'test',
      application_status: 'test',
      product_name: 'test',
      customer_id: 576,
      mobile_id: 557
    }
    instance.handleToDetail(orderListItem)()
  })

  it('grabOrder', () => {
    instance.grabOrder()
    // expect(mockProps.dispatch.mock.calls[0][0].payload).toEqual({
    //   operator_id: 1,
    //   operator_name: 'admin',
    //   product_name: ''
    // })
  })

  it('getMyOrders', () => {
    instance.setState({
      request: {
        page: 1, // 当前页码
        per_page: 20, // 每页的页码数
        product_name: sessionStorage.getItem('productName')
      }
    })
    instance.getMyOrders()
    // expect(mockProps.dispatch).toBeCalledWith(
    //   createMyOrdersRequest({
    //     page: 1, // 当前页码
    //     per_page: 20, // 每页的页码数
    //     operator_id: 1, // 操作人
    //     sort_value: 'created_at', // 需要排序字段
    //     sort_order: 'desc',
    //     product_name: ''
    //   })
    // )
  })

  it('getState', () => {
    // const state: any = {
    //   myOrders: {
    //     data: []
    //   },
    //   loading: { status: false },
    //   productReducer: {
    //     filterProduct: [{ id: 1, label: 'GotoCash', value: 'GotoCash' }]
    //   }
    // }
    // expect(getState(state)).toEqual({
    //   data: [],
    //   status: false,
    //   productOption: [{ id: 1, label: 'GotoCash', value: 'GotoCash' }]
    // })
  })
})

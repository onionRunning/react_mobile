import * as React from 'react'
import { shallow } from 'enzyme'
import { MyOrder } from './index'

describe('MyOrder', () => {
  let component: any, props: any, ins: MyOrder, getMyOrdersList: any
  props = {
    myOrders: {
      getGrabOrder: jest.fn(),
      getMyOrderLists: jest.fn()
    },
    common: {
      composeLoading: jest.fn()
    },
    history: {
      push: jest.fn()
    }
  }
  beforeEach(() => {
    component = shallow(<MyOrder {...props} />).dive()
    ins = component.instance()
    getMyOrdersList = jest.spyOn(ins, 'getMyOrdersList')
  })
  it('ui render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleFilter ', () => {
    expect(ins.handleFilter({ key: 'xx', value: '0' }))
    expect(ins.state.request.xx).toBe('0')
  })
  it('handleFilter2 ', () => {
    expect(ins.handleFilter({ key: 'loan_days', value: '123' }))
    expect(ins.state.request.loan_days).toBe(123)
  })
  it('handleFilter3 ', async () => {
    await expect(ins.handleFilter({ key: 'loan_days', value: '' }))
    expect(ins.state.request.loan_days).toBe(0)
  })

  it('handleBtnClick', () => {
    expect(ins.handleBtnClick('')).toBe(undefined)
  })
  it('handleBtnClick', () => {
    ins.handleBtnClick('inquire')
    expect(props.common.composeLoading).toBeCalled()
  })

  it('getMyOrdersList', () => {
    ins.getMyOrdersList({ key: 'xx', value: 'xxx' })
    expect(props.common.composeLoading).toBeCalled()
  })

  it('replaceDetail', () => {
    const item = {
      customer_id: 1,
      order_no: '1',
      product_name: 'peso2Go',
      mobile_id: 1
    }
    ins.replaceDetail(item)()
    expect(props.history.push).toBeCalledWith('/auth/order_details', {
      customer_id: 1,
      mobile_id: 1,
      order_no: '1',
      product_name: 'peso2Go',
      viewType: 'my_orders'
    })
  })
  it('grabOrder', () => {
    ins.grabOrder()
    expect(props.myOrders.getGrabOrder).toBeCalled()
  })
  it('tableChange', () => {
    const sorter: any = {
      column: '',
      order: 'ascend',
      field: 'test',
      columnKey: 'test'
    }
    const pag = {
      current: 2,
      pageSize: 10
    }
    let _: any
    ins.tableChange(pag, _, sorter)
    expect(getMyOrdersList).toBeCalled()
    expect(ins.state.request.page).toBe(2)
  })
  it('tableChange2', () => {
    const sorter: any = {
      column: '',
      order: 'ascend',
      field: 'test',
      columnKey: ''
    }
    const pag = {
      current: 0,
      pageSize: 0
    }
    let _: any
    ins.tableChange(pag, _, sorter)
    expect(getMyOrdersList).toBeCalled()
    expect(ins.state.request.page).toBe(1)
    expect(ins.state.request.per_page).toBe(10)
  })

  it('tempFunc', () => {
    ins.tempFunc({ key: 'x', value: 'x' })()
    expect(props.myOrders.getMyOrderLists).toBeCalled()
  })

  it('successCb', () => {
    ins.successCb()
    expect(getMyOrdersList).toBeCalled()
  })
})

import * as React from 'react'
import { shallow } from 'enzyme'
import { OrderLists } from './index'

describe('MyOrder', () => {
  let component: any, props: any, ins: OrderLists, getOrdersList: any
  props = {
    orderLists: {
      getOperateUser: jest.fn(),
      getOrderLists: jest.fn(),
      clearData: jest.fn()
    },
    common: {
      composeLoading: jest.fn()
    },
    history: {
      push: jest.fn()
    }
  }
  beforeEach(() => {
    component = shallow(<OrderLists {...props} />).dive()
    ins = component.instance()
    getOrdersList = jest.spyOn(ins, 'getOrdersList')
  })
  it('ui render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    ins.componentDidMount()
    expect(getOrdersList).toBeCalled()
  })
  it('componentWillUnmount', () => {
    ins.componentWillUnmount()
    expect(props.orderLists.clearData).toBeCalled()
  })
  it('render', () => {
    expect(ins.render().type).toBe('div')
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
    ins.handleBtnClick('inquery')
    expect(getOrdersList).toBeCalledWith({ page: 1 })
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
    expect(getOrdersList).toBeCalled()
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
    expect(getOrdersList).toBeCalled()
    expect(ins.state.request.page).toBe(1)
    expect(ins.state.request.per_page).toBe(10)
  })
  it('getOrdersList', () => {
    ins.getOrdersList()
    expect(props.common.composeLoading).toBeCalled()
  })

  it('tempFunc', () => {
    ins.tempFunc()()
    expect(props.orderLists.getOrderLists).toBeCalled()
  })
  it('getApprovalPerson', () => {
    ins.getApprovalPerson()
    expect(props.orderLists.getOperateUser).toBeCalled()
  })
  it('replaceDetail', () => {
    const item = {
      customer_id: 1,
      order_no: '1',
      product_name: 'peso2Go',
      mobile_id: 1,
      application_status: 'WaitingForManualAuditing'
    }
    ins.replaceDetail(item)()
    expect(props.history.push).toBeCalledWith('/auth/order_details', {
      customer_id: 1,
      mobile_id: 1,
      order_no: '1',
      product_name: 'peso2Go',
      application_status: 'WaitingForManualAuditing',
      viewType: 'order_list'
    })
  })
})

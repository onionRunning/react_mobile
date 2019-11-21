import * as React from 'react'
import { shallow } from 'enzyme'
import { RepaymentInfo, RepaymentDetail, TableCom, TableItem } from './index'
import { mockRouteProps } from 'test/mock'

describe('RepaymentInfo', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps: any = {
    dispatch,
    ...mockRoute,
    details: {
      repaymentInfoList: [],
      repaymentInfoFlowList: []
    }
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<RepaymentInfo {...mockProps} />)
    instance = component.instance()
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('getRepaymentInfo', () => {
    instance.getRepaymentInfo()
    expect(mockProps.dispatch).toBeCalled()
  })
  it('handleSuccess', () => {
    const detailData: any = [],
      dataFlow: any = []
    instance.handleSuccess(detailData, dataFlow)
    expect(instance.state.detailData.length).toBe(0)
  })
})
describe('RepaymentDetail', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps: any = {
    dispatch,
    ...mockRoute,
    detailData: [
      {
        extend_period: 1,
        due_date: 'test',
        actual_paid_off_date: 'test',
        principal: 1,
        actual_principal: 1,
        free_principal: 1,
        interests_fee: 1,
        actual_interests_fee: 1,
        free_interests_fee: 1,
        service_fee: 1,
        actual_service_fee: 1,
        free_service_fee: 1,
        extend_fee: 1,
        actual_extend_fee: 1,
        try_extend_fee: 1,
        free_extend_fee: 1,
        late_days: 1,
        late_penalty_fee: 1,
        actual_late_penalty_fee: 1,
        free_late_penalty_fee: 1,
        late_fee: 1,
        actual_late_fee: 1,
        number: 1,
        free_late_fee: 1,
        late_interests_fee: 1,
        actual_late_interests_fee: 1,
        free_late_interests_fee: 1,
        free_amount: 1,
        repay_amount: 1,
        actual_repay_amount: 1
      },
      {
        extend_period: 1,
        due_date: 'test',
        actual_paid_off_date: 'test',
        principal: 1,
        actual_principal: 1,
        free_principal: 1,
        interests_fee: 1,
        actual_interests_fee: 1,
        free_interests_fee: 1,
        service_fee: 1,
        actual_service_fee: 1,
        free_service_fee: 1,
        extend_fee: 1,
        actual_extend_fee: 1,
        try_extend_fee: 1,
        free_extend_fee: 1,
        late_days: 1,
        late_penalty_fee: 1,
        actual_late_penalty_fee: 1,
        free_late_penalty_fee: 1,
        late_fee: 1,
        actual_late_fee: 1,
        number: 1,
        free_late_fee: 1,
        late_interests_fee: 1,
        actual_late_interests_fee: 1,
        free_late_interests_fee: 1,
        free_amount: 1,
        repay_amount: 1,
        actual_repay_amount: 1
      }
    ],
    dataFlow: []
  }
  let component: any
  beforeEach(() => {
    component = shallow(<RepaymentDetail {...mockProps} />)
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('TableCom', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps: any = {
    dispatch,
    ...mockRoute,
    key: 1,
    headTitle: 'title',
    detailDataItem: [{}],
    detailData: [{}],
    dataFlow: []
  }
  let component: any
  beforeEach(() => {
    component = shallow(<TableCom {...mockProps} />)
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
})

describe('TableItem', () => {
  const mockRoute = mockRouteProps({
    order_no: '111',
    showType: 'test',
    type: 'test'
  })
  const dispatch = jest.fn()
  const mockProps: any = {
    dispatch,
    ...mockRoute,
    key: 1,
    headTitle: 'title',
    detailDataItem: [],
    detailData: [],
    dataFlow: [],
    detailItem: []
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<TableItem {...mockProps} />)
    instance = component.instance()
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('handleCollapse', () => {
    instance.state.isShow = true
    instance.handleCollapse()
    expect(instance.state.isShow).toBeFalsy()
  })
  it('handleTableChange', () => {
    let pagination: any, filters: any, sorter: any
    instance.handleTableChange(pagination, filters, sorter)
    expect(instance.state.isShow).toBeFalsy()
  })
})

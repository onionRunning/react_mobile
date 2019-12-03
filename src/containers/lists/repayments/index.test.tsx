import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Repayments } from './index'
import { mockRouteProps } from 'test/mock'

describe('Repayments', () => {
  window.open = jest.fn()
  const mockRoute = mockRouteProps({ order_no: '1', type: '', a: '1' })
  const mockProps = {
    dispatch: jest.fn(),
    ...mockRoute,
    page: {},
    data: [],
    status: true,
    productOption: [],
    repayments: {
      getRepaymentList: jest.fn(),
      lists: [],
      page: 1,
      total_count: 0,
      page_count: 1
    },
    common: {
      composeLoading: jest.fn()
    }
  }

  let component: ShallowWrapper<Repayments>, instance: Repayments

  beforeEach(() => {
    component = shallow(<Repayments {...mockProps} />).dive()
    instance = component.instance() as Repayments
    instance.setState({
      request: {
        page: 1, // 当前页
        per_page: 10, // 每页数据条数
        sort_value: 'actual_loan_time', // 需要排序字段
        sort_order: 'desc' // 排序方法
      }
    })
  })
  it('componentDidMount', () => {
    instance.getRepaymentList = jest.fn()
    instance.componentDidMount()
    expect(instance.getRepaymentList).toBeCalledTimes(1)
  })
  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('handleFilter', () => {
    instance.handleFilter({
      formType: 5,
      key: 'loan_amount_start',
      value: '0'
    })
    expect(instance.state.request.loan_amount_start).toBe(0)

    instance.handleFilter({
      formType: 5,
      key: 'loan_amount_start',
      value: ''
    })
    expect(instance.state.request.loan_amount_start).toBeUndefined()
  })

  it('tableChange', () => {
    const pagination = {
      current: 2,
      pageSize: 10
    }
    const _: any = {}
    const sorter: any = {
      column: {
        dataIndex: 'created_at',
        defaultSortOrder: 'descend',
        key: 'created_at',
        render: () => {},
        sorter: true,
        title: 'Application time',
        width: 174
      },
      columnKey: 'created_at',
      field: 'created_at',
      order: 'descend'
    }
    const sorter2 = { ...sorter, columnKey: '', order: 'ascend' }
    instance.tableChange(pagination, _, sorter)
    expect(instance.state.request.page).toBe(2)
    instance.tableChange(pagination, _, sorter2)
    expect(instance.state.request.page).toBe(2)
  })

  it('handleBtnClick', () => {
    instance.getRepaymentList = jest.fn()
    instance.handleBtnClick('inquire')
    expect(instance.getRepaymentList).toBeCalledTimes(1)
  })

  it('handleStartFilter', () => {
    instance.handleStartFilter()
    expect(instance.state.request).toEqual({
      page: 1, // 当前页
      per_page: 10, // 每页数据条数
      sort_value: 'actual_loan_time', // 需要排序字段
      sort_order: 'desc' // 排序方法
    })
  })

  it('getRepaymentList', () => {
    instance.getRepaymentList()
    expect(mockProps.common.composeLoading).toBeCalled()
  })
  it('verifyReq', () => {
    const request = {
      page: 1,
      per_page: 10,
      sort_order: 'desc',
      sort_value: 'actual_loan_time'
    }
    const request2 = { ...request, actual_loan_start_date: '', actual_loan_end_date: '2019-06-01' }
    const request3 = { ...request, actual_loan_start_date: '2019-06-01', actual_loan_end_date: '' }
    const request4 = { ...request, actual_loan_start_date: '2019-04-01', actual_loan_end_date: '2019-06-01' }
    const request5 = { ...request, due_start_date: '', due_end_date: '2019-06-01' }
    const request6 = { ...request, due_start_date: '2019-04-01', due_end_date: '' }
    const request7 = { ...request, due_start_date: '2019-06-01', due_end_date: '2019-05-01' }
    const request8 = { ...request, loan_amount_start: -10, loan_amount_end: 20 }
    const request9 = { ...request, loan_amount_start: 10, loan_amount_end: -20 }
    const request10 = { ...request, loan_amount_start: 1 }
    const request11 = { ...request, loan_amount_end: 1 }
    const request12 = { ...request, loan_amount_start: 10, loan_amount_end: 1 }
    // expect(instance.verifyReq(request1)).toBe(false)
    expect(instance.verifyReq(request2)).toBe(false)
    expect(instance.verifyReq(request3)).toBe(false)
    expect(instance.verifyReq(request4)).toBe(false)
    expect(instance.verifyReq(request5)).toBe(false)
    expect(instance.verifyReq(request6)).toBe(false)
    expect(instance.verifyReq(request7)).toBe(false)
    expect(instance.verifyReq(request8)).toBe(false)
    expect(instance.verifyReq(request9)).toBe(false)
    expect(instance.verifyReq(request10)).toBe(false)
    expect(instance.verifyReq(request11)).toBe(false)
    expect(instance.verifyReq(request12)).toBe(false)
  })
  it('tempFunc', () => {
    instance.tempFunc()()
    expect(mockProps.repayments.getRepaymentList).toBeCalled()
  })
  it('operating', () => {
    const type = 'inquire',
      item = {}
    instance.replaceDetail = jest.fn()
    instance.operating(item, type)()
    expect(instance.replaceDetail).toBeCalled()
  })
  it('replaceDetail', () => {})
})

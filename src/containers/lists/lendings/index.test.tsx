import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Lendings } from './index'
import { mockRouteProps } from 'test/mock'

describe('Lendings', () => {
  const mockRoute = mockRouteProps({ order_no: '1', type: '', a: '1' })
  const mockDispatch = jest.fn()
  const mockProps = {
    dispatch: mockDispatch,
    ...mockRoute,
    productOption: [],
    lendings: {
      getLendingList: jest.fn(),
      checkAutoStatus: jest.fn(),
      UpdateAutoStatus: jest.fn(),
      createLoanRetry: jest.fn(),
      createCancelLoan: jest.fn(),
      autoStatus: false,
      lendingList: [],
      page: 1,
      total_count: 0,
      page_count: 10
    },
    common: {
      changeConfirm: jest.fn(),
      composeLoading: jest.fn()
    }
  }
  const lendingItem = {
    order_no: 'test',
    apply_time: 'test',
    customer_name: 'test',
    loan_principal: 'test',
    actual_loan_amount: 'test',
    loan_days: 'test',
    request_loan_time: 'test',
    actual_loan_time: 'test',
    loan_status: 'test',
    loan_flow_no: 'test',
    out_flow_no: 'test',
    err_msg: 'test',
    product_name: 'test',
    customer_id: 1,
    is_in_batch_loan: false,
    loan_flow_status: 'test',
    loan_pay_type: 'test'
  }
  let component: ShallowWrapper<Lendings>, instance: Lendings
  beforeEach(() => {
    component = shallow(<Lendings {...mockProps} />).dive()
    instance = component.instance() as Lendings
    instance.setState({
      request: { page: 1, per_page: 10, sort_order: 'desc', sort_value: 'apply_time' },
      isAutoLend: false
    })
    sessionStorage.setItem('username', 'test')
    sessionStorage.setItem('userId', '1')
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })
  it('componentDidMount', () => {
    instance.getLendingList = jest.fn()
    instance.componentDidMount()
    expect(instance.getLendingList).toBeCalled()
  })

  it('getLendingList', () => {
    instance.getLendingList()
    expect(mockProps.common.composeLoading).toBeCalled()
  })

  it('handleFilter', () => {
    instance.handleFilter({
      key: 'loan_amount_start',
      value: '28'
    })
    expect(instance.state.request.loan_amount_start).toBe(28)
  })

  it('handleBtnClick', () => {
    instance.getLendingList = jest.fn()
    instance.handleBtnClick('inquire')
    expect(instance.getLendingList).toBeCalled()
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

  it('handleLoanCalcel', () => {
    instance.cancelLoan = jest.fn()
    instance.confrimStart = jest.fn()
    instance.makeLoanOrRetry = jest.fn()
    instance.handleLoanCalcel(lendingItem, 'cancel')()
    expect(instance.cancelLoan).toBeCalled()
    expect(instance.confrimStart).toBeCalled()

    instance.handleLoanCalcel(lendingItem, 'make loan')()
    expect(instance.makeLoanOrRetry).toBeCalled()
    expect(instance.confrimStart).toBeCalled()

    instance.handleLoanCalcel(lendingItem, 'retry')()
    expect(instance.makeLoanOrRetry).toBeCalled()
    expect(instance.confrimStart).toBeCalled()
  })
  it('confrimStart', () => {
    const func = jest.fn()
    instance.closeConfirm = jest.fn()
    instance.confrimStart(func, 'cancel')
    expect(mockProps.common.changeConfirm).toBeCalled()

    const func1 = jest.fn()
    instance.confrimStart(func1, 'test')
    expect(mockProps.common.changeConfirm).toBeCalled()
  })
  it('closeConfirm', () => {
    instance.closeConfirm()
  })
  it('makeLoanOrRetry', () => {
    mockProps.lendings.createLoanRetry.mockClear()
    instance.makeLoanOrRetry(lendingItem.order_no)()
    expect(mockProps.lendings.createLoanRetry).toBeCalled()
  })

  it('cancelLoan', () => {
    instance.cancelLoan(lendingItem)()
    expect(mockProps.lendings.createCancelLoan).toBeCalledWith(
      {
        order_no: lendingItem.order_no,
        operator: sessionStorage.getItem('username')!,
        operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
      },
      instance.composeFunction
    )
  })

  it('composeFunction', () => {
    instance.closeConfirm = jest.fn()
    instance.getLendingList = jest.fn()
    instance.composeFunction()
    expect(instance.closeConfirm).toBeCalled()
    expect(instance.getLendingList).toBeCalled()
  })
})

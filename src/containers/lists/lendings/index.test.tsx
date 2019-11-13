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
      createCancelLoan: jest.fn()
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
    is_in_batch_loan: false
  }
  let component: ShallowWrapper<Lendings>, instance: Lendings
  beforeEach(() => {
    component = shallow(<Lendings {...mockProps} />).dive()
    instance = component.instance() as Lendings
    instance.setState({
      request: { page: 1, per_page: 10, sort_order: 'desc', sort_value: 'apply_time' },
      selectedRowKeys: [],
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
  it('renderOperating', () => {
    expect(instance.renderOperating(lendingItem, {}, 1)).not.toBeUndefined()
  })
  // it('getRowSelection', () => {
  //   instance.getRowSelection()
  //   expect(instance.getRowSelection().selectedRowKeys).toBe(`${instance.state.selectedRowKeys}`)
  // })

  // it('handleRowSelection', () => {
  //   instance.handleRowSelection(['Gt20191022000001'])
  //   expect(instance.state.selectedRowKeys).toEqual(['Gt20191022000001'])
  // })

  it('getLendingList', () => {
    instance.getLendingList()
    expect(mockProps.lendings.getLendingList).toBeCalledWith(instance.state.request)
    instance.setState({
      request: {
        ...instance.state.request,
        loan_amount_start: 10,
        loan_amount_end: 1
      }
    })
    instance.getLendingList()
    // expect(mockProps.dispatch).toBeCalledWith(createAlertError("the start shouldn't be more the end in Loan Amount"))
  })

  it('checkAutoStatus', () => {
    instance.checkAutoStatus()
    expect(mockProps.lendings.checkAutoStatus).toBeCalledWith(instance.settingAuto)
  })

  it('settingAuto', () => {
    instance.settingAuto('Off')
    expect(instance.state.isAutoLend).toBe(false)
    instance.settingAuto('On')
    expect(instance.state.isAutoLend).toBe(true)
  })

  it('changeAutoStatus', () => {
    instance.changeAutoStatus()
    expect(mockProps.lendings.UpdateAutoStatus).toBeCalledWith(
      { config_value: !instance.state.isAutoLend ? 'On' : 'Off' },
      instance.checkAutoStatus
    )
    instance.setState({
      isAutoLend: true
    })
    instance.changeAutoStatus()
    expect(mockProps.lendings.UpdateAutoStatus).toBeCalledWith(
      { config_value: !instance.state.isAutoLend ? 'On' : 'Off' },
      instance.checkAutoStatus
    )
  })

  it('handleFilter', () => {
    instance.handleFilter({
      key: 'loan_amount_start',
      value: '28'
    })
    expect(instance.state.request.loan_amount_start).toBe(28)
  })

  it('handleBtnClick', () => {
    instance.handleBtnClick('query')
    // expect(instance.getLendingList).toBeCalled()
    // instance.handleBtnClick('loaddown')
    // expect(instance.downloadLending).toBeCalled()
  })

  // it('downloadLending', () => {
  //   instance.downloadLending()
  //   expect(mockProps.dispatch).toBeCalledWith(createAlertError('Please select at least one option'))
  //   instance.setState({
  //     request: {
  //       ...instance.state.request,
  //       like_keyword: '1'
  //     }
  //   })
  //   instance.downloadLending()
  //   expect(mockProps.dispatch).toBeCalledWith(createDownloadLendings({ ...instance.state.request, exec_download: 15 }))
  // })

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
    // instance.confrimStart = jest.fn()
    instance.makeLoanOrRetry = jest.fn()
    instance.handleLoanCalcel(lendingItem, 'cancel')()
    expect(instance.cancelLoan).toBeCalled()
    // expect(instance.confrimStart).toBeCalled()

    instance.handleLoanCalcel(lendingItem, 'make loan')()
    expect(instance.makeLoanOrRetry).toBeCalled()
    // expect(instance.confrimStart).toBeCalled()

    instance.handleLoanCalcel(lendingItem, 'retry')()
    expect(instance.makeLoanOrRetry).toBeCalled()
    // expect(instance.confrimStart).toBeCalled()
  })
  // it('confrimStart', () => {
  //   const func = jest.fn()
  //   instance.closeConfirm = jest.fn()
  //   instance.confrimStart(func, 'cancel')
  //   // TODO:调用相关的接口
  //   expect(instance.closeConfirm).toHaveBeenCalledTimes(1)

  //   const func1 = jest.fn()
  //   instance.confrimStart(func1, 'test')
  //   // TODO:调用相关的接口
  //   expect(instance.closeConfirm).toBeCalled()
  // })
  it('closeConfirm', () => {
    instance.closeConfirm()
    // TODO: 关闭弹框
    // expect(mockProps.dispatch).toBeCalledWith(createCloseConfirm())
  })
  it('makeLoanOrRetry', () => {
    mockProps.dispatch.mockClear()
    instance.makeLoanOrRetry(lendingItem.order_no)()
    expect(mockProps.lendings.createLoanRetry).toBeCalledWith(
      {
        order_no: lendingItem.order_no,
        operator: sessionStorage.getItem('username')!,
        operator_id: parseInt(sessionStorage.getItem('userId')!, 10)
      },
      instance.composeFunction
    )
  })

  it('cancelLoan', () => {
    instance.cancelLoan(lendingItem)
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
  // 批量放款按钮
  // it('makeLoanOrRetryBatch', () => {
  //   const orders = ['1', '2']
  //   instance.makeLoanOrRetryBatch(orders)()
  //   // TODO: 调用批量放款接口
  //   // expect().toBeCalled()
  //   expect(instance.state.selectedRowKeys.length).toBe(0)
  // })
})

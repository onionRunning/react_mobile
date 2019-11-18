import * as React from 'react'
import { shallow } from 'enzyme'
import { mockRouteProps } from 'test/mock'
import { LoanInfo } from './index'
import LoanInfoStore from 'stores/details/loanInfo'

describe('LoanInfo', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'order_list'
    }
  )
  const loanInfo: LoanInfoStore = {
    getLoanInfoList: jest.fn()
  }
  const props = {
    ...mockRoute,
    loanInfo
  }
  let component: any, instance: any
  beforeEach(() => {
    component = shallow(<LoanInfo {...props} />).dive()
    instance = component.instance()
    instance.setState({
      request: {
        PermissionId: '',
        order_no: '',
        sort_order: '',
        sort_value: ''
      },
      loanInfoList: []
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('getLoanInfo', () => {
    instance.getLoanInfo()

    expect(props.loanInfo.getLoanInfoList).toBeCalledWith(
      {
        PermissionId: '',
        order_no: 'P2g201911150020',
        sort_order: '',
        sort_value: ''
      },
      'order_list',
      instance.handleLoanInfo
    )
  })

  it('handleLoanInfo', () => {
    const data: any = [
      {
        flow: {
          created_at: 'test',
          actual_loan_time: 'test',
          loan_flow_status: 'test',
          request_no: 'test',
          out_flow_num: 'test',
          err_msg: 'test'
        },
        loan: {
          actual_loan_amount: 1000,
          loan_days: 'test',
          loan_status: 'test',
          transfer_fee: 'test'
        }
      }
    ]
    instance.handleLoanInfo(data)
    expect(instance.state.loanInfoList).toEqual([
      {
        id: 0,
        created_at: 'test',
        actual_loan_time: 'test',
        loan_flow_status: 'test',
        request_no: 'test',
        out_flow_num: 'test',
        err_msg: 'test',
        actual_loan_amount: 1000,
        loan_days: 'test',
        loan_status: 'test',
        transfer_fee: 'test'
      }
    ])
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

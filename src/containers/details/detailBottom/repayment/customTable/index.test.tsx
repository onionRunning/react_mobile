import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import CustomTable from './index'
import { tableConfig } from '../config'

describe('CustomTable', () => {
  const mockProps = {
    columns: tableConfig,
    dataSource: [
      {
        extend_period: 1,
        due_date: '2019-12-04T17:39:24+08:00',
        actual_paid_off_date: '2019-12-04T17:39:24+08:00',
        overdue_days: 2,
        fee: {
          principal_fee: 3000,
          actual_principal_fee: 3000,
          interests_fee: 50,
          actual_interests_fee: 50,
          manage_fee: 120,
          actual_manage_fee: 120,
          extend_fee: 240,
          actual_extend_fee: 240,
          overdue_late_fee: 560, // 逾期滞纳金
          actual_overdue_late_fee: 560,
          overdue_interests_fee: 150, // 逾期罚息
          actual_overdue_interests_fee: 150,
          reduce_fee: 100,
          repay_amount: 4020,
          actual_repay_amount: 4020
        }
      }
    ],
    expandedRowRender: jest.fn()
  }

  let component: ShallowWrapper<CustomTable>, instance: CustomTable

  beforeEach(() => {
    component = shallow(<CustomTable {...mockProps} />)
    instance = component.instance() as CustomTable
    instance.setState({
      visible: false
    })
  })

  it('render', () => {
    expect(component.find('.table').length).toBeGreaterThan(0)
  })

  it('renderTitle', () => {
    expect(instance.renderTitle().length).toBe(12)
  })

  it('renderBody', () => {
    expect(instance.renderBody().length).toBe(1)
  })

  it('handleExpaned', () => {
    instance.handleExpaned()
    expect(instance.state.visible).toBe(true)
    instance.handleExpaned()
    expect(instance.state.visible).toBe(false)
  })
})

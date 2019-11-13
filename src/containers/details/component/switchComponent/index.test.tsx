import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import SwitchComponent from './index'
import { mockRouteProps } from 'test/mock'
import { RouteType } from 'containers/lists/settings/role/config'
import Repayment from 'containers/details/detailBottom/repayment'
import LoanInfo from 'containers/details/detailBottom/loanInfo'
import SMSRecord from 'containers/details/detailBottom/smsRecord'
import StatusRecord from 'containers/details/detailBottom/statusRecord'
import Approval from 'containers/details/detailBottom/approval'
import UserInfo from 'containers/details/detailTop/userInfo'
import MobileInfo from 'containers/details/detailTop/mobileInfo'
import CheckRepeat from 'containers/details/detailTop/checkRepeat'

jest.mock('design/permission', () => ({
  userPermission: {
    finnalPermission: {
      order_list_reflect: {
        p0: false,
        p1: false,
        p2: false,
        p3: false,
        p4: false,
        p5: false,
        p6: false,
        p7: false,
        p8: false
      }
    }
  }
}))

window.removeEventListener = jest.fn()
window.addEventListener = jest.fn()

describe('switchComponent empty', () => {
  const mockRoute = mockRouteProps({ order_no: '1', type: RouteType.Detail, a: '1' }, { detail_type: 'orders' })
  const mockProps = {
    ...mockRoute,
    type: 'Repayment',
    dispatch: jest.fn()
  }
  let component: ShallowWrapper<SwitchComponent>, instance: SwitchComponent

  beforeEach(() => {
    component = shallow(<SwitchComponent {...mockProps} />)
    instance = component.instance() as SwitchComponent
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('componentWillUnmount', () => {
    instance.componentWillUnmount()
    expect(window.removeEventListener).toBeCalledWith('resize', instance.resize)
  })

  it('screenChange', () => {
    instance.screenChange()
    expect(window.addEventListener).toBeCalledWith('resize', instance.resize)
  })

  it('resize', () => {
    instance.resize()
    expect(instance.state.height).toBe(instance.getHeight())
  })

  it('finHeight', () => {
    expect(instance.finHeight()).toBe(0)
  })

  it('renderTabs', () => {
    expect(instance.renderTabs('Repayment')).toEqual(<Repayment {...mockProps} />)
    expect(instance.renderTabs('Loan')).toEqual(<LoanInfo {...mockProps} />)
    expect(instance.renderTabs('SMS record')).toEqual(<SMSRecord {...mockProps} />)
    expect(instance.renderTabs('Status record')).toEqual(<StatusRecord {...mockProps} />)
    expect(instance.renderTabs('Approve operate')).toEqual(<Approval {...mockProps} />)
    expect(instance.renderTabs('User info')).toEqual(<UserInfo {...mockProps} />)
    expect(instance.renderTabs('Mobile device information')).toEqual(<MobileInfo {...mockProps} />)
    expect(instance.renderTabs('Duplicate checking detection')).toEqual(<CheckRepeat {...mockProps} />)
    expect(instance.renderTabs('default')).toBe('')
  })
})

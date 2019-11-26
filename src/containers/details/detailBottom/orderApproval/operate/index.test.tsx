import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Operate } from './index'
import Message from 'components/message'
import errs from 'global/errors'
import { mockRouteProps } from 'test/mock'
import { radioType } from './config'
jest.mock('components/message')
Message.warning = jest.fn()

describe('Operate', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'order_list'
    }
  )

  const approval: any = {
    refuseReasonList: [{ id: 1, reason_code: 'R107', reason_value: '需要补充证明' }],
    getRefuseReason: jest.fn(),
    approvalOrder: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    approval
  }

  let component: ShallowWrapper<Operate>, instance: Operate

  beforeEach(() => {
    component = shallow(<Operate {...mockProps} />).dive()
    instance = component.instance() as Operate
    sessionStorage.setItem('username', 'admin')
    sessionStorage.setItem('userId', '1')
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderRadio', () => {
    expect(instance.renderRadio().props.children.length).toEqual(2)
  })

  it('renderSelect', () => {
    expect(instance.renderSelect()).toBe(false)
    instance.setState({
      application_status: radioType.REJECTED
    })
    expect(instance.renderSelect()).not.toBeFalsy()
  })

  it('getRefuseReason', () => {
    instance.getRefuseReason()
    expect(mockProps.approval.getRefuseReason).toBeCalled()
  })

  it('handleChangeRadio', () => {
    const e: any = {
      target: {
        value: 'Approved'
      }
    }
    instance.handleChangeRadio(e)
    expect(instance.state.application_status).toBe('Approved')
  })

  it('handleChangeSelect', () => {
    instance.handleChangeSelect('test')
  })

  it('handleChangeTextarea', () => {
    let value = ''
    for (let index = 0; index < 251; index++) {
      value = value + 'test'
    }
    const e: any = {
      target: {
        value
      }
    }
    instance.handleChangeTextarea(e)
    expect(instance.state.remark).toBe('')
    const e1: any = {
      target: {
        value: 'remark'
      }
    }
    instance.handleChangeTextarea(e1)
    expect(instance.state.remark).toBe('remark')
  })

  it('handleSubmitInfo', () => {
    instance.handleSubmitInfo()
    expect(Message.warning).toBeCalledWith(errs.ORDER_APPROVE_EMPTY)
    instance.setState({
      application_status: radioType.REJECTED
    })
    instance.handleSubmitInfo()
    expect(Message.warning).toBeCalledWith(errs.ORDER_APPROVE_RETURN_TYPE)
    instance.setState({
      reasons: [{ id: 1, reason_code: 'R107', reason_value: '需要补充证明' }]
    })
    instance.handleSubmitInfo()
    expect(mockProps.approval.approvalOrder).toBeCalledWith(
      {
        order_no: 'P2g201911150020',
        operator_name: 'admin',
        operator_id: 1,
        application_status: instance.state.application_status,
        reasons: instance.state.reasons,
        remark: instance.state.remark
      },
      instance.handleApproveSuccess
    )
  })

  it('handleApproveSuccess', () => {
    instance.handleApproveSuccess()
    expect(mockProps.history.push).toBeCalledWith('/auth/my_orders')
  })
})

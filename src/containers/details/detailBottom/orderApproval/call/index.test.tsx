import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Call } from './index'
import { mockRouteProps } from 'test/mock'
import Message from 'components/message'

Message.error = jest.fn()

describe('Call', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )
  const approval: any = {
    getTelephoneVerifyInfo: jest.fn(),
    getCallRecord: jest.fn(),
    callUp: jest.fn(),
    updateCallInfo: jest.fn()
  }

  const mockProps = {
    editPermission: true,
    approval,
    ...mockRoute
  }

  let component: ShallowWrapper<Call>, instance: Call
  beforeEach(() => {
    component = shallow(<Call {...mockProps} />).dive()
    instance = component.instance() as Call
    instance.setState({
      callRecord: [
        {
          id: 38,
          order_no: 'Jp20191202000002',
          phone: '1 (451) 251-254',
          relation_ship: 'Self',
          user_name: 'aer',
          show: true
        },
        {
          id: 39,
          order_no: 'Jp20191202000003',
          phone: '1 (451) 251-255',
          relation_ship: 'Self2',
          user_name: 'aer sdfsdf',
          show: false
        }
      ]
    })
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderPhone', () => {
    expect(instance.renderPhone().props.children.length).toBe(2)
  })

  it('getTelephoneVerifyInfo', () => {
    instance.getTelephoneVerifyInfo()
    expect(mockProps.approval.getTelephoneVerifyInfo).toBeCalledWith(
      {
        order_no: 'P2g201911150020'
      },
      instance.handleTelephoneVerifyInfo
    )
  })

  it('handleTelephoneVerifyInfo', () => {
    const list = [
      {
        id: 24,
        user_name: 'aer sdfsdf',
        relation_ship: 'Self',
        phone: '1 (451) 251-255',
        order_no: 'Jp20191129000004'
      },
      {
        id: 25,
        user_name: 'ddd sxsss',
        relation_ship: 'Other relative',
        phone: '(352) 525-352',
        order_no: 'Jp20191129000004'
      }
    ]
    instance.handleTelephoneVerifyInfo(list)
    expect(instance.state.callRecord).toEqual([
      {
        id: 24,
        user_name: 'aer sdfsdf',
        relation_ship: 'Self',
        phone: '01 (451) 251-255',
        order_no: 'Jp20191129000004',
        show: false
      },
      {
        id: 25,
        user_name: 'ddd sxsss',
        relation_ship: 'Other relative',
        phone: '(352) 525-352',
        order_no: 'Jp20191129000004',
        show: false
      }
    ])
  })

  it('handleClickView', () => {
    instance.handleClickView(1)()
    expect(instance.state.callRecord).toEqual([
      {
        id: 38,
        order_no: 'Jp20191202000002',
        phone: '1 (451) 251-254',
        relation_ship: 'Self',
        user_name: 'aer',
        show: true
      },
      {
        id: 39,
        order_no: 'Jp20191202000003',
        phone: '1 (451) 251-255',
        relation_ship: 'Self2',
        user_name: 'aer sdfsdf',
        show: true
      }
    ])
  })

  it('getCallRecordDetail', () => {
    instance.getCallRecordDetail()
    expect(mockProps.approval.getCallRecord).toBeCalledWith(
      {
        internal_id: 'P2g201911150020',
        internal_sys: 1
      },
      instance.handleCallRecordDetail
    )
  })

  it('handleCallRecordDetail', () => {
    instance.handleCallRecordDetail([
      {
        created_at: '2019-12-02T14:30:28+08:00',
        call_duration: 10,
        reason: 'test',
        remark: 'test',
        call_to: '1 (451) 251-254'
      }
    ])
    expect(instance.state.callRecord).toEqual([
      {
        id: 38,
        order_no: 'Jp20191202000002',
        phone: '1 (451) 251-254',
        relation_ship: 'Self',
        user_name: 'aer',
        show: true,
        detailList: [
          {
            created_at: '2019-12-02T14:30:28+08:00',
            call_duration: 10,
            reason: 'test',
            remark: 'test',
            call_to: '1 (451) 251-254'
          }
        ]
      },
      {
        id: 39,
        order_no: 'Jp20191202000003',
        phone: '1 (451) 251-255',
        relation_ship: 'Self2',
        user_name: 'aer sdfsdf',
        show: false,
        detailList: []
      }
    ])
  })

  it('handleChangeSelect', () => {
    instance.handleChangeSelect(1)({ key: '4000', value: '4000' })
    expect(instance.state.callRecord).toEqual([
      {
        id: 38,
        order_no: 'Jp20191202000002',
        phone: '1 (451) 251-254',
        relation_ship: 'Self',
        user_name: 'aer',
        show: true
      },
      {
        id: 39,
        order_no: 'Jp20191202000003',
        phone: '1 (451) 251-255',
        relation_ship: 'Self2',
        user_name: 'aer sdfsdf',
        show: false,
        selectValue: '4000'
      }
    ])
  })

  it('handleclickphone', () => {
    const item = {
      id: 38,
      order_no: 'Jp20191202000002',
      phone: '1 (451) 251-254',
      relation_ship: 'Self',
      user_name: 'aer',
      show: true
    }
    instance.handleclickphone(item)()
    expect(Message.error).toBeCalledWith('Please select the cloud phone number')
    const item1 = {
      id: 38,
      order_no: 'Jp20191202000002',
      phone: '1 (451) 251-254',
      relation_ship: 'Self',
      user_name: 'aer',
      show: true,
      selectValue: '4000'
    }
    instance.handleclickphone(item1)()
    expect(mockProps.approval.callUp).toBeCalledWith(
      {
        internal_id: 'Jp20191202000002',
        internal_sys: 1, // 默认为1
        call_from: '4000',
        call_to: '1 (451) 251-254',
        third_channel: 'yeastar',
        approval_call_id: 38
      },
      instance.callUpSuccess
    )
  })

  it('callUpSuccess', () => {
    instance.callUpSuccess('12323')
    expect(instance.state.call_id).toBe('12323')
    expect(instance.state.visible).toBe(true)
  })

  it('handleClickCancel', () => {
    instance.handleClickCancel()
    expect(instance.state.visible).toBe(false)
    expect(mockProps.approval.getCallRecord).toBeCalledWith(
      {
        internal_id: 'P2g201911150020',
        internal_sys: 1
      },
      instance.handleCallRecordDetail
    )
  })

  it('handleClickConfirm', () => {
    instance.setState({
      call_id: '1'
    })
    instance.handleClickConfirm('Non client answered', 'test')
    expect(mockProps.approval.updateCallInfo).toBeCalledWith(
      {
        call_id: '1',
        reason: 'Non client answered',
        remark: 'test',
        call_status: 'fail'
      },
      instance.updateCallInfoSuccess
    )
  })

  it('updateCallInfoSuccess', () => {
    instance.updateCallInfoSuccess()
    expect(instance.state.visible).toBe(false)
    expect(mockProps.approval.getCallRecord).toBeCalledWith(
      {
        internal_id: 'P2g201911150020',
        internal_sys: 1
      },
      instance.handleCallRecordDetail
    )
  })
})

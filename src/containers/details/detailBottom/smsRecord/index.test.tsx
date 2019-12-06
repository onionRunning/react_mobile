import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { SMSRecord } from './index'
import { mockRouteProps } from 'test/mock'

describe('SMSRecord', () => {
  const mockRoute = mockRouteProps(
    {},
    {
      order_no: 'P2g201911150020',
      viewType: 'my_orders'
    }
  )

  const details: any = {
    SMSRecordList: [
      {
        content:
          '[JetPeso]Dear customer, We need to contact you to verify the loan information, please don’t forget to keep your lines open and answer our phone call in the coming days.',
        created_at: '2019-11-28 15:21:43',
        id: 14,
        label: 'User Unconnected',
        send_status: 'SendSuccess'
      }
    ],
    getSMSRecordList: jest.fn(),
    sendMsgSMSRecord: jest.fn()
  }

  const common: any = {
    composeLoading: jest.fn(),
    changeConfirm: jest.fn()
  }

  const mockProps = {
    ...mockRoute,
    details,
    common
  }

  let component: ShallowWrapper<SMSRecord>, instance: SMSRecord

  beforeEach(() => {
    component = shallow(<SMSRecord {...mockProps} />).dive()
    instance = component.instance() as SMSRecord
  })

  it('render', () => {
    expect(component.find('div').length).toBeGreaterThan(0)
  })

  it('renderSendMsgBtn', () => {
    expect(instance.renderSendMsgBtn().length).toBe(3)
  })

  it('handleLoading', () => {
    instance.handleLoading()
    expect(mockProps.common.composeLoading).toBeCalledWith(instance.getSMSRecordInfo)
  })

  it('getSMSRecordInfo', () => {
    instance.getSMSRecordInfo()
    expect(mockProps.details.getSMSRecordList).toBeCalledWith({ order_no: 'P2g201911150020' })
  })

  it('handleClickBtn', () => {
    instance.handleClickBtn('UserMissedCall')()
    expect(mockProps.common.changeConfirm.mock.calls[0][0].title).toEqual('SMS reminder')
  })

  it('confirmSendMsg', () => {
    instance.confirmSendMsg('UserMissedCall')()
    expect(mockProps.details.sendMsgSMSRecord).toBeCalledWith(
      {
        order_no: 'P2g201911150020',
        send_type: 'UserMissedCall'
      },
      instance.sendMsgSuccess
    )
  })

  it('sendMsgSuccess', () => {
    instance.sendMsgSuccess()
    expect(mockProps.common.changeConfirm).toBeCalledWith({ show: false })
    expect(mockProps.details.getSMSRecordList).toBeCalledWith({ order_no: 'P2g201911150020' })
  })

  it('closeConfirm', () => {
    instance.closeConfirm()
    expect(mockProps.common.changeConfirm).toBeCalledWith({ show: false })
  })
})

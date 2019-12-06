import { formatTime, formatTf } from 'global/method'
import { TableTile } from 'global/interface'
import * as response from 'api/response'

export type SendMsgType = 'UserAndContactMissedCall' | 'UserMissedCall' | 'ContactMissedCall'

export const SendMsg = {
  UserAndContactMissedCall: {
    align: 'center',
    title: 'SMS reminder',
    text: 'Customer and the contacts did not answer the phone'
  },
  UserMissedCall: {
    align: 'center',
    title: 'SMS reminder',
    text: 'Customer did not answer the phone'
  },
  ContactMissedCall: {
    align: 'center',
    title: 'SMS reminder',
    text: 'The contacts did not answer the phone'
  }
}

export const SendMsgBtn = [
  {
    type: 'UserAndContactMissedCall',
    text: 'Customer and the contacts did not answer the phone'
  },
  {
    type: 'UserMissedCall',
    text: 'Customer did not answer the phone'
  },
  {
    type: 'ContactMissedCall',
    text: 'The contacts did not answer the phone'
  }
]

export const SMSRecordColumns: TableTile[] = [
  {
    align: 'center',
    title: 'Serial number',
    dataIndex: 'id',
    key: 'id',
    render: (text: string, record: response.SMSRecordList, index: number) => `${index + 1}`
  },
  {
    align: 'center',
    title: 'Triggering conditions', // 触发条件
    dataIndex: 'label',
    key: 'label',
    render: (data: string) => {
      return formatTf(data)
    }
  },
  {
    align: 'center',
    title: 'Sending time', // 发送时间
    dataIndex: 'created_at',
    key: 'created_at',
    render: (send_time: string) => {
      return formatTime(send_time)
    }
  },
  {
    align: 'center',
    title: 'Text message content',
    dataIndex: 'content', // 短信内容
    key: 'content'
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'send_status', // 发送状态
    key: 'send_status',
    render: (data: string) => {
      return formatTf(data)
    }
  }
]

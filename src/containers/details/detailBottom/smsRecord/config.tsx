import { formatTime, formatTf } from 'global/method'
import { TableTile } from 'global/interface'
import * as response from 'api/response'

export type SendMsgType = 'UserAndContactMissedCall' | 'UserMissedCall' | 'contact'

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
  contact: {
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
    type: 'contact',
    text: 'The contacts did not answer the phone'
  }
]

// 转化传给后端时的数据值
export const SendMsgType = {
  self: '1',
  contact: '2',
  all: '3'
}

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

import { formatTime, formatTf } from 'global/method'
import { TableTile } from 'global/interface'
import { SMSRecordList } from 'interface/details/smsRecord'

// import { any } from 'api/response'

export type SendMsgType = 'all' | 'self' | 'contact'
export const SendMsg = {
  all: {
    align: 'center',
    title: 'SMS reminder',
    text: 'Customer and the contacts did not answer the phone'
  },
  self: {
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
    type: 'all',
    text: 'Customer and the contacts did not answer the phone'
  },
  {
    type: 'self',
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
    render: (text: string, record: SMSRecordList, index: number) => `${index + 1}`
  },
  {
    align: 'center',
    title: 'Triggering conditions', // 触发条件
    dataIndex: 'send_type',
    key: 'send_type',
    render: (data: string) => {
      return formatTf(data)
    }
  },
  {
    align: 'center',
    title: 'Sending time', // 发送时间
    dataIndex: 'send_at',
    key: 'send_at',
    render: (send_time: string) => {
      return formatTime(send_time)
    }
  },
  {
    align: 'center',
    title: 'Text message content',
    dataIndex: 'send_content', // 短信内容
    key: 'send_content'
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

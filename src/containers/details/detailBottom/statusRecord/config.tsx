import React from 'react'
import { formatTf, formatTime } from 'global/method'
import { TableTile } from 'global/interface'
import * as response from 'api/response'

interface Reason {
  reason_value: string
}

export const StatusRecordColumns: TableTile[] = [
  {
    align: 'center',
    title: 'Serial number',
    dataIndex: 'id',
    key: 'id',
    render: (text: string, record: response.StatusRecordList, index: number) => `${index + 1}`
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'current_status',
    key: 'current_status',
    render: (item: string) => formatTf(item)
  },
  {
    align: 'center',
    title: 'Operator',
    dataIndex: 'operator_name',
    key: 'operator_name'
  },
  {
    align: 'center',
    title: 'Time',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at: string) => formatTime(created_at)
  },
  {
    align: 'center',
    title: 'Remark',
    dataIndex: '',
    key: 'remark',
    width: 400,
    render: (record: response.StatusRecordList) => {
      const reasons: Reason[] = record.reasons ? JSON.parse(record.reasons) : []
      return (
        <div>
          <span>{record.remark}</span>
          {reasons.map((item, index) => {
            return <span key={index}>{item.reason_value}</span>
          })}
        </div>
      )
    }
  }
]

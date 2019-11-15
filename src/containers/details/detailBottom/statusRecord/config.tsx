import React from 'react'
import { formatTf, formatTime } from 'global/method'
import { StatusRecordList } from 'interface/details/statusRecord'
import { TableTile } from 'global/interface'
export const StatusRecordColumns: TableTile[] = [
  {
    align: 'center',
    title: 'Serial number',
    dataIndex: 'id',
    key: 'id',
    render: (text: string, record: StatusRecordList, index: number) => `${index + 1}`
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'current_status',
    key: 'current_status',
    render: (item: string) => {
      return <span>{formatTf(item)}</span>
    }
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
    render: (created_at: string) => `${formatTime(created_at)}`
  },
  {
    align: 'center',
    title: 'Remark',
    dataIndex: '',
    key: 'remark',
    width: 400,
    render: (record: StatusRecordList) => {
      let reasons: Reason[] = record.reasons ? JSON.parse(record.reasons) : []
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

interface Reason {
  reason_value: string
}

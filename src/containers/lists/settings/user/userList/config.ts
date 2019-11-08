import { TableTile } from 'global/interface'
import { formType } from 'global/constants'
import Moment from 'moment'

export const condition = [
  {
    formType: formType.SEARCH,
    key: 'multi_condition',
    maxLength: 100, // 允许输入的最大长度
    placeholder: 'Search for loan ID, Name, Id number',
    id: 'search'
  },
  {
    formType: formType.SELECT,
    label: 'Status:',
    key: 'frozen',
    data: [
      {
        label: 'normal',
        value: 'normal'
      },
      {
        label: 'frozen',
        value: 'frozen'
      }
    ],
    id: 'status'
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Application time :',
    key: 'application_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'start_date',
        id: 'application-start-time'
      },
      end: {
        placeholder: 'End time',
        key: 'end_date',
        id: 'application-end-time'
      }
    }
  },
  {
    formType: formType.RANGE_INPUT,
    label: 'Loan amount:',
    key: 'loan_amountd',
    range: {
      start: {
        placeholder: 'Amount',
        key: 'loan_amount_start',
        type: 'number',
        id: 'loan-amount-start'
      },
      end: {
        placeholder: 'Amount',
        key: 'loan_amount_end',
        type: 'number',
        id: 'loan-amount-end'
      },
      maxLength: 12
    }
  },
  {
    formType: formType.INPUT,
    label: 'Mobile number:', // 号码
    key: 'customer_phone',
    className: 'filter-input-middle',
    id: 'mobile-number'
  }
]

interface UserListItem {
  id: string
  name: string
  account: string
  phone: string
  created_time: string
  status: string
}

export const getTableTitle = (
  render: (record: UserListItem, _: any, index: number) => React.ReactNode
): TableTile[] => [
  {
    align: 'center',
    title: 'User ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    align: 'center',
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    align: 'center',
    title: 'Email',
    dataIndex: 'account',
    key: 'account'
  },
  {
    align: 'center',
    title: 'Cellphone',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    align: 'center',
    title: 'Creation time',
    dataIndex: 'created_time',
    sorter: true,
    defaultSortOrder: 'descend',
    key: 'created_time',
    render: (record: number) => {
      return Moment((record || 0) * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  {
    align: 'center',
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    align: 'center',
    title: 'Operating',
    dataIndex: '',
    key: 'operzating',
    render
  }
]

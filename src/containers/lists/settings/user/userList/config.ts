import { TableTile } from 'global/interface'
import { formType } from 'global/constants'
import { UserListItem } from 'interface/user'
import Moment from 'moment'

interface BtnItem {
  text: string
  key: string
  type: 'default' | 'primary' | 'black' | 'blue'
  className?: string
  authorityId?: string
  noShow?: boolean
  id?: string
}

export const condition = [
  {
    formType: formType.SEARCH,
    key: 'search',
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
    label: 'Application time:',
    key: 'apply_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'apply_start_date',
        id: 'application-start-time'
      },
      end: {
        placeholder: 'End time',
        key: 'apply_end_date',
        id: 'application-end-time'
      }
    }
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement requisition time:',
    key: 'loan_request_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'request_loan_start_date',
        id: 'request-loan-start-date'
      },
      end: {
        placeholder: 'End time',
        key: 'request_loan_end_date',
        id: 'request-loan-end-date'
      }
    }
  },
  {
    formType: formType.SELECT,
    label: 'Product:', // 所属产品 修改为英文，修改key字段
    key: 'product_name',
    selectOptionType: 'product',
    data: [],
    id: 'product-name'
  },
  {
    formType: formType.RANGE_TIME,
    label: 'Disbursement succeed time:',
    key: 'loan_succeed_time', // 用于解决列表渲染key值的警告
    disabledDate: true,
    range: {
      start: {
        placeholder: 'Start time',
        key: 'actual_loan_start_date',
        id: 'actual-loan-start-date'
      },
      end: {
        placeholder: 'End time',
        key: 'actual_loan_end_date',
        id: 'actual-loan-end-date'
      }
    }
  },
  {
    formType: formType.SELECT,
    label: 'Disbursement status:', // 筛选状态选择
    key: 'loan_status',
    data: [
      {
        label: 'Create Loan', // 待放款
        value: 'LoanCreate'
      },
      {
        label: 'Loan Processing', // 放款中
        value: 'LoanProcessing'
      },
      {
        label: 'Loan Failed', // 放款失败
        value: 'LoanFailed'
      },
      {
        label: 'Loan Canceled', // 取消放款
        value: 'LoanCanceled'
      },
      {
        label: 'Loan Success', // 放款成功
        value: 'LoanSuccess'
      }
    ],
    id: 'loan-status'
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
  }
]

export const btnItems: BtnItem[] = [
  {
    type: 'primary',
    key: 'inquire',
    text: 'Inquire',
    id: 'inquire-btn'
  },
  {
    type: 'blue',
    key: 'add',
    text: 'Add user',
    id: 'add-user-btn'
  }
]

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

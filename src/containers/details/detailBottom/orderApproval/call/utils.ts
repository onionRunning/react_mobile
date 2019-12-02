import { TableTile } from 'global/interface'
import { formatTime } from 'global/method'
import { ListItem } from 'components/select'
export const phones = [
  { relationship: '本人', name: '王大师1', phone: '15014006740' },
  { relationship: '亲属', name: '王大师2', phone: '13014015002' },
  { relationship: '其他', name: '王大师3', phone: '13014015003' },
  { relationship: '通讯录', name: '王大师4', phone: '13014015004' }
]

// 云话机
export const phoneOps: ListItem[] = [
  { label: '4000', value: '4000' },
  { label: '4001', value: '4001' },
  { label: '4200', value: '4200' },
  { label: '4500', value: '4500' },
  { label: '4501', value: '4501' },
  { label: '4502', value: '4502' },
  { label: '4503', value: '4503' },
  { label: '4504', value: '4504' },
  { label: '4505', value: '4505' },
  { label: '4506', value: '4506' },
  { label: '4507', value: '4507' },
  { label: '4508', value: '4508' },
  { label: '4509', value: '4509' },
  { label: '4510', value: '4510' },
  { label: '4511', value: '4511' },
  { label: '4512', value: '4512' },
  { label: '4513', value: '4513' },
  { label: '4514', value: '4514' },
  { label: '4515', value: '4515' },
  { label: '4516', value: '4516' },
  { label: '4517', value: '4517' },
  { label: '4518', value: '4518' },
  { label: '4519', value: '4519' },
  { label: '4520', value: '4520' },
  { label: '4521', value: '4521' },
  { label: '4522', value: '4522' },
  { label: '4523', value: '4523' },
  { label: '4524', value: '4524' },
  { label: '4525', value: '4525' },
  { label: '4526', value: '4526' },
  { label: '4527', value: '4527' },
  { label: '4528', value: '4528' },
  { label: '4529', value: '4529' }
]

export const Columns: TableTile[] = [
  {
    align: 'center',
    title: 'Call start time',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (created_at: string) => formatTime(created_at)
  },
  {
    align: 'center',
    title: 'Call duration',
    dataIndex: 'call_duration',
    key: 'call_duration'
  },
  {
    align: 'center',
    title: 'Phone status',
    dataIndex: 'reason',
    key: 'reason'
  },
  {
    align: 'center',
    title: 'Comments',
    dataIndex: 'remark',
    key: 'remark',
    width: 400
  }
]

interface ItemType {
  type: string
}
// interface
export interface Info {
  [p: string]: string | number | boolean
}
export interface MobileInfoProps {
  app_info: Info[]
  device_info: Info
}

const CHESE_YES = '是'
const YES = 'yes'
const NO = 'no'
const ROOT = 'root'
export const reflectRoot = (types: string) => {
  return types === CHESE_YES ? YES : NO
}
// 展示value
export const formatValue = (item: Record<string, string>, data: string) => {
  if (!data) return ''
  if (item.type === ROOT) return reflectRoot(data)
  return data
}
// 整合成列表需要的数据 TODO: 需要重构
export const newFilterList = (list: Info[], type: string) => {
  let result = type === 'all' ? list : list.filter(item => item[`is_${type === 'loan' ? 'fin' : 'gps'}_app`] === true)
  let new_result = []
  let obj = {}
  for (let i = 0; i < result.length; i = i + 1) {
    if (i % 3 === 0) obj = { key: Math.floor(i / 3) }
    obj = { ...obj, [`id${(i % 3) + 1}`]: i + 1, [`value${(i % 3) + 1}`]: result[i].app_name }
    i % 3 === 2 && i !== 0 && new_result.push(obj)
    i === result.length - 1 && i % 3 !== 2 && new_result.push(obj)
  }
  return new_result
}

// config
// 表格头配置信息
export const tableTitle = [
  {
    title: 'Serial number',
    dataIndex: 'id1',
    key: 'id1',
    width: 90
  },
  {
    title: 'Name',
    dataIndex: 'value1',
    key: 'value1',
    width: 93.3
  },
  {
    title: 'Serial number',
    dataIndex: 'id2',
    key: 'id2',
    width: 90
  },
  {
    title: 'Name',
    dataIndex: 'value2',
    key: 'value2',
    width: 93.3
  },
  {
    title: 'Serial number',
    dataIndex: 'id3',
    key: 'id3',
    width: 90
  },
  {
    title: 'Name',
    dataIndex: 'value3',
    key: 'value3',
    width: 93.3
  }
]
// 展示的信息内容
export const DeviceInfoLabel: Info[] = [
  {
    title: 'Serial number', // 设备号
    type: 'text',
    stateName: 'serial_number'
  },
  {
    title: 'Phone model', // 手机型号
    type: 'text',
    stateName: 'model'
  },
  {
    title: 'System version', // 系统版本
    widthStyle: 'large',
    type: 'normalText',
    stateName: 'version'
  },
  {
    title: 'IP address', // IP地址
    type: 'text',
    stateName: 'ip'
  },
  {
    title: 'Memory size', // 运行内存
    type: 'text',
    stateName: 'memory'
  },
  {
    title: 'Storage space', // 存储空间
    type: 'text',
    stateName: 'storage'
  },
  {
    title: 'Used space', // 已用空间
    type: 'text',
    stateName: 'used_storage'
  },
  {
    title: 'WiFi name', // WIFI名称
    type: 'text',
    stateName: 'wifi_name'
  },
  {
    title: 'Root', // 是否root
    type: 'root',
    stateName: 'is_root'
  },
  {
    title: 'IMEI', // IMEI
    type: 'text',
    stateName: 'imei'
  },
  {
    title: 'IDFA', // IDFA
    type: 'text',
    stateName: 'idfa'
  },
  {
    title: 'Mac address', // Mac地址
    type: 'text',
    stateName: 'mac'
  },
  {
    title: 'Number of installed apps', // 安装APP个数
    type: 'text',
    stateName: 'app_qty'
  },
  {
    title: 'Number of loan APP installed', // 安装贷款APP个数
    type: 'text',
    stateName: 'fin_app_qty'
  },
  {
    title: 'Number of GPS mock APP installed', // 安装修改GPS定位的APP个数
    type: 'text',
    stateName: 'gps_app_qty'
  }
]
//
export const AppTypeButton = [
  {
    id: 'detail-mobile-all',
    title: 'All',
    stateName: 'all'
  },
  {
    id: 'detail-mobile-loan',
    title: 'Loan app',
    stateName: 'loan'
  },
  {
    id: 'detail-mobile-gps',
    title: 'GPS mock APP',
    stateName: 'location'
  }
]

import { FinnalPermission } from './interface'
const PERMISSION_LISTS = [
  // 顶部栏 4大模块(前端专用)
  [1, 0, 'Order', '订单模块'],
  [2, 0, 'Lending', '放款模块'],
  [3, 0, 'Repayment', '还款模块'],
  [4, 0, 'Setting', '设置模块'],
  [5, 0, 'Call Records', '其他内容模块'],
  // Order 模块
  [101, 1, 'Order list', '订单列表'],
  [102, 1, 'My order', '我的订单'],
  [103, 1, 'Blacklist management', '黑名单管理'],
  [104, 1, 'Blacklist', '黑名单列表'],
  // Lending 模块
  [201, 2, 'Lending list', '放款列表'],
  // Repayment 模块
  [301, 3, 'Repayment list', '还款列表'],
  // Setting 模块
  [401, 4, 'User', '用户列表'],
  [402, 4, 'Role', '角色列表'],
  // Content 模块
  [501, 5, 'Call records list', '通话录音列表'],
  //订单列表
  [10101, 101, 'Detail', '订单列表详情'],
  [10102, 101, 'Download', '订单列表下载功能'],
  [10103, 101, 'Allocate', '分单'],
  // 我的订单
  [10201, 102, 'Detail', '我的列表详情'],
  [10202, 102, 'Download', '我的列表领取订单功能'],
  // 黑名单管理
  // [10301, 103, 'Download', '黑名单管理下载功能'],
  [10301, 103, 'Add blacklist', '加入黑名单'],
  // 黑名单列表
  [10401, 104, 'Download', '黑名单列表下载功能'],
  [10402, 104, 'Remove blacklist', '移除黑名单'],
  // 订单列表详情
  [1010101, 10101, 'User info', '用户信息'],
  [1010102, 10101, 'Duplicate Checking Detection', '查重信息'],
  [1010103, 10101, 'Address Book', '通讯录信息'],
  [1010104, 10101, 'Mobile Device Information', '设备信息'],
  [1010105, 10101, 'Approve Result', '审批操作'],
  [1010106, 10101, 'Repayment Info', '还款信息'],
  [1010107, 10101, 'Loan Info', '放款信息'],
  [1010108, 10101, 'SMS Record', '短信记录'],
  [1010109, 10101, 'Status Record', '状态记录'],
  // 我的订单列表详情
  [1020101, 10201, 'User info', '用户信息'],
  [1020102, 10201, 'Duplicate Checking Detection', '查重信息'],
  [1020103, 10201, 'Address Book', '通讯录信息'],
  [1020104, 10201, 'Mobile Device Information', '设备信息'],
  [1020105, 10201, 'Approve Result', '审批操作'],
  [1020106, 10201, 'Repayment Info', '还款信息'],
  [1020107, 10201, 'Loan Info', '放款信息'],
  [1020108, 10201, 'SMS Record', '短信记录'],
  [1020109, 10201, 'Status Record', '状态记录'],
  // 放款管理
  [20101, 201, 'Automatic loan', '自动放款开关'],
  [20102, 201, 'Download', '下载放款列表'],
  [20103, 201, 'Make Loan', '确认手动放款'],
  [20104, 201, 'Retry', '重试放款'],
  [20105, 201, 'Loan cancellation', '贷款取消'],
  [20106, 201, 'Batch disbursement', '批量放款'],
  // 还款管理
  [30101, 301, 'Details', '还款列表详情'], //
  [30102, 301, 'Download', '还款列表下载'],

  [30103, 301, 'Manual push', '入催'],
  [30104, 301, 'Manual collection', '出催'],
  [30105, 301, 'Offline repayment', '线下还款'],

  [3010101, 30101, 'User info', '用户信息'],
  [3010102, 30101, 'Duplicate Checking Detection', '查重信息'],
  [3010103, 30101, 'Address Book', '通讯录信息'],
  [3010104, 30101, 'Mobile Device Information', '设备信息'],
  [3010105, 30101, 'Approve Result', '审批操作'],
  [3010106, 30101, 'Repayment Info', '还款信息'],
  [3010107, 30101, 'Loan Info', '放款信息'],
  [3010108, 30101, 'SMS Record', '短信记录'],
  [3010109, 30101, 'Status Record', '状态记录'],
  // 员工
  [40101, 401, 'Add', '新增员工'],
  [40102, 401, 'Detail', '查看员工'],
  [40103, 401, 'Edit', '修改员工'],
  [40104, 401, 'Frozen', '启用/禁用'],
  [40105, 401, 'Reset password', '重置密码'],
  // 角色
  [40201, 402, 'Add', '新增角色'],
  [40202, 402, 'Detail', '查看角色'],
  [40203, 402, 'Edit', '修改角色'],
  // 通话录音
  [50101, 501, 'Download', '录音列表下载'],
  [50102, 501, 'Recording download', '录音下载']
]

type FinnalType =
  | 'role_func'
  | 'user_func'
  | 'repayment_detail'
  | 'repayment_func'
  | 'lending_func'
  | '_module'
  | 'order'
  | 'blacklist_management_func'
  | 'blacklist_func'
  | 'lending'
  | 'repayment'
  | 'setting'
  | 'order_list_func'
  | 'my_order_func'
  | 'order_list_detail'
  | 'my_order_detail'
  | 'my_order_reflect'
  | 'order_list_reflect'
  | 'repayment_reflect'
  | 'call_records'
  | 'call_records_func'

// 权限对象 ---
// 后端权限配置 - 转换成前端模块

interface FontModuleType {
  k: FinnalType // 模块名
  v: number // 模块number
}

const fontModule: FontModuleType[] = [
  { k: '_module', v: 0 },
  { k: 'order', v: 1 },
  { k: 'lending', v: 2 },
  { k: 'repayment', v: 3 },
  { k: 'setting', v: 4 },
  { k: 'call_records', v: 5 },
  { k: 'order_list_func', v: 101 },
  { k: 'my_order_func', v: 102 },
  { k: 'blacklist_management_func', v: 103 },
  { k: 'blacklist_func', v: 104 },
  { k: 'order_list_detail', v: 10101 },
  { k: 'my_order_detail', v: 10201 },
  { k: 'lending_func', v: 201 },
  { k: 'repayment_func', v: 301 },
  { k: 'repayment_detail', v: 30101 },
  { k: 'user_func', v: 401 },
  { k: 'role_func', v: 402 },
  { k: 'call_records_func', v: 501 },
  { k: 'order_list_reflect', v: 10101 },
  { k: 'my_order_reflect', v: 10201 },
  { k: 'repayment_reflect', v: 30101 }
]

// type _Pick<T, K extends keyof T> = { [P in K]?: T[P] }

// type FinnalPermissionType = _Pick<any, FinnalType>

// 最综权限

class UserPermission {
  permissionList: (number | string)[][] // 前端定义的初始权限
  fontModules: FontModuleType[] // 前端需要划分的模块-模版
  backPermission: number[] // 后端返回的权限数组
  finnalPermission?: FinnalPermission // 前端最后整理的权限
  constructor() {
    this.permissionList = PERMISSION_LISTS
    const storagePermission = sessionStorage.getItem('permissionArr')!
    this.backPermission = JSON.parse(storagePermission === 'undefined' ? '[]' : storagePermission || '[]') || [] // 兼容版本session中存的为string undefined
    this.fontModules = [...fontModule]
    // this.finnalPermission = {}
    this.getLastPermission()
  }
  // 权限更新操作
  update = (backP: any) => {
    this.backPermission = [...backP]
    this.getLastPermission()
  }
  // 权限设置
  protected getLastPermission = () => {
    const temp: any[] = this.permissionList.map(item => {
      for (let j = 0; j < this.backPermission.length; j++) {
        if (item[0] === this.backPermission[j]) {
          return { number: item[0], parent_number: item[1], hasPermission: true }
        }
      }
      return { number: item[0], parent_number: item[1], hasPermission: false }
    })
    this.fontModules.forEach(item => {
      const tmap: any = {}
      let k = 0
      for (let h = 0; h < temp.length; h++) {
        if (temp[h].parent_number === item.v) {
          //   tmap[`p${temp[h].number}`] = temp[h].hasPermission
          tmap[`p${temp[h].number}`] = true //TODO 暂时不上该功能
        }
        if (temp[h].parent_number === item.v && item.k.includes('_reflect')) {
          // 复用
          tmap[`p${k}`] = temp[h].hasPermission
          // tmap[`p${k}`] = true //TODO 暂时不上该功能
          k = k + 1
        }
      }
      this.finnalPermission! = {
        ...this.finnalPermission!,
        [item.k]: tmap
      }
      // console.log(this.finnalPermission, 'this.finnalPermission')
    })
  }
}

export const userPermission = new UserPermission()

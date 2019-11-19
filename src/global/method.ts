import { isString, isArray, trim } from 'lodash'
import { OrderListItem, RepaymentResItem } from 'api/response'
import moment from 'moment'
import { order_type } from './constants'

export const _trim = trim

export const isEmail = (str: string) => {
  // 校验传入参数
  if (str === undefined || str === null || !isString(str)) return false
  let reg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@\w+(\.[a-zA-Z]{2,3}){1,2}$/
  let flag = reg.test(str)
  return flag
}

export const justfyString = (str: any): boolean => {
  return typeof str == 'string' && str.constructor === String
}

export const getStringLength = (str: string) => {
  if (str === undefined || str === null || !isString(str)) return 0
  let sum = 0
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i)
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      sum++
    } else {
      sum += 2
    }
  }
  return sum
}

export const strTrim = (s: any): any => {
  if (!justfyString(s)) return s
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

// 组合执行
export const composeFunc = (...args: any[]) => {
  args.forEach(item => {
    Object.prototype.toString.call(item) === '[object Function]' && item()
  })
}
/**
 * 校验密码复杂度: 字符串必须包含数字,字母和特殊字符,字符长度为8-16位
 * @param {String} str 待校验字符串
 */
export const complexity = (str: string) => {
  // 校验传入参数
  if (str === undefined || str === null || !isString(str)) return false
  if (getStringLength(str) > 16) return false
  let regex = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}')
  return regex.test(str)
}

/**
 * 是否为空
 * @param {string|number|array|Object} val
 */
export const isEmpty = (val: string | number | any[] | object) => {
  if (val === null || val === undefined || val === 'null' || val === 'undefined') return true
  if (isArray(val) && val.length === 0) return true
  if (isString(val) && trim(val) === '') return true
  if (val instanceof Object && JSON.stringify(val) === '{}') return true
  return false
}

/**
 * 时间戳格式化为年月日
 * @param {*} timestamp 时间戳
 * @param {*} type 年月日之间连接符号
 * @returns {String} eg: 默认：2018-12-21
 */
export const timeStampBeauty = (timestamp: number, type: any = '-'): string => {
  let date = new Date()
  date.setTime(timestamp)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  const monthStr = month < 10 ? '0' + month : month.toString()
  const dayStr = day < 10 ? '0' + day : day.toString()
  return year + type + monthStr + type + dayStr
}

/**
 * 格式化时间
 * @param {String} t eg: 2018-12-18T17:16:04+08:00
 * @returns {String} eg: 2018-12-18 17:16:04
 */
export const formatTime = (t: string): string => {
  if (isEmpty(t)) return ''
  return t
    .replace('T', ' ')
    .replace('Z', '')
    .replace('+08:00', '')
    .replace('+05:30', '')
}

export const subTime = (t: string): string => {
  if (isEmpty(t)) return ''
  return t.slice(0, 19).replace('T', ' ')
}

export const transformTime = (number: number): string => {
  return moment((number || 0) * 1000).format('YYYY-MM-DD HH:mm:ss')
}

/**
 * 获取url上的参数的值
 * @param name:类型
 *                       ?key="123"  ===>  "123"
 */
export const getQueryString = (search: string, name: string): string => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  var r = search.substr(1).match(reg)
  // if (r != null) {
  //   return unescape(r[2])
  // }
  return r != null && r !== undefined ? unescape(r[2]) : ''
}

/**
 * 格式化金额
 * @param m
 */
export const formatMoney = (m: number): string => {
  if (isEmpty(m)) return '0.00'
  let money = Number(m).toFixed(2)
  let l = money.substring(0, money.length - 6)
  let result = money.slice(-6)
  while (l) {
    if (l.length > 3) {
      result = l.substring(l.length - 3, l.length).concat(',' + result)
      l = l.substring(0, l.length - 3)
    } else {
      result = l.concat(',' + result)
      break
    }
  }
  return result
}

/**
 * 格式化金额
 * @param {String} money 传入金额 1000 - 3000
 * @param {String} type 分割类型  eg: '-'
 * @returns {String} 1,000 - 3,000 或者 1,000 above
 */
export const moneyFormatOfIncome = (money: string, type: string = '-'): string => {
  if (!isString(money)) return ''
  // 获取金额数据
  let mArr = money.split(type)
  mArr = mArr.map(item => {
    let el = item
    // 获取数值
    let m = parseFloat(el) + ''
    let str = el.match(/[^0-9]*$/) ? el.match(/[^0-9]*$/) : ''
    let re = /^(-?\d+)(\d{3})/
    while (re.test(m)) {
      m = m.replace(re, '$1,$2')
    }
    return m + str
  })
  let res = mArr.join(type)
  return res
}

export const _isArray = (array: any): boolean => {
  return Array.isArray(array)
}

export const noop = () => null

/**
 * AaaBcc => Aaa Bcc
 * @param {*} str
 */
export const formatTf = (str: string): string => {
  // 校验传入参数
  if (str === undefined || str === null || !isString(str)) return ''
  return trim(str.replace(/[A-Z]/g, ' $&'))
}

// compose( func1,func2)() ---->  func1(func2())
export const curry = (...func: any[]) => {
  if (func.length === 0) {
    return (arg: any) => arg
  }
  if (func.length === 1) {
    return func[0]
  }
  return func.reduce((a, b) => (...args: any) => a(b(...args)))
}

export const justfyNumber = (str: any): boolean => {
  return typeof str == 'number' && str.constructor === Number
}

export const Trim = (s: any): string => {
  if (!justfyString(s)) return ''
  return s.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 格式化日期
 * @param {String} date 后端返回的时间对象字符串 eg: "2018-11-08T14:45:03+08:00"
 * @returns {String} 返回格式化后的时间,包含时分秒 eg: "2018-11-08"
 */
export const formatDateDay = (date: string): string => {
  if (typeof date !== 'string') {
    return date
  }
  return date.substring(0, 10).replace('T', ' ')
}

export const splitWord = (value: any): string => {
  if (!isString(value)) {
    return ''
  }
  const index = value.search(/[a-z|A-Z][A-Z]/) + 1
  return index === 0 ? value : `${value.slice(0, index)} ${splitWord(value.slice(index, value.length))}`
}

// 判断对象是obj
export const justfyObject = (str: any): boolean => {
  return typeof str == 'object' && Object.prototype.toString.call(str) === '[object Object]'
}

// 是否有效obj
export const isValidObj = (obj: any): boolean => {
  return justfyObject(obj) && JSON.stringify(obj) !== '{}' ? true : false
}

/**
 * 加密函数
 * @param str 待加密字符串
 * @returns {string}
 */
export const strEncrypt = (str: string) => {
  var c = String.fromCharCode(str.charCodeAt(0) + str.length)

  for (var i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) + str.charCodeAt(i - 1))
  }

  return encodeURIComponent(c)
}

/**
 * 判断字符串是否为空
 * @param str
 */
export const isStringEmpty = (str: any): boolean => {
  return justfyString(str) && str !== '' ? true : false
}

/**
 * 判断数组长度
 * @param array
 */
export const arrayLength = (array: any) => {
  return _isArray(array) && array.length > 0
}

/**
 * 解密函数
 * @param str 待解密字符串
 * @returns {string}
 */
export const strDecrypt = (str: string) => {
  str = decodeURIComponent(str)
  var c = String.fromCharCode(str.charCodeAt(0) - str.length)

  for (var i = 1; i < str.length; i++) {
    c += String.fromCharCode(str.charCodeAt(i) - c.charCodeAt(i - 1))
  }
  return c
}

interface NormalOrder {
  order_no: string
  mobile_id: number
  customer_id: number
  product_name: string
  application_status: string
}

type Order = NormalOrder | OrderListItem | RepaymentResItem

// 打开新窗口进入详情
export const gotoDetail = (order: Order, type: string, readOnly?: boolean) => {
  const { order_no, mobile_id = 0, customer_id, product_name, application_status } = order
  const encryptCustomer_id = strEncrypt(String(customer_id))
  const encryptOrder_no = strEncrypt(order_no)
  const params = `?customer_id=${encryptCustomer_id}&order_no=${encryptOrder_no}&mobile_id=${mobile_id}&status=${application_status}&detail_type=${type}&product_name=${product_name}`
  const route = encodeURI(`${window.location.origin}/auth/order_details${readOnly ? '/readOnly' : ''}${params}`)
  window.open(route)
}

// 防抖函数(延时执行)
export const debounce = (cb: (...args: any[]) => any) => {
  let timeout: any
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb()
    }, 1000)
  }
}
//校验时间段
export const vertifyTime = (start: string, end: string, name: string): string => {
  if (moment(start).isAfter(moment(), 'day')) return `start of ${name} can't be more than today `
  if (!start && end) return `please choose start of ${name}`
  if (start && !end) return `please choose end of ${name}`
  if (
    moment(end)
      .subtract(30, 'days')
      .isAfter(start)
  ) {
    return `Number of days between start and end in ${name} can't be more than 30`
  }
  return ''
}

// 获取产品默认值

export const getDefaultProductName = () => {
  let product: number[] = JSON.parse(sessionStorage.getItem('productArr') || '[]')
  switch (product[0]) {
    case 1:
      return 'QuickRupee'
    case 2:
      return 'GotoCash'
    case 3:
      return 'CashInyou'
    default:
      return ''
  }
}

// 将数字/字符串截取两位小数
export const fixedTwo = (num: string | number): number => {
  const numValue = Number(num) || 0
  const decimal = String(numValue).split('.')[1]
  const decimalLength = decimal ? decimal.length : 0
  return Math.floor((numValue * Math.pow(10, decimalLength) * 100) / Math.pow(10, decimalLength)) / 100 // numValue * Math.pow(10, decimalLength)是为了先把小数转化为整数再计算 小数*整数可能会有bug(例如 9.7 * 100)
}

/*
 * NewApplicationOrder => New Application 转换订单类型
 * @param {*} str
 */
export const formatOfOrderType = function(str: string) {
  // 校验传入参数
  if (str === undefined || str === null || !isString(str)) return ''
  return order_type[trim(str) as keyof typeof order_type]
}

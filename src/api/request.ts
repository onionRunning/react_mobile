import axios, { AxiosPromise, AxiosInstance, AxiosRequestConfig } from 'axios'

const API_ROOT = '/api/v1'

export interface Response {
  success: boolean
  info: string
  err_msg?: string
  data: any
}

export interface Res<T> {
  success: boolean
  info: string
  data?: T
}

export interface ReqType {
  http: AxiosInstance
  down: AxiosInstance
}

export interface HeaderType {
  stuffix?: string
}

// 需要在请求头中添加 Product 的接口
const specialApi = [
  '/back_mgr/get_application_list',
  '/back_mgr/export_application_list',
  '/back_mgr/allocate_application',
  '/back_mgr/get_my_application_list',
  '/back_mgr/grab_application',
  '/back_mgr/query_loan_list',
  '/back_mgr/make_loan',
  '/back_mgr/cancel_loan',
  '/back_mgr/query_repayment_list',
  '/back_mgr/offline_repayment',
  '/back_mgr/offline_repayment_trial',
  '/back_mgr/query_blacklist_mng',
  '/back_mgr/add_blacklist',
  '/back_mgr/query_blacklist',
  '/back_mgr/remove_blacklist',
  '/back_mgr/update_auditing_result',
  '/back_mgr/get_reason_config_list',
  '/back_mgr/check_duplicate',
  '/back_mgr/approval_send_sms',
  '/back_mgr/add_approval_call_contacts',
  '/back_mgr/verify_bank_card',
  '/back_mgr/make_loan_batch'
]

export const createHeaderRequest = (): ((s: HeaderType, r?: string) => AxiosInstance) => {
  const common = (params: HeaderType, r?: string) => {
    return {
      baseURL: r || API_ROOT,
      headers: {
        'Content-Type': 'application/json',
        Token: sessionStorage.getItem('token'),
        suffix: params.stuffix,
        Product: sessionStorage.getItem('productName')
      }
    }
  }
  return (params: HeaderType, r?: string) => axios.create(common(params, r))
}

export const createRequest = (): ReqType => {
  const common = {
    baseURL: API_ROOT,
    headers: {
      'Content-Type': 'application/json',
      Token: sessionStorage.getItem('token')
    }
  }
  // 设置请求拦截，在请求头中添加产品名称
  const instance = axios.create(common)
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    let currentUrl = config.url!
    if (specialApi.includes(currentUrl)) {
      let productName = sessionStorage.getItem('productName')
      config.headers.Product = productName
      return config
    } else {
      delete config.headers.Product
      return config
    }
  })
  return {
    http: instance,
    down: axios.create({ ...common, responseType: 'blob' })
  }
}

type requestFun = () => AxiosPromise<Response>

export const wrapperSend = async <T>(requestFunc: requestFun, type?: string): Promise<Res<T>> => {
  let response
  try {
    const res = await requestFunc()
    const { data } = res
    response = {
      success: type ? true : data.success,
      info: data.info || data.err_msg,
      data: type ? data : data.data
    }
  } catch (err) {
    const { data } = err.response
    if (err.response.status === 403) {
      setTimeout(() => {
        sessionStorage.clear()
        window.location.replace('/login')
      }, 2000)
      return {
        info: 'Your login information is invalid, please login again!',
        success: false
      }
    }
    response = {
      success: data.success,
      info: data.err_msg,
      data: data
    }
  }
  return response
}

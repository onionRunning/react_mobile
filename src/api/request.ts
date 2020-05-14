import axios, { AxiosPromise, AxiosInstance } from 'axios'
import { Res } from 'interface/game'

const API_ROOT = ''

export interface ReqType {
  http: AxiosInstance
}

export const createRequest = (): ReqType => {
  const common = {
    baseURL: API_ROOT,
    headers: {
      'Content-Type': 'application/json',
      Token: sessionStorage.getItem('token'),
    },
  }
  const instance = axios.create(common)
  return {
    http: instance,
  }
}
type requestFun = () => AxiosPromise<Response>

export const wrapperSend = async <T>(requestFunc: requestFun): Promise<Res<T>> => {
  let response
  try {
    const res = await requestFunc()
    const { data } = res
    response = {
      success: true,
      data,
    }
  } catch (err) {
    const { data } = err.response
    response = {
      success: data.success,
      data,
    }
  }
  return response
}

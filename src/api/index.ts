import { AxiosInstance } from 'axios'
import { ReqType, wrapperSend, createRequest } from './request'
class Api {
  request: AxiosInstance
  constructor(request: ReqType) {
    this.request = request.http
  }
  async get<T = any>(url = '') {
    const res = await wrapperSend<T>(() => {
      return this.request.get<Response>(url)
    })
    return res
  }

  getIdioms() {
    return this.get('/chengyu/configuration')
  }
}

const getAPI = (request: ReqType) => {
  return new Api(request)
}

export default getAPI(createRequest())

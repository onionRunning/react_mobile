// 请求参数
export interface LoginReq {
  account?: string
  password?: string
}

// 响应参数
export interface LoginRes {
  token?: string
  id?: string
  name?: string
  is_first_login?: string
  access_no?: number[]
  product_id?: string[]
}

// 角色类型
export interface Role {
  id?: number
  role_name?: string
  light?: boolean
}

export interface ProductItem {
  id?: number
  label?: string
  value?: string
  light?: boolean
}

// 输入框的 key - value 类型
export interface ReqType {
  key: string
  value: string
}

// 三个输入框的 obj
export interface RoleRequest {
  name?: string
  cellphone?: string
  email?: string
  role?: Role[]
}

// State 类型
export interface State {
  roleList: Role[]
  // productList: ProductItem[]
  // checkProductList: ProductItem[]
  role?: Role[]
  request: RoleRequest
  userDetail?: any
}

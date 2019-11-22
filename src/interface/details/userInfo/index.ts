// 获取用户信息
export interface UserInfoPayload {
  order_no: string
  customer_id: string
}

// 用户信息
export interface OrderInfoInterface {
  application_status: string
  apply_period: number
  apply_principal: number
  apply_time: string
  approve_time: string
  approved_period: number
  approved_principal: number
  auto_audited_time: string
  channel: string
  created_at: string
  customer_email: string
  customer_first_name: string
  customer_full_name: string
  customer_id: number
  customer_last_name: string
  customer_middle_name: string
  customer_phone_num: string
  device_id: string
  device_info: string
  duplicate_status: string
  filtered_name: string
  id: number
  id_num: string
  id_type: string
  initial_audited_time: string
  is_first: string
  loan_days: number
  loan_protocol_id: number
  mobile_id: number
  mobile_serial_number: string
  mozhi_status: string
  operator: string
  operator_id: number
  operator_name: string
  order_no: string
  order_type: string
  period_unit: number
  price_config_copy_id: number
  price_config_id: number
  product_name: string
}

// 工作信息
export interface WorkerInfoInterface {
  address_in_company: string
  base_user_id: number
  career: string
  company: string
  company_address: string
  company_detailed_address: string
  created_at: string
  deleted_at: string
  id: number
  payday_first: string
  payday_second: string
  salary: string
  tel_in_company: string
  updated_at: string
  years_in_company: string
}

export interface IdInfoInterface {
  ID_type: string
  address: string
  base_user_id: number
  created_at: string
  deleted_at: string
  detailed_address: string
  dob: string
  educational_level: string
  email: string
  facebook_account: string
  facebook_phone_or_email: string
  first_name: string
  full_name: string
  id: number
  id_number: string
  last_name: string
  marital_status: string
  middle_name: string
  phone: string
  picture_of_address_back: string
  picture_of_address_front: string
  picture_of_address_holds: string
  sexual_distinction: string
  updated_at: string
  usage_of_loan: string
}

// GPS
export interface GPSInformationInterface {
  location: string
  longitude: string
  latitude: string
}

// 设备
export interface EquipmentOverviewInterface {
  serial_number: string
  model: string
  version: string
  app_qty: number
  fin_app_qty: number
  gps_app_qty: number
}

// 联系人
export interface LinkmanItemInterface {
  base_user_id: number
  id: number
  key: string
  mobile: string
  name: string
  relation_ship: string
}

// 基本信息
export interface BasicInfoInterface {
  place_of_birth: string
  nationality: string
  dob: string
  source_of_funds: string
  company: string
  industry_type: string
  present_address_name: string
  permanent_address_name: string
  educational_level: string
  marital_status: string
  email: string
  facebook_account: string
  facebook_phone_or_email: string
  usage_of_loan: string
  personal_address: string
  sexual_distinction: string
}

//
export interface CellectionAccountInfoInterface {
  account_type: string
  account_name: string
  bank_wallet_name: string
  bank_wallet_account: string
}

export interface ScoreInterface {
  score: string
  // label: string
  err_msg: string
  order_no: string
  original_score: string
  random_num: string
  sc_id: string
  trace_id: string
  tt_level: number
}

// 用户信息
export interface OrderUserDetailInterface {
  orderInfo: OrderInfoInterface
  score_card_result: ScoreInterface
  workInfo: WorkerInfoInterface
  identityInfo: IdInfoInterface
  GPSInformation: GPSInformationInterface
  equipmentOverview: EquipmentOverviewInterface
  linkmanInfo: LinkmanItemInterface[]
  basicInfo: BasicInfoInterface
  cellectionAccountInfo: CellectionAccountInfoInterface
  picUrl: string
  contact_info: any
  level: string
}
export interface ConfigType {
  id: string
  title: string
  type: string
}

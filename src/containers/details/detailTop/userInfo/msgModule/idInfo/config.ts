export const IdentityInfoInputTop = [
  {
    title: 'Full name',
    type: 'text',
    widthStyle: 's-mini-large',
    stateName: 'customer_full_name'
  },
  {
    title: 'Mobbile number', // 客户电话
    valueType: 'customer_phone',
    type: 'text',
    widthStyle: 'small',
    stateName: 'customer_phone'
  },
  {
    title: 'Type of ID', // 证件类型
    widthStyle: 'small',
    stateName: 'id_type'
  },
  {
    title: 'ID No', // 证件号码
    widthStyle: 'small',
    type: 'text',
    stateName: 'id_number'
  }
]

export interface NomalImgArrType {
  user_id_card_front_img?: string // 身份证正面照
  user_id_card_back_img?: string // 身份证反面照
  user_id_card_hold_img?: string // 手持证件照
}
// showId 用于展示所有的图片的 id编号
export const botImgArr = (id: NomalImgArrType) => {
  return [
    { title: 'Front of card', src: id.user_id_card_front_img!, showId: 1 },
    { title: 'Take a photo of holding the ID', src: id.user_id_card_hold_img!, showId: 2 }
    // { title: 'Back of card', src: id.user_id_card_back_img!, showId: 3 }
  ]
}

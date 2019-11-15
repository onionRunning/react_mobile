export const IdentityInfoInputTop = [
  {
    title: 'Pan card',
    // widthStyle: 's-mini-large',
    stateName: 'id_card_num'
  },
  {
    title: 'Certificate verification result', // 第三方接口认证
    // widthStyle: 'small',
    stateName: 'pan_verify_result' // i4.6.1后端修改字段
  }
]
export const IdentityInfoInputBot = [
  {
    title: 'Type of address proof', //
    // widthStyle: 'small',
    stateName: 'addr_card_type'
  },
  {
    title: 'Address proof number', //
    // widthStyle: 'small',
    stateName: 'addr_card_num'
  },
  {
    title: 'Certificate verification result', // 第三方接口认证
    // widthStyle: 'small',
    stateName: 'aadhaar_verify_result'
  }
]

export interface ImgArrType {
  id_card_front_img?: string
  id_card_back_img?: string
  id_card_hold_img?: string
  addr_card_front_img?: string
  addr_card_back_img?: string
}

export const topImgArr = (id: ImgArrType) => {
  return [
    { title: 'Front of original Pan card', src: id.id_card_front_img, showId: 1 },
    // { title: 'Back of original Pan card', src: id.id_card_back_img },
    { title: 'Your selfie with handheld Pan card', src: id.id_card_hold_img, showId: 2 }
  ]
}
// showId 用于展示所有的图片的 id编号
export const botImgArr = (id: ImgArrType) => {
  return [
    { title: 'Front of card', src: id.addr_card_front_img, showId: 3 },
    { title: 'Back of card', src: id.addr_card_back_img, showId: 4 }
  ]
}

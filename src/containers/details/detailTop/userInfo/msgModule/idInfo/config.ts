export const IdentityInfoInputTop = [
  {
    title: 'Full name',
    type: 'text',
    widthStyle: 's-mini-large',
    stateName: 'filtered_name'
  },
  {
    title: 'Mobbile number', // 客户电话
    valueType: 'phone',
    type: 'text',
    widthStyle: 'small',
    stateName: 'phone'
  },
  {
    title: 'Type of ID', // 证件类型
    widthStyle: 'small',
    stateName: 'ID_type'
  },
  {
    title: 'ID No', // 证件号码
    widthStyle: 'small',
    type: 'text',
    stateName: 'id_number'
  }
]

export interface NomalImgArrType {
  picture_of_address_front?: string
  picture_of_address_back?: string
  picture_of_address_holds?: string
}
// showId 用于展示所有的图片的 id编号
export const botImgArr = (id: NomalImgArrType) => {
  return [
    { title: 'Front of card', src: id.picture_of_address_front, showId: 1 },
    { title: 'Take a photo of holding the ID', src: id.picture_of_address_holds, showId: 2 }
  ]
}

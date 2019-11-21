export const imgConfig = ['salary_img_1', 'bank_stmt_img_1', 'bank_stmt_img_2', 'bank_stmt_img_3']

// export const showPicture = (_: number, curImg: any) => () => {
//     // 整合5 个图片资源为数组
//     const { user_info = {}, order_msg = {} } = this.props.userDetail || {}
//     const { id = {}, sup_cert = {} } = user_info || {}
//     const finPic: any[] = [
//       { src: order_msg.sign_name_file_url },
//       { src: id.id_card_front_img },
//       { src: id.id_card_hold_img },
//       { src: id.addr_card_front_img },
//       { src: id.addr_card_back_img }
//     ]
//     // 判断补充认证模块图片是否有上传
//     if (sup_cert) {
//       imgConfig.forEach(el => {
//         if (sup_cert[el]) {
//           finPic.push({ src: sup_cert[el] })
//         }
//       })
//     }
//     const temp = finPic.map(item => {
//       return { src: item.src.indexOf('/') === 0 ? item.src : imgPath + item.src }
//     })
//     // 获取当前点击的图片在数组中对应的下标
//     let curIndex = temp.findIndex(el => {
//       return el.src === curImg
//     })
//     this.props.dispatch(createOpenImgView(curIndex, temp, this.hidePicture))
//   }

import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import OrderInfo from './msgModule/orderInfo'
import BaseInfo from './msgModule/baseInfo'
import WorkInfo from './msgModule/workInfo'
import Equipment from './msgModule/equipment'
import IdInfo from './msgModule/idInfo'
import ContactInfo from './msgModule/contactInfo'
import AccountInfo from './msgModule/accountInfo'
import GPSInfo from './msgModule/GpsInfo'
import { MixProps } from 'global/interface'
import UserDetail from 'stores/details/userDetail'
// import { imgPath } from 'global/constants'
// import { imgConfig } from './config'

import './index.scss'

interface Props extends MixProps {
  userDetail: UserDetail
}

@inject('userDetail')
@observer
export class UserInfo extends Component<Props> {
  async componentDidMount() {
    // 获取单个订单所有信息
    const { getUserInfo } = this.props.userDetail
    const { order_no, viewType, customer_id } = this.props.location.state
    await getUserInfo({ order_no, customer_id }, viewType)
    this.setState({
      userDetail: this.props.userDetail
    })
  }

  render() {
    const { viewType } = this.props.location.state
    const { personal, work, id, contact, account, device_info, order_msg } = this.props.userDetail
    return (
      <div className="information-content">
        <div className="left">
          <OrderInfo {...this.props} currentList={viewType} />
          <BaseInfo {...this.props} data={personal} />
          <WorkInfo {...this.props} data={work} />
          <Equipment {...this.props} data={device_info} />
        </div>
        <div className="right">
          {/* showPicture={this.showPicture} */}
          <IdInfo {...this.props} data={{ ...id, ...order_msg }} />
          <ContactInfo {...this.props} data={contact} />
          <AccountInfo {...this.props} data={{ ...account, ...order_msg }} />
          <GPSInfo {...this.props} data={device_info} />
        </div>
      </div>
    )
  }

  // 点击图片展示图片
  // showPicture = (_: number, curImg: any) => () => {
  //   // 整合5 个图片资源为数组
  //   const { user_info = {}, order_msg = {} } = this.props.userDetail || {}
  //   const { id = {}, sup_cert = {} } = user_info || {}
  //   const finPic: any[] = [
  //     { src: order_msg.sign_name_file_url },
  //     { src: id.id_card_front_img },
  //     { src: id.id_card_hold_img },
  //     { src: id.addr_card_front_img },
  //     { src: id.addr_card_back_img }
  //   ]
  //   // 判断补充认证模块图片是否有上传
  //   if (sup_cert) {
  //     imgConfig.forEach(el => {
  //       if (sup_cert[el]) {
  //         finPic.push({ src: sup_cert[el] })
  //       }
  //     })
  //   }
  //   const temp = finPic.map(item => {
  //     return { src: item.src.indexOf('/') === 0 ? item.src : imgPath + item.src }
  //   })
  //   // 获取当前点击的图片在数组中对应的下标
  //   let curIndex = temp.findIndex(el => {
  //     return el.src === curImg
  //   })
  //   this.props.dispatch(createOpenImgView(curIndex, temp, this.hidePicture))
  // }
  // 关闭图片展示
  // hidePicture = () => {}
}
export default UserInfo

/**
 * 说明：
 * 1.右上角用户信息模块，一共包括8个模块分别为左右区域
 * 左区域:订单信息 , 用户信息 , 工作信息 , 设备信息
 * 右区域:身份信息 , 联系人信息 , 银行卡信息 , GPS信息
 * 2.展示图片和隐藏操作 todo
 */

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
import UserDetail from 'stores/details/userInfo'
import Common from 'stores/common'

import './index.scss'

interface Props extends MixProps {
  userDetail: UserDetail
  common: Common
}

@inject('userDetail', 'common')
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
    // const { personal, work, id, contact, account, device_info, order_msg } = this.props.userDetail
    const { userInfo, deviceInfo, extraInfo, device_info } = this.props.userDetail
    return (
      <div className="information-content">
        <div className="left">
          <OrderInfo {...this.props} currentList={viewType} />
          <BaseInfo {...this.props} data={userInfo} />
          <WorkInfo {...this.props} data={userInfo} />
          <Equipment {...this.props} data={deviceInfo} />
        </div>
        <div className="right">
          <IdInfo {...this.props} data={userInfo} showPicture={this.showPicture} />
          <ContactInfo {...this.props} data={userInfo} />
          <AccountInfo {...this.props} data={{ ...extraInfo, ...userInfo }} />
          <GPSInfo {...this.props} data={device_info} />
        </div>
      </div>
    )
  }

  // 点击图片展示图片
  showPicture = (index: number, curImg: string, imgArr: []) => () => {
    this.props.common.changeViewImg({ isShow: true, img: imgArr, currentIndex: index, onClose: this.hidePicture })
  }
  // 关闭图片展示
  hidePicture = () => {
    this.props.common.changeViewImg({ isShow: false })
  }
}
export default UserInfo

/**
 * 说明：
 * 1.右上角用户信息模块，一共包括8个模块分别为左右区域
 * 左区域:订单信息 , 用户信息 , 工作信息 , 设备信息
 * 右区域:身份信息 , 联系人信息 , 银行卡信息 , GPS信息
 * 2.展示图片和隐藏操作 todo
 */

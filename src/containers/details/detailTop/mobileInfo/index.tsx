import React, { useState, useEffect } from 'react'
import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import Table from 'components/table'
import ListBtn from 'components/listBtn'
import Common from 'stores/common'
import MobileStore from 'stores/details/mobileInfo'
import { formatValue, tableTitle, DeviceInfoLabel, AppTypeButton, Info, MobileInfoProps, newFilterList } from './utils'
import styles from './index.module.scss'
import { MixProps } from 'global/interface'

interface Props extends MixProps {
  common: Common
  mobiles: MobileStore
}
// 资料信息
export const infoList = (data: Info[], object: Info) => {
  return data.map((item, key) => {
    return (
      <div className={styles.info_item} key={key}>
        <div className={styles.item_title}>
          <span>{`${item.title}`}:</span>
          <b>{formatValue(item as Record<string, string>, object && (object[item.stateName as string] as string))}</b>
        </div>
      </div>
    )
  })
}

export const MobileInfo: React.FC<Props> = (props: Props) => {
  const [selectType, changeType] = useState<string>('all')
  const [mobileInfos, changeInfo] = useState<MobileInfoProps>({ app_info: [], device_info: {} })
  // 获取设备信息
  const getMobileInfo = async () => {
    const { mobile_id, customer_id } = props.location.state
    const params = {
      user_id: customer_id,
      mobile_id: mobile_id ? mobile_id : 0
    }
    await props.mobiles.getLoanInfoList(params)
    const fres: MobileInfoProps = props.mobiles.mobileInfo
    changeInfo(fres)
  }
  const requestInfo = () => props.common.composeLoading(getMobileInfo) as any
  useEffect(requestInfo!, []) // 第二个参数 设置[] 表示只会触发1次
  const btnClick = (info: Info) => {
    changeType(info.stateName as string)
  }
  const { app_info, device_info } = mobileInfos
  const configList = newFilterList([...app_info!], selectType)
  return (
    <div className={styles.cont_box}>
      <div className={styles.basic_info}>{infoList(DeviceInfoLabel, device_info)}</div>
      <div className={styles.device_btn}>
        <ListBtn data={AppTypeButton} btnClick={btnClick} />
      </div>
      <div className={styles.device_table}>
        <Table tableTitle={tableTitle} tableData={configList} />
      </div>
    </div>
  )
}

export default inject('common', 'mobiles')(observer(MobileInfo))
// inject: mobx-react observer: mobx-react-lite

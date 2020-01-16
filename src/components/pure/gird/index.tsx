import React from 'react'
import { Grid } from 'antd-mobile'

const data = Array.from(new Array(9)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`
}))

const GridExtend: React.FC<any> = () => {
  return <Grid data={data} hasLine={false} />
}
export default GridExtend

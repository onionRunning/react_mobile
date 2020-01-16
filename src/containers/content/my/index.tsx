import React from 'react'
import Header from '../../login'
import CarouselStrong from 'components/pure/carousel'
import GridExtend from 'components/pure/gird'
import { Result, NoticeBar } from 'antd-mobile'

const myImg = (src: string | undefined) => <img src={src} className="spe am-icon am-icon-md" alt="" />

const My: React.FC<any> = () => {
  return (
    <div>
      <Header />
      <NoticeBar marqueeProps={{ loop: true, style: { padding: '0 7.5px' } }}>
        Notice: The arrival time of incomes and transfers of Yu &#39;E Bao will be delayed during National Day.
      </NoticeBar>
      <CarouselStrong />
      <GridExtend />
      <Result
        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/HWuSTipkjJRfTWekgTUG.svg')}
        title="等待处理"
        message="已提交申请，等待银行处理"
      />
    </div>
  )
}

export default My

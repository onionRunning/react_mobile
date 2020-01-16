import React from 'react'
import { Carousel, WingBlank } from 'antd-mobile'

const CarouselStrong: React.FC<any> = () => {
  return (
    <WingBlank>
      <Carousel
        autoplay={true}
        infinite
        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
        afterChange={index => console.log('slide to', index)}
      >
        {['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'].map(val => (
          <img
            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
            alt=""
            style={{ width: '100%', verticalAlign: 'top', height: '176px' }}
          />
        ))}
      </Carousel>
    </WingBlank>
  )
}

export default CarouselStrong

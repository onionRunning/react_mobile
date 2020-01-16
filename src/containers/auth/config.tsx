import React from 'react'
import Icons from './icons'
import { TabBarItemProps } from 'antd-mobile/lib/tab-bar/PropsType'

interface TabProps extends TabBarItemProps {
  key: string
}

export const tabContent = (pressItem?: (s: string) => () => void, type?: string): TabProps[] => {
  return [
    {
      title: 'Life',
      key: 'Life',
      icon: <Icons url={'https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg'} />,
      selectedIcon: <Icons url={'https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg'} />,
      selected: type === 'life',
      onPress: pressItem!('life')
    },
    {
      title: 'Koubei',
      key: 'Koubei',
      icon: <Icons url={'https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg'} />,
      selectedIcon: <Icons url={'https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg'} />,
      selected: type === 'kobei',
      onPress: pressItem!('kobei')
    },
    {
      title: 'Friend',
      key: 'Friend',
      icon: <Icons url={'https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg'} />,
      selectedIcon: <Icons url={'https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg'} />,
      selected: type === 'friend',
      onPress: pressItem!('friend')
    },
    {
      title: 'My',
      key: 'My',
      icon: <Icons url={'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg'} />,
      selectedIcon: <Icons url={'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg'} />,
      selected: type === 'my',
      onPress: pressItem!('my')
    }
  ]
}

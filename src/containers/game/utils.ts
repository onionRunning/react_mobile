// 获取url 图片
export const getImgUrl = (name: string) => {
  return `https://chengyu.static.haowande.com/${name}.jpg`
}

export const InitIdios = [
  { value: '', types: 'init' },
  { value: '', types: 'init' },
  { value: '', types: 'init' },
  { value: '', types: 'init' },
]

// 获取成就图片
export const getAchievement = (l: number) => {
  return `https://chengyu.static.haowande.com/badge/成就${l}.png`
}

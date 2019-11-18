import { useEffect } from 'react'

export const useDidmount = (fn: () => void) => {
  useEffect(() => {
    fn()
  }, []) // 第二个参数 设置[] 表示只会触发1次
}

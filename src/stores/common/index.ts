import { observable, action } from 'mobx'

interface CommonObj {
  [p: string]: string | boolean | number | Function | CommonObj[]
}

// 图片选择器的接口
interface ImgProps {
  isShow: boolean
  // 图片数组
  img?: CommonObj[]
  // 第几张图片
  currentIndex?: number
  // 关闭回调
  onClose?: Function
}

interface ConfirmProps {
  show?: boolean
  showSelect?: () => void
  title?: string
  text?: string
  onOk?: () => void
  onCancel?: () => void
}
class Common {
  // loading 是否开启
  @observable hint: CommonObj = {}
  @observable loading: CommonObj = {}
  @observable confirm: ConfirmProps = {}
  @observable imgView: CommonObj = {}
  @observable timmer: NodeJS.Timeout | undefined
  // 修改hint的状态
  @action changeHint = (type: string, text: string) => {
    this.hint = {
      type: type,
      text: text,
      show: !!text
    }
  }
  // 是否展示loading
  @action changeLoading = (isShow: boolean) => {
    this.loading = {
      show: isShow
    }
  }
  // img view 查看器
  @action changeViewImg = (temp: ImgProps) => {
    this.imgView = {
      show: temp.isShow,
      imgArr: temp.img!,
      currentIndex: temp.currentIndex!,
      onClose: temp.onClose!
    }
  }

  @action changeConfirm = (temp: ConfirmProps) => {
    this.confirm = {
      ...temp
    }
  }
  @action composeLoading = async (cb: () => void) => {
    clearTimeout(this.timmer!)
    await this.changeLoading(true)
    if (typeof cb === 'function') {
      try {
        await cb()
      } catch (error) {
        console.error(error)
      }
    }
    this.timmer = setTimeout(() => {
      this.changeLoading(false)
    }, 500)
  }
}
export default Common

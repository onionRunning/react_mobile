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
  isShow: boolean
  showSelect: () => void
}
class Common {
  // loading 是否开启
  @observable hint: CommonObj = {}
  @observable loading: CommonObj = {}
  @observable confirm: CommonObj = {}
  @observable imgView: CommonObj = {}

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
      show: temp.isShow,
      showSelect: temp.showSelect
    }
  }
  @action change = () => {
    console.log('xxx')
  }
}
export default Common

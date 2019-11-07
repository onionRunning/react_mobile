import React, { Component } from 'react'
import Portal from '../Portal'
import styles from './index.module.scss'

interface Props {
  visible: boolean
  onClose: () => void
  onOk: () => void
  onCancel: () => void
  title?: string
  confirmText?: string
  cancelText?: string
  children: React.ReactNode
}

// const Modal: React.FC<Props> = ({ visible, title = 'title', confirmText = 'Yes', cancelText = 'No', onClose, onOk, onCancel, children }) => {

//     const node = document.body

//     const [classNames, setClassName] = useState('')
//     const [isShow, setIsShow] = useState(false)

//     useEffect(() => {
//         if (visible) {
//             enterAnimate()
//         }
//     }, [visible])

//     // 进入动画
//     const enterAnimate = () => {
//         // 这里定义每种状态的类名,就是我们之前modal.css文件中添加的类
//         const enterClasses = 'enter'
//         const enterActiveClasses = 'enter_active'
//         const enterEndClasses = 'enter_end'
//         // 这里定义了每种状态的过度时间,对应着modal.css中对应类名下的transition属性的时间,这里的单位为毫秒
//         const enterTimeout = 0
//         const enterActiveTimeout = 200
//         const enterEndTimeout = 100

//         setClassName(enterClasses)
//         setIsShow(true)
//         console.log('enterTimer')
//         // 这里使用定时器,是因为定时器中的函数会被加入到事件队列,带到主线程任务进行完成才会被调用,相当于在元素渲染出来并且加上初始的类名后enterTimeout时间后开始执行.
//         // 因为开始状态并不需要过度,所以我们直接将之设置为0.
//         const enterActiveTimer = setTimeout(() => {
//             setClassName(enterActiveClasses)
//             clearTimeout(enterActiveTimer)
//             console.log('enterActiveTimer')
//             console.log(enterActiveTimer)
//         }, enterTimeout)

//         const enterEndTimer = setTimeout(() => {
//             setClassName(enterEndClasses)
//             clearTimeout(enterEndTimer)
//             console.log('enterEndTimer')
//         }, enterTimeout + enterActiveTimeout)

//         // 最后将类名置空,还原元素本来的状态
//         const initTimer = setTimeout(() => {
//             setClassName('')
//             clearTimeout(initTimer)
//             console.log('initTimer')
//         }, enterTimeout + enterActiveTimeout + enterEndTimeout)
//     }

//     // 离开动画
//     const leaveAnimate = (callback: () => void) => {
//         const leaveClasses = 'leave'
//         const leaveActiveClasses = 'leave_active'
//         const leaveEndClasses = 'leave_end'

//         const leaveTimeout = 0
//         const leaveActiveTimeout = 100
//         const leaveEndTimeout = 200

//         // 初始元素已经存在,所以不需要改变显隐状态
//         setClassName(leaveClasses)
//         console.log('leaveTimer')
//         const leaveActiveTimer = setTimeout(() => {
//             setClassName(leaveActiveClasses)
//             clearTimeout(leaveActiveTimer)
//             console.log('leaveActiveTimer')
//         }, leaveTimeout)
//         const leaveEndTimer = setTimeout(() => {
//             setClassName(leaveEndClasses)
//             clearTimeout(leaveEndTimer)
//             console.log('leaveEndTimer')
//         }, leaveTimeout + leaveActiveTimeout)

//         // 最后将显隐状态改为false，同时将类名还原为初始状态
//         const initTimer = setTimeout(() => {
//             setIsShow(false)
//             setClassName('')
//             callback()
//             clearTimeout(initTimer)
//             // console.log(initTimer)
//         }, leaveTimeout + leaveActiveTimeout + leaveEndTimeout)
//     }

//     const handleOnConfirm = () => {
//         leaveAnimate(onOk)
//     }

//     const handleOnCancel = () => {
//         leaveAnimate(onCancel)
//     }

//     const handleOnClose = () => {
//         leaveAnimate(onClose)
//     }

//     return (
//         <Portal node={node}>
//             {isShow && <div>
//                 <div className={[styles.modal, styles[`${classNames}`]].join(' ')}>
//                     <div className={styles.title}>
//                         <span>{title}</span>
//                         <i onClick={handleOnClose} />
//                     </div>
//                     <div className={styles.content}>{children}</div>
//                     <div className={styles.operator}>
//                         <button className={styles.operator_confirm} onClick={handleOnConfirm}>{confirmText}</button>
//                         <button className={styles.operator_cancel} onClick={handleOnCancel}>{cancelText}</button>
//                     </div>
//                 </div>
//                 <div className={styles.mask}></div>
//             </div>}
//         </Portal>
//     )
// }

// export default Modal

interface State {
  isShow: boolean
  classNames: string
}

class Modal extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      isShow: false,
      classNames: ''
    }
  }

  componentDidMount() {}

  UNSAFE_componentWillReceiveProps(prevProps: Props) {
    console.log(prevProps)
    if (prevProps.visible) {
      // 接收到父组件的props时,如果是true则进行动画渲染
      this.enterAnimate()
    }
  }

  render() {
    const { title = 'title', confirmText = 'Yes', cancelText = 'No', children } = this.props
    const { isShow, classNames } = this.state
    const node = document.body
    return (
      <Portal node={node}>
        {isShow && (
          <div>
            <div className={[styles.modal, styles[`${classNames}`]].join(' ')}>
              <div className={styles.title}>
                <span>{title}</span>
                <i onClick={this.handleOnClose} />
              </div>
              <div className={styles.content}>{children}</div>
              <div className={styles.operator}>
                <button className={styles.operator_confirm} onClick={this.handleOnConfirm}>
                  {confirmText}
                </button>
                <button className={styles.operator_cancel} onClick={this.handleOnCancel}>
                  {cancelText}
                </button>
              </div>
            </div>
            <div className={styles.mask}></div>
          </div>
        )}
      </Portal>
    )
  }

  enterAnimate = () => {
    // 这里定义每种状态的类名,就是我们之前modal.css文件中添加的类
    const enterClasses = 'enter'
    const enterActiveClasses = 'enter_active'
    const enterEndClasses = 'enter_end'
    // 这里定义了每种状态的过度时间,对应着modal.css中对应类名下的transition属性的时间,这里的单位为毫秒
    const enterTimeout = 0
    const enterActiveTimeout = 200
    const enterEndTimeout = 100

    this.setState({ classNames: enterClasses, isShow: true })
    console.log('enterTimer')
    // 这里使用定时器,是因为定时器中的函数会被加入到事件队列,带到主线程任务进行完成才会被调用,相当于在元素渲染出来并且加上初始的类名后enterTimeout时间后开始执行.
    // 因为开始状态并不需要过度,所以我们直接将之设置为0.
    const enterActiveTimer = setTimeout(() => {
      this.setState({
        classNames: enterActiveClasses
      })
      clearTimeout(enterActiveTimer)
      console.log('enterActiveTimer')
      console.log(enterActiveTimer)
    }, enterTimeout)

    const enterEndTimer = setTimeout(() => {
      this.setState({
        classNames: enterEndClasses
      })
      clearTimeout(enterEndTimer)
      console.log('enterEndTimer')
    }, enterTimeout + enterActiveTimeout)

    // 最后将类名置空,还原元素本来的状态
    const initTimer = setTimeout(() => {
      this.setState({
        classNames: ''
      })
      clearTimeout(initTimer)
      console.log('initTimer')
    }, enterTimeout + enterActiveTimeout + enterEndTimeout)
  }

  // 离开动画
  leaveAnimate = (callback: () => void) => {
    const leaveClasses = 'leave'
    const leaveActiveClasses = 'leave_active'
    const leaveEndClasses = 'leave_end'

    const leaveTimeout = 0
    const leaveActiveTimeout = 100
    const leaveEndTimeout = 200

    // 初始元素已经存在,所以不需要改变显隐状态
    this.setState({
      classNames: leaveClasses
    })
    console.log('leaveTimer')
    const leaveActiveTimer = setTimeout(() => {
      this.setState({
        classNames: leaveActiveClasses
      })
      clearTimeout(leaveActiveTimer)
      console.log('leaveActiveTimer')
    }, leaveTimeout)
    const leaveEndTimer = setTimeout(() => {
      this.setState({
        classNames: leaveEndClasses
      })
      clearTimeout(leaveEndTimer)
      console.log('leaveEndTimer')
    }, leaveTimeout + leaveActiveTimeout)

    // 最后将显隐状态改为false，同时将类名还原为初始状态
    const initTimer = setTimeout(() => {
      this.setState({
        classNames: '',
        isShow: false
      })
      callback()
      clearTimeout(initTimer)
      // console.log(initTimer)
    }, leaveTimeout + leaveActiveTimeout + leaveEndTimeout)
  }

  handleOnConfirm = () => {
    const { onOk } = this.props
    this.leaveAnimate(onOk)
  }

  handleOnCancel = () => {
    const { onCancel } = this.props
    this.leaveAnimate(onCancel)
  }

  handleOnClose = () => {
    const { onClose } = this.props
    this.leaveAnimate(onClose)
  }
}

export default Modal

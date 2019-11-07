## 怎样封装一个基本的 modal 组件，并将其渲染到 body 层 ？

1. 为什么要这么做？
        以往我们封装好 modal 组件后, 引入到页面中使用, 其都是在 id 名为 root 的元素之中,
    而在一些广泛使用的 UI 框架, 如Ant Design, modal 组件确是在 body 层, 这样做的好处
    是, 无论你在哪里引入, 这样就可以防止 modal 组件受到父组件的样式的干扰。

2. 怎么实现？
        首先，我们需要了解下 React(v16版本) 新增的特性：Portal(传送门)，
    官网的解释: 提供一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案，
    语法: ReactDOM.createPortal(child, container)
    child: 可渲染的 React 子元素, container: 一个 DOM 元素
    [传送门：React Portal](https://zhuanlan.zhihu.com/p/29880992?utm_source=wechat_session&utm_medium=social&from=singlemessage)

3. 与ReactDOM.rander方法的区别:
    a.不需要自己管理组件的生命周期，如果用React.render()渲染到某个DOM节点，如果要卸载的话需要手动执行unmountComponentAtNode()；
    b.可以保留当前组件的上下文context，用render()渲染的组件是无法获取到上级节点的Context；

#### Portal.tsx
`
    import React from 'react';
    import ReactDOM from 'react-dom';

    interface Props {
        node: HTMLElement
    }

    const Portal: React.FC<Props> = ({ children, node }) => {
        return (
            ReactDOM.createPortal(children, node)
        )
    }

    export default Portal
`

#### Modal/index.tsx
`
    import React from 'react'
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
    }

    const Modal: React.FC<Props> = ({ visible = false, title = 'title', confirmText = 'Yes', cancelText = 'No', onClose, onOk, onCancel, children }) => {
        const node = document.body
        return (
            <Portal node={node}>
                {visible && <div>
                    <div className={styles.modal}>
                        <div className={styles.title}>
                            <span>{title}</span>
                            <i onClick={onClose} />
                        </div>
                        <div className={styles.content}>{children}</div>
                        <div className={styles.operator}>
                            <button className={styles.operator_confirm} onClick={onOk}>{confirmText}</button>
                            <button className={styles.operator_cancel} onClick={onCancel}>{cancelText}</button>
                        </div>
                    </div>
                    <div className={styles.mask}></div>
                </div>}
            </Portal>
        )
    }

    export default Modal
`
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import ListTitle from './index'

describe('listTitle', () => {
  let container: HTMLDivElement | null = null
  const mockProps = {
    children: 'test'
  }
  beforeEach(() => {
    // 创建一个 DOM 元素作为渲染目标
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    // 退出时进行清理
    unmountComponentAtNode(container!)
    container!.remove()
    container = null
  })

  it('render', () => {
    act(() => {
      render(<ListTitle {...mockProps} />, container)
    })
    expect(container!.textContent).toBe('test')
  })
})

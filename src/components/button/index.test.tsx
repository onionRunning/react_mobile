import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import Button from './index'

describe('Button default', () => {
  let container: HTMLDivElement | null = null
  const mockProps = {
    id: 'btn',
    children: 'test',
    onClick: jest.fn()
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
      render(<Button {...mockProps} />, container)
    })
    const button = document.querySelector('#btn')
    expect(button!.innerHTML).toBe('test')

    act(() => {
      button!.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    })
    expect(mockProps.onClick).toHaveBeenCalledTimes(1)
  })
})

import React from 'react'
import InfoWrapper from './index'

class Test extends React.Component {
  render() {
    return <div />
  }
}

describe('InfoWrapper', () => {
  it('InfoWrapper', () => {
    expect(InfoWrapper('name')(Test)({}).props.children).toEqual([<p className="title">name</p>, <Test />])
  })
  it('InfoWrapper 2', () => {
    const props = { headTitle: 'xxx' }
    expect(InfoWrapper('')(Test)(props).props.children).toEqual([<p className="title">xxx</p>, <Test {...props} />])
  })
})

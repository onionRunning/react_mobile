import React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import ImgViewer from './index'
describe('ImgViewer', () => {
  const props = {
    show: false,
    title: 'Photo',
    text: '',
    onClose: jest.fn()
  }
  let component: ShallowWrapper<ImgViewer>
  beforeEach(() => {
    component = shallow(<ImgViewer {...props} />)
  })

  it('render', () => {
    expect(component.find('Viewer').length).toBeGreaterThan(0)
  })
})

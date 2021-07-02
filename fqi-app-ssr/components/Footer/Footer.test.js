/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Footer from './Footer'

describe('With Snapshot Testing', () => {
  const props = {
    footerItems: [{link: 'www.aaa.com', title: 'link 1'}, {link: 'www.bbb.com', title: 'link 2'}]
  }
  it('Footer snapshot"', () => {
    const component = renderer.create(<Footer { ...props } />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

})
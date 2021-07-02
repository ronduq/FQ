/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import Icon from './Icon'

describe('With Snapshot Testing', () => {
  const props = {iconName:'test', className:'test'}
  it('Icon snapshot"', () => {
    const component = renderer.create(<Icon { ...props } />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });
})
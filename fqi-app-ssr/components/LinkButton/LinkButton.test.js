/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import LinkButton from './LinkButton'


describe('With Snapshot Testing', () => {
  it('LinkButton snapshot"', () => {
    const component = renderer.create(<LinkButton />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })
})
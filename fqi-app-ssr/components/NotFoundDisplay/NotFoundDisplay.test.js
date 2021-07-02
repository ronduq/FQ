/* eslint-env jest */
import React from 'react'
import renderer from 'react-test-renderer'

import NotFoundDisplay from './NotFoundDisplay'


describe('With Snapshot Testing', () => {
  it('NotFoundDisplay snapshot"', () => {
    const component = renderer.create(<NotFoundDisplay />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })
})
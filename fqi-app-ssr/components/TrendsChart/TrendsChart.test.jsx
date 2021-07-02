/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import TrendsChart from './TrendsChart';

function createNodeMock() {
  const doc = document.implementation.createHTMLDocument();
  return { parentElement: doc.body };
}

describe('TrendsChart', () => {
  const props = {
    viewType: 'weeks',
    items:[{id: 'apple', isParent: true, selected: true}, {id: 'avocado', isParent: false, selected: true}, {id: 'tomato', isParent: false, selected: true}]
  }

  it('TrendsChart snapshot"', () => {
    const component = renderer.create(<TrendsChart {...props} />, { createNodeMock } );
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

})
/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import CustomizedTimeline from './CustomizedTimeline';

describe('CustomizedTimeline', () => {

  const props = {
    offset: 5, 
    viewBox:{
      x:0,
      height: 600
    }
  }

  it('CustomizedTimeline snapshot"', () => {
    const component = renderer.create(<CustomizedTimeline {...props} />);
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

})
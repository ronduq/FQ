/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'

import AggregatedScore from './AggregatedScore'

describe('AggregatedScore', () => {

  const props = {
    retailersLabels:{
      single_produce_average_title: 'Single produce',
      quality: 'quality',
      value: 'value',
      perception: 'perception',
    },
    query: {
      location: 'boston',
      retailer: 'aldi'
    }
  };

  it('AggregatedScore snapshot"', () => {
    const component = renderer.create(<AggregatedScore { ...props } />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

})
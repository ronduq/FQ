/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme'

import RetailerHighlightsFilter from './RetailerHighlightsFilter';

describe('RetailerHighlightsFilter', () => {
  const props = {
    updateSortDirection: jest.fn(),
    sortDirection: 'DSC'
  };

  it('RetailerHighlightsFilter snapshot"', () => {
    const wrapper = mount(<RetailerHighlightsFilter {...props} />);
    const newValue = 'ASC';
    wrapper.find('input#ASC').simulate('change', {target: {value: newValue}});
    expect(props.updateSortDirection).toHaveBeenCalledWith(newValue, "bottomToTop");
  });

})
/* eslint-env jest */

import React from 'react'
import { mount } from 'enzyme';

import TrendsLegend from './TrendsLegend';

describe('TrendsLegend', () => {

  const trendData = { timestamp: 1572272548000, avocado: 95, banana: 10, blueberry: 80, strawberry: 90 }

  const props = {
    items: [{isParent:true, id:'apple', selected: true}, {isParent:false, id:'banana', selected: true}, {isParent:false, id:'avocado', selected: true}],
    itemsLabels: {apple: 'All', banana: 'Banana', avocado: 'Avocado'},
    selectedDate: 1572877348000,
    sortBy: 'value',
    trendData,
    viewType: 'weeks',
    query: {
      location: 'boston',
      retailer: 'aldi'
    },
    pageType: 'produce',
    title: 'test title'
  };

  it('should render all selected items excluding parent items"', () => {
    const wrapper = mount(<TrendsLegend {...props} />);
    expect(wrapper.find('tbody tr').length).toEqual(2)
  });

  it('should display `quailty` title and show percentage symbol when sortby is set to quality', () => {
    const sortby = "quality" 
    const wrapper = mount(<TrendsLegend {...props} sortBy={sortby} />);
    expect(wrapper.find('h2').text()).toBe(`${props.title}`)
  });

  it('should format date to display month only when viewType is to months', () => {
    const wrapper = mount(<TrendsLegend {...props} viewType="month" />);
    expect(wrapper.find('.date').text()).toBe(`Nov`)
  });

})
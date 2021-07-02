/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { mount } from 'enzyme'
import CompareByFilter from './CompareByFilter'

describe('With Snapshot Testing', () => {
  const props = {
    selected: 'quality',
    sortRanks: () => {},
  }

  it('CompareByFilter snapshot"', () => {
    const component = renderer.create(<CompareByFilter { ...props } />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('should show perception radio input when showPerception is true', () => {
    const wrapper = mount(<CompareByFilter {...props} showPerception/>);
    expect(wrapper.find('input').length).toBe(3)
  });

  it('should not show perception radio input when showPerception is true', () => {
    const wrapper = mount(<CompareByFilter {...props} showPerception={false} />);
    expect(wrapper.find('input').length).toBe(2)
  });
})

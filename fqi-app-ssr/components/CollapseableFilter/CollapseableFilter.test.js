/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import CollapseableFilter from './CollapseableFilter'

const data = {
  allItemsSelected: true,
  items: {
    '0': {
      id: "avocado",
      isChild: true,
      isParent: false,
      produceCode: "avocado",
      produceName: "Avocado",
      selected: true,
    },
    '1': {
      id: "banana",
      isChild: false,
      isParent: true,
      produceCode: "banana",
      produceName: "Banana",
      selected: true,
    },
  },
  itemsImages: {
    avocado: "Avocado",
    banana: 'Banana',
  },
  itemsLabels: {
    avocado: "Avocado",
    banana: 'Banana',
  }
}

const togglePanel = jest.fn();

describe('With Snapshot Testing', () => {
  it('CollapseableFilter snapshot"', () => {
    const component = renderer.create(<CollapseableFilter data={data}/>)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('should call updateItem when button clicked', () => {
    const wrapper = mount(<CollapseableFilter  data={data}/>);
    const button = wrapper.find('button');
    button.simulate('click');
    expect(togglePanel).toHaveBeenCalledTimes(0);
  });
})
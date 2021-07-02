/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import Checkbox from './Checkbox'


describe('With Snapshot Testing', () => {
  const handleCheckboxChange = jest.fn();
  const updateItem = jest.fn();
  const selectAllItemsCheckbox = jest.fn();
  const selectAllItems = jest.fn();

  const props = {
    index: 0,
    isParent: false,
    label: "Costco",
    selected: false,
    type: "",
    updateItem: updateItem,
    selectAllItems: selectAllItems
  }
  

  it('Checkbox snapshot"', () => {
    const component = renderer.create(<Checkbox />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })

  it('should fire handleChecupdateItemboxChange', () => {
    const wrapper = mount(<Checkbox {...props} />);
    const event = {target: {checked: true}}
    wrapper.find('input').simulate('change', event);
    expect(updateItem).toBeCalledTimes(1);
  })

  it('should fire handleCheckboxChange selectall', () => {
    const wrapper = mount(<Checkbox {...props} type='all'/>);
    const event = {target: {checked: true}}
    wrapper.find('input').simulate('change', event);
    expect(selectAllItems).toBeCalledTimes(1);
  })

  it('should set disabled attr to input when passed in props', () => {
    const wrapper = mount(<Checkbox {...props} disabled />);
    expect(wrapper.find('input[disabled]').length).toBe(1);
  });
})
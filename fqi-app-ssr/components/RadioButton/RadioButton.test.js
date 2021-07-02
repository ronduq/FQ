/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'

import RadioButton from './RadioButton'


describe('With Snapshot Testing', () => {
  const changeAction = jest.fn();
  const updateItem = jest.fn();
  const selectAllItemsRadioButton = jest.fn();
  const selectAllItems = jest.fn();

  const props = {
    label: 'Quality',
    id: 'quality',
    changeAction: changeAction,
    selected: true
  }
  

  it('RadioButton snapshot"', () => {
    const component = renderer.create(<RadioButton />)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  })

  it('should fire handleRadioButtonChange', () => {
    const wrapper = mount(<RadioButton {...props} />);
    const event = {target: {checked: true}}
    wrapper.find('input').simulate('change', event);
    expect(changeAction).toBeCalledTimes(1);
  })

  it('should fire handleRadioButtonChange for quality', () => {
    const wrapper = mount(<RadioButton {...props} />);
    const event = {target: {value: 'quality'}}
    wrapper.find('input').simulate('change', event);
    expect(changeAction).toBeCalledTimes(2);
  })
});

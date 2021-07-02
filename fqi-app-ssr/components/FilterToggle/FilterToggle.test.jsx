/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'

import FilterToggle from './FilterToggle'

const TestChild = () => (
  <div className="test">Hello World</div>
);

describe('FilterToggle', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  let wrapper
  it('should show button when viewport is not xlarge', () => {
    wrapper = mount(
      <FilterToggle viewport="mobile">
        <TestChild  />
      </FilterToggle>
    );
    expect(wrapper.find('button').length).toBe(1);
  });

  it('should not show button when viewport is xlarge', () => {
      wrapper = mount(
        <FilterToggle viewport="xlarge">
          <TestChild  />
        </FilterToggle>
      );
    expect(wrapper.find('button').length).toBe(0);
  });

  it('should not show content on initial load', () => {
    wrapper = mount(
      <FilterToggle viewport="mobile">
        <TestChild  />
      </FilterToggle>
    );
  expect(wrapper.find('TestChild').length).toBe(0);
});

  it('should show content when button is clicked', () => {
    wrapper = mount(
      <FilterToggle viewport="mobile">
        <TestChild  />
      </FilterToggle>
    );

    wrapper
      .find('button')
      .simulate('click');

    expect(wrapper.find('TestChild').length).toBe(1);
  });
})
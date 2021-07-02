/* eslint-env jest */

import { shallow, mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router'
import { debounce, getWindowDimensions } from '../../utils'

import Header from './Header'

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { location: 'boston' }, 
      asPath: '/boston/retailers',
      pathname: '/overallrank',
      push: mockPush,
    };
  }
}));

jest.mock('../../utils', () => ({
  debounce: (e) => e,
  getWindowDimensions: () => ({ width: 1360, height: 800}),
}));

describe('Header', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  const resizeWindow = (x, y) => {
    window.innerWidth = x;
    window.innerHeight = y;
    window.dispatchEvent(new Event('resize'));
  }

  const props = {
    locations: [{id: 'boston', label: 'Boston'}, {id: 'los-angeles', label: 'Los Angeles'}],
    selectedLocation: {id: 'boston', label: 'Boston'},
    setSelectedLocation: jest.fn(),
    resetFilters: jest.fn(),
    setViewport: jest.fn(),
    viewport: 'xlarge'
  }

  it('Should test select onChange event"', () => {
    const value = 'los-angeles';
    const wrapper = mount(<Header {...props} />);
    wrapper
      .find('select')
      .at(0)
      .simulate('change', { target: { value } });
    expect(mockPush).toHaveBeenCalledWith({pathname: "/overallrank", query: {"location": value}}, `/${value}/retailers`);
    expect(props.resetFilters).toBeCalledTimes(1);
  });

  it('Should mount as mobile view and open the location dropdown on button click"', () => {
    const value = 'los-angeles';
    const wrapper = mount(<Header {...props} viewport="mobile" />);
    wrapper
      .find('button')
      .at(0)
      .simulate('click');

    expect(wrapper.find('InputTemplate').length).toBe(1);
  });

  it('should call setViewport on mount', () => {
    act(() => {
      mount(
        <Header {...props}/>
      );
    });
    expect(props.setViewport).toBeCalledTimes(1);
  });

  it('should call setViewport on resize', () => {
    act(() => {
      mount(
        <Header {...props} />
      );
    });
    resizeWindow(480, 800);
    expect(props.setViewport).toBeCalled();
    expect(props.setViewport).not.toBeCalledTimes(1); //Will be called mulitple times
  });

  it('should call useEffect cleanup on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    let wrapper;
    act(() => {
      wrapper = mount(<Header {...props} />);
    });

    wrapper.unmount();
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
})
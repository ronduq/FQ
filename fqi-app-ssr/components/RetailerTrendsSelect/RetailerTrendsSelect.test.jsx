
import { shallow, mount } from 'enzyme'
import React from 'react'
import { useRouter } from 'next/router'

import RetailerTrendsSelect from './RetailerTrendsSelect'

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      query: { location: 'boston', retailer: 'costco' }, 
      asPath: '/retailer-trends',
      pathname: '/boston/retailers/costco/trends',
      push: mockPush,
    };
  }
}));

describe('RetailerTrendsSelect', () => {
  const props = {
    retailersList:{aldi: {label:'Aldi', logo:'www.logo.com'}, costco: {label:'Costco', logo:'www.logo2.com'}},
    query: {location: 'boston', retailer: 'costco'}
  }

  it('Should test select onChange event"', () => {
    const value = 'aldi';
    const wrapper = mount(<RetailerTrendsSelect {...props} />);
    wrapper
      .find('select')
      .at(0)
      .simulate('change', { target: { value } });
    expect(mockPush).toHaveBeenCalledWith({pathname: "/retailer-trends", query: {"location": "boston", "retailer": value}}, `/boston/retailers/${value}/trends`);
  });
});

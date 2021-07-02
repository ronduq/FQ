
import { shallow, mount } from 'enzyme'
import React from 'react'
import { act } from 'react-dom/test-utils';
import { useRouter } from 'next/router'
import { debounce, getWindowDimensions } from '../../utils'

import TrendsViewBy from './TrendsViewBy'

describe('TrendsViewBy', () => {
  const props = {
    compareBy: 'value',
    setViewBy: () => {},
    showViewByDropdown: true,
    viewBy: 'weekly'
  }

  it('Should show InputTemplate when showViewByDropdown is not 0', () => {
    const wrapper = mount(<TrendsViewBy {...props} />);
    expect(wrapper.find('InputTemplate').length).toBe(1);
  });

  it('Should not show InputTemplate when showViewByDropdown is not 0', () => {
    const wrapper = mount(<TrendsViewBy {...props} showViewByDropdown={false} />);
    expect(wrapper.find('InputTemplate').length).toBe(0);
  });
});

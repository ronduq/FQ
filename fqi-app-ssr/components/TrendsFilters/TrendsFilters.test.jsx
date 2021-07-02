/* eslint-env jest */

import React from 'react'
import { Provider } from 'react-redux';
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'

import {
  initialProducesState, 
} from '../../reducers/initialState'

import TrendsFilters from './TrendsFilters';

jest.mock('../../hocs/Layout', () => ({
  __esModule: true,
  default: (e) => e,
}));

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    produces: initialProducesState,
  }),
  subscribe: jest.fn()
};

describe('TrendsFilters', () => {

  const props = {
    data: {
      name: 'Produces',
      items: [],
      allItemsSelected: true,
    },
    selectAllProduces: jest.fn(),
    updateProduce: jest.fn(),
  };

  it('ProfileTemplate snapshot"', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <TrendsFilters {...props} />
      </Provider>
    );

    const component = renderer.create(wrapper)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  

})
/* eslint-env jest */

import React from 'react'
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme'

import { 
  initialRetailerRanksState, 
  initialRetailersState, 
  initialProducesState 
} from '../../reducers/initialState'

import RetailerProfilefilters from './RetailerProfilefilters';

jest.mock('../../hocs/Layout', () => ({
  __esModule: true,
  default: (e) => e,
}));

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    produces: initialProducesState,
    retailers: initialRetailersState,
    retailerRanks: initialRetailerRanksState
  }),
  subscribe: jest.fn()
};

describe('RetailerProfilefilters', () => {

  const props = {
    retailersData: {
      name: 'Retailers',
      items: [],
      allItemsSelected: true,
    },
    producesData: {
      name: 'Produces',
      items: [],
      allItemsSelected: true,
    },
    selectAllRetailers: jest.fn(),
    selectAllProduces: jest.fn(),
    updateRetailer: jest.fn(),
    updateProduce: jest.fn(),
    currentRetailer: 'aldi'
  };

  it('RetailerProfileTemplate snapshot"', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <RetailerProfilefilters {...props} />
      </Provider>
    );

    const allCheckbox = wrapper.find('input#AllRetailers');
    allCheckbox.find('input').simulate('change', {target: {checked: true}});
    expect(props.selectAllRetailers).toHaveBeenCalledWith(props.currentRetailer);
  });

})
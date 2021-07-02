/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux';
import { initialRetailerRanksState, initialRetailersState, producesOfRetailer, initialProducesState } from '../../reducers/initialState'
import TableFilter from './TableFilter'
import { updateRetailer } from '../../actions/retailers'

const retailerProduces = {
  allItemsSelected: true,
  items: {
    '0': {
      id: "avocado",
      isChild: false,
      isParent: false,
      produceCode: "avocado",
      produceName: "Avocado",
      selected: true,
    },
    '1': {
      id: "banana",
      isChild: false,
      isParent: false,
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

const props = {
  retailersLabels:{
    single_produce_average_title: 'Single produce',
    quality: 'quality',
    value: 'value',
    perception: 'perception',
  },
  query: {
    location: 'boston',
    retailer: 'aldi'
  },
  selectedLocation: { label: 'Boston', id: 'boston'},
  selectedRetailer: 'aldi',
  
  retailersData: initialRetailersState,
  producesData: retailerProduces,
  cardLabels: {
    countries_of_origin: "Countries of origin",
    last_scan: "Last scan",
    organic: "Organic",
    perception: "Perception",
    product_of: "Product of",
    profile: "Profile",
    quality: "Quality",
    trends: "Trends",
    value: "Value",
  },
  retailerRanksData: initialRetailerRanksState,
  setProduceInfoTable: () => {}
};

const fakeStore = {
  dispatch: jest.fn(),
  getState: () => ({
    content: {
      tooltips:{
        trend:{}
      }
    }
  }),
  subscribe: jest.fn()
};

const updateProduce = jest.fn();



describe('With Snapshot Testing', () => {
  it('TableFilter snapshot"', () => {
    const component = renderer.create(<Provider store={fakeStore}><TableFilter {...props}/></Provider>)
    const componentJSON = component.toJSON()
    expect(componentJSON).toMatchSnapshot()
  });

  it('should call updateProduce when button clicked', () => {
    const wrapper = mount(
      <Provider store={fakeStore}>
        <TableFilter {...props} updateProduce={updateProduce}/>
      </Provider>);
    const button = wrapper.find('#test0 button');
    button.simulate('click');
    expect(updateProduce).toHaveBeenCalledTimes(1);
  });

})